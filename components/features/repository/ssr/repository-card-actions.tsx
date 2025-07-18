// components/features/repository/repository-card-actions.tsx
'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface RepositoryCardActionsProps {
    repositoryId: string
}

export function RepositoryCardActions({ repositoryId }: RepositoryCardActionsProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className="flex items-center gap-2">
            {/* 展开/收起按钮 */}
            <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setIsExpanded(!isExpanded)
                }}
                className="text-muted-foreground hover:text-foreground"
            >
                {isExpanded ? (
                    <>
                        <ChevronUp className="h-4 w-4 mr-1" />
                        收起
                    </>
                ) : (
                    <>
                        <ChevronDown className="h-4 w-4 mr-1" />
                        展开
                    </>
                )}
            </Button>
        </div>
    )
}