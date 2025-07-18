// components/features/search/advanced-search-client.tsx
'use client'

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

interface AdvancedSearchClientProps {
    defaultValues: {
        source?: string
        subjects?: string
        accessType?: string
        hasCertificates?: boolean
        hasAPI?: boolean
    }
}

const sources = [
    { value: 're3data', label: 're3data' },
    { value: 'fairsharing', label: 'FAIRsharing' },
    { value: 'gcbr', label: 'GCBR' },
]

const accessTypes = [
    { value: 'open', label: '开放访问' },
    { value: 'restricted', label: '受限访问' },
    { value: 'closed', label: '封闭访问' },
]

export function AdvancedSearchClient({ defaultValues }: AdvancedSearchClientProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()
    const [isOpen, setIsOpen] = useState(false)

    const [filters, setFilters] = useState({
        sources: defaultValues.source ? [defaultValues.source] : [],
        accessTypes: defaultValues.accessType ? [defaultValues.accessType] : [],
        hasCertificates: defaultValues.hasCertificates || false,
        hasAPI: defaultValues.hasAPI || false,
    })

    const activeFiltersCount =
        filters.sources.length +
        filters.accessTypes.length +
        (filters.hasCertificates ? 1 : 0) +
        (filters.hasAPI ? 1 : 0)

    const handleApplyFilters = () => {
        const params = new URLSearchParams(searchParams)

        // 保留现有的搜索词
        const existingSearch = params.get('q')
        if (existingSearch) {
            params.set('q', existingSearch)
        }

        // 应用筛选条件
        if (filters.sources.length === 1) {
            params.set('source', filters.sources[0])
        } else {
            params.delete('source')
        }

        if (filters.accessTypes.length === 1) {
            params.set('accessType', filters.accessTypes[0])
        } else {
            params.delete('accessType')
        }

        if (filters.hasCertificates) {
            params.set('hasCertificates', 'true')
        } else {
            params.delete('hasCertificates')
        }

        if (filters.hasAPI) {
            params.set('hasAPI', 'true')
        } else {
            params.delete('hasAPI')
        }

        params.set('page', '1') // 重置页码

        startTransition(() => {
            router.push(`/catalog?${params.toString()}`)
        })
    }

    const handleReset = () => {
        setFilters({
            sources: [],
            accessTypes: [],
            hasCertificates: false,
            hasAPI: false,
        })

        const params = new URLSearchParams(searchParams)
        const existingSearch = params.get('q')

        // 清除所有筛选参数，但保留搜索词
        const newParams = new URLSearchParams()
        if (existingSearch) {
            newParams.set('q', existingSearch)
        }
        newParams.set('page', '1')

        startTransition(() => {
            router.push(`/catalog?${newParams.toString()}`)
        })
    }

    const toggleArrayFilter = (array: string[], value: string) => {
        return array.includes(value)
            ? array.filter(v => v !== value)
            : [...array, value]
    }

    return (
        <Card className="bg-card/50 backdrop-blur-sm border-border">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Filter className="h-5 w-5 text-primary" />
                                <CardTitle className="text-lg text-card-foreground">高级筛选</CardTitle>
                                {activeFiltersCount > 0 && (
                                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                                        {activeFiltersCount} 个筛选条件
                                    </Badge>
                                )}
                            </div>
                            {isOpen ? (
                                <ChevronUp className="h-5 w-5 text-muted-foreground" />
                            ) : (
                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                            )}
                        </div>
                    </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* 数据源 */}
                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-card-foreground">数据源</Label>
                                <div className="space-y-2">
                                    {sources.map((source) => (
                                        <div key={source.value} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`source-${source.value}`}
                                                checked={filters.sources.includes(source.value)}
                                                onCheckedChange={(checked) => {
                                                    setFilters(prev => ({
                                                        ...prev,
                                                        sources: toggleArrayFilter(prev.sources, source.value)
                                                    }))
                                                }}
                                            />
                                            <Label
                                                htmlFor={`source-${source.value}`}
                                                className="text-sm text-muted-foreground cursor-pointer"
                                            >
                                                {source.label}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 访问类型 */}
                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-card-foreground">访问类型</Label>
                                <div className="space-y-2">
                                    {accessTypes.map((access) => (
                                        <div key={access.value} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`access-${access.value}`}
                                                checked={filters.accessTypes.includes(access.value)}
                                                onCheckedChange={(checked) => {
                                                    setFilters(prev => ({
                                                        ...prev,
                                                        accessTypes: toggleArrayFilter(prev.accessTypes, access.value)
                                                    }))
                                                }}
                                            />
                                            <Label
                                                htmlFor={`access-${access.value}`}
                                                className="text-sm text-muted-foreground cursor-pointer"
                                            >
                                                {access.label}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 特殊功能 */}
                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-card-foreground">特殊功能</Label>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="has-certificates"
                                            checked={filters.hasCertificates}
                                            onCheckedChange={(checked) =>
                                                setFilters(prev => ({ ...prev, hasCertificates: !!checked }))
                                            }
                                        />
                                        <Label htmlFor="has-certificates"
                                               className="text-sm text-muted-foreground cursor-pointer">
                                            已认证仓库
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="has-api"
                                            checked={filters.hasAPI}
                                            onCheckedChange={(checked) =>
                                                setFilters(prev => ({ ...prev, hasAPI: !!checked }))
                                            }
                                        />
                                        <Label htmlFor="has-api"
                                               className="text-sm text-muted-foreground cursor-pointer">
                                            提供 API
                                        </Label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 操作按钮 */}
                        <div className="flex items-center gap-3 pt-4 border-t border-border">
                            <Button
                                onClick={handleApplyFilters}
                                disabled={isPending}
                                className="bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                                <Filter className="h-4 w-4 mr-2" />
                                应用筛选
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleReset}
                                disabled={isPending}
                                className="border-border text-muted-foreground hover:bg-accent bg-transparent"
                            >
                                <X className="h-4 w-4 mr-2" />
                                重置筛选
                            </Button>
                            {activeFiltersCount > 0 && (
                                <div className="text-sm text-muted-foreground">
                                    已设置 {activeFiltersCount} 个筛选条件
                                </div>
                            )}
                        </div>
                    </CardContent>
                </CollapsibleContent>
            </Collapsible>
        </Card>
    )
}