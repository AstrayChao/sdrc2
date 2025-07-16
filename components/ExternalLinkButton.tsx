// components/ExternalLinkButton.tsx
"use client"

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ExternalLinkButtonProps {
    url: string
    children?: ReactNode
    className?: string
    label?: string
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export function ExternalLinkButton({
                                       url,
                                       children,
                                       label = "",
                                       className = "",
                                       variant = "default"
                                   }: ExternalLinkButtonProps) {
    const handleClick = () => {
        window.open(url, "_blank")
    }

    return (
        <Button
            onClick={handleClick}
            variant={variant}
            className={className}
        >
            {children ? (
                children
            ) : (
                <>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {label}
                </>
            )}
        </Button>
    )
}