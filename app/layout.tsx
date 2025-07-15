import type React from "react"
import type { Metadata } from "next"
import { Inter, Noto_Sans_SC, Roboto_Mono } from "next/font/google"
import "./globals.css"
import { AppLayout } from "@/components/layout/app-layout"
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: '--font-inter', })
const notoSansSC = Noto_Sans_SC({ subsets: ['latin'], display: "swap", variable: '--font-noto-sans-sc' })
const robotoMono = Roboto_Mono({ subsets: ['latin'], display: "swap", variable: '--font-roboto-mono' })
export const metadata: Metadata = {
    title: "科学数据库中心",
    description: "全球领先的科学数据仓库发现平台，帮助研究人员找到、访问和使用高质量的研究数据资源。",
    generator: 'CNIC',
    keywords: ['科学数据仓库', '科学数据', '数据仓库搜索'],
    authors: [{ name: 'CNIC', url: 'https://cnic.cn/' }],
    openGraph: {
        type: "website",
        locale: "zh_CN",
        url: "https://datatrusted.cn",
        siteName: "Scientific Data Repository Hub",
        title: "Scientific Data Repository Hub",
        description: "Explore and discover scientific data repositories",
    },
}


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="zh"
              className={`${inter.variable} ${notoSansSC.variable} ${robotoMono.variable}`}
              suppressHydrationWarning>

        <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <AppLayout>{children}</AppLayout>
            <Toaster />
        </ThemeProvider>
        </body>
        </html>
    )
}
