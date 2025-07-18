// components/features/repository/related-repositories.tsx
import Link from 'next/link'
import { ArrowRight, Database, Globe, Lock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Repository } from '@/types/repository'

interface RelatedRepositoriesProps {
    repositories: Repository[]
}

export function RelatedRepositories({ repositories }: RelatedRepositoriesProps) {
    if (repositories.length === 0) {
        return null
    }

    return (
        <Card className="bg-card/50 backdrop-blur-sm border-border shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center text-lg">
                    <Database className="w-5 h-5 mr-3 text-primary" />
                    相关数据仓库
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {repositories.map((repo) => {
                        const isOpenAccess = repo.dataAccess?.some((access) => access.dataAccessType === 'open')

                        return (
                            <Link
                                key={repo.id}
                                href={`/catalog/${repo.id}`}
                                className="block group"
                            >
                                <div
                                    className="p-4 rounded-lg border border-border bg-background hover:bg-accent/50 hover:border-primary/50 transition-all">
                                    <div className="space-y-3">
                                        {/* 标题和访问类型 */}
                                        <div>
                                            <h4 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                                                {repo.repositoryName}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                {isOpenAccess ? (
                                                    <Badge variant="outline"
                                                           className="text-xs border-green-200 text-green-700">
                                                        <Globe className="h-3 w-3 mr-1" />
                                                        开放访问
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline"
                                                           className="text-xs border-orange-200 text-orange-700">
                                                        <Lock className="h-3 w-3 mr-1" />
                                                        限制访问
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        {/* 描述 */}
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                            {repo.description}
                                        </p>

                                        {/* 学科标签 */}
                                        <div className="flex flex-wrap gap-1">
                                            {repo.subject?.slice(0, 3).map((subject, idx) => (
                                                <Badge
                                                    key={idx}
                                                    variant="secondary"
                                                    className="text-xs py-0 px-2"
                                                >
                                                    {subject}
                                                </Badge>
                                            ))}
                                            {repo.subject && repo.subject.length > 3 && (
                                                <Badge
                                                    variant="outline"
                                                    className="text-xs py-0 px-2 text-muted-foreground"
                                                >
                                                    +{repo.subject.length - 3}
                                                </Badge>
                                            )}
                                        </div>

                                        {/* 查看详情链接 */}
                                        <div
                                            className="flex items-center text-xs text-primary group-hover:translate-x-1 transition-transform">
                                            查看详情
                                            <ArrowRight className="h-3 w-3 ml-1" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>

                {/* 查看更多按钮 */}
                <div className="mt-6 text-center">
                    <Link href="/catalog">
                        <Button variant="outline" size="sm">
                            浏览更多数据仓库
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}