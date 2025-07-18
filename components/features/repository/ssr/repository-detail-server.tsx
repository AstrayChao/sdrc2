// components/features/repository/repository-detail-server.tsx
import {
    AlertTriangle,
    Building,
    Calendar,
    Database,
    Flag,
    Globe,
    Key,
    Library,
    MapPin,
    Shield,
    ShieldCheck,
    Signature,
    Tag,
    Users,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Repository } from '@/types/repository'
import { getSourceInfo, sourcePriority } from '@/lib/data/real-data'
import { RelatedRepositories } from './related-repositories'
import { ExternalLinkButton } from "@/components/ExternalLinkButton"

interface RepositoryDetailServerProps {
    repository: Repository
    relatedRepositories?: Repository[]
}

export function RepositoryDetailServer({
                                           repository,
                                           relatedRepositories = []
                                       }: RepositoryDetailServerProps) {
    const isDeprecated = repository.deprecationReason !== undefined
    const isOpenAccess = repository.dataAccess?.some((access) => access.dataAccessType === 'open')

    return (
        <div className="space-y-6">
            {/* 主要信息卡片 */}
            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-sm">
                <CardHeader>
                    <div className="flex items-start gap-6">
                        <div className="flex-1 space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                                    {repository.repositoryName}
                                </h1>

                                {repository.additionalName && repository.additionalName.length > 0 && (
                                    <p className="text-muted-foreground">
                                        别名: {repository.additionalName.join(', ')}
                                    </p>
                                )}
                            </div>

                            {isDeprecated && (
                                <div
                                    className="flex items-center mb-4 p-3 rounded-lg text-orange-600 bg-orange-50 dark:bg-orange-950/20">
                                    <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
                                    <div>
                                        <div className="text-sm font-semibold">该库已不再维护</div>
                                        <div className="text-sm">{repository.deprecationReason}</div>
                                    </div>
                                </div>
                            )}

                            <p className="text-base leading-relaxed text-muted-foreground">
                                {repository.description}
                            </p>

                            {/* 快速统计 */}
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                                {repository.size && (
                                    <div className="flex items-center gap-2">
                                        <Database className="h-4 w-4" />
                                        <span>{repository.size.value}</span>
                                    </div>
                                )}

                                {repository.institution && repository.institution.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        <Building className="h-4 w-4" />
                                        <span>{repository.institution.length} 个机构</span>
                                    </div>
                                )}

                                {repository.startDate && (
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>创建于 {new Date(repository.startDate).toLocaleDateString('zh-CN')}</span>
                                    </div>
                                )}

                                {repository.lastUpdate && (
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>更新于 {new Date(repository.lastUpdate).toLocaleDateString('zh-CN')}</span>
                                    </div>
                                )}

                                <div className="flex items-center gap-2">
                                    <Signature className="h-4 w-4" />
                                    <div className="flex flex-wrap gap-2">
                                        平台标识
                                        {repository.repositoryIdentifier?.map((identifier) => (
                                            <Badge
                                                key={identifier}
                                                variant="outline"
                                                className="font-mono text-xs px-2 py-0.5 border-border bg-muted/50"
                                            >
                                                {identifier}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* 详细信息标签页 */}
            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5 bg-accent/60">
                    <TabsTrigger value="overview">概览</TabsTrigger>
                    <TabsTrigger value="institutions">机构信息</TabsTrigger>
                    <TabsTrigger value="access">数据访问</TabsTrigger>
                    <TabsTrigger value="technical">技术信息</TabsTrigger>
                    <TabsTrigger value="standards">标准规范</TabsTrigger>
                </TabsList>

                {/* 概览标签内容 */}
                <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
                        {/* 左侧内容 */}
                        <div className="space-y-6">
                            {/* 学科领域 */}
                            <Card className="shadow-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-lg">
                                        <Library className="w-5 h-5 mr-3 text-primary" />
                                        学科领域
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {repository.subject?.map((subject, idx) => (
                                            <Badge
                                                key={idx}
                                                className="text-sm py-1.5 px-3 font-medium bg-primary/90 text-primary-foreground hover:bg-primary"
                                            >
                                                {subject}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* 资源类型 */}
                            {repository.contentType && repository.contentType.length > 0 && (
                                <Card className="shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-lg">
                                            <Database className="w-5 h-5 mr-3 text-primary" />
                                            资源类型
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {repository.contentType.map((type, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center p-3 rounded-lg bg-green-50/50 dark:bg-green-950/20 border border-green-200/50 dark:border-green-800/30"
                                                >
                                                    <div className="w-2 h-2 rounded-full mr-3 bg-green-500" />
                                                    <span className="text-sm font-medium text-foreground">{type}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* 关键词 */}
                            {repository.keyword && repository.keyword.length > 0 && (
                                <Card className="shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-lg">
                                            <Tag className="w-5 h-5 mr-2 text-primary" />
                                            关键词
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {repository.keyword.map((keyword, idx) => (
                                                <Badge
                                                    key={idx}
                                                    variant="outline"
                                                    className="text-sm font-normal px-3 py-1 border-border bg-purple-50/50 dark:bg-purple-950/20 text-foreground"
                                                >
                                                    {keyword}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* 右侧边栏 */}
                        <div className="space-y-6">
                            {/* 数据库信息 */}
                            <Card className="shadow-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-lg">
                                        <Globe className="w-5 h-5 mr-3 text-primary" />
                                        数据库信息
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">数据来源</span>
                                        <div className="flex gap-1">
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
                                    </div>

                                    {/* 其他信息项继续... */}
                                </CardContent>
                            </Card>

                            {/* 认证信息 */}
                            {repository.certificate && repository.certificate.length > 0 && (
                                <Card className="shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-lg font-semibold">
                                            <Shield className="w-5 h-5 mr-2 text-primary" />
                                            认证与收录
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {repository.certificate.map((cert, idx) => (
                                                <div key={idx} className="flex items-center">
                                                    <ShieldCheck
                                                        className="w-4 h-4 mr-3 text-primary/80 flex-shrink-0" />
                                                    <span className="text-sm text-foreground">{cert}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>

                    {/* 相关仓库推荐 */}
                    {relatedRepositories.length > 0 && (
                        <RelatedRepositories repositories={relatedRepositories} />
                    )}
                </TabsContent>
                <TabsContent value="institutions" className="space-y-6">
                    {repository.institution && repository.institution.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {repository.institution.map((institution, index) => (
                                <Card key={index} className="bg-card/50 backdrop-blur-sm border-border shadow-sm">
                                    <CardHeader>
                                        <CardTitle
                                            className="flex items-center text-lg font-semibold text-card-foreground">
                                            <Building className="h-5 w-5 mr-2 text-primary" />
                                            {institution.institutionName}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {institution.institutionCountry && (
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <span
                                                    className="text-sm font-medium text-card-foreground">国家:</span>
                                                <span className="text-sm text-muted-foreground">
                                                        {institution.institutionCountry}
                                                    </span>
                                            </div>
                                        )}

                                        {institution.institutionType && (
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-muted-foreground" />
                                                <span
                                                    className="text-sm font-medium text-card-foreground">类型:</span>
                                                <span className="text-sm text-muted-foreground">
                                                        {institution.institutionType}
                                                    </span>
                                            </div>
                                        )}

                                        <div
                                            className="flex flex-col space-y-2 sm:flex-row sm:items-start sm:space-y-0 sm:gap-2">
                                            <div className="flex items-center gap-2 min-w-fit">
                                                <Flag className="h-4 w-4 text-muted-foreground" />
                                                <span
                                                    className="text-sm font-medium text-card-foreground">职责:</span>
                                            </div>

                                            <div className="overflow-x-auto pb-1 sm:overflow-visible sm:pb-0">
                                                <div
                                                    className="inline-flex items-center  gap-2 whitespace-nowrap">
                                                    {institution.responsibilityType?.map((resp) => (
                                                        <Badge
                                                            key={resp}
                                                            variant="outline"
                                                            className="text-xs font-normal border-border text-muted-foreground shrink-0"
                                                        >
                                                            {resp}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="bg-card/50 backdrop-blur-sm border-border shadow-sm">
                            <CardContent className="text-center py-12">
                                <Building className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                                <p className="text-base text-muted-foreground">暂无机构信息</p>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>
                <TabsContent value="access" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Data Access */}
                        {repository.dataAccess && repository.dataAccess.length > 0 && (
                            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-sm">
                                <CardHeader>
                                    <CardTitle
                                        className="flex items-center text-lg font-semibold text-card-foreground">
                                        <Globe className="h-5 w-5 mr-2 text-primary" />
                                        数据访问
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {repository.dataAccess.map((access, index) => (
                                        <div key={index} className="py-3 border-b border-muted last:border-0">
                                            <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium capitalize text-foreground">
                                                        {access.dataAccessType}
                                                    </span>
                                                {access.dataAccessType === "open" ? (
                                                    <Badge variant="outline"
                                                           className="bg-green-100 dark:bg-green-950/50 text-green-800 dark:text-green-400 border-green-200">
                                                        开放访问
                                                    </Badge>
                                                ) : access.dataAccessType === "restricted" ? (
                                                    <Badge variant="outline"
                                                           className="bg-orange-100 dark:bg-orange-950/50 text-orange-800 dark:text-orange-400 border-orange-200">
                                                        限制访问
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline"
                                                           className="bg-gray-100 dark:bg-gray-950/50 text-gray-800 dark:text-gray-400 border-gray-200">
                                                        不公开
                                                    </Badge>
                                                )}
                                            </div>

                                            {access.dataAccessRestriction && access.dataAccessRestriction.length > 0 && (
                                                <div className="mt-3">
                                                    <p className="text-sm font-medium text-card-foreground mb-2">访问限制:</p>
                                                    <ul className="text-sm text-muted-foreground space-y-1.5 pl-4">
                                                        {access.dataAccessRestriction.map((restriction, idx) => (
                                                            <li key={idx} className="flex items-start">
                                                                    <span
                                                                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-1.5 mr-2 shrink-0" />
                                                                <span
                                                                    className="leading-relaxed">{restriction}</span>
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

                        {repository.dataLicense && repository.dataLicense.length > 0 && (
                            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-sm">
                                <CardHeader>
                                    <CardTitle
                                        className="flex items-center text-lg font-semibold text-card-foreground">
                                        <Shield className="h-5 w-5 mr-2 text-primary" />
                                        数据访问凭证
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 flex flex-col items-start">
                                    {repository.dataLicense.map((license, index) => (
                                        <ExternalLinkButton
                                            key={index}
                                            url={license.dataLicenseURL || ""}
                                            className="text-sm font-medium"
                                            variant="link"
                                        >
                                            {license.dataLicenseName}
                                        </ExternalLinkButton>
                                    ))}
                                </CardContent>
                            </Card>
                        )}

                        {repository.dataUpload && repository.dataUpload.length > 0 && (
                            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-sm">
                                <CardHeader>
                                    <CardTitle
                                        className="flex items-center text-lg font-semibold text-card-foreground">
                                        <Globe className="h-5 w-5 mr-2 text-primary" />
                                        数据上传
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {repository.dataUpload.map((upload, index) => (
                                        <div key={index} className="py-3 border-b border-muted last:border-0">
                                            <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium capitalize text-foreground">
                                                        {upload.dataUploadType}
                                                    </span>
                                                {upload.dataUploadType === "open" ? (
                                                    <Badge variant="outline"
                                                           className="bg-green-100 dark:bg-green-950/50 text-green-800 dark:text-green-400 border-green-200">
                                                        开放访问
                                                    </Badge>
                                                ) : upload.dataUploadType === "restricted" ? (
                                                    <Badge variant="outline"
                                                           className="bg-orange-100 dark:bg-orange-950/50 text-orange-800 dark:text-orange-400 border-orange-200">
                                                        限制访问
                                                    </Badge>
                                                ) : upload.dataUploadType === "closed" ? (
                                                    <Badge variant="outline"
                                                           className="bg-gray-100 dark:bg-gray-950/50 text-gray-800 dark:text-gray-400 border-gray-200">
                                                        不公开
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline"
                                                           className="bg-green-100 dark:bg-green-950/50 text-green-800 dark:text-green-400 border-green-200">
                                                        未知
                                                    </Badge>
                                                )}
                                            </div>

                                            {upload.dataUploadRestriction && upload.dataUploadRestriction.length > 0 && (
                                                <div className="mt-3">
                                                    <p className="text-sm font-medium text-card-foreground mb-2">访问限制:</p>
                                                    <ul className="text-sm text-muted-foreground space-y-1.5 pl-4">
                                                        {upload.dataUploadRestriction.map((restriction, idx) => (
                                                            <li key={idx} className="flex items-start">
                                                                    <span
                                                                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-1.5 mr-2 shrink-0" />
                                                                <span
                                                                    className="leading-relaxed">{restriction}</span>
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

                        {repository.dataUploadLicense && repository.dataUploadLicense.length > 0 && (
                            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-sm">
                                <CardHeader>
                                    <CardTitle
                                        className="flex items-center text-lg font-semibold text-card-foreground">
                                        <Shield className="h-5 w-5 mr-2 text-primary" />
                                        数据上传凭证
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 flex flex-col items-start">
                                    {repository.dataUploadLicense.map((license, index) => (
                                        <ExternalLinkButton
                                            key={index}
                                            url={license.dataUploadLicenseURL || ""}
                                            className="text-sm font-medium"
                                            variant="link"
                                        >
                                            {license.dataUploadLicenseName}
                                        </ExternalLinkButton>
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
                            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-sm">
                                <CardHeader>
                                    <CardTitle
                                        className="flex items-center text-lg font-semibold text-card-foreground">
                                        <Key className="h-5 w-5 mr-2 text-primary" />
                                        API 接口
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {repository.api.map((api, index) => (
                                        <div key={index}
                                             className="p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/30">
                                            <div className="flex items-center justify-between">
                                                    <span
                                                        className="text-sm font-medium text-blue-800 dark:text-blue-400">
                                                        {api.apiType}
                                                    </span>
                                                <Badge variant="outline"
                                                       className="text-xs text-blue-800 dark:text-blue-400 border-none bg-transparent">
                                                    {api.value}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </TabsContent>
                <TabsContent value="standards" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="bg-card/50 backdrop-blur-sm border-border shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg font-semibold">
                                    <Library className="w-5 h-5 mr-3 text-primary" />
                                    元数据标准
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {repository.metadataStandard?.map((standard, index) => (
                                    <div key={index} className="py-2.5 border-b border-muted last:border-0">
                                        <ExternalLinkButton
                                            url={standard.metadataStandardURL || "#"}
                                            variant="link"
                                            className="p-0 h-auto text-sm font-medium hover:underline"
                                        >
                                            {standard.metadataStandardName}
                                        </ExternalLinkButton>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="bg-card/50 backdrop-blur-sm border-border shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg font-semibold">
                                    <Shield className="w-5 h-5 mr-3 text-primary" />
                                    数据库许可证
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {repository.databaseLicense?.map((license, index) => (
                                    <div key={index} className="py-2.5 border-b border-muted last:border-0">
                                        <ExternalLinkButton
                                            url={license.databaseLicenseURL || ""}
                                            variant="link"
                                            className="p-0 h-auto text-sm font-medium hover:underline"
                                        >
                                            {license.databaseLicenseName}
                                        </ExternalLinkButton>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="bg-card/50 backdrop-blur-sm border-border shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg font-semibold">
                                    <Shield className="w-5 h-5 mr-3 text-primary" />
                                    政策文档
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {repository.policy?.map((item, index) => (
                                    <div key={index} className="py-2 border-b border-muted last:border-0">
                                        <ExternalLinkButton
                                            url={item.policyURL}
                                            variant="link"
                                            className="p-0 h-auto text-sm font-medium hover:underline"
                                        >
                                            {item.policyName}
                                        </ExternalLinkButton>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                {/* 其他标签内容继续... */}
            </Tabs>
        </div>
    )
}