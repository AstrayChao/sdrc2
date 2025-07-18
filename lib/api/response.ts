import { NextResponse } from "next/server";

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    details?: any;
    timestamp: string;
}

// 创建成功响应
export function createSuccessResponse<T>(
    data: T,
    status: number = 200,
    headers?: HeadersInit
): NextResponse<ApiResponse<T>> {
    return NextResponse.json(
        {
            success: true,
            data,
            timestamp: new Date().toISOString(),
        },
        {
            status,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
                ...headers,
            },
        }
    );
}

// 创建错误响应
export function createErrorResponse(
    error: string,
    status: number = 500,
    details?: any
): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
            details,
            timestamp: new Date().toISOString(),
        },
        {
            status,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}

// 处理API错误
export function handleApiError(error: unknown): NextResponse<ApiResponse> {
    console.error("API Error:", error);

    if (error instanceof Error) {
        // 根据错误类型返回不同的状态码
        if (error.message.includes("not found")) {
            return createErrorResponse(error.message, 404);
        }
        if (error.message.includes("unauthorized")) {
            return createErrorResponse(error.message, 401);
        }
        if (error.message.includes("forbidden")) {
            return createErrorResponse(error.message, 403);
        }
        if (error.message.includes("invalid") || error.message.includes("validation")) {
            return createErrorResponse(error.message, 400);
        }

        return createErrorResponse(error.message, 500);
    }

    return createErrorResponse("An unexpected error occurred", 500);
}

// 验证请求方法
export function validateMethod(
    request: Request,
    allowedMethods: string[]
): NextResponse<ApiResponse> | null {
    if (!allowedMethods.includes(request.method)) {
        return createErrorResponse(
            `Method ${request.method} not allowed`,
            405,
            { allowedMethods }
        );
    }
    return null;
}

// 解析请求体
export async function parseRequestBody<T>(request: Request): Promise<T> {
    try {
        const body = await request.json();
        return body as T;
    } catch (error) {
        throw new Error("Invalid request body");
    }
}
