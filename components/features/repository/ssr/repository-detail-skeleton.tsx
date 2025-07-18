// components/features/repository/repository-detail-skeleton.tsx
import { Card, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function RepositoryDetailSkeleton() {
    return (
        <div className="space-y-6">
            {/* 主要信息卡片骨架 */}
            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-sm">
                <CardHeader>
                    <div className="space-y-4">
                        {/* 标题 */}
                        <Skeleton className="h-8 w-3/4" />

                        {/* 别名 */}
                        <Skeleton className="h-4 w-1/2" />

                        {/* 描述 */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>

                        {/* 快速统计 */}
                        <div className="flex flex-wrap gap-6">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-28" />
                        </div>

                        {/* 操作按钮 */}
                        <div className="flex gap-3">
                            <Skeleton className="h-9 w-20" />
                            <Skeleton className="h-9 w-24" />
                            <Skeleton className="h-9 w-32" />
                        </div>
                    </div>
                </CardHeader>
            </Card>
            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5 bg-accent/60">
                    <TabsTrigger value="overview">概览</TabsTrigger>
                    <TabsTrigger value="institutions">机构信息</TabsTrigger>
                    <TabsTrigger value="access">数据访问</TabsTrigger>
                    <TabsTrigger value="technical">技术信息</TabsTrigger>
                    <TabsTrigger value="standards">标准规范</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <Skeleton className="h-[300px] w-full" />
                </TabsContent>
                <TabsContent value="institutions">
                    <Skeleton className="h-[300px] w-full" />
                </TabsContent>
                <TabsContent value="access">
                    <Skeleton className="h-[300px] w-full" />
                </TabsContent>
                <TabsContent value="technical">
                    <Skeleton className="h-[300px] w-full" />
                </TabsContent>
                <TabsContent value="standards">
                    <Skeleton className="h-[300px] w-full" />
                </TabsContent>
            </Tabs>
        </div>
    )
}