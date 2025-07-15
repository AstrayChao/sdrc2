"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Filter, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"

interface AdvancedSearchProps {
    onSearch: (params: SearchParams) => void
    onReset: () => void
}

interface SearchParams {
    keyword: string
    from: string[]
    subjects: string[]
    contentTypes: string[]
    accessTypes: string[]
    countries: string[]
    institutionTypes: string[]
    dateRange: {
        start?: string
        end?: string
    }
    hasCertificates: boolean
    hasAPI: boolean
}

const from = [
    { value: "re3data", label: "re3data" },
    { value: "fairsharing", label: "FAIRsharing" },
    { value: "gcbr", label: "GCBR" },
]

const subjects = [
    "生物学",
    "化学",
    "物理学",
    "地球科学",
    "环境科学",
    "医学",
    "工程学",
    "计算机科学",
    "数学",
    "社会科学",
    "人文学科",
    "其他",
]

const contentTypes = ["数据集", "数据库", "图像", "文档", "软件", "模型", "工具", "其他"]

const accessTypes = [
    { value: "open", label: "开放访问" },
    { value: "restricted", label: "受限访问" },
    { value: "closed", label: "封闭访问" },
]

const countries = ["中国", "美国", "德国", "英国", "日本", "法国", "加拿大", "澳大利亚", "其他"]

const institutionTypes = ["大学", "研究机构", "政府机构", "商业机构", "非营利组织", "其他"]

