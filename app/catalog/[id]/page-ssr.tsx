// // app/catalog/[id]/page.tsx
// import { notFound } from 'next/navigation'
// import { Metadata } from 'next'
// import { Suspense } from 'react'
// import { RepositoryDetailServer } from '@/components/features/repository/repository-detail-server'
// import { RepositoryDetailSkeleton } from '@/components/features/repository/repository-detail-skeleton'
// import { BackButton } from '@/components/BackButton'
// import { ExternalLinkButton } from '@/components/ExternalLinkButton'
// import { getRelatedRepositories, getRepositoryById } from '@/lib/db/repositories'
//
// interface PageProps {
//     params: Promise<{id: string}>
// }
//
// export default async function RepositoryDetailPage({ params }: PageProps) {
//     const { id } = await params
//
//     // 并行获取仓库详情和相关仓库
//     const [repository, relatedRepositories] = await Promise.all([
//         getRepositoryById(id),
//         getRelatedRepositories(id)
//     ])
//
//     if (!repository) {
//         notFound()
//     }
//
//     return (
//         <div className="min-h-screen font-sans pb-10">
//             <div className="max-w-6xl mx-auto space-y-6 px-1 sm:px-6 lg:px-8">
//                 {/* 顶部导航栏 */}
//                 <div className="flex items-center gap-4 mb-8">
//                     <BackButton />
//                     <div className="flex items-center gap-2 ml-auto">
//                         <ExternalLinkButton
//                             url={repository.repositoryURL}
//                             label="访问该站"
//                         />
//                     </div>
//                 </div>
//
//                 {/* 仓库详情 - 使用 Suspense 包裹 */}
//                 <Suspense fallback={<RepositoryDetailSkeleton />}>
//                     <RepositoryDetailServer
//                         repository={repository}
//                         relatedRepositories={relatedRepositories}
//                     />
//                 </Suspense>
//             </div>
//         </div>
//     )
// }
//
// // 生成静态参数（可选 - 用于预渲染热门页面）
// export async function generateStaticParams() {
//     // 可以预生成一些常访问的仓库页面
//     // const popularRepositories = await getPopularRepositoryIds()
//     // return popularRepositories.map((id) => ({ id }))
//
//     // 暂时返回空数组，使用动态渲染
//     return []
// }
//
// // 生成元数据
// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//     const { id } = await params
//     const repository = await getRepositoryById(id)
//
//     if (!repository) {
//         return {
//             title: '仓库未找到 - 科学数据库权威目录',
//             description: '请求的数据仓库不存在或已被移除'
//         }
//     }
//
//     const title = `${repository.repositoryName} - 科学数据库详情`
//     const description = repository.description.length > 160
//         ? repository.description.substring(0, 157) + '...'
//         : repository.description
//
//     return {
//         title,
//         description,
//         keywords: [
//             repository.repositoryName,
//             ...(repository.keyword || []),
//             ...(repository.subject || []),
//             '科学数据库',
//             '数据仓库'
//         ].join(', '),
//         openGraph: {
//             title,
//             description,
//             type: 'website',
//             url: `/catalog/${id}`,
//         },
//         twitter: {
//             card: 'summary_large_image',
//             title,
//             description,
//         }
//     }
// }
//
// // 配置重新验证
// export const revalidate = 3600 // 1小时重新验证
//
// // 动态路由配置
// export const dynamicParams = true // 允许动态参数