"use client"

import { useState } from "react"
import { Building, Calendar, ChevronDown, ChevronUp, Database, ExternalLink, Globe, MapPin, Tag, } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Repository } from "@/types/repository"
import { getSourceInfo, sourcePriority } from "@/lib/data/real-data";

interface RealRepositoryCardProps {
    repository: Repository
    expanded: boolean
    onToggle: (id: string) => void
    onViewDetail: (repository: Repository) => void
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


    return (
        <Card
            className={`group transition-all duration-300 hover:shadow-xl cursor-pointer border-2 bg-card/50 backdrop-blur-sm ${
                isHovered ? "border-primary/50 shadow-lg" : "border-border"
            } ${viewMode === "list" ? "flex-row" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardHeader className={`${viewMode === "list" ? "flex-1" : ""} pb-4`}>
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0 space-y-3">
                        {/* Header with source and status */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 flex-wrap">
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
                                {repository.dataAccess?.some((access) => access.dataAccessType === "open") && (
                                    <Badge variant="secondary"
                                           className="text-xs bg-green-50 text-green-700 border-green-200">
                                        <Globe className="h-3 w-3 mr-1" />
                                        开放访问
                                    </Badge>
                                )}
                            </div>

                        </div>

                        {/* Title and description */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors text-card-foreground line-clamp-2">
                                {repository.name}
                            </h3>

                            {repository.additionalNames && repository.additionalNames.length > 0 && (
                                <p className="text-sm text-muted-foreground">
                                    别名: {repository.additionalNames.slice(0, 2).join(", ")}
                                    {repository.additionalNames.length > 2 && "..."}
                                </p>
                            )}

                            <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">{repository.description}</p>
                        </div>

                        {/* Quick stats */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            {repository.size && (
                                <div className="flex items-center gap-1">
                                    <Database className="h-3 w-3" />
                                    <span>{repository.size}</span>
                                </div>
                            )}

                            {repository.institutions && repository.institutions.length > 0 && (
                                <div className="flex items-center gap-1">
                                    <Building className="h-3 w-3" />
                                    <span>{repository.institutions.length} 机构</span>
                                </div>
                            )}

                            {repository.lastUpdate && (
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{new Date(repository.lastUpdate).toLocaleDateString("zh-CN")}</span>
                                </div>
                            )}
                        </div>

                        {/* Subject tags */}
                        <div className="flex flex-wrap gap-2">
                            {repository.subjects?.slice(0, viewMode === "list" ? 5 : 3).map((subject) => (
                                <Badge
                                    key={subject}
                                    variant="secondary"
                                    className="text-xs bg-secondary/50 text-secondary-foreground hover:bg-secondary/70 transition-colors"
                                >
                                    <Tag className="h-3 w-3 mr-1" />
                                    {subject}
                                </Badge>
                            ))}
                            {repository.subjects && repository.subjects.length > (viewMode === "list" ? 5 : 3) && (
                                <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                                    +{repository.subjects.length - (viewMode === "list" ? 5 : 3)} 更多
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col gap-2 shrink-0">

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation()
                                window.open(repository.url, "_blank")
                            }}
                            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                        >
                            <ExternalLink className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>

            {/* Expanded content */}
            {expanded && (
                <CardContent className="pt-0 space-y-4">
                    <Separator className="bg-border/50" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Institution info */}
                        {repository.institutions && repository.institutions.length > 0 && (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Building className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium text-card-foreground">关联机构</span>
                                </div>
                                <div className="space-y-2">
                                    {repository.institutions.slice(0, 3).map((inst, index) => (
                                        <div key={index} className="flex items-center gap-2 text-sm">
                                            <MapPin className="h-3 w-3 text-muted-foreground" />
                                            <span className="text-muted-foreground">
                        {inst.institutionName}
                                                {inst.institutionCountry &&
                                                    <span className="ml-1 text-xs">({inst.institutionCountry})</span>}
                      </span>
                                        </div>
                                    ))}
                                    {repository.institutions.length > 3 && (
                                        <div className="text-xs text-muted-foreground">
                                            还有 {repository.institutions.length - 3} 个机构...
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Content types */}
                        {repository.contentTypes && repository.contentTypes.length > 0 && (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Database className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium text-card-foreground">内容类型</span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {repository.contentTypes.slice(0, 4).map((type) => (
                                        <Badge
                                            key={type}
                                            variant="outline"
                                            className="text-xs border-border text-muted-foreground bg-background/50"
                                        >
                                            {type}
                                        </Badge>
                                    ))}
                                    {repository.contentTypes.length > 4 && (
                                        <Badge variant="outline"
                                               className="text-xs border-border text-muted-foreground">
                                            +{repository.contentTypes.length - 4}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Data access info */}
                    {repository.dataAccess && repository.dataAccess.length > 0 && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/20">
                            <Globe className="h-4 w-4 text-primary" />
                            <div className="flex gap-2">
                                {repository.dataAccess.map((access, index) => (
                                    <Badge
                                        key={index}
                                        variant={access.dataAccessType === "open" ? "default" : "secondary"}
                                        className={`text-xs ${
                                            access.dataAccessType === "open"
                                                ? "bg-green-100 text-green-800 border-green-200"
                                                : "bg-yellow-100 text-yellow-800 border-yellow-200"
                                        }`}
                                    >
                                        {access.dataAccessType === "open"
                                            ? "开放访问"
                                            : access.dataAccessType === "restricted"
                                                ? "受限访问"
                                                : access.dataAccessType}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
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
                            onViewDetail(repository)
                        }}
                        className="border-border text-card-foreground hover:bg-accent"
                    >
                        查看详情
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation()
                            onToggle(repository.id)
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