export function AdvancedSearch({ onSearch, onReset }: AdvancedSearchProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchParams, setSearchParams] = useState<SearchParams>({
        keyword: "",
        from: [],
        subjects: [],
        contentTypes: [],
        accessTypes: [],
        countries: [],
        institutionTypes: [],
        dateRange: {},
        hasCertificates: false,
        hasAPI: false,
    })

    const handleSearch = () => {
        onSearch(searchParams)
    }

    const handleReset = () => {
        setSearchParams({
            keyword: "",
            from: [],
            subjects: [],
            contentTypes: [],
            accessTypes: [],
            countries: [],
            institutionTypes: [],
            dateRange: {},
            hasCertificates: false,
            hasAPI: false,
        })
        onReset()
    }

    const updateArrayField = (field: keyof SearchParams, value: string, checked: boolean) => {
        setSearchParams((prev) => ({
            ...prev,
            [field]: checked
                ? [...(prev[field] as string[]), value]
                : (prev[field] as string[]).filter((item) => item !== value),
        }))
    }

    const getActiveFiltersCount = () => {
        let count = 0
        if (searchParams.keyword) count++
        if (searchParams.from.length > 0) count++
        if (searchParams.subjects.length > 0) count++
        if (searchParams.contentTypes.length > 0) count++
        if (searchParams.accessTypes.length > 0) count++
        if (searchParams.countries.length > 0) count++
        if (searchParams.institutionTypes.length > 0) count++
        if (searchParams.dateRange.start || searchParams.dateRange.end) count++
        if (searchParams.hasCertificates) count++
        if (searchParams.hasAPI) count++
        return count
    }

    const activeFiltersCount = getActiveFiltersCount()

    return (
        <Card className="bg-card/50 backdrop-blur-sm border-border">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Filter className="h-5 w-5 text-primary" />
                                <CardTitle className="text-lg text-card-foreground">高级搜索</CardTitle>
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
                        {/* Keyword Search */}
                        <div className="space-y-2">
                            <Label htmlFor="keyword" className="text-sm font-medium text-card-foreground">
                                关键词搜索
                            </Label>
                            <Input
                                id="keyword"
                                placeholder="输入关键词..."
                                value={searchParams.keyword}
                                onChange={(e) => setSearchParams((prev) => ({ ...prev, keyword: e.target.value }))}
                                className="bg-background border-border"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Data Sources */}
                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-card-foreground">数据源</Label>
                                <div className="space-y-2">
                                    {from.map((source) => (
                                        <div key={source.value} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`source-${source.value}`}
                                                checked={searchParams.from.includes(source.value)}
                                                onCheckedChange={(checked) => updateArrayField("from", source.value, checked as boolean)}
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

                            {/* Access Types */}
                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-card-foreground">访问类型</Label>
                                <div className="space-y-2">
                                    {accessTypes.map((access) => (
                                        <div key={access.value} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`access-${access.value}`}
                                                checked={searchParams.accessTypes.includes(access.value)}
                                                onCheckedChange={(checked) => updateArrayField("accessTypes", access.value, checked as boolean)}
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

                            {/* Special Features */}
                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-card-foreground">特殊功能</Label>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="has-certificates"
                                            checked={searchParams.hasCertificates}
                                            onCheckedChange={(checked) =>
                                                setSearchParams((prev) => ({
                                                    ...prev,
                                                    hasCertificates: checked as boolean
                                                }))
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
                                            checked={searchParams.hasAPI}
                                            onCheckedChange={(checked) =>
                                                setSearchParams((prev) => ({ ...prev, hasAPI: checked as boolean }))
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

                        {/* Subjects */}
                        <div className="space-y-3">
                            <Label className="text-sm font-medium text-card-foreground">学科领域</Label>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                {subjects.map((subject) => (
                                    <div key={subject} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`subject-${subject}`}
                                            checked={searchParams.subjects.includes(subject)}
                                            onCheckedChange={(checked) => updateArrayField("subjects", subject, checked as boolean)}
                                        />
                                        <Label htmlFor={`subject-${subject}`}
                                               className="text-sm text-muted-foreground cursor-pointer">
                                            {subject}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Content Types */}
                        <div className="space-y-3">
                            <Label className="text-sm font-medium text-card-foreground">内容类型</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {contentTypes.map((type) => (
                                    <div key={type} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`content-${type}`}
                                            checked={searchParams.contentTypes.includes(type)}
                                            onCheckedChange={(checked) => updateArrayField("contentTypes", type, checked as boolean)}
                                        />
                                        <Label htmlFor={`content-${type}`}
                                               className="text-sm text-muted-foreground cursor-pointer">
                                            {type}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Date Range */}
                        <div className="space-y-3">
                            <Label className="text-sm font-medium text-card-foreground">建立时间范围</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="start-date" className="text-xs text-muted-foreground">
                                        开始时间
                                    </Label>
                                    <Input
                                        id="start-date"
                                        type="date"
                                        value={searchParams.dateRange.start || ""}
                                        onChange={(e) =>
                                            setSearchParams((prev) => ({
                                                ...prev,
                                                dateRange: { ...prev.dateRange, start: e.target.value },
                                            }))
                                        }
                                        className="bg-background border-border"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="end-date" className="text-xs text-muted-foreground">
                                        结束时间
                                    </Label>
                                    <Input
                                        id="end-date"
                                        type="date"
                                        value={searchParams.dateRange.end || ""}
                                        onChange={(e) =>
                                            setSearchParams((prev) => ({
                                                ...prev,
                                                dateRange: { ...prev.dateRange, end: e.target.value },
                                            }))
                                        }
                                        className="bg-background border-border"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 pt-4 border-t border-border">
                            <Button onClick={handleSearch}
                                    className="bg-primary text-primary-foreground hover:bg-primary/90">
                                <Search className="h-4 w-4 mr-2" />
                                应用筛选
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleReset}
                                className="border-border text-muted-foreground hover:bg-accent bg-transparent"
                            >
                                <X className="h-4 w-4 mr-2" />
                                重置筛选
                            </Button>
                            {activeFiltersCount > 0 && (
                                <div
                                    className="text-sm text-muted-foreground">已设置 {activeFiltersCount} 个筛选条件</div>
                            )}
                        </div>
                    </CardContent>
                </CollapsibleContent>
            </Collapsible>
        </Card>
    )
}
