import { NextRequest } from "next/server";
import { z } from "zod";
import { createErrorResponse, createSuccessResponse } from "@/lib/api/response";
import { getRepositories } from "@/lib/db/repo";

// 请求参数验证模式
const searchParamsSchema = z.object({
    q: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    source: z.enum(["re3data", "fairsharing", "gcbr", "all"]).default("all"),
    subjects: z.string().optional(),
    sortBy: z.enum(["name", "lastUpdate", "source"]).default("name"),
    sortOrder: z.enum(["asc", "desc"]).default("asc"),
    from: z.string().optional(),
    contentTypes: z.string().optional(),
    accessTypes: z.string().optional(),
    countries: z.string().optional(),
    institutionTypes: z.string().optional(),
    startYear: z.string().optional(),
    hasCertificates: z.boolean().optional(),
    hasAPI: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
    try {
        // 解析和验证请求参数
        const { searchParams } = new URL(request.url);

        const validationResult = searchParamsSchema.safeParse(
            Object.fromEntries(searchParams)
        );

        if (!validationResult.success) {
            return createErrorResponse(
                "Invalid parameters",
                400,
                validationResult.error.errors
            );
        }

        const params = validationResult.data;
        // 获取仓库数据
        const result = await getRepositories({
            q: params.q,
            page: params.page,
            limit: params.limit,
            source: params.source,
            subjects: params.subjects?.split(",").toString(),
            sortBy: params.sortBy,
            sortOrder: params.sortOrder,
            from: params.from,
            contentTypes: params.contentTypes?.split(",").toString(),
            accessTypes: params.accessTypes?.split(",").toString(),
            institutionTypes: params.institutionTypes?.split(",").toString(),
            startYear: params.startYear,
            hasCertificates: params.hasCertificates,
            hasAPI: params.hasAPI,
        });
        return createSuccessResponse({
            repositories: result.repositories,
            pagination: {
                page: params.page,
                limit: params.limit,
                total: result.total,
                totalPages: Math.ceil(result.total / params.limit),
            },
        });
    } catch (error) {
        console.error("API Error:", error);
        return createErrorResponse("Internal server error", 500);
    }
}