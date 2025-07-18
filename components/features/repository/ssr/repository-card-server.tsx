// components/features/repository/repository-card-server.tsx
import Link from 'next/link'
import { AlertTriangle, Building, Calendar, Database, Globe, Lock, Tag, } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Repository } from '@/types/repository'
import { getSourceInfo, sourcePriority } from '@/lib/data/real-data'
import { RepositoryCardActions } from './repository-card-actions'

interface RepositoryCardServerProps {
    repository: Repository
    viewMode?: 'grid' | 'list'
}

export function RepositoryCardServer({
                                         repository,
                                         viewMode = 'list',
                                     }: RepositoryCardServerProps) {
    const isDeprecated = repository.deprecationReason !== undefined
    const isOpenAccess = repository.dataAccess?.some((access) => access.dataAccessType === 'open')

    return (
        <Card
            className={`group transition-all duration-300 hover:shadow-xl border-2 bg-card/60 backdrop-blur-sm hover:border-primary/50 ${
                isDeprecated ? 'border-destructive/50' : 'border-border'
            } ${viewMode === 'list' ? 'flex-row' : ''}`}
        >
            <CardHeader className={`${viewMode === 'list' ? 'flex-1' : ''} pb-4`}>
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0 space-y-3">
                        {/* 标题和徽章 */}
                        <CardTitle className="text-lg font-semibold">
                            <div className="flex items-center gap-2 flex-wrap pb-1">
                                {repository.type && (
                                    <Badge variant="outline">
                                        {repository.type.map((item) => (
                                            <span key={item} className="capitalize">{item}</span>
                                        ))}
                                    </Badge>
                                )}
                                {isOpenAccess ? (
                                    <Badge variant="secondary"
                                           className="text-xs bg-green-50 text-green-700 border-green-200">
                                        <Globe className="h-3 w-3 mr-1" />
                                        开放访问
                                    </Badge>
                                ) : (
                                    <Badge variant="secondary"
                                           className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                                        <Lock className="h-3 w-3 mr-1" />
                                        限制访问
                                    </Badge>
                                )}
                            </div>

                            <Link
                                href={`/catalog/${repository.id}`}
                                className="font-sans transition-all duration-300 hover:text-primary block"
                            >
                                {repository.repositoryName}
                            </Link>

                            {repository.additionalName && (
                                <div className="flex gap-x-2 pt-1">
                                    {repository.additionalName.slice(0, viewMode === 'list' ? 5 : 2).map((name, idx) => (
                                        <Badge key={idx} variant="outline" className="text-xs">
                                            {name}
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            {isDeprecated && (
                                <div className="flex items-center mt-1 text-sm text-orange-600">
                                    <AlertTriangle className="w-4 h-4 mr-1" />
                                    <span className="font-sans">Deprecated</span>
                                </div>
                            )}
                        </CardTitle>

                        <CardDescription
                            className={`text-sm leading-relaxed ${viewMode === 'list' ? 'line-clamp-3' : 'line-clamp-2'}`}>
                            {repository.description}
                        </CardDescription>

                        {/* 快速统计 */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            {viewMode === 'list' && repository.size && repository.size.value.length > 0 && (
                                <div className="flex items-center gap-1 line-clamp-1">
                                    <Database className="h-3 w-3" />
                                    <span>{repository.size?.value}</span>
                                </div>
                            )}

                            {repository.institution && repository.institution.length > 0 && (
                                <div className="flex items-center gap-1 text-nowrap">
                                    <Building className="h-3 w-3" />
                                    <span>{repository.institution.length} 机构</span>
                                </div>
                            )}

                            {repository.startDate && (
                                <div className="flex items-center gap-1 text-nowrap">
                                    <Calendar className="h-3 w-3" />
                                    <span>{new Date(repository.startDate).toLocaleDateString('zh-CN')}</span>
                                </div>
                            )}
                        </div>

                        {/* 来源徽章 */}
                        {viewMode === 'grid' && (
                            <div className="flex gap-2 shrink-0">
                                {repository.from?.sort((a, b) => {
                                    return (sourcePriority[b] || 3) - (sourcePriority[a] || 3)
                                }).map((item) => (
                                    <Badge
                                        key={item}
                                        variant="outline"
                                        className={`text-xs font-medium ${getSourceInfo(item).color}`}
                                    >
                                        {getSourceInfo(item).label}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {/* 学科标签 */}
                        <div className={`flex gap-2 ${viewMode === 'list' ? 'flex-wrap' : 'flex-nowrap flex-col'}`}>
                            {repository.subject?.slice(0, viewMode === 'list' ? 5 : 2).map((subject, idx) => {
                                const subjectValue = typeof subject === 'string' ? subject :
                                    (subject as any)?.value || String(subject)
                                return (
                                    <Badge
                                        key={idx}
                                        variant="secondary"
                                        className="text-xs w-fit bg-secondary/50 text-secondary-foreground hover:bg-secondary/90 transition-colors"
                                    >
                                        <Tag className="h-3 w-3 mr-1" />
                                        {subjectValue}
                                    </Badge>
                                )
                            })}

                            {viewMode === 'list' && repository.subject && repository.subject.length > 5 && (
                                <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                                    +{repository.subject.length - 5} 更多
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* 来源徽章 - 列表视图 */}
                    {viewMode === 'list' && (
                        <div className="flex gap-2 shrink-0">
                            {repository.from?.sort((a, b) => {
                                return (sourcePriority[b] || 3) - (sourcePriority[a] || 3)
                            }).map((item) => (
                                <Badge
                                    key={item}
                                    variant="outline"
                                    className={`text-xs font-medium ${getSourceInfo(item).color}`}
                                >
                                    {getSourceInfo(item).label}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>
            </CardHeader>

            {/* 底部操作 */}
            <div className="px-6 pb-4">
                <div className="flex justify-between items-center">
                    <Link href={`/catalog/${repository.id}`}>
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-border text-card-foreground hover:bg-accent"
                        >
                            查看详情
                        </Button>
                    </Link>

                    {/* 客户端交互组件 */}
                    <RepositoryCardActions repositoryId={repository.id!} />
                </div>
            </div>
        </Card>
    )
}