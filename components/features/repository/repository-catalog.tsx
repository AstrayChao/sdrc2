"use client";

import { useState } from "react";
import { Grid, List, Search, SortAsc, SortDesc } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RealRepositoryCard } from "./real-repository-card";
import { AdvancedSearch } from "../search/advanced-search";
import { useRouter } from "next/navigation";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useRepositories } from "@/hooks/use-repository";
import InternalServerErrorPage from "@/app/500";
import { RepositoryListSkeleton } from "@/components/features/repository/ssr/repository-list-skeleton";

export function RepositoryCatalog() {
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [page, setPage] = useState(1);
    const router = useRouter();
    const [advancedFilters, setAdvancedFilters] = useState<Record<string, any>>({});
    const { data, isLoading, error } = useRepositories({ searchTerm, page, sortBy, sortOrder, ...advancedFilters })

    if (error) {
        return <InternalServerErrorPage />
    }

    const repositories = data?.data?.repositories || [];
    const pagination = data?.data?.pagination || { page: 1, limit: 20, total: 0, totalPages: 1 };

    const handleResetSearch = () => {
        setSearchTerm("");
        setPage(1);
    };


    const handleViewDetail = (id: string) => {
        router.push(`/catalog/${id}`);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleToggleExpand = (id: string) => {
        const newExpanded = new Set(expandedCards);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedCards(newExpanded);
    };

    const handleAdvancedSearch = (searchParams: any) => {
        setSearchTerm(searchParams.keyword || "");
        setPage(1);
        setAdvancedFilters({
            from: searchParams.from,
            subjects: searchParams.subjects,
            contentTypes: searchParams.contentTypes,
            accessTypes: searchParams.accessTypes,
            countries: searchParams.countries,
            institutionTypes: searchParams.institutionTypes,
            startYear: searchParams.dateRange.start,
            hasCertificates: searchParams.hasCertificates,
            hasAPI: searchParams.hasAPI,
        });
    };


    return (
        <div className="container space-y-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">科学数据仓库目录</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    发现和探索全球科学数据仓库，包含来自 re3data、FAIRsharing 和 GCBR 的综合数据
                </p>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <Badge className="px-3 py-1">{pagination.total} 个数据库</Badge>
                    <Badge variant="outline" className="px-3 py-1">
                        {new Set(repositories.flatMap((r) => r.from || [])).size} 个数据源
                    </Badge>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="space-y-6">
                {/* Main search */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="搜索仓库名称、描述或主题..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-32">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="name">名称</SelectItem>
                                <SelectItem value="lastUpdate">更新时间</SelectItem>
                                <SelectItem value="source">数据源</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                            {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> :
                                <SortDesc className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>

                {/* Advanced Search */}
                <AdvancedSearch onSearch={handleAdvancedSearch} onReset={handleResetSearch} />

                {/* View controls */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button
                            variant={viewMode === "list" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setViewMode("list")}>
                            <List className="h-4 w-4 mr-2" />
                            列表视图
                        </Button>
                        <Button
                            variant={viewMode === "grid" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setViewMode("grid")}>
                            <Grid className="h-4 w-4 mr-2" />
                            网格视图
                        </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        显示 {pagination.total} 个结果 (第 {pagination.page}/{pagination.totalPages} 页)
                    </div>
                </div>
            </div>

            {
                isLoading ? (
                        <RepositoryListSkeleton />
                    ) :
                    repositories && repositories.length > 0 ?
                        (
                            <div
                                className={`grid gap-6 ${
                                    viewMode === "grid" ? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                                }`}>
                                {repositories.map((repository) => (
                                        <RealRepositoryCard
                                            key={repository.id}
                                            repository={repository}
                                            expanded={expandedCards.has(repository.id!)}
                                            onToggle={handleToggleExpand}
                                            onViewDetail={handleViewDetail}
                                            viewMode={viewMode}
                                        />
                                    )
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-muted/30 rounded-xl">
                                <div
                                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                                    <Search className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">未找到匹配的仓库</h3>
                                <p className="text-muted-foreground max-w-md mx-auto">
                                    尝试调整搜索条件或清除筛选器以查看所有结果。
                                </p>
                                <Button variant="outline" className="mt-4" onClick={handleResetSearch}>
                                    清除筛选
                                </Button>
                            </div>)
            }
            {pagination.totalPages > 1 && (
                <Pagination className="mt-8">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={page === 1 ? undefined : () => handlePageChange(Math.max(1, page - 1))}
                                className={page === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                            />
                        </PaginationItem>

                        {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                            const pageNum = Math.max(1, Math.min(
                                pagination.totalPages - 4,
                                page - 2
                            )) + i
                            return (
                                <PaginationItem key={pageNum}>
                                    <PaginationLink
                                        className="cursor-pointer"
                                        isActive={pageNum === page}
                                        onClick={() => handlePageChange(pageNum)}
                                    >
                                        {pageNum}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        })}

                        <PaginationItem>
                            <PaginationNext
                                onClick={page === pagination.totalPages ? undefined : () => handlePageChange(Math.min(pagination.totalPages, page + 1))}
                                className={page === pagination.totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
}
