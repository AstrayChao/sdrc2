// components/BackButton.tsx
"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function BackButton() {
    return (
        <Link href="/catalog">
            <Button
                variant="outline"
                className="border-border text-foreground bg-transparent hover:bg-accent"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回目录
            </Button>
        </Link>
    )
}
