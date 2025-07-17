"use client"

import { useState } from "react"
import {
    AlertTriangle,
    Building,
    Calendar,
    ChevronDown,
    ChevronUp,
    Database,
    Globe,
    Lock,
    MapPin,
    Tag,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Repository } from "@/types/repository"
import { getSourceInfo, sourcePriority } from "@/lib/data/real-data"

interface RealRepositoryCardProps {
    repository: Repository
    expanded: boolean
    onToggle: (id: string) => void
    onViewDetail: (id: string) => void
    viewMode?: "grid" | "list"
}

export function RealRepositoryCard({
                                       repository,
                                       expanded,
                                       onToggle,
                                       onViewDetail,
                                       viewMode = "grid",
                                   }: RealRepositoryCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    const isDeprecated = repository.deprecationReason !== undefined
    return (
        <Card
            className={`group  transition-all duration-300 hover:shadow-xl cursor-pointer border-2 bg-card/60 backdrop-blur-sm ${
                isDeprecated ? "border-destructive/50 shadow-lg hover:border-destructive/50" :
                    isHovered ? "border-primary/50 shadow-lg" : "border-border"
            } ${viewMode === "list" ? "flex-row" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => repository.id && onViewDetail(repository.id)}
        >
            <CardHeader className={`${viewMode === "list" ? "flex-1" : ""} pb-4`}>
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0 space-y-3">

                        {/* Title and description */}
                        <CardTitle className="text-lg font-semibold group-hover:opacity-80 transition-opacity">
                            <div className="flex items-center gap-2 flex-wrap pb-1">
                                {
                                    repository.type && <Badge variant={"outline"}>
                                        {repository.type?.map((item) => (
                                            <div key={item}>
                                                <span className="capitalize">{item}</span>
                                            </div>
                                        ))}
                                    </Badge>
                                }
                                {repository.dataAccess?.some((access) => access.dataAccessType === "open") ? (
                                    <Badge variant="secondary"
                                           className="text-xs bg-green-50 text-green-700 border-green-200 hover:bg-green-50/10">
                                        <Globe className="h-3 w-3 mr-1" />
                                        开放访问
                                    </Badge>
                                ) : (
                                    <Badge variant="secondary"
                                           className="text-xs bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-50/10">
                                        <Lock className="h-3 w-3 mr-1" />
                                        限制访问
                                    </Badge>
                                )
                                }
                            </div>
                            <span className={"font-sans  transition-all duration-300 hover:text-primary"}
                                  onClick={() => repository.id && onViewDetail(repository.id)}>
                                {repository.repositoryName}
                            </span>
                            <div className={"flex gap-x-2 pt-1"}>
                                {repository.additionalName &&
                                    repository.additionalName.slice(0, viewMode === "list" ? 5 : 2).map((name: any, idx) => (
                                        <Badge key={idx} variant="outline" className="text-xs">
                                            {name}
                                        </Badge>
                                    ))}
                            </div>
                            {isDeprecated && (
                                <div className="flex items-center mt-1 text-sm text-orange-600">
                                    <AlertTriangle className="w-4 h-4 mr-1" />
                                    <span className="font-sans">Deprecated</span>
                                </div>
                            )}
                        </CardTitle>

                        <CardDescription
                            className={`text-sm leading-relaxed ${viewMode === "list" ? "line-clamp-3" : "line-clamp-2"}`}>
                            {repository.description}
                        </CardDescription>

                        {/* Quick stats */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            {viewMode === "list" && repository.size && (
                                <div className="flex items-center gap-1  line-clamp-1">
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
                                    <span>{new Date(repository.startDate).toLocaleDateString("zh-CN")}</span>
                                </div>
                            )}
                        </div>
                        {viewMode === "grid" && (
                            <div className={`flex  gap-2 shrink-0  `}>
                                {
                                    repository.from?.sort((a, b) => {
                                        return (sourcePriority[b] || 3) - (sourcePriority[a] || 3)
                                    }).map((item) => (
                                        <Badge
                                            key={item}
                                            variant="outline"
                                            className={`text-xs font-medium ${getSourceInfo(item).color}`}>
                                            {getSourceInfo(item).label}
                                        </Badge>
                                    ))
                                }
                            </div>
                        )}
                        {/* Subject tags */}
                        <div
                            className={`flex gap-2  ${viewMode === "list" ? "flex-wrap" : "flex-nowrap flex-col"}`}>
                            {repository.subject?.slice(0, viewMode === "list" ? 5 : 2).map((subject: any, idx) => {
                                const subjectValue = typeof subject === 'string' ? subject :
                                    (subject as any)?.value || String(subject)
                                return (
                                    <Badge
                                        key={idx}
                                        variant={"secondary"}
                                        className="text-xs w-fit bg-secondary/50  text-secondary-foreground hover:bg-secondary/90 transition-colors"
                                    >
                                        <Tag className="h-3 w-3 mr-1" />
                                        {subjectValue}
                                    </Badge>
                                )
                            })}

                            {viewMode === "list" && repository.subject && repository.subject.length > (viewMode === "list" ? 5 : 2) && (
                                <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                                    +{repository.subject.length - (viewMode === "list" ? 5 : 2)} 更多
                                </Badge>
                            )}

                        </div>
                    </div>

                    {/* Action buttons */}
                    {viewMode === "list" &&
                        <div className={`flex  gap-2 shrink-0  `}>
                            {
                                repository.from?.sort((a, b) => {
                                    return (sourcePriority[b] || 3) - (sourcePriority[a] || 3)
                                }).map((item) => (
                                    <Badge
                                        key={item}
                                        variant="outline"
                                        className={`text-xs font-medium ${getSourceInfo(item).color}`}>
                                        {getSourceInfo(item).label}
                                    </Badge>
                                ))
                            }
                        </div>
                    }
                </div>
            </CardHeader>

            {expanded && (
                <CardContent className="pt-0 space-y-4">
                    <Separator className="bg-border/50" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Institution info */}
                        {repository.institution && repository.institution.length > 0 && (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Building className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium text-card-foreground">关联机构</span>
                                </div>
                                <div className="space-y-2">
                                    {repository.institution.slice(0, 3).map((inst: any, index: number) => (
                                        <div key={index} className="flex items-center gap-2 text-sm">
                                            <MapPin className="h-3 w-3 text-muted-foreground" />
                                            <span className="text-muted-foreground">
                                                {inst.institutionName}
                                                {inst.institutionCountry &&
                                                    <span className="ml-1 text-xs">({inst.institutionCountry})</span>}
                      </span>
                                        </div>
                                    ))}
                                    {repository.institution.length > 3 && (
                                        <div className="text-xs text-muted-foreground">
                                            还有 {repository.institution.length - 3} 个机构...
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Content types */}
                        {repository.contentType && repository.contentType.length > 0 && (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Database className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium text-card-foreground">内容类型</span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {repository.contentType.slice(0, 4).map((type: any) => (
                                        <Badge
                                            key={type}
                                            variant="outline"
                                            className="text-xs border-border text-muted-foreground bg-background/50"
                                        >
                                            {type}
                                        </Badge>
                                    ))}
                                    {repository.contentType.length > 4 && (
                                        <Badge variant="outline"
                                               className="text-xs border-border text-muted-foreground">
                                            +{repository.contentType.length - 4}
                                        </Badge>
                                    )}
                                </div>

                            </div>
                        )}
                        <div className="flex items-center text-xs pt-2 font-sans">
                            <Calendar className="w-3 h-3 mr-1" />
                            Last
                            updated: {repository.lastUpdate ? new Date(repository.lastUpdate).toLocaleDateString("zh-CN") : "Unknown"}
                        </div>
                    </div>
                </CardContent>
            )}

            {/* Footer actions */}
            <div className="px-6 pb-4">
                <div className="flex justify-between items-center">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation()
                            repository.id && onViewDetail(repository.id)
                        }}
                        className="border-border   text-card-foreground hover:bg-accent"
                    >
                        查看详情
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation()
                            repository.id && onToggle(repository.id)
                        }}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        {expanded ? (
                            <>
                                <ChevronUp className="h-4 w-4 mr-1" />
                                收起
                            </>
                        ) : (
                            <>
                                <ChevronDown className="h-4 w-4 mr-1" />
                                展开
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </Card>
    )
}
