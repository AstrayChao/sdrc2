"use client"

import type React from "react"
import { useState } from "react"
import { Sidebar } from "./sidebar"
import { Footer } from "./footer"
import { Header } from "@/components/layout/header";

interface AppLayoutProps {
    children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)


    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

            <div className="flex flex-1">
                {/* Sidebar only shows on mobile when opened */}
                <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                {/* Main content takes full width on desktop */}
                <main className="flex-1 transition-all duration-300 ">
                    <div className="container mx-auto px-4 py-8 max-w-7xl">{children}</div>
                </main>
            </div>

            <Footer />
        </div>
    )
}
