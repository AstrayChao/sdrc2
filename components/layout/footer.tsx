"use client"

import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export function Footer() {
    return (
        <footer className="border-t bg-gray-800 text-muted ">
            <div className="container  mx-auto max-w-6xl px-4 py-8">
                <div className="flex  justify-center">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl w-full">
                        {/* Quick links */}
                        <div className="space-y-3">
                            <h4 className="font-medium  text-white  md:text-lg">快速链接</h4>
                            <nav className="flex flex-col space-y-2 w-fit">
                                <Link href="/"
                                      className="text-md   text-gray-400 hover:text-white transition-colors ">
                                    首页
                                </Link>
                                <Link href="/catalog"
                                      className="text-md  text-gray-400 hover:text-white transition-colors ">
                                    数据目录
                                </Link>
                                <Link href="/dashboard"
                                      className="text-md  text-gray-400 hover:text-white transition-colors">
                                    仪表板
                                </Link>
                            </nav>
                        </div>

                        {/* Support */}
                        <div className="space-y-3">
                            <h4 className="font-medium text-sm text-white md:text-lg">支持</h4>
                            <nav className="flex flex-col space-y-2 w-fit">
                                <Link href="/help"
                                      className="text-md  text-gray-400 hover:text-white transition-colors">
                                    使用帮助
                                </Link>
                                <Link href="/api-docs"
                                      className="text-md text-gray-400 hover:text-white transition-colors">
                                    API 文档
                                </Link>
                                <Link href="/contact"
                                      className="text-md  text-gray-400 hover:text-white transition-colors">
                                    联系我们
                                </Link>
                                <Link href="/privacy"
                                      className="text-md text-gray-400 hover:text-white transition-colors">
                                    隐私政策
                                </Link>
                            </nav>
                        </div>

                        {/* Contact - 移动端占满两列 */}
                        <div className="col-span-2 md:col-span-1 space-y-3">
                            <h4 className="font-medium text-sm text-white md:text-lg">联系方式</h4>
                            <div className="space-y-2 text-gray-400 ">
                                <div className="flex items-center space-x-2  text-md ">
                                    <Mail className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                                    <span className="break-all">support@test.org</span>
                                </div>
                                <div className="flex items-center space-x-2  text-md">
                                    <Phone className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                                    <span>test</span>
                                </div>
                                <div className="flex items-start space-x-2  text-md">
                                    <MapPin className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0 mt-0.5" />
                                    <span>北京市海淀区中关村</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="my-6" />

                {/* Bottom section */}
                <div className="space-y-4">
                    {/* Copyright */}
                    <p className="text-xs md:text-sm text-gray-400  text-center">
                        © {new Date().getFullYear()} 中国科学院计算机网络信息中心
                    </p>

                    {/* 备案信息 - 移动端垂直排列 */}
                    <div
                        className="flex flex-col text-gray-400 sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs md:text-sm  ">
                        <a
                            href="https://beian.mps.gov.cn/#/query/webSearch?code=11010802044968"
                            rel="noreferrer"
                            target="_blank"
                            className="flex items-center   hover:text-white
                            transition-colors no-underline"
                        >
                            <Image
                                src={`${process.env.NEXT_PUBLIC_BASE_URL || ""}/beian.png`}
                                alt="警徽图标"
                                width={16}
                                height={16}
                                className="w-3 h-3 md:w-4 md:h-4"
                            />
                            <span className="ml-1">京公网安备11010802044968号</span>
                        </a>
                        <a
                            href="http://beian.miit.gov.cn/"
                            rel="noreferrer"
                            target="_blank"
                            className="  hover:text-white
                            transition-colors no-underline"
                        >
                            京ICP备09112257号-133
                        </a>
                    </div>

                    {/* Links - 移动端水平排列 */}
                    <div
                        className="flex items-center justify-center text-gray-400 gap-4 text-xs md:text-sm ">
                        <Link href="/terms" className="hover:text-white transition-colors">
                            服务条款
                        </Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">
                            隐私政策
                        </Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">
                            Cookie政策
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
