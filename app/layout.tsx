import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { AppLayout } from "@/components/layout/app-layout";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const notoSansSC = Noto_Sans_SC({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-noto-sans-sc",
});
const geistMono = Geist_Mono({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-geist-mono",
});
const geist = Geist({ subsets: ["latin"], display: "swap", variable: "--font-geist" });

export const metadata: Metadata = {
    title: "科学数据仓库目录",
    description: "全球领先的科学数据仓库发现平台，帮助研究人员找到、访问和使用高质量的研究数据资源。",
    keywords: ["科学数据仓库", "科学数据", "数据仓库搜索"],
    openGraph: {
        type: "website",
        locale: "zh_CN",
        url: "https://datatrusted.cn",
        siteName: "Scientific Data Repository Hub",
        title: "Scientific Data Repository Hub",
        description: "Explore and discover scientific data repositories",
    },
    authors: [{ name: "CNIC", url: "https://cnic.cn/" }],
};

export default function RootLayout({ children }: {children: React.ReactNode}) {
    return (
        <html lang="zh"
              className={`${inter.variable} ${geistMono.variable} ${notoSansSC.variable} ${geist.variable}`}
              suppressHydrationWarning>
        <body>
        <Providers>
            <AppLayout>{children}</AppLayout>
        </Providers>
        </body>
        </html>
    );
}
