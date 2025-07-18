// components/features/repository/repository-list-server.tsx
import { Repository } from '@/types/repository'
import { RepositoryCardServer } from './repository-card-server'
import { PaginationServer } from '@/components/pagination-server'
import { ViewModeToggle } from './view-mode-toggle'

interface RepositoryListServerProps {
    repositories: Repository[]
    pagination: {
        page: number
        limit: number
        total: number
        totalPages: number
    }
    viewMode?: 'grid' | 'list'
}

export function RepositoryListServer({
                                         repositories,
                                         pagination,
                                         viewMode = 'list'
                                     }: RepositoryListServerProps) {

    if (repositories.length === 0) {
        return (
            <div className="text-center py-12 bg-muted/30 rounded-xl">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">未找到匹配的仓库</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                    尝试调整搜索条件或清除筛选器以查看所有结果。
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* 结果统计和视图切换 */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    显示 {repositories.length} 个结果（共 {pagination.total} 个）
                </div>
                <ViewModeToggle currentMode={viewMode} />
            </div>

            {/* 仓库列表 */}
            <div className={`grid gap-6 ${
                viewMode === 'grid'
                    ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
                    : 'grid-cols-1'
            }`}>
                {repositories.map((repository) => (
                    <RepositoryCardServer
                        key={repository.id}
                        repository={repository}
                        viewMode={viewMode}
                    />
                ))}
            </div>

            {/* 分页 */}
            {pagination.totalPages > 1 && (
                <PaginationServer pagination={pagination} />
            )}
        </div>
    )
}