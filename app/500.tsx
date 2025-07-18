import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function InternalServerErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h2 className="text-2xl font-bold mb-4">服务器错误</h2>
            <p className="text-muted-foreground mb-6">请稍后再试或联系管理员。</p>
            <Button asChild>
                <Link href="/">返回首页</Link>
            </Button>
        </div>
    );
}