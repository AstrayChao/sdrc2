// components/shared/pagination-server.tsx
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'

interface PaginationServerProps {
    pagination: {
        page: number
        totalPages: number
        total: number
        limit: number
    }
}

export function PaginationServer({ pagination }: PaginationServerProps) {
    const { page, totalPages } = pagination

    // 生成页码数组
    const generatePageNumbers = () => {
        const pages: (number | string)[] = []
        const maxVisible = 5

        if (totalPages <= maxVisible + 2) {
            // 如果总页数较少，显示所有页码
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // 总是显示第一页
            pages.push(1)

            if (page <= 3) {
                // 当前页靠近开头
                for (let i = 2; i <= maxVisible; i++) {
                    pages.push(i)
                }
                pages.push('...')
                pages.push(totalPages)
            } else if (page >= totalPages - 2) {
                // 当前页靠近结尾
                pages.push('...')
                for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
                    pages.push(i)
                }
            } else {
                // 当前页在中间
                pages.push('...')
                for (let i = page - 1; i <= page + 1; i++) {
                    pages.push(i)
                }
                pages.push('...')
                pages.push(totalPages)
            }
        }

        return pages
    }

    const pageNumbers = generatePageNumbers()

    // 构建带有当前查询参数的 URL
    const buildPageUrl = (pageNum: number) => {
        if (typeof window === 'undefined') {
            return `/catalog?page=${pageNum}`
        }
        const params = new URLSearchParams(window.location.search)
        params.set('page', pageNum.toString())
        return `/catalog?${params.toString()}`
    }

    return (
        <Pagination className="mt-8">
            <PaginationContent>
                <PaginationItem>
                    {page === 1 ? (
                        <PaginationPrevious
                            className="opacity-50 cursor-not-allowed pointer-events-none"
                            aria-disabled="true"
                        />
                    ) : (
                        <PaginationPrevious href={buildPageUrl(page - 1)} />
                    )}
                </PaginationItem>

                {pageNumbers.map((pageNum, index) => (
                    <PaginationItem key={index}>
                        {pageNum === '...' ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink href={buildPageUrl(pageNum as number)} isActive={pageNum === page}>
                                {pageNum}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    {page === totalPages ? (
                        <PaginationNext
                            className="opacity-50 cursor-not-allowed pointer-events-none"
                            aria-disabled="true"
                        />
                    ) : (
                        <PaginationNext />
                    )}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}