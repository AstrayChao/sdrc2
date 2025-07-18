// components/features/repository/repository-search-client.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDebounce } from '@/hooks/use-debounce'

interface RepositorySearchProps {
    defaultValue?: string
}

export function RepositorySearch({ defaultValue = '' }: RepositorySearchProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()
    const [searchTerm, setSearchTerm] = useState(defaultValue)
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)

    const debouncedSearchTerm = useDebounce(searchTerm, 300)

    // 获取搜索建议
    useEffect(() => {
        if (debouncedSearchTerm && debouncedSearchTerm.length >= 2) {
            fetch(`/api/suggestions?q=${encodeURIComponent(debouncedSearchTerm)}`)
                .then(res => res.json())
                .then(data => {
                    setSuggestions(data.suggestions || [])
                    setShowSuggestions(true)
                })
                .catch(() => {
                    setSuggestions([])
                })
        } else {
            setSuggestions([])
            setShowSuggestions(false)
        }
    }, [debouncedSearchTerm])

    const handleSearch = (value?: string) => {
        const searchValue = value ?? searchTerm
        const params = new URLSearchParams(searchParams)

        if (searchValue) {
            params.set('q', searchValue)
        } else {
            params.delete('q')
        }
        params.set('page', '1') // 重置页码

        setShowSuggestions(false)

        startTransition(() => {
            router.push(`/catalog?${params.toString()}`)
        })
    }

    const handleClear = () => {
        setSearchTerm('')
        const params = new URLSearchParams(searchParams)
        params.delete('q')
        params.set('page', '1')

        startTransition(() => {
            router.push(`/catalog?${params.toString()}`)
        })
    }

    const handleSuggestionClick = (suggestion: string) => {
        setSearchTerm(suggestion)
        handleSearch(suggestion)
    }

    return (
        <div className="relative">
            <form onSubmit={(e) => {
                e.preventDefault()
                handleSearch()
            }} className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="搜索仓库名称、描述或主题..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                        className="pl-10 pr-10"
                        disabled={isPending}
                    />
                    {searchTerm && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                            onClick={handleClear}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
                <Button type="submit" disabled={isPending}>
                    {isPending ? '搜索中...' : '搜索'}
                </Button>
            </form>

            {/* 搜索建议下拉框 */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg">
                    <ul className="py-1">
                        {suggestions.map((suggestion, index) => (
                            <li key={index}>
                                <button
                                    type="button"
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    <Search className="inline-block w-3 h-3 mr-2 text-muted-foreground" />
                                    {suggestion}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}