// components/features/repository/view-mode-toggle.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Grid, List } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ViewModeToggleProps {
    currentMode: 'grid' | 'list'
}

export function ViewModeToggle({ currentMode }: ViewModeToggleProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleViewModeChange = (mode: 'grid' | 'list') => {
        const params = new URLSearchParams(searchParams)
        params.set('viewMode', mode)
        router.push(`/catalog?${params.toString()}`)
    }

    return (
        <div className="flex items-center gap-2">
            <Button
                variant={currentMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleViewModeChange('list')}
            >
                <List className="h-4 w-4 mr-2" />
                列表视图
            </Button>
            <Button
                variant={currentMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleViewModeChange('grid')}
            >
                <Grid className="h-4 w-4 mr-2" />
                网格视图
            </Button>
        </div>
    )
}