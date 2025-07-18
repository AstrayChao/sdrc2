"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
                                        error,
                                        reset,
                                    }: {
    error: Error & {digest?: string};
    reset: () => void;
}) {
    useEffect(() => {
        // 你可以在这里上报错误
        console.error("Global error caught:", error);
    }, [error]);

    return (
        <html>
        <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h2 className="text-2xl font-bold mb-4">发生了错误</h2>
            <p className="text-muted-foreground mb-6">请稍后再试或联系管理员。</p>
            <div className="space-x-4">
                <Button onClick={() => reset()}>重试</Button>
                <Button asChild variant="outline">
                    <Link href="/">返回首页</Link>
                </Button>
            </div>
        </div>
        </body>
        </html>
    );
}
