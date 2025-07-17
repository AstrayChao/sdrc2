"use client"

import { BarChart3, Bell, Database, Home, Menu, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import Logo from "@/components/Logo";

interface HeaderProps {
    onMenuClick: () => void
}

interface NavItem {
    id: string
    label: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    href: string
    description?: string
    badge?: string
}

const navItems: NavItem[] = [
    {
        id: "home",
        label: "首页",
        icon: Home,
        href: "/",
        description: "首页",
    },
    {
        id: "catalog",
        label: "数据目录",
        icon: Database,
        href: "/catalog",
        description: "浏览所有数据仓库",
    },
    {
        id: "dashboard",
        label: "仪表板",
        icon: BarChart3,
        href: "/dashboard",
        description: "统计和分析",
    }
]

export function Header({ onMenuClick }: HeaderProps) {
    const pathname = usePathname()

    return (
        <header
            className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <div className="container flex h-16 items-center mx-auto max-w-6xl justify-between">
                {/* Mobile menu button */}
                <Button variant="ghost" size="sm" className="md:hidden mr-2" onClick={onMenuClick}>
                    <Menu className="h-5 w-5" />
                </Button>

                {/* Logo */}
                {/* 方案四：立体科技风格 */}
                {/* 方案一：DNA螺旋数据风格 - 独特的科学主题 */}
                {/* Desktop Navigation */}
                <div className="flex-1 md:flex ">
                    <Logo />
                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList>
                            {navItems.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <NavigationMenuItem key={item.id}>
                                        <Link href={item.href} legacyBehavior passHref>
                                            <NavigationMenuLink
                                                className={cn(
                                                    "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 bg-transparent",
                                                    isActive && "bg-accent text-accent-foreground",
                                                )}
                                            >
                                                <item.icon className="mr-2 h-4 w-4" />
                                                {item.label}
                                                {item.badge && (
                                                    <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                                                        {item.badge}
                                                    </Badge>
                                                )}
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                )
                            })}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Search bar */}
                {/*<div className="flex-1 max-w-md mx-4">*/}
                {/*    <div className="relative">*/}
                {/*        <Search*/}
                {/*            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />*/}
                {/*        <Input placeholder="搜索数据仓库..." className="pl-10 bg-background" />*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/* Right side actions */}
                <div className="flex  space-x-2 justify-end">
                    {/* Notifications */}
                    <Button variant="ghost" size="sm" className="relative">
                        <Bell className="h-5 w-5" />
                        <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                        >
                            3
                        </Badge>
                    </Button>

                    {/* User menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="relative">
                                <User className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>我的账户</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>个人资料</DropdownMenuItem>
                            <DropdownMenuItem>设置</DropdownMenuItem>
                            <DropdownMenuItem>帮助</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>退出登录</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}
