import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BarChart3, Database, GitCompare, Globe, Heart, Search, Shield, Users, Zap } from "lucide-react"

export default function HomePage() {
    const features = [
        {
            icon: Database,
            title: "丰富的数据资源",
            description: "汇聚全球1000+高质量科学数据仓库，覆盖多个学科领域",
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            icon: Search,
            title: "智能搜索发现",
            description: "强大的搜索引擎和智能推荐系统，快速找到所需数据",
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
        {
            icon: Shield,
            title: "质量认证保障",
            description: "严格的质量评估和认证体系，确保数据可信度",
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
        {
            icon: Globe,
            title: "开放访问优先",
            description: "优先展示开放访问资源，促进科学数据共享",
            color: "text-orange-600",
            bgColor: "bg-orange-50",
        },
    ]

    const quickActions = [
        {
            title: "浏览数据目录",
            description: "探索全球科学数据仓库",
            href: "/catalog",
            icon: Database,
            color: "bg-primary text-primary-foreground",
        },
        {
            title: "查看仪表板",
            description: "数据统计和趋势分析",
            href: "/dashboard",
            icon: BarChart3,
            color: "bg-secondary text-secondary-foreground",
        },
        {
            title: "我的收藏",
            description: "管理收藏的数据仓库",
            href: "/favorites",
            icon: Heart,
            color: "bg-accent text-accent-foreground",
        },
        {
            title: "对比分析",
            description: "比较不同数据仓库特性",
            href: "/comparison",
            icon: GitCompare,
            color: "bg-muted text-muted-foreground",
        },
    ]

    const stats = [
        { label: "数据仓库", value: "1,234", icon: Database },
        { label: "开放访问", value: "856", icon: Globe },
        { label: "已认证", value: "234", icon: Shield },
        { label: "活跃用户", value: "12.5K", icon: Users },
    ]

    return (
        <div className="container space-y-12 ">
            {/* Hero Section */}
            <section className="text-center space-y-8 py-16">
                <div className="space-y-4">

                    <Badge variant="secondary" className="px-4 py-2 text-sm">
                        <Zap className="h-4 w-4 mr-2" />
                        全球领先的科学数据发现平台
                    </Badge>
                    <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight
                    ">
                        发现全球
                        <span
                            className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">科学数据</span>
                        资源
                    </h1>
                    <p className="font-mono text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        汇聚全球高质量科学数据仓库，为研究人员提供便捷的数据发现、访问和管理服务， 加速科学研究和创新发展。
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="lg" asChild className="px-8 py-3">
                        <Link href="/catalog">
                            <Database className="h-5 w-5 mr-2" />
                            开始探索
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild className="px-8 py-3 bg-transparent">
                        <Link href="/dashboard">
                            <BarChart3 className="h-5 w-5 mr-2" />
                            查看统计
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Stats */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.label} className="text-center bg-card/50 backdrop-blur-sm border-border">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-center mb-3">
                                <stat.icon className="h-8 w-8 text-primary" />
                            </div>
                            <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </CardContent>
                    </Card>
                ))}
            </section>

            {/* Features */}
            <section className="space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold text-foreground">平台特色</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        我们致力于为科研工作者提供最优质的数据发现和管理体验
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature) => (
                        <Card
                            key={feature.title}
                            className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg transition-shadow"
                        >
                            <CardHeader>
                                <div className="flex items-center space-x-4">
                                    <div className={`p-3 rounded-lg ${feature.bgColor}`}>
                                        <feature.icon className={`h-6 w-6 ${feature.color}`} />
                                    </div>
                                    <CardTitle className="text-xl text-card-foreground">{feature.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Quick Actions */}
            <section className="space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold text-foreground">快速开始</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">选择下方功能快速开始您的数据探索之旅</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {quickActions.map((action) => (
                        <Card
                            key={action.title}
                            className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg transition-all hover:scale-105"
                        >
                            <CardContent className="p-6">
                                <Link href={action.href} className="block space-y-4">
                                    <div
                                        className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center`}>
                                        <action.icon className="h-6 w-6" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-card-foreground">{action.title}</h3>
                                        <p className="text-sm text-muted-foreground">{action.description}</p>
                                    </div>
                                    <div className="flex items-center text-primary text-sm font-medium">
                                        立即使用
                                        <ArrowRight className="h-4 w-4 ml-1" />
                                    </div>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="text-center space-y-8 py-16 bg-gradient-to-r from-primary/5 to-primary/10  rounded-2xl">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-foreground">准备开始探索了吗？</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        立即访问我们的数据目录，发现适合您研究需求的高质量数据资源
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="lg" asChild className="px-8 py-3">
                        <Link href="/catalog">
                            <Search className="h-5 w-5 mr-2" />
                            浏览数据目录
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild className="px-8 py-3 bg-transparent">
                        <Link href="/help">了解更多</Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}
