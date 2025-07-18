// import { getRepositories } from "@/lib/db/repositories";
// import { Badge } from "@/components/ui/badge";
// import { Suspense } from 'react'
// import { RepositoryListServer } from '@/components/features/repository/repository-list-server'
// import { RepositorySearch } from '@/components/features/repository/repository-search-client'
// import { RepositoryListSkeleton } from '@/components/features/repository/repository-list-skeleton'
// import { AdvancedSearchClient } from '@/components/features/search/advanced-search-client'
// import { Metadata } from "next";
//
// interface PageProps {
//     searchParams: Promise<{
//         q?: string
//         page?: string
//         limit?: string
//         source?: string
//         subjects?: string
//         sortBy?: string
//         sortOrder?: string
//         accessType?: string
//         hasCertificates?: string
//         hasAPI?: string
//         viewMode?: "grid" | "list"
//     }>
//
// }
//
//
// export default async function CatalogPage({ searchParams }: PageProps) {
//     const params = await searchParams;
//
//     const searchOptions = {
//         q: params.q,
//         page: params.page ? parseInt(params.page) : 1,
//         limit: params.limit ? parseInt(params.limit) : 20,
//         source: params.source,
//         subjects: params.subjects,
//         sortBy: params.sortBy || 'name',
//         sortOrder: (params.sortOrder || 'asc') as 'asc' | 'desc',
//         accessType: params.accessType,
//         hasCertificates: params.hasCertificates === 'true',
//         hasAPI: params.hasAPI === 'true',
//     }
//
//     const { repositories, pagination, stats } = await getRepositories(searchOptions)
//
//     return (
//         <div className="container space-y-6 max-w-6xl mx-auto pt-4">
//             <div className="text-center space-y-4">
//                 <h1 className="text-4xl md:text-5xl font-bold text-foreground">
//                     科学数据仓库目录
//                 </h1>
//                 <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
//                     发现和探索全球科学数据仓库, 包含 4000+ 权威的科学数据仓库
//                 </p>
//                 <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
//                     <Badge className="px-3 py-1">{stats.total} 个数据库</Badge>
//                     <Badge variant={"outline"} className="px-3 py-1">{stats.sources} 个数据源</Badge>
//                 </div>
//             </div>
//             <div className="space-y-4">
//                 <RepositorySearch defaultValue={params.q} />
//
//                 <AdvancedSearchClient defaultValues={searchOptions} />
//             </div>
//
//             <Suspense
//                 key={JSON.stringify(searchOptions)}
//                 fallback={<RepositoryListSkeleton />}
//             >
//                 <RepositoryListServer
//                     repositories={repositories}
//                     pagination={pagination}
//                     viewMode={params.viewMode as 'grid' | 'list' || 'list'}
//                 />
//             </Suspense>
//         </div>
//     )
//
// }
//
//
// export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
//     const params = await searchParams;
//
//     const title = params.q ? `"${params.q}" - 科学数据库搜索结果` : "科学数据仓库目录"
//
//     const description = params.q ? `搜索 "${params.q}" 的科学数据仓库结果` : "浏览和探索全球科学数据仓库，包含来自 re3data、FAIRsharing 和 GCBR 的综合数据"
//
//     return {
//         title,
//         description,
//         openGraph: {
//             title,
//             description,
//             type: "website",
//         }
//     }
//
// }
//
// export const revalidate = 300