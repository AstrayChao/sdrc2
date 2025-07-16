// components/RealRepositoryDetail.tsx (服务端组件)
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
    Tag,
    Users,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Repository } from "@/types/repository"
import { getSourceInfo, sourcePriority } from "@/lib/data/real-data";
import { Separator } from "@/components/ui/separator";
import { ExternalLinkButton } from "@/components/ExternalLinkButton"
import { BackButton } from "@/components/BackButton"

interface RealRepositoryDetailProps {
    repository: Repository
}

export function RealRepositoryDetail({ repository }: RealRepositoryDetailProps) {
    return (
        <div className={"min-h-screen font-sans"}>
            <div className="max-w-7xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8 ">
                <div className="flex items-center gap-4 mb-8">
                    <BackButton />

                    <div className="flex items-center gap-2 ml-auto">
                        <ExternalLinkButton url={repository.url} />
                    </div>
                </div>

                {/* Description */}
                <Card className="bg-card/50 backdrop-blur-sm border-border">
                    <CardHeader>
                        <div className="flex items-start gap-6">
                            <div className="flex-1 space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold text-foreground">{repository.name}</h1>
                                    {repository.additionalNames && repository.additionalNames.length > 0 && (
                                        <p className="text-muted-foreground">别名: {repository.additionalNames.join(", ")}</p>
                                    )}
                                </div>
                                {repository.deprecationReason && (
                                    <div className="flex items-center mb-4 p-3 rounded-lg text-orange-600 bg-orange-50">
                                        <AlertTriangle className="w-5 h-5 mr-2" />
                                        <div>
                                            <div className="font-medium">
                                                该库已不再维护
                                            </div>
                                            <div className="text-sm">
                                                {repository.deprecationReason}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <p className="font-sans leading-relaxed text-muted-foreground ">{repository.description}</p>

                                {/* Quick Stats */}
                                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                    {repository.size && (
                                        <div className="flex items-center gap-2">
                                            <Database className="h-4 w-4" />
                                            <span>{repository.size}</span>
                                        </div>
                                    )}

                                    {repository.institutions && repository.institutions.length > 0 && (
                                        <div className="flex items-center gap-2">
                                            <Building className="h-4 w-4" />
                                            <span>{repository.institutions.length} 个机构</span>
                                        </div>
                                    )}

                                    {repository.startDate && (
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>创建于 {new Date(repository.startDate).toLocaleDateString("zh-CN")}</span>
                                        </div>
                                    )}

                                    {repository.lastUpdate && (
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>更新于 {new Date(repository.lastUpdate).toLocaleDateString("zh-CN")}</span>
                                        </div>
                                    )}
                                </div>
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

                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-3 space-x-6 ">
                            <div className="lg:col-span-2 space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-center text-xl ">
                                            <Library className="w-5 h-5 mr-3 text-primary " />
                                            学科领域
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-3">
                                            {repository.subjects?.map((subject, idx) => (
                                                <Badge
                                                    key={idx}
                                                    className="text-sm py-2 px-4 border-border bg-primary/80 text-primary-foreground ">
                                                    {subject}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Content Types */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-xl">
                                            <Database className="w-5 h-5 mr-3 text-primary" />
                                            资源类型
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {repository.contentTypes?.map((type, idx) => (
                                                <div key={type}
                                                     className="flex items-center p-3 rounded-lg bg-green-50/40 border border-green-500/10"
                                                >
                                                    <div className="w-2 h-2 rounded-full mr-3 bg-green-500/80" />
                                                    <span className="text-sm text-card-foreground">{type}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {repository.keywords && repository.keywords?.length > 0 && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center text-xl">
                                                <Tag className="w-5 h-5 mr-3 text-primary" />
                                                关键词
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex flex-wrap gap-2">
                                                {repository.keywords.map((keyword, idx) => (
                                                    <Badge key={idx}
                                                           variant="outline"
                                                           className="text-sm font-normal border-border bg-purple-50/80">
                                                        {keyword}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>

                            {/*Sidebar*/}
                            <div className="space-y-6">
                                {/* Repository Stats */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-lg">
                                            <Globe className="w-5 h-5 mr-3 text-primary" />
                                            Repository Information
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">Data Source</span>
                                            <div className="flex gap-2">
                                                {repository.from?.sort((a, b) => {
                                                    return (sourcePriority[b] || 3) - (sourcePriority[a] || 3)
                                                }).map((item) => (
                                                    <Badge
                                                        key={item}
                                                        variant="outline"
                                                        className={`text-xs font-medium ${getSourceInfo(item).color}`}>
                                                        {getSourceInfo(item).label}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <Separator />

                                        {repository.repositoryIdentifier && repository.repositoryIdentifier.length > 0 && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">数据仓库标识符</span>
                                                <div className="flex flex-col gap-2">
                                                    {repository.repositoryIdentifier.map((identifier) => (
                                                        <div key={identifier} className="text-xs font-medium ">
                                                            {identifier}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {repository.repositoryContact && repository.repositoryContact.length > 0 && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">Contact</span>
                                                <span
                                                    className="text-sm font-medium">{repository.repositoryContact.join(", ")}</span>
                                            </div>
                                        )}

                                        {repository.size && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">Repository Size</span>
                                                <span className="text-sm font-medium">{repository.size}</span>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">Subject Areas</span>
                                            <span
                                                className="text-sm font-medium">{repository.subjects?.length || 0}</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">Content Types</span>
                                            <span
                                                className="text-sm font-medium">{repository.contentTypes?.length || 0}</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">Institutions</span>
                                            <span
                                                className="text-sm font-medium">{repository.institutions?.length || 0}</span>
                                        </div>

                                        {repository.pidSystem && repository.pidSystem.length > 0 && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">PID System</span>
                                                <span
                                                    className="text-sm font-medium">{repository.pidSystem.join(", ")}</span>
                                            </div>
                                        )}

                                        {repository.aidSystem && repository.aidSystem.length > 0 && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">AuthorID System</span>
                                                <span
                                                    className="text-sm font-medium">{repository.aidSystem.join(", ")}</span>
                                            </div>
                                        )}

                                        {repository.qualityManagement && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">质量控制</span>
                                                <span className="text-sm font-medium">yes</span>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Certificates */}
                                {repository.certificates && repository.certificates?.length > 0 && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center text-lg">
                                                <Shield className="w-5 h-5 mr-3 text-primary" />
                                                认证与收录
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-3">
                                                {repository.certificates.map((cert, idx) => (
                                                    <div key={idx} className="flex items-center ">
                                                        <ShieldCheck className="w-4 h-4 mr-3 text-primary/80" />
                                                        <span className="text-sm font-sans">{cert}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
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
                                                <div className={"flex items-start gap-2"}>
                                                    <Flag className="h-4 w-4 text-muted-foreground" />
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
                                            <div key={index} className="py-2 border-b border-muted last:border-0">
                                                <div className="flex items-center justify-between">
                                                    <span
                                                        className="font-medium capitalize">{access.dataAccessType}</span>
                                                    {access.dataAccessType === "open" ? (
                                                        <Badge variant="outline"
                                                               className="bg-green-100 text-green-800">
                                                            开放访问
                                                        </Badge>
                                                    ) : access.dataAccessType === "restricted" ? (
                                                        <Badge variant="outline"
                                                               className="bg-orange-100 text-orange-800">
                                                            限制访问
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="outline" className="bg-gray-100 text-gray-800">
                                                            不公开
                                                        </Badge>
                                                    )}
                                                </div>

                                                {access.dataAccessRestriction && access.dataAccessRestriction.length > 0 && (
                                                    <div className="mt-2">
                                                        <p className="text-sm font-medium text-card-foreground mb-1">访问限制:</p>
                                                        <ul className="text-sm text-muted-foreground space-y-1 pl-4">
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

                            {repository.dataLicense && repository.dataLicense.length > 0 && (
                                <Card className="bg-card/50 backdrop-blur-sm border-border">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-card-foreground">
                                            <Shield className="h-5 w-5 mr-3 text-primary" />
                                            数据访问凭证
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 flex flex-col items-start">
                                        {repository.dataLicense.map((license, index) => (
                                            <ExternalLinkButton
                                                key={index}
                                                url={license.dataLicenseURL || ""}
                                                className="text-sm"
                                                variant="link"
                                            >
                                                {license.dataLicenseName}
                                            </ExternalLinkButton>
                                        ))}
                                    </CardContent>
                                </Card>
                            )}

                            {repository.dataUpload && repository.dataUpload.length > 0 && (
                                <Card className="bg-card/50 backdrop-blur-sm border-border">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-card-foreground">
                                            <Globe className="h-5 w-5 mr-3 text-primary" />
                                            数据上传
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {repository.dataUpload.map((upload, index) => (
                                            <div key={index} className="py-2 border-b border-muted last:border-0">
                                                <div className="flex items-center justify-between">
                                                    <span
                                                        className="font-medium capitalize">{upload.dataUploadType}</span>
                                                    {upload.dataUploadType === "open" ? (
                                                        <Badge variant="outline"
                                                               className="bg-green-100 text-green-800">
                                                            开放访问
                                                        </Badge>
                                                    ) : upload.dataUploadType === "restricted" ? (
                                                        <Badge variant="outline"
                                                               className="bg-orange-100 text-orange-800">
                                                            限制访问
                                                        </Badge>
                                                    ) : upload.dataUploadType === "closed" ? (
                                                        <Badge variant="outline" className="bg-gray-100 text-gray-800">
                                                            不公开
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="outline"
                                                               className="bg-green-100 text-green-800">
                                                            未知
                                                        </Badge>
                                                    )}
                                                </div>

                                                {upload.dataUploadRestriction && upload.dataUploadRestriction.length > 0 && (
                                                    <div className="mt-2">
                                                        <p className="text-sm font-medium text-card-foreground mb-1">访问限制:</p>
                                                        <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                                                            {upload.dataUploadRestriction.map((restriction, idx) => (
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

                            {repository.dataUploadLicense && repository.dataUploadLicense.length > 0 && (
                                <Card className="bg-card/50 backdrop-blur-sm border-border">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-card-foreground">
                                            <Shield className="h-5 w-5 mr-3 text-primary" />
                                            数据上传凭证
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 flex flex-col items-start">
                                        {repository.dataUploadLicense.map((license, index) => (
                                            <ExternalLinkButton
                                                key={index}
                                                url={license.dataUploadLicenseURL || ""}
                                                className="text-sm"
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
                                <Card className="bg-card/50 backdrop-blur-sm border-border">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-card-foreground">
                                            <Key className="h-5 w-5 mr-3 text-primary" />
                                            API 接口
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {repository.api.map((api, index) => (
                                            <div key={index}
                                                 className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium text-blue-800">{api.apiType}</span>
                                                    <Badge variant={"outline"}
                                                           className="text-xs text-blue-800 border-none">
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
                        <Card className="bg-card/50 backdrop-blur-sm border-border">
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                    <Library className="w-5 h-5 mr-3 text-primary" />
                                    元数据标准
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {repository.metadataStandard?.map((standard, index) => (
                                    <div key={index} className="py-2 border-b border-muted last:border-0">
                                        <ExternalLinkButton
                                            url={standard.metadataStandardURL}
                                            variant="link"
                                            className="p-0 h-auto font-medium"
                                        >
                                            {standard.metadataStandardName}
                                        </ExternalLinkButton>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="bg-card/50 backdrop-blur-sm border-border">
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                    <Shield className="w-5 h-5 mr-3 text-primary" />
                                    数据库许可证
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {repository.databaseLicense?.map((license, index) => (
                                    <div key={index} className="py-2 border-b border-muted last:border-0">
                                        <ExternalLinkButton
                                            url={license.databaseLicenseURL}
                                            variant="link"
                                            className="p-0 h-auto font-medium"
                                        >
                                            {license.databaseLicenseName}
                                        </ExternalLinkButton>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="bg-card/50 backdrop-blur-sm border-border">
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg">
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
                                            className="p-0 h-auto font-medium"
                                        >
                                            {item.policyName}
                                        </ExternalLinkButton>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}