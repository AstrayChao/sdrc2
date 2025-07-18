// components/features/repository/repository-actions.tsx
'use client'

import { useEffect, useState } from 'react'
import { Check, Copy, Download, ExternalLink, Heart, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import type { Repository } from '@/types/repository'

interface RepositoryActionsProps {
    repository: Repository
}

export function RepositoryActions({ repository }: RepositoryActionsProps) {
    const [isFavorite, setIsFavorite] = useState(false)
    const [copied, setCopied] = useState(false)
    const [isExporting, setIsExporting] = useState(false)

    // 初始化收藏状态
    useEffect(() => {
        const favorites = localStorage.getItem('repository-favorites')
        if (favorites) {
            const favoriteIds = JSON.parse(favorites)
            setIsFavorite(favoriteIds.includes(repository.id))
        }
    }, [repository.id])

    const handleToggleFavorite = () => {
        const favorites = localStorage.getItem('repository-favorites')
        const favoriteIds = favorites ? JSON.parse(favorites) : []

        if (isFavorite) {
            const newFavorites = favoriteIds.filter((id: string) => id !== repository.id)
            localStorage.setItem('repository-favorites', JSON.stringify(newFavorites))
            setIsFavorite(false)
            toast.success('已从收藏中移除')
        } else {
            favoriteIds.push(repository.id)
            localStorage.setItem('repository-favorites', JSON.stringify(favoriteIds))
            setIsFavorite(true)
            toast.success('已添加到收藏')
        }
    }

    const handleCopyLink = async () => {
        const url = window.location.href
        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            toast.success('链接已复制到剪贴板')
            setTimeout(() => setCopied(false), 2000)
        } catch (error) {
            toast.error('复制失败，请重试')
        }
    }

    const handleShare = async () => {
        const url = window.location.href
        const title = `${repository.repositoryName} - 科学数据库详情`
        const text = repository.description

        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text,
                    url,
                })
            } catch (error) {
                if ((error as Error).name !== 'AbortError') {
                    toast.error('分享失败')
                }
            }
        } else {
            handleCopyLink()
        }
    }

    const handleExportJSON = () => {
        setIsExporting(true)
        try {
            const dataStr = JSON.stringify(repository, null, 2)
            const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

            const exportFileDefaultName = `${repository.repositoryName.replace(/\s+/g, '_')}_data.json`

            const linkElement = document.createElement('a')
            linkElement.setAttribute('href', dataUri)
            linkElement.setAttribute('download', exportFileDefaultName)
            linkElement.click()

            toast.success('数据已导出')
        } catch (error) {
            toast.error('导出失败，请重试')
        } finally {
            setIsExporting(false)
        }
    }

    const handleCopyMetadata = async () => {
        const metadata = {
            name: repository.repositoryName,
            url: repository.repositoryURL,
            description: repository.description,
            subjects: repository.subject,
            keywords: repository.keyword,
            institutions: repository.institution?.map(inst => inst.institutionName),
            lastUpdate: repository.lastUpdate,
        }

        try {
            await navigator.clipboard.writeText(JSON.stringify(metadata, null, 2))
            toast.success('元数据已复制到剪贴板')
        } catch (error) {
            toast.error('复制失败，请重试')
        }
    }

    return (
        <div className="flex flex-wrap gap-3">
            {/* 收藏按钮 */}
            <Button
                onClick={handleToggleFavorite}
                variant={isFavorite ? 'default' : 'outline'}
                size="sm"
                className={isFavorite ? 'bg-red-500 hover:bg-red-600 text-white' : ''}
            >
                <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? '已收藏' : '收藏'}
            </Button>

            {/* 访问仓库 */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(repository.repositoryURL, '_blank')}
            >
                <ExternalLink className="h-4 w-4 mr-2" />
                访问仓库
            </Button>

            {/* 更多操作 */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        分享与导出
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={handleShare}>
                        <Share2 className="h-4 w-4 mr-2" />
                        分享此页面
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCopyLink}>
                        {copied ? (
                            <>
                                <Check className="h-4 w-4 mr-2" />
                                已复制链接
                            </>
                        ) : (
                            <>
                                <Copy className="h-4 w-4 mr-2" />
                                复制链接
                            </>
                        )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleExportJSON} disabled={isExporting}>
                        <Download className="h-4 w-4 mr-2" />
                        导出为 JSON
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCopyMetadata}>
                        <Copy className="h-4 w-4 mr-2" />
                        复制元数据
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}