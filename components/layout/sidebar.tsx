"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, ChevronRight, HelpCircle, Home, Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

interface SidebarProps {
    open: boolean
    onClose: () => void
}

interface NavItem {
    id: string
    label: string
    icon: React.ElementType
    href: string
    description: string
    badge?: string
}

const navItems: NavItem[] = [
    {
        id: "catalog",
        label: "数据目录",
        icon: Home,
        href: "/catalog",
        description: "浏览所有数据仓库",
    },
    {
        id: "dashboard",
        label: "仪表板",
        icon: BarChart3,
        href: "/dashboard",
        description: "统计和分析",
    },
]

const secondaryItems: NavItem[] = [
    {
        id: "settings",
        label: "设置",
        icon: Settings,
        href: "/settings",
        description: "系统设置",
    },
    {
        id: "help",
        label: "帮助",
        icon: HelpCircle,
        href: "/help",
        description: "使用帮助",
    },
]

export function Sidebar({ open, onClose }: SidebarProps) {
    const pathname = usePathname()

    const NavItem = ({ item, secondary = false }: {item: NavItem, secondary?: boolean}) => {
        const isActive = pathname === item.href

        return (
            <Link href={item.href} onClick={onClose}>
                <div
                    className={cn(
                        "group relative flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200",
                        "hover:bg-accent hover:text-accent-foreground",
                        isActive && "bg-primary text-primary-foreground shadow-sm",
                        secondary && "text-muted-foreground",
                    )}
                >
                    <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary-foreground")} />

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <span className="truncate">{item.label}</span>
                            {item.badge && (
                                <Badge variant={isActive ? "secondary" : "outline"} className="ml-2 h-5 px-1.5 text-xs">
                                    {item.badge}
                                </Badge>
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 truncate">{item.description}</p>
                    </div>

                    {isActive && <ChevronRight className="h-4 w-4 text-primary-foreground" />}
                </div>
            </Link>
        )
    }

    return (
        <>
            {/* Mobile overlay - only shows on mobile */}
            {open &&
                <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" onClick={onClose} />}

            {/* Sidebar - only shows on mobile when open */}
            <aside
                className={cn(
                    "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-80 transform border-r bg-card transition-transform duration-300 ease-in-out md:hidden",
                    open ? "translate-x-0" : "-translate-x-full",
                )}
            >
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-lg font-semibold">导航菜单</h2>
                        <Button variant="ghost" size="sm" onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2 p-4">
                        <div className="space-y-1">
                            {navItems.map((item) => (
                                <NavItem key={item.id} item={item} />
                            ))}
                        </div>

                        <Separator className="my-4" />

                        <div className="space-y-1">
                            {secondaryItems.map((item) => (
                                <NavItem key={item.id} item={item} secondary />
                            ))}
                        </div>
                    </nav>

                    {/* Footer info */}
                    <div className="border-t p-4">
                        <div className="text-xs text-muted-foreground">
                            <p className="font-medium">科学数据仓库目录</p>
                            <p>版本 1.0.0</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}
