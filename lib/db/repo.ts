import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/db/db";
import { transformRepository } from "@/lib/db/transformers";
import type { Repository, RepositoryDocument } from "@/types/repository";

interface GetRepositoriesParams {
    q?: string
    page?: number
    limit?: number
    source?: string
    subjects?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
    accessType?: string
    from?: string;
    contentTypes?: string;
    accessTypes?: string;
    countries?: string;
    institutionTypes?: string;
    startYear?: string;
    hasCertificates?: boolean;
    hasAPI?: boolean;
}

interface GetRepositoriesResult {
    repositories: Repository[];
    total: number;
}

// 构建查询条件
function buildQuery(options: GetRepositoriesParams) {
    const query: any = {};
    if (options.q) {
        query.$or = [
            { repositoryName: { $regex: options.q, $options: 'i' } },
            { description: { $regex: options.q, $options: 'i' } },
            { subject: { $regex: options.q, $options: 'i' } },
            { keyword: { $regex: options.q, $options: 'i' } }
        ]
    }
    // 数据源过滤（from）
    if (options.from) {
        const sources = options.from.split(",");
        console.log(sources)
        query.from = { $in: sources };
    }

    // 学科过滤（subjects）
    if (options.subjects) {
        const subjects = options.subjects.split(",");
        query["subject.value"] = { $in: subjects };
    }

    // 内容类型过滤（contentTypes）
    if (options.contentTypes) {
        const contentTypes = options.contentTypes.split(",");
        query["contentType"] = { $in: contentTypes };
    }

    // 访问类型过滤（accessTypes）
    if (options.accessTypes) {
        const accessTypes = options.accessTypes.split(",");
        query["dataAccess.dataAccessType"] = { $in: accessTypes };
    }

    // 国家过滤（countries）
    if (options.countries) {
        const countries = options.countries.split(",");
        query["country"] = { $in: countries };
    }

    // 机构类型过滤（institutionTypes）
    if (options.institutionTypes) {
        const institutionTypes = options.institutionTypes.split(",");
        query["institution.institutionType"] = { $in: institutionTypes };
    }

    // 时间范围过滤（startYear, endYear）
    if (options.startYear) {
        query.startDate = {};
        if (options.startYear) {
            query.startDate.$gte = new Date(`${options.startYear}-01-01`);
        }
    }

    // 认证状态过滤（hasCertificates）
    if (options.hasCertificates) {
        query.certificate = { $exists: true, $ne: [] };
    }

    // API 状态过滤（hasAPI）
    if (options.hasAPI) {
        query.api = { $exists: true, $ne: [] };
    }


    return query;
}

// 构建排序条件
function buildSort(sortBy: string = "name", sortOrder: "asc" | "desc" = "asc") {
    const sortMap: Record<string, string> = {
        name: "repositoryName",
        lastUpdate: "lastUpdate",
        source: "from",
    };

    const field = sortMap[sortBy] || "repositoryName";
    return { [field]: sortOrder };
}

// 获取仓库列表
export async function getRepositories(params: GetRepositoriesParams): Promise<GetRepositoriesResult> {
    const { db } = await connectToDatabase();
    const collection = db.collection<RepositoryDocument>("final");

    // 构建查询条件
    const query = buildQuery(params);
    const sort = buildSort(params.sortBy, params.sortOrder);
    // 计算分页
    const skip = ((params.page || 1) - 1) * (params.limit || 20)

    // 并行执行计数和查询
    const [total, documents] = await Promise.all([
        collection.countDocuments(query),
        collection
            .find(query)
            .sort(sort)
            .skip(skip)
            .limit(params.limit || 20)
            .toArray(),
    ]);

    // 转换数据
    const repositories = documents.map(transformRepository);
    return {
        repositories,
        total,
    };
}

// 根据ID获取仓库详情
export async function getRepositoryById(id: string): Promise<Repository | null> {
    try {
        const { db } = await connectToDatabase();
        const collection = db.collection<RepositoryDocument>("final");

        // 验证ID格式
        if (!ObjectId.isValid(id)) {
            return null;
        }

        // 查询数据
        const document = await collection.findOne({
            _id: new ObjectId(id)
        });

        if (!document) {
            return null;
        }

        // 转换并返回数据
        return transformRepository(document);
    } catch (error) {
        console.error("Error fetching repository by ID:", error);
        return null;
    }
}

// 获取仓库统计信息
export async function getRepositoryStats() {
    const { db } = await connectToDatabase();
    const collection = db.collection<RepositoryDocument>("final");

    const [
        total,
        sourceStats,
        openAccessCount,
        certifiedCount,
        withAPICount
    ] = await Promise.all([
        // 总数
        collection.countDocuments(),

        // 按数据源统计
        collection.aggregate([
            { $unwind: "$from" },
            { $group: { _id: "$from", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]).toArray(),

        // 开放访问数量
        collection.countDocuments({
            "dataAccess.dataAccessType": "open"
        }),

        // 已认证数量
        collection.countDocuments({
            certificate: { $exists: true, $ne: [] }
        }),

        // 提供API的数量
        collection.countDocuments({
            api: { $exists: true, $ne: [] }
        })
    ]);

    return {
        total,
        bySource: sourceStats.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
        }, {} as Record<string, number>),
        openAccess: openAccessCount,
        certified: certifiedCount,
        withAPI: withAPICount,
    };
}