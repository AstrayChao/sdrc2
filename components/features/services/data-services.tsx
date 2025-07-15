"use client"

import { useState } from "react"
import { Check, Code, Copy, Database, FileText, Globe, Key } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function DataServices() {
    const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null)

    const apiEndpoints = [
        {
            id: "repositories",
            name: "获取仓库列表",
            method: "GET",
            endpoint: "/api/repositories",
            description: "获取所有科学数据仓库的列表，支持搜索和过滤",
            parameters: [
                { name: "q", type: "string", required: false, description: "搜索关键词" },
                { name: "page", type: "number", required: false, description: "页码，默认为1" },
                { name: "limit", type: "number", required: false, description: "每页数量，默认为20，最大100" },
                {
                    name: "source",
                    type: "string",
                    required: false,
                    description: "数据源：re3data, fairsharing, gcbr, all"
                },
                { name: "subjects", type: "string", required: false, description: "主题领域，用逗号分隔" },
            ],
            example: {
                request: "GET /api/repositories?q=genomics&page=1&limit=10&source=gcbr",
                response: {
                    repositories: [
                        {
                            id: "genbank",
                            name: "GenBank",
                            description: "GenBank是NIH遗传序列数据库...",
                            url: "https://www.ncbi.nlm.nih.gov/genbank/",
                            source: "gcbr",
                            subjects: ["基因组学", "遗传学", "生物信息学"],
                        },
                    ],
                    pagination: {
                        page: 1,
                        limit: 10,
                        total: 156,
                        totalPages: 16,
                    },
                },
            },
        },
        {
            id: "repository",
            name: "获取单个仓库详情",
            method: "GET",
            endpoint: "/api/repositories/{id}",
            description: "根据仓库ID获取详细信息",
            parameters: [{ name: "id", type: "string", required: true, description: "仓库唯一标识符" }],
            example: {
                request: "GET /api/repositories/genbank",
                response: {
                    id: "genbank",
                    name: "GenBank",
                    description: "GenBank是NIH遗传序列数据库，包含所有公开可用的DNA序列的注释集合。",
                    url: "https://www.ncbi.nlm.nih.gov/genbank/",
                    source: "gcbr",
                    subjects: ["基因组学", "遗传学", "生物信息学", "分子生物学"],
                    institutions: [
                        {
                            institutionName: "美国国家生物技术信息中心 (NCBI)",
                            institutionCountry: "USA",
                            coordinates: [39.0458, -76.9413],
                        },
                    ],
                    dataAccess: [{ dataAccessType: "open" }],
                    size: "> 4亿条序列",
                    lastUpdate: "2024-01-15",
                },
            },
        },
        {
            id: "stats",
            name: "获取统计数据",
            method: "GET",
            endpoint: "/api/stats",
            description: "获取仓库统计信息，包括主题分布、国家分布等",
            parameters: [],
            example: {
                request: "GET /api/stats",
                response: {
                    totalRepositories: 156,
                    subjectDistribution: [
                        { name: "基因组学", count: 45 },
                        { name: "生物信息学", count: 38 },
                    ],
                    countryDistribution: [
                        { name: "USA", count: 67 },
                        { name: "GBR", count: 34 },
                    ],
                    sourceDistribution: [
                        { name: "gcbr", count: 89 },
                        { name: "re3data", count: 45 },
                    ],
                },
            },
        },
    ]

    const sdkExamples = {
        javascript: `// 使用 fetch API
const response = await fetch('/api/repositories?q=genomics&limit=10');
const data = await response.json();
console.log(data.repositories);

// 使用 axios
import axios from 'axios';
const { data } = await axios.get('/api/repositories', {
  params: { q: 'genomics', limit: 10 }
});`,
        python: `# 使用 requests
import requests

response = requests.get('/api/repositories', params={
    'q': 'genomics',
    'limit': 10
})
data = response.json()
print(data['repositories'])

# 使用 httpx (异步)
import httpx

async with httpx.AsyncClient() as client:
    response = await client.get('/api/repositories', params={'q': 'genomics'})
    data = response.json()`,
        curl: `# 获取仓库列表
curl -X GET "/api/repositories?q=genomics&limit=10" \\
  -H "Accept: application/json"

# 获取单个仓库详情
curl -X GET "/api/repositories/genbank" \\
  -H "Accept: application/json"

# 获取统计数据
curl -X GET "/api/stats" \\
  -H "Accept: application/json"`,
    }

    const copyToClipboard = async (text: string, endpoint: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopiedEndpoint(endpoint)
            setTimeout(() => setCopiedEndpoint(null), 2000)
        } catch (err) {
            console.error("复制失败:", err)
        }
    }

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 text-foreground">数据服务</h1>
                <p className="text-lg max-w-3xl mx-auto leading-relaxed text-muted-foreground">
                    通过RESTful API接口获取科学数据仓库信息，支持多种编程语言和工具
                </p>
            </div>

            <Tabs defaultValue="endpoints" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="endpoints">API 接口</TabsTrigger>
                    <TabsTrigger value="examples">代码示例</TabsTrigger>
                    <TabsTrigger value="docs">使用文档</TabsTrigger>
                </TabsList>

                <TabsContent value="endpoints" className="space-y-6">
                    <div className="grid gap-6">
                        {apiEndpoints.map((endpoint) => (
                            <Card key={endpoint.id} className="bg-card border-border">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-card-foreground flex items-center gap-2">
                                            <Database className="h-5 w-5 text-primary" />
                                            {endpoint.name}
                                        </CardTitle>
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                variant={endpoint.method === "GET" ? "default" : "secondary"}
                                                className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                            >
                                                {endpoint.method}
                                            </Badge>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => copyToClipboard(endpoint.endpoint, endpoint.id)}
                                                className="border-border text-foreground"
                                            >
                                                {copiedEndpoint === endpoint.id ? <Check className="h-4 w-4" /> :
                                                    <Copy className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    </div>
                                    <code
                                        className="text-sm bg-muted px-2 py-1 rounded text-muted-foreground">{endpoint.endpoint}</code>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-muted-foreground">{endpoint.description}</p>

                                    {endpoint.parameters.length > 0 && (
                                        <div>
                                            <h4 className="font-medium mb-2 text-card-foreground">参数</h4>
                                            <div className="space-y-2">
                                                {endpoint.parameters.map((param) => (
                                                    <div key={param.name} className="flex items-start gap-4 text-sm">
                                                        <code
                                                            className="bg-muted px-2 py-1 rounded text-primary font-mono">{param.name}</code>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <Badge variant="outline"
                                                                       className="text-xs border-border">
                                                                    {param.type}
                                                                </Badge>
                                                                {param.required && (
                                                                    <Badge variant="destructive" className="text-xs">
                                                                        必需
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <p className="text-muted-foreground mt-1">{param.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <h4 className="font-medium mb-2 text-card-foreground">示例</h4>
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground mb-1">请求</p>
                                                <code
                                                    className="block bg-muted p-3 rounded text-sm text-muted-foreground font-mono">
                                                    {endpoint.example.request}
                                                </code>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground mb-1">响应</p>
                                                <pre
                                                    className="bg-muted p-3 rounded text-sm text-muted-foreground font-mono overflow-x-auto">
                          {JSON.stringify(endpoint.example.response, null, 2)}
                        </pre>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="examples" className="space-y-6">
                    <div className="grid gap-6">
                        <Card className="bg-card border-border">
                            <CardHeader>
                                <CardTitle className="text-card-foreground flex items-center gap-2">
                                    <Code className="h-5 w-5 text-primary" />
                                    JavaScript / TypeScript
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                <pre className="bg-muted p-4 rounded text-sm text-muted-foreground font-mono overflow-x-auto">
                  {sdkExamples.javascript}
                </pre>
                            </CardContent>
                        </Card>

                        <Card className="bg-card border-border">
                            <CardHeader>
                                <CardTitle className="text-card-foreground flex items-center gap-2">
                                    <Code className="h-5 w-5 text-primary" />
                                    Python
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                <pre className="bg-muted p-4 rounded text-sm text-muted-foreground font-mono overflow-x-auto">
                  {sdkExamples.python}
                </pre>
                            </CardContent>
                        </Card>

                        <Card className="bg-card border-border">
                            <CardHeader>
                                <CardTitle className="text-card-foreground flex items-center gap-2">
                                    <Code className="h-5 w-5 text-primary" />
                                    cURL
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                <pre className="bg-muted p-4 rounded text-sm text-muted-foreground font-mono overflow-x-auto">
                  {sdkExamples.curl}
                </pre>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="docs" className="space-y-6">
                    <div className="grid gap-6">
                        <Card className="bg-card border-border">
                            <CardHeader>
                                <CardTitle className="text-card-foreground flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-primary" />
                                    快速开始
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="font-medium mb-2 text-card-foreground">1. 基础URL</h4>
                                    <code
                                        className="bg-muted px-2 py-1 rounded text-muted-foreground">https://your-domain.com/api</code>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2 text-card-foreground">2. 认证</h4>
                                    <p className="text-muted-foreground">当前API为公开接口，无需认证。未来可能会添加API密钥认证。</p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2 text-card-foreground">3. 响应格式</h4>
                                    <p className="text-muted-foreground">所有响应均为JSON格式，包含数据和元信息。</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-card border-border">
                            <CardHeader>
                                <CardTitle className="text-card-foreground flex items-center gap-2">
                                    <Globe className="h-5 w-5 text-primary" />
                                    错误处理
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="font-medium mb-2 text-card-foreground">HTTP状态码</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <code className="bg-green-100 text-green-800 px-2 py-1 rounded">200</code>
                                            <span className="text-muted-foreground">请求成功</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <code className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">400</code>
                                            <span className="text-muted-foreground">请求参数错误</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <code className="bg-red-100 text-red-800 px-2 py-1 rounded">404</code>
                                            <span className="text-muted-foreground">资源不存在</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <code className="bg-red-100 text-red-800 px-2 py-1 rounded">500</code>
                                            <span className="text-muted-foreground">服务器内部错误</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2 text-card-foreground">错误响应格式</h4>
                                    <pre className="bg-muted p-3 rounded text-sm text-muted-foreground font-mono">
                    {JSON.stringify(
                        {
                            error: "Invalid parameters",
                            details: [
                                {
                                    field: "limit",
                                    message: "必须是1到100之间的数字",
                                },
                            ],
                        },
                        null,
                        2,
                    )}
                  </pre>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-card border-border">
                            <CardHeader>
                                <CardTitle className="text-card-foreground flex items-center gap-2">
                                    <Key className="h-5 w-5 text-primary" />
                                    限制和配额
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Alert>
                                    <AlertDescription>
                                        当前API无访问限制。为了保证服务质量，建议合理使用API，避免过于频繁的请求。
                                        未来可能会实施速率限制。
                                    </AlertDescription>
                                </Alert>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
