"use client"

import { useEffect, useState } from "react"
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, Calendar, Database, Globe, MapPin, Shield, TrendingUp, Users } from "lucide-react"
import { getProcessedRepositories } from "@/lib/data/real-data"
import type { Repository } from "@/types/repository"

export function Dashboard() {
    const [repositories, setRepositories] = useState<Repository[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = getProcessedRepositories()
                setRepositories(data)
            } catch (error) {
                console.error("加载数据失败:", error)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground">正在加载统计数据...</p>
                </div>
            </div>
        )
    }

    // 数据统计
    const totalRepositories = repositories.length
    const sourceStats = repositories.reduce(
        (acc, repo) => {
            repo.from.forEach((source) => {
                acc[source] = (acc[source] || 0) + 1
            })
            return acc
        },
        {} as Record<string, number>,
    )

    const openAccessCount = repositories.filter((repo) =>
        repo.dataAccess?.some((access) => access.dataAccessType === "open"),
    ).length

    const certifiedCount = repositories.filter((repo) => repo.certificates && repo.certificates.length > 0).length

    const withAPICount = repositories.filter((repo) => repo.api && repo.api.length > 0).length

    // 图表数据
    const sourceChartData = Object.entries(sourceStats).map(([source, count]) => ({
        name: source,
        value: count,
        percentage: ((count / totalRepositories) * 100).toFixed(1),
    }))
    const accessTypeData = [
        { name: "开放访问", value: openAccessCount, color: "#10b981" },
        { name: "受限访问", value: totalRepositories - openAccessCount, color: "#f59e0b" },
    ]

    // 学科分布
    const subjectStats = repositories.reduce(
        (acc, repo) => {
            repo.subjects?.forEach((subject) => {
                acc[subject] = (acc[subject] || 0) + 1
            })
            return acc
        },
        {} as Record<string, number>,
    )

    const topSubjects = Object.entries(subjectStats)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([subject, count]) => ({ subject, count }))

    // 国家分布
    const countryStats = repositories.reduce(
        (acc, repo) => {
            repo.institutions?.forEach((inst) => {
                if (inst.institutionCountry) {
                    acc[inst.institutionCountry] = (acc[inst.institutionCountry] || 0) + 1
                }
            })
            return acc
        },
        {} as Record<string, number>,
    )

    const topCountries = Object.entries(countryStats)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 8)
        .map(([country, count]) => ({ country, count }))

    // 时间趋势（按年份）
    const yearStats = repositories.reduce(
        (acc, repo) => {
            if (repo.startDate) {
                const year = new Date(repo.startDate).getFullYear()
                if (year >= 2000) {
                    // 只统计2000年以后的数据
                    acc[year] = (acc[year] || 0) + 1
                }
            }
            return acc
        },
        {} as Record<number, number>,
    )

    const yearTrendData = Object.entries(yearStats)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([year, count]) => ({ year: Number(year), count }))

    const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#84cc16", "#f97316"]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-foreground">数据仓库统计仪表板</h1>
                <p className="text-lg text-muted-foreground">全面了解科学数据仓库的分布和特征</p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
                    <CardContent className="pt-6">
                        <div className="flex items-center">
                            <Database className="h-10 w-10 mr-4 text-blue-600" />
                            <div>
                                <p className="text-2xl font-bold text-blue-900">{totalRepositories.toLocaleString()}</p>
                                <p className="text-sm text-blue-700">总仓库数</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
                    <CardContent className="pt-6">
                        <div className="flex items-center">
                            <Globe className="h-10 w-10 mr-4 text-green-600" />
                            <div>
                                <p className="text-2xl font-bold text-green-900">{openAccessCount.toLocaleString()}</p>
                                <p className="text-sm text-green-700">开放访问</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200">
                    <CardContent className="pt-6">
                        <div className="flex items-center">
                            <Shield className="h-10 w-10 mr-4 text-purple-600" />
                            <div>
                                <p className="text-2xl font-bold text-purple-900">{certifiedCount.toLocaleString()}</p>
                                <p className="text-sm text-purple-700">已认证</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200">
                    <CardContent className="pt-6">
                        <div className="flex items-center">
                            <TrendingUp className="h-10 w-10 mr-4 text-orange-600" />
                            <div>
                                <p className="text-2xl font-bold text-orange-900">{withAPICount.toLocaleString()}</p>
                                <p className="text-sm text-orange-700">提供 API</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <Tabs defaultValue="sources" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4   backdrop-blur-sm">
                    <TabsTrigger value="sources">数据源分布</TabsTrigger>
                    <TabsTrigger value="subjects">学科分布</TabsTrigger>
                    <TabsTrigger value="geography">地理分布</TabsTrigger>
                    <TabsTrigger value="trends">时间趋势</TabsTrigger>
                </TabsList>

                <TabsContent value="sources" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Source Distribution Pie Chart */}
                        <Card className="bg-card/50 backdrop-blur-sm border-border">
                            <CardHeader>
                                <CardTitle className="flex items-center text-card-foreground">
                                    <Database className="h-5 w-5 mr-3 text-primary" />
                                    数据源分布
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={sourceChartData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percentage }) => `${name} (${percentage}%)`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {sourceChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Access Type Distribution */}
                        <Card className="bg-card/50 backdrop-blur-sm border-border">
                            <CardHeader>
                                <CardTitle className="flex items-center text-card-foreground">
                                    <Globe className="h-5 w-5 mr-3 text-primary" />
                                    访问类型分布
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={accessTypeData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, value }) => `${name} (${value})`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {accessTypeData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Source Details */}
                    <Card className="bg-card/50 backdrop-blur-sm border-border">
                        <CardHeader>
                            <CardTitle className="text-card-foreground">数据源详情</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {sourceChartData.map((source, index) => (
                                    <div key={source.name}
                                         className="text-center p-4 rounded-lg bg-primary/5 border border-primary/10">
                                        <div className="w-4 h-4 rounded-full mx-auto mb-2"
                                             style={{ backgroundColor: COLORS[index] }} />
                                        <h3 className="font-semibold text-card-foreground">{source.name}</h3>
                                        <p className="text-2xl font-bold text-primary mt-2">{source.value.toLocaleString()}</p>
                                        <p className="text-sm text-muted-foreground">{source.percentage}% 的仓库</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="subjects" className="space-y-6">
                    <Card className="bg-card/50 backdrop-blur-sm border-border">
                        <CardHeader>
                            <CardTitle className="flex items-center text-card-foreground">
                                <Users className="h-5 w-5 mr-3 text-primary" />
                                热门学科领域 (前10名)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={topSubjects} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="subject" angle={-45} textAnchor="end" height={100} fontSize={12} />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#3b82f6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {topSubjects.slice(0, 6).map((item, index) => (
                            <Card key={item.subject} className="bg-card/50 backdrop-blur-sm border-border">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-card-foreground">{item.subject}</p>
                                            <p className="text-2xl font-bold text-primary">{item.count}</p>
                                        </div>
                                        <Badge variant="outline" className="text-xs">
                                            #{index + 1}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="geography" className="space-y-6">
                    <Card className="bg-card/50 backdrop-blur-sm border-border">
                        <CardHeader>
                            <CardTitle className="flex items-center text-card-foreground">
                                <MapPin className="h-5 w-5 mr-3 text-primary" />
                                国家/地区分布 (前8名)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={topCountries} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="country" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#10b981" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {topCountries.slice(0, 8).map((item, index) => (
                            <Card key={item.country} className="bg-card/50 backdrop-blur-sm border-border">
                                <CardContent className="pt-6">
                                    <div className="text-center">
                                        <p className="font-medium text-card-foreground">{item.country}</p>
                                        <p className="text-2xl font-bold text-primary">{item.count}</p>
                                        <Badge variant="outline" className="text-xs mt-2">
                                            第 {index + 1} 名
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="trends" className="space-y-6">
                    <Card className="bg-card/50 backdrop-blur-sm border-border">
                        <CardHeader>
                            <CardTitle className="flex items-center text-card-foreground">
                                <Calendar className="h-5 w-5 mr-3 text-primary" />
                                仓库建立时间趋势
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={yearTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="year" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#8b5cf6"
                                        strokeWidth={2}
                                        dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="bg-card/50 backdrop-blur-sm border-border">
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
                                    <p className="text-sm text-muted-foreground">最早建立</p>
                                    <p className="text-2xl font-bold text-card-foreground">
                                        {Math.min(...yearTrendData.map((d) => d.year))}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-card/50 backdrop-blur-sm border-border">
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
                                    <p className="text-sm text-muted-foreground">峰值年份</p>
                                    <p className="text-2xl font-bold text-card-foreground">
                                        {yearTrendData.reduce((max, curr) => (curr.count > max.count ? curr : max), yearTrendData[0])?.year}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-card/50 backdrop-blur-sm border-border">
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <Building className="h-8 w-8 mx-auto mb-2 text-primary" />
                                    <p className="text-sm text-muted-foreground">近5年新增</p>
                                    <p className="text-2xl font-bold text-card-foreground">
                                        {yearTrendData
                                            .filter((d) => d.year >= new Date().getFullYear() - 5)
                                            .reduce((sum, d) => sum + d.count, 0)}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
