import { NextRequest } from "next/server";
import { z } from "zod";
import { createErrorResponse, createSuccessResponse } from "@/lib/api/response";
import { getRepositoryById } from "@/lib/db/repo";

// 参数验证
const paramsSchema = z.object({
    id: z.string().min(1),
});

export async function GET(
    request: NextRequest,
    { params }: {params: Promise<{id: string}>}
) {
    try {
        // 解析参数
        const { id } = await params;

        // 验证参数
        const validationResult = paramsSchema.safeParse({ id });
        if (!validationResult.success) {
            return createErrorResponse("Invalid repository ID", 400);
        }

        // 获取仓库详情
        const repository = await getRepositoryById(id);

        if (!repository) {
            return createErrorResponse("Repository not found", 404);
        }

        // 返回成功响应
        return createSuccessResponse({
            repository,
        });
    } catch (error) {
        console.error("API Error:", error);
        return createErrorResponse("Internal server error", 500);
    }
}