// lib/db/repositories.ts
import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { ObjectId } from 'mongodb'
import clientPromise from './client'
import { Repository, RepositoryDocument } from '@/types/repository'
import { transformRepository } from '@/lib/utils'

interface SearchOptions {
    q?: string
    page?: number
    limit?: number
    source?: string
    subjects?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
    accessType?: string
    hasCertificates?: boolean
    hasAPI?: boolean
}

// 构建 MongoDB 查询
function buildQuery(options: SearchOptions) {
    const query: any = {}

    // 基础搜索
    if (options.q) {
        query.$or = [
            { repositoryName: { $regex: options.q, $options: 'i' } },
            { description: { $regex: options.q, $options: 'i' } },
            { subject: { $regex: options.q, $options: 'i' } },
            { keyword: { $regex: options.q, $options: 'i' } }
        ]
    }

    // 数据源过滤
    if (options.source && options.source !== 'all') {
        query.from = { $in: [options.source] }
    }

    // 学科过滤
    if (options.subjects) {
        const subjects = options.subjects.split(',')
        query['subject.value'] = { $in: subjects }
    }

    // 访问类型过滤
    if (options.accessType) {
        query['dataAccess.dataAccessType'] = options.accessType
    }

    // 认证状态过滤
    if (options.hasCertificates) {
        query.certificate = { $exists: true, $ne: [] }
    }

    // API 过滤
    if (options.hasAPI) {
        query.api = { $exists: true, $ne: [] }
    }

    return query
}

type Sorter = {field: string, order: 'asc' | 'desc'}

// 获取排序选项
function getSortOptions(sortBy: string = 'name', sortOrder: 'asc' | 'desc' = 'asc'): Sorter {

    switch (sortBy) {
        case 'name':
            return { field: 'repositoryName.value', order: sortOrder }
        case 'lastUpdate':
            return { field: 'lastUpdate', order: sortOrder }
        case 'source':
            return { field: 'from', order: sortOrder }
        default:
            return { field: 'repositoryName.value', order: sortOrder }
    }
}

// 使用 React cache 进行请求级别的缓存
export const getRepositories = cache(async (options: SearchOptions) => {
    const client = await clientPromise
    const db = client.db()
    const collection = db.collection<RepositoryDocument>('final')

    const query = buildQuery(options)
    const sort = getSortOptions(options.sortBy, options.sortOrder)
    const skip = ((options.page || 1) - 1) * (options.limit || 20)
    const limit = options.limit || 20

    // 并行执行查询
    const [repositories, total, sourceStats] = await Promise.all([
        collection
            .find(query)
            .sort(sort.field, sort.order)
            .skip(skip)
            .limit(limit)
            .toArray(),
        collection.countDocuments(query),
        collection.distinct('from')
    ])

    return {
        repositories: repositories.map(transformRepository),
        pagination: {
            page: options.page || 1,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        },
        stats: {
            total,
            sources: sourceStats.length
        }
    }
})

// 获取单个仓库 - 使用 Next.js 缓存
export const getRepositoryById = unstable_cache(
    async (id: string): Promise<Repository | null> => {
        const client = await clientPromise
        const db = client.db()
        const collection = db.collection<RepositoryDocument>('final')

        try {
            const repository = await collection.findOne({
                _id: new ObjectId(id)
            })

            if (!repository) {
                return null
            }

            return transformRepository(repository)
        } catch (error) {
            console.error('Error fetching repository:', error)
            return null
        }
    },
    ['repository'],
    {
        revalidate: 3600, // 1小时缓存
        tags: ['repository']
    }
)

// 获取相关仓库
export const getRelatedRepositories = unstable_cache(
    async (id: string, limit: number = 5): Promise<Repository[]> => {
        const client = await clientPromise
        const db = client.db()
        const collection = db.collection<RepositoryDocument>('final')

        try {
            // 先获取当前仓库
            const currentRepo = await collection.findOne({
                _id: new ObjectId(id)
            })

            if (!currentRepo) {
                return []
            }

            // 基于学科查找相关仓库
            const subjects = currentRepo.subject?.map(s =>
                typeof s === 'string' ? s : s.value
            ) || []

            if (subjects.length === 0) {
                return []
            }

            const relatedRepos = await collection
                .find({
                    _id: { $ne: new ObjectId(id) },
                    'subject.value': { $in: subjects }
                })
                .limit(limit)
                .toArray()

            return relatedRepos.map(transformRepository)
        } catch (error) {
            console.error('Error fetching related repositories:', error)
            return []
        }
    },
    ['related-repositories'],
    {
        revalidate: 3600,
        tags: ['repository', 'related']
    }
)

// 获取仓库统计信息
export const getRepositoryStats = unstable_cache(
    async () => {
        const client = await clientPromise
        const db = client.db()
        const collection = db.collection<RepositoryDocument>('final')

        const [
            total,
            openAccessCount,
            certifiedCount,
            withAPICount,
            sourceStats,
            subjectStats
        ] = await Promise.all([
            collection.countDocuments(),
            collection.countDocuments({ 'dataAccess.dataAccessType': 'open' }),
            collection.countDocuments({ certificate: { $exists: true, $ne: [] } }),
            collection.countDocuments({ api: { $exists: true, $ne: [] } }),
            collection.aggregate([
                { $unwind: '$from' },
                { $group: { _id: '$from', count: { $sum: 1 } } },
                { $sort: { count: -1 } }
            ]).toArray(),
            collection.aggregate([
                { $unwind: '$subject' },
                { $group: { _id: '$subject.value', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 10 }
            ]).toArray()
        ])

        return {
            total,
            openAccessCount,
            certifiedCount,
            withAPICount,
            sourceDistribution: sourceStats.map(item => ({
                source: item._id,
                count: item.count
            })),
            topSubjects: subjectStats.map(item => ({
                subject: item._id,
                count: item.count
            }))
        }
    },
    ['repository-stats'],
    {
        revalidate: 3600 * 24, // 24小时缓存
        tags: ['stats']
    }
)

// 搜索建议
export const getSearchSuggestions = unstable_cache(
    async (query: string): Promise<string[]> => {
        if (!query || query.length < 2) {
            return []
        }

        const client = await clientPromise
        const db = client.db()
        const collection = db.collection<RepositoryDocument>('final')

        // 获取匹配的仓库名称
        const suggestions = await collection
            .find(
                { repositoryName: { $regex: query, $options: 'i' } },
                { projection: { repositoryName: 1 } }
            )
            .limit(10)
            .toArray()

        return suggestions.map(s =>
            typeof s.repositoryName === 'string'
                ? s.repositoryName
                : s.repositoryName.value
        )
    },
    ['search-suggestions'],
    {
        revalidate: 3600,
        tags: ['suggestions']
    }
)