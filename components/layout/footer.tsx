"use client"

import Link from "next/link"
import { Github, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Footer() {
    return (
        <footer className="border-t bg-card/50">
            <div className="container mx-auto max-w-7xl px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and description */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-sm">科</span>
                            </div>
                            <div>
                                <h3 className="font-semibold">科学数据中心</h3>
                                <p className="text-xs text-muted-foreground">Scientific Data Hub</p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            为科研工作者提供高质量的数据仓库管理和分析平台，促进科学数据的开放共享。
                        </p>
                    </div>

                    {/* Quick links */}
                    <div className="space-y-4">
                        <h4 className="font-medium">快速链接</h4>
                        <nav className="flex flex-col space-y-2">
                            <Link href="/catalog"
                                  className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                数据目录
                            </Link>
                            <Link href="/dashboard"
                                  className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                仪表板
                            </Link>
                            <Link href="/favorites"
                                  className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                我的收藏
                            </Link>
                            <Link
                                href="/comparison"
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                对比分析
                            </Link>
                        </nav>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h4 className="font-medium">支持</h4>
                        <nav className="flex flex-col space-y-2">
                            <Link href="/help"
                                  className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                使用帮助
                            </Link>
                            <Link href="/api-docs"
                                  className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                API 文档
                            </Link>
                            <Link href="/contact"
                                  className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                联系我们
                            </Link>
                            <Link href="/privacy"
                                  className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                隐私政策
                            </Link>
                        </nav>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="font-medium">联系方式</h4>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                <span>support@scidata.org</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                <span>+86 400-123-4567</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>北京市海淀区中关村</span>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                                <Github className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                                <Mail className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <Separator className="my-6" />

                <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                    <p className="text-sm text-muted-foreground">© 2024 科学数据中心. 保留所有权利.</p>
                    <div className="flex space-x-4 text-sm text-muted-foreground">
                        <Link href="/terms" className="hover:text-foreground transition-colors">
                            服务条款
                        </Link>
                        <Link href="/privacy" className="hover:text-foreground transition-colors">
                            隐私政策
                        </Link>
                        <Link href="/cookies" className="hover:text-foreground transition-colors">
                            Cookie 政策
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
