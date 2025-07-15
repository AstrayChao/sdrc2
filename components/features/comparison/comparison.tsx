"use client"

import React, { useEffect, useState } from "react"
import { Check, GitCompare, Minus, Plus, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getProcessedRepositories } from "@/lib/data/real-data"
import type { Repository } from "@/types/repository"

export function Comparison() {
    const [repositories, setRepositories] = useState<Repository[]>([])
    const [selectedRepositories, setSelectedRepositories] = useState<Repository[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredRepositories, setFilteredRepositories] = useState<Repository[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = getProcessedRepositories()
                setRepositories(data)
                setFilteredRepositories(data.slice(0, 10)) // 默认显示前10个
            } catch (error) {
                console.error("加载数据失败:", error)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    useEffect(() => {
        if (searchTerm) {
            const filtered = repositories
                .filter(
                    (repo) =>
                        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        repo.description.toLowerCase().includes(searchTerm.toLowerCase()),
                )
                .slice(0, 10)
            setFilteredRepositories(filtered)
        } else {
            setFilteredRepositories(repositories.slice(0, 10))
        }
    }, [repositories, searchTerm])

    const addToComparison = (repository: Repository) => {
        if (selectedRepositories.length < 4 && !selectedRepositories.find((r) => r.id === repository.id)) {
            setSelectedRepositories([...selectedRepositories, repository])
        }
    }

    const removeFromComparison = (repositoryId: string) => {
        setSelectedRepositories(selectedRepositories.filter((r) => r.id !== repositoryId))
    }

    const clearComparison = () => {
        setSelectedRepositories([])
    }

    const getSourceInfo = (source: string) => {
        switch (source) {
            case "re3data":
                return { label: "re3data", color: "bg-blue-50 text-blue-700 border-blue-200", avatar: "R" }
            case "fairsharing":
                return { label: "FAIRsharing", color: "bg-green-50 text-green-700 border-green-200", avatar: "F" }
            case "gcbr":
                return { label: "GCBR", color: "bg-purple-50 text-purple-700 border-purple-200", avatar: "G" }
            default:
                return {
                    label: source,
                    color: "bg-gray-50 text-gray-700 border-gray-200",
                    avatar: source.charAt(0).toUpperCase(),
                }
        }
    }

    const ComparisonRow = ({
                               label,
                               getValue,
                               type = "text",
                           }: {
        label: string
        getValue: (repo: Repository) => any
        type?: "text" | "array" | "boolean" | "date" | "number"
    }) => (
        <div className="grid grid-cols-5 gap-4 py-4 border-b border-border">
            <div className="font-medium text-card-foreground bg-muted/30 p-3 rounded-lg">{label}</div>
            {selectedRepositories.map((repo, index) => (
                <div key={repo.id} className="p-3 rounded-lg bg-card/30">
                    {type === "array" ? (
                        <div className="space-y-1">
                            {getValue(repo)
                                ?.slice(0, 3)
                                .map((item: string, idx: number) => (
                                    <Badge key={idx} variant="secondary" className="text-xs mr-1 mb-1">
                                        {item}
                                    </Badge>
                                ))}
                            {getValue(repo)?.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                    +{getValue(repo).length - 3}
                                </Badge>
                            )}
                        </div>
                    ) : type === "boolean" ? (
                        <div className="flex items-center">
                            {getValue(repo) ? (
                                <Check className="h-4 w-4 text-green-600" />
                            ) : (
                                <Minus className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="ml-2 text-sm">{getValue(repo) ? "是" : "否"}</span>
                        </div>
                    ) : type === "date" ? (
                        <span className="text-sm text-muted-foreground">
              {getValue(repo) ? new Date(getValue(repo)).toLocaleDateString("zh-CN") : "未知"}
            </span>
                    ) : type === "number" ? (
                        <span className="text-sm font-medium">{getValue(repo) || "未知"}</span>
                    ) : (
                        <span className="text-sm text-muted-foreground">{getValue(repo) || "未提供"}</span>
                    )}
                </div>
            ))}
        </div>
    )

    if (loading) {
        return (

            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground">正在加载对比数据...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <GitCompare className="h-10 w-10 text-primary" />
                    <h1 className="text-4xl font-bold text-foreground">仓库对比分析</h1>
                </div>
                <p className="text-lg text-muted-foreground">选择最多4个数据仓库进行详细对比分析</p>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <Badge variant="outline" className="px-3 py-1">
                        已选择 {selectedRepositories.length}/4 个仓库
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Repository Selection */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="bg-card/50 backdrop-blur-sm border-border">
                        <CardHeader>
                            <CardTitle className="text-card-foreground">选择仓库</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Input
                                placeholder="搜索仓库..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-background border-border"
                            />

                            <div className="space-y-2 max-h-96 overflow-y-auto">
                                {filteredRepositories.map((repository) => {
                                    const sourceInfo = getSourceInfo(repository.source)
                                    const isSelected = selectedRepositories.find((r) => r.id === repository.id)
                                    const canAdd = selectedRepositories.length < 4

                                    return (
                                        <div
                                            key={repository.id}
                                            className={`p-3 rounded-lg border transition-all ${
                                                isSelected ? "border-primary bg-primary/5" : "border-border bg-card/30 hover:bg-card/50"
                                            }`}
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Avatar className="h-6 w-6">
                                                            <AvatarFallback className={`text-xs ${sourceInfo.color}`}>
                                                                {sourceInfo.avatar}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <Badge variant="outline"
                                                               className={`text-xs ${sourceInfo.color}`}>
                                                            {sourceInfo.label}
                                                        </Badge>
                                                    </div>
                                                    <h4 className="font-medium text-sm text-card-foreground line-clamp-2 mb-1">
                                                        {repository.name}
                                                    </h4>
                                                    <p className="text-xs text-muted-foreground line-clamp-2">{repository.description}</p>
                                                </div>

                                                <Button
                                                    size="sm"
                                                    variant={isSelected ? "destructive" : "outline"}
                                                    onClick={() =>
                                                        isSelected ? removeFromComparison(repository.id) : addToComparison(repository)
                                                    }
                                                    disabled={!isSelected && !canAdd}
                                                    className="shrink-0"
                                                >
                                                    {isSelected ? <X className="h-3 w-3" /> :
                                                        <Plus className="h-3 w-3" />}
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Comparison Table */}
                <div className="lg:col-span-2">
                    {selectedRepositories.length === 0 ? (
                        <Card className="bg-card/50 backdrop-blur-sm border-border">
                            <CardContent className="text-center py-16">
                                <GitCompare className="h-16 w-16 mx-auto mb-6 text-muted-foreground opacity-50" />
                                <h3 className="text-xl font-semibold text-card-foreground mb-2">开始对比分析</h3>
                                <p className="text-muted-foreground">从左侧选择数据仓库来开始对比分析</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="bg-card/50 backdrop-blur-sm border-border">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-card-foreground">对比结果</CardTitle>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={clearComparison}
                                        className="border-border text-muted-foreground hover:bg-accent bg-transparent"
                                    >
                                        <X className="h-4 w-4 mr-2" />
                                        清空对比
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-0">
                                    {/* Header Row */}
                                    <div className="grid grid-cols-5 gap-4 py-4 border-b-2 border-border bg-muted/20">
                                        <div className="font-semibold text-card-foreground">对比项目</div>
                                        {selectedRepositories.map((repo) => {
                                            const sourceInfo = getSourceInfo(repo.source)
                                            return (
                                                <div key={repo.id} className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarFallback
                                                                className={`text-xs font-bold ${sourceInfo.color}`}>
                                                                {sourceInfo.avatar}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => removeFromComparison(repo.id)}
                                                            className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-sm text-card-foreground line-clamp-2">{repo.name}</h4>
                                                        <Badge variant="outline"
                                                               className={`text-xs mt-1 ${sourceInfo.color}`}>
                                                            {sourceInfo.label}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {/* Comparison Rows */}
                                    <ComparisonRow label="仓库描述" getValue={(repo) => repo.description} />

                                    <ComparisonRow label="学科领域" getValue={(repo) => repo.subjects} type="array" />

                                    <ComparisonRow label="内容类型" getValue={(repo) => repo.contentTypes}
                                                   type="array" />

                                    <ComparisonRow
                                        label="数据访问类型"
                                        getValue={(repo) =>
                                            repo.dataAccess?.map((access) =>
                                                access.dataAccessType === "open"
                                                    ? "开放访问"
                                                    : access.dataAccessType === "restricted"
                                                        ? "受限访问"
                                                        : access.dataAccessType,
                                            )
                                        }
                                        type="array"
                                    />

                                    <ComparisonRow label="仓库大小" getValue={(repo) => repo.size} />

                                    <ComparisonRow label="建立时间" getValue={(repo) => repo.startDate} type="date" />

                                    <ComparisonRow label="最后更新" getValue={(repo) => repo.lastUpdate} type="date" />

                                    <ComparisonRow
                                        label="关联机构数量"
                                        getValue={(repo) => repo.institutions?.length || 0}
                                        type="number"
                                    />

                                    <ComparisonRow label="API 接口" getValue={(repo) => repo.api?.length > 0}
                                                   type="boolean" />

                                    <ComparisonRow
                                        label="认证状态"
                                        getValue={(repo) => repo.certificates && repo.certificates.length > 0}
                                        type="boolean"
                                    />

                                    <ComparisonRow label="认证类型" getValue={(repo) => repo.certificates}
                                                   type="array" />
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
