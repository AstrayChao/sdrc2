import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getProcessedRepositories } from "@/lib/data/real-data"

const searchParamsSchema = z.object({
    q: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    source: z.enum(["re3data", "fairsharing", "gcbr", "all"]).default("all"),
    subjects: z.string().optional(),
})

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const params = searchParamsSchema.parse(Object.fromEntries(searchParams))

        let repositories = getProcessedRepositories()

        // 基础搜索过滤
        if (params.q) {
            const query = params.q.toLowerCase()
            repositories = repositories.filter(
                (repo) =>
                    repo.name.toLowerCase().includes(query) ||
                    repo.description.toLowerCase().includes(query) ||
                    repo.subjects?.some((s) => s.toLowerCase().includes(query)) ||
                    repo.keywords?.some((k) => k.toLowerCase().includes(query)),
            )
        }

        // 数据源过滤
        if (params.source !== "all") {
            repositories = repositories.filter((repo) => repo.from?.some((s) => params.source.includes(s.toLowerCase())))
        }

        // 主题过滤
        if (params.subjects) {
            const subjects = params.subjects.split(",")
            repositories = repositories.filter((repo) => repo.subjects?.some((s) => subjects.includes(s)))
        }

        // 分页
        const total = repositories.length
        const startIndex = (params.page - 1) * params.limit
        const paginatedRepositories = repositories.slice(startIndex, startIndex + params.limit)

        return NextResponse.json(
            {
                repositories: paginatedRepositories,
                pagination: {
                    page: params.page,
                    limit: params.limit,
                    total,
                    totalPages: Math.ceil(total / params.limit),
                },
            },
            {
                headers: {
                    "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
                },
            },
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: "Invalid parameters", details: error.errors }, { status: 400 })
        }

        console.error("API Error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
