"use client"

import {
    ArrowLeft,
    Building,
    Calendar,
    Database,
    ExternalLink,
    Globe,
    Key,
    MapPin,
    Shield,
    Tag,
    Users,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Repository } from "@/types/repository"
import { getSourceInfo } from "@/lib/data/real-data";

interface RealRepositoryDetailProps {
    repository: Repository
    onBack: () => void
}

export function RealRepositoryDetail({ repository, onBack }: RealRepositoryDetailProps) {


    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onBack}
                    className="border-border text-foreground bg-transparent hover:bg-accent"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    返回目录
                </Button>
                <div className="flex-1">
                    <h1 className="text-4xl font-bold text-foreground mb-2">{repository.name}</h1>

                    {repository.additionalNames && repository.additionalNames.length > 0 && (
                        <p className="text-lg text-muted-foreground mb-2">{repository.additionalNames.join(", ")}</p>
                    )}
                    <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                            {
                                repository.from.map((source) => (
                                    <Badge key={source} variant="outline" className={getSourceInfo(source).color}>
                                        {getSourceInfo(source).label}
                                    </Badge>
                                ))
                            }
                            {repository.dataAccess?.some((access) => access.dataAccessType === "open") && (
                                <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                                    <Globe className="h-3 w-3 mr-1" />
                                    开放访问
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button
                        onClick={() => window.open(repository.url, "_blank")}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        访问仓库
                    </Button>
                </div>
            </div>

            {/* Description */}
            <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="pt-6">
                    <p className="text-lg leading-relaxed text-card-foreground">{repository.description}</p>
                </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {repository.size && (
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center">
                                <Database className="h-10 w-10 mr-4 text-blue-600" />
                                <div>
                                    <p className="text-2xl font-bold text-blue-900">{repository.size}</p>
                                    <p className="text-sm text-blue-700">仓库大小</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {repository.startDate && (
                    <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center">
                                <Calendar className="h-10 w-10 mr-4 text-green-600" />
                                <div>
                                    <p className="text-2xl font-bold text-green-900">{new Date(repository.startDate).getFullYear()}</p>
                                    <p className="text-sm text-green-700">建立时间</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {repository.institutions && repository.institutions.length > 0 && (
                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center">
                                <Building className="h-10 w-10 mr-4 text-purple-600" />
                                <div>
                                    <p className="text-2xl font-bold text-purple-900">{repository.institutions.length}</p>
                                    <p className="text-sm text-purple-700">关联机构</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {repository.api && repository.api.length > 0 && (
                    <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center">
                                <Key className="h-10 w-10 mr-4 text-orange-600" />
                                <div>
                                    <p className="text-2xl font-bold text-orange-900">{repository.api.length}</p>
                                    <p className="text-sm text-orange-700">API 接口</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Detailed Information Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur-sm">
                    <TabsTrigger value="overview">概览</TabsTrigger>
                    <TabsTrigger value="institutions">机构信息</TabsTrigger>
                    <TabsTrigger value="access">数据访问</TabsTrigger>
                    <TabsTrigger value="technical">技术信息</TabsTrigger>
                    <TabsTrigger value="metadata">元数据</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Subjects */}
                        {repository.subjects && repository.subjects.length > 0 && (
                            <Card className="bg-card/50 backdrop-blur-sm border-border">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-card-foreground">
                                        <Tag className="h-5 w-5 mr-3 text-primary" />
                                        学科领域
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {repository.subjects.map((subject) => (
                                            <Badge
                                                key={subject}
                                                variant="secondary"
                                                className="bg-secondary/50 text-secondary-foreground hover:bg-secondary/70 transition-colors"
                                            >
                                                {subject}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Content Types */}
                        {repository.contentTypes && repository.contentTypes.length > 0 && (
                            <Card className="bg-card/50 backdrop-blur-sm border-border">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-card-foreground">
                                        <Database className="h-5 w-5 mr-3 text-primary" />
                                        内容类型
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {repository.contentTypes.map((type) => (
                                            <div
                                                key={type}
                                                className="flex items-center p-3 rounded-lg bg-primary/5 border border-primary/10"
                                            >
                                                <div className="w-2 h-2 rounded-full mr-3 bg-primary" />
                                                <span className="text-card-foreground">{type}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="institutions" className="space-y-6">
                    {repository.institutions && repository.institutions.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {repository.institutions.map((institution, index) => (
                                <Card key={index} className="bg-card/50 backdrop-blur-sm border-border">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-card-foreground">
                                            <Building className="h-5 w-5 mr-3 text-primary" />
                                            {institution.institutionName}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {institution.institutionCountry && (
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-medium text-card-foreground">国家:</span>
                                                <span
                                                    className="text-muted-foreground">{institution.institutionCountry}</span>
                                            </div>
                                        )}

                                        {institution.institutionType && (
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-medium text-card-foreground">类型:</span>
                                                <span
                                                    className="text-muted-foreground">{institution.institutionType}</span>
                                            </div>
                                        )}

                                        {institution.responsibilityType && institution.responsibilityType.length > 0 && (
                                            <div>
                                                <span
                                                    className="font-medium text-card-foreground block mb-2">职责:</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {institution.responsibilityType.map((resp) => (
                                                        <Badge key={resp} variant="outline"
                                                               className="text-xs border-border text-muted-foreground">
                                                            {resp}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="bg-card/50 backdrop-blur-sm border-border">
                            <CardContent className="text-center py-12">
                                <Building className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                                <p className="text-muted-foreground">暂无机构信息</p>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                <TabsContent value="access" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Data Access */}
                        {repository.dataAccess && repository.dataAccess.length > 0 && (
                            <Card className="bg-card/50 backdrop-blur-sm border-border">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-card-foreground">
                                        <Globe className="h-5 w-5 mr-3 text-primary" />
                                        数据访问
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {repository.dataAccess.map((access, index) => (
                                        <div key={index}
                                             className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                                            <div className="flex items-center mb-3">
                                                <Badge
                                                    variant={access.dataAccessType === "open" ? "default" : "secondary"}
                                                    className={
                                                        access.dataAccessType === "open"
                                                            ? "bg-green-100 text-green-800 border-green-200"
                                                            : "bg-yellow-100 text-yellow-800 border-yellow-200"
                                                    }
                                                >
                                                    {access.dataAccessType === "open"
                                                        ? "开放访问"
                                                        : access.dataAccessType === "restricted"
                                                            ? "受限访问"
                                                            : access.dataAccessType}
                                                </Badge>
                                            </div>
                                            {access.dataAccessRestriction && access.dataAccessRestriction.length > 0 && (
                                                <div>
                                                    <p className="text-sm font-medium text-card-foreground mb-2">访问限制:</p>
                                                    <ul className="text-sm text-muted-foreground space-y-1">
                                                        {access.dataAccessRestriction.map((restriction, idx) => (
                                                            <li key={idx} className="flex items-start">
                                                                <span
                                                                    className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 mr-2 shrink-0" />
                                                                {restriction}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}

                        {/* Certificates */}
                        {repository.certificates && repository.certificates.length > 0 && (
                            <Card className="bg-card/50 backdrop-blur-sm border-border">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-card-foreground">
                                        <Shield className="h-5 w-5 mr-3 text-primary" />
                                        认证信息
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {repository.certificates.map((cert, index) => (
                                        <div key={index}
                                             className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                                            <div className="flex items-center">
                                                <Shield className="h-4 w-4 mr-2 text-emerald-600" />
                                                <span className="font-medium text-emerald-800">{cert}</span>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="technical" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* APIs */}
                        {repository.api && repository.api.length > 0 && (
                            <Card className="bg-card/50 backdrop-blur-sm border-border">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-card-foreground">
                                        <Key className="h-5 w-5 mr-3 text-primary" />
                                        API 接口
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {repository.api.map((api, index) => (
                                        <div key={index} className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-blue-800">{api.apiType}</span>
                                                <Badge variant="outline"
                                                       className="text-xs border-blue-300 text-blue-700">
                                                    API
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="metadata" className="space-y-6">
                    <Card className="bg-card/50 backdrop-blur-sm border-border">
                        <CardHeader>
                            <CardTitle className="text-card-foreground">元数据信息</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <span className="font-medium text-card-foreground">仓库 ID:</span>
                                        <p className="text-muted-foreground font-mono text-sm mt-1">{repository.id}</p>
                                    </div>

                                    {repository.startDate && (
                                        <div>
                                            <span className="font-medium text-card-foreground">建立时间:</span>
                                            <p className="text-muted-foreground mt-1">
                                                {new Date(repository.startDate).toLocaleDateString("zh-CN", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    )}

                                    {repository.lastUpdate && (
                                        <div>
                                            <span className="font-medium text-card-foreground">最后更新:</span>
                                            <p className="text-muted-foreground mt-1">
                                                {new Date(repository.lastUpdate).toLocaleDateString("zh-CN", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <span className="font-medium text-card-foreground">数据源:</span>
                                        <div className="mt-2">
                                            {
                                                repository.from.map((source, index) => (
                                                    <Badge key={index} variant="outline"
                                                           className={`text-xs font-medium ${getSourceInfo(source)}`}>
                                                        {source}
                                                    </Badge>
                                                ))
                                            }
                                        </div>
                                    </div>

                                    <div>
                                        <span className="font-medium text-card-foreground">访问地址:</span>
                                        <div className="mt-1">
                                            <Button
                                                variant="link"
                                                className="p-0 h-auto text-primary hover:text-primary/80"
                                                onClick={() => window.open(repository.url, "_blank")}
                                            >
                                                <ExternalLink className="h-3 w-3 mr-1" />
                                                {repository.url}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
