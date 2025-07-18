import { NextRequest, NextResponse } from "next/server";
import { createErrorResponse } from "@/lib/api/response";

// 速率限制配置
interface RateLimitConfig {
    windowMs: number; // 时间窗口（毫秒）
    max: number; // 最大请求数
}

// 简单的内存存储（生产环境应使用 Redis）
const requestCounts = new Map<string, {count: number; resetTime: number}>();

// 速率限制中间件
export function rateLimitMiddleware(config: RateLimitConfig = { windowMs: 60000, max: 100 }) {
    return (handler: Function) => {
        return async (request: NextRequest, ...args: any[]) => {
            const ip = request.headers.get("x-forwarded-for") || "unknown";
            const now = Date.now();

            const record = requestCounts.get(ip);

            if (!record || now > record.resetTime) {
                // 新的时间窗口
                requestCounts.set(ip, {
                    count: 1,
                    resetTime: now + config.windowMs,
                });
            } else if (record.count >= config.max) {
                // 超过限制
                return createErrorResponse(
                    "Too many requests",
                    429,
                    {
                        retryAfter: Math.ceil((record.resetTime - now) / 1000),
                    }
                );
            } else {
                // 增加计数
                record.count++;
            }

            // 继续处理请求
            return handler(request, ...args);
        };
    };
}

// CORS中间件
export function corsMiddleware(allowedOrigins: string[] = ["*"]) {
    return (handler: Function) => {
        return async (request: NextRequest, ...args: any[]) => {
            const origin = request.headers.get("origin") || "";

            // 处理预检请求
            if (request.method === "OPTIONS") {
                return new NextResponse(null, {
                    status: 200,
                    headers: {
                        "Access-Control-Allow-Origin": allowedOrigins.includes("*") ? "*" : origin,
                        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                        "Access-Control-Allow-Headers": "Content-Type, Authorization",
                        "Access-Control-Max-Age": "86400",
                    },
                });
            }

            // 处理实际请求
            const response = await handler(request, ...args);

            // 添加CORS头
            if (response instanceof NextResponse) {
                response.headers.set(
                    "Access-Control-Allow-Origin",
                    allowedOrigins.includes("*") ? "*" : origin
                );
            }

            return response;
        };
    };
}

// 日志中间件
export function loggingMiddleware() {
    return (handler: Function) => {
        return async (request: NextRequest, ...args: any[]) => {
            const start = Date.now();
            const { pathname, searchParams } = new URL(request.url);

            console.log(`[${new Date().toISOString()}] ${request.method} ${pathname}`);

            try {
                const response = await handler(request, ...args);
                const duration = Date.now() - start;

                console.log(
                    `[${new Date().toISOString()}] ${request.method} ${pathname} - ${
                        response.status
                    } - ${duration}ms`
                );

                return response;
            } catch (error) {
                const duration = Date.now() - start;
                console.error(
                    `[${new Date().toISOString()}] ${request.method} ${pathname} - ERROR - ${duration}ms`,
                    error
                );
                throw error;
            }
        };
    };
}

// 组合多个中间件
export function composeMiddleware(...middlewares: Function[]) {
    return (handler: Function) => {
        return middlewares.reduceRight(
            (next, middleware) => middleware(next),
            handler
        );
    };
}