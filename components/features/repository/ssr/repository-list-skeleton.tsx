// components/features/repository/repository-list-skeleton.tsx
import { Card, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function RepositoryListSkeleton() {
    return (
        <div className="space-y-6">
            {/* 统计信息骨架 */}
            <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-32" />
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-24" />
                </div>
            </div>

            {/* 列表骨架 */}
            <div className="grid gap-6 grid-cols-1">
                {[...Array(5)].map((_, index) => (
                    <Card key={index} className="border-2">
                        <CardHeader>
                            <div className="space-y-3">
                                {/* 标题和徽章 */}
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-5 w-20" />
                                    <Skeleton className="h-5 w-24" />
                                </div>

                                {/* 仓库名称 */}
                                <Skeleton className="h-6 w-3/4" />

                                {/* 描述 */}
                                <div className="space-y-1">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3" />
                                </div>

                                {/* 统计信息 */}
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-3 w-16" />
                                    <Skeleton className="h-3 w-20" />
                                    <Skeleton className="h-3 w-24" />
                                </div>

                                {/* 标签 */}
                                <div className="flex gap-2">
                                    <Skeleton className="h-6 w-16" />
                                    <Skeleton className="h-6 w-20" />
                                    <Skeleton className="h-6 w-18" />
                                </div>
                            </div>
                        </CardHeader>

                        <div className="px-6 pb-4">
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-9 w-20" />
                                <div className="flex gap-2">
                                    <Skeleton className="h-9 w-16" />
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* 分页骨架 */}
            <div className="flex justify-center gap-1 mt-8">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-24" />
            </div>
        </div>
    )
}