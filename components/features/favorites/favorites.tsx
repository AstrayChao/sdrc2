"use client"

import { useEffect, useState } from "react"
import { Heart, Search, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { RealRepositoryCard } from "../repository/real-repository-card"
import { RealRepositoryDetail } from "../repository/real-repository-detail"
import { getProcessedRepositories } from "@/lib/data/real-data"
import type { Repository } from "@/types/repository"

export function Favorites() {
    const [favorites, setFavorites] = useState<Set<string>>(new Set())
    const [repositories, setRepositories] = useState<Repository[]>([])
    const [favoriteRepositories, setFavoriteRepositories] = useState<Repository[]>([])
    const [filteredFavorites, setFilteredFavorites] = useState<Repository[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedRepository, setSelectedRepository] = useState<Repository | null>(null)
    const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            try {
                // Load repositories
                const data = getProcessedRepositories()
                setRepositories(data)

                // Load favorites from localStorage
                const savedFavorites = localStorage.getItem("repository-favorites")
                if (savedFavorites) {
                    const favoriteIds = new Set(JSON.parse(savedFavorites))
                    setFavorites(favoriteIds)

                    // Filter favorite repositories
                    const favoriteRepos = data.filter((repo) => favoriteIds.has(repo.id))
                    setFavoriteRepositories(favoriteRepos)
                    setFilteredFavorites(favoriteRepos)
                }
            } catch (error) {
                console.error("加载收藏数据失败:", error)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    useEffect(() => {
        const filtered = favoriteRepositories.filter(
            (repo) =>
                repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                repo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                repo.subjects?.some((subject) => subject.toLowerCase().includes(searchTerm.toLowerCase())),
        )
        setFilteredFavorites(filtered)
    }, [favoriteRepositories, searchTerm])

    const handleToggleExpand = (id: string) => {
        const newExpanded = new Set(expandedCards)
        if (newExpanded.has(id)) {
            newExpanded.delete(id)
        } else {
            newExpanded.add(id)
        }
        setExpandedCards(newExpanded)
    }

    const handleRemoveFavorite = (id: string) => {
        const newFavorites = new Set(favorites)
        newFavorites.delete(id)
        setFavorites(newFavorites)

        // Update localStorage
        localStorage.setItem("repository-favorites", JSON.stringify(Array.from(newFavorites)))

        // Update favorite repositories
        const updatedFavorites = favoriteRepositories.filter((repo) => repo.id !== id)
        setFavoriteRepositories(updatedFavorites)
        setFilteredFavorites(
            updatedFavorites.filter(
                (repo) =>
                    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    repo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    repo.subjects?.some((subject) => subject.toLowerCase().includes(searchTerm.toLowerCase())),
            ),
        )
    }

    const handleClearAllFavorites = () => {
        setFavorites(new Set())
        setFavoriteRepositories([])
        setFilteredFavorites([])
        localStorage.removeItem("repository-favorites")
    }

    if (selectedRepository) {
        return <RealRepositoryDetail repository={selectedRepository} onBack={() => setSelectedRepository(null)} />
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground">正在加载收藏数据...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <Heart className="h-10 w-10 text-red-500 fill-red-500" />
                    <h1 className="text-4xl font-bold text-foreground">我的收藏</h1>
                </div>
                <p className="text-lg text-muted-foreground">管理您收藏的科学数据仓库</p>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <Badge variant="outline" className="px-3 py-1">
                        {favoriteRepositories.length} 个收藏
                    </Badge>
                    {searchTerm && (
                        <Badge variant="outline" className="px-3 py-1">
                            {filteredFavorites.length} 个搜索结果
                        </Badge>
                    )}
                </div>
            </div>

            {favoriteRepositories.length === 0 ? (
                <Card className="bg-card/50 backdrop-blur-sm border-border">
                    <CardContent className="text-center py-16">
                        <Heart className="h-16 w-16 mx-auto mb-6 text-muted-foreground opacity-50" />
                        <h3 className="text-xl font-semibold text-card-foreground mb-2">还没有收藏任何仓库</h3>
                        <p className="text-muted-foreground mb-6">浏览数据仓库目录，点击心形图标来收藏您感兴趣的仓库</p>
                        <Button
                            onClick={() => (window.location.href = "/catalog")}
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            浏览数据仓库
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <>
                    {/* Search and Actions */}
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="搜索收藏的仓库..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-background border-border"
                                />
                            </div>
                            <Button
                                variant="outline"
                                onClick={handleClearAllFavorites}
                                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 bg-transparent"
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                清空收藏
                            </Button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div
                                className="text-sm text-muted-foreground">显示 {filteredFavorites.length} 个收藏的仓库
                            </div>
                        </div>
                    </div>

                    {/* Favorites Grid */}
                    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                        {filteredFavorites.map((repository) => (
                            <RealRepositoryCard
                                key={repository.id}
                                repository={repository}
                                expanded={expandedCards.has(repository.id)}
                                onToggle={handleToggleExpand}
                                onViewDetail={setSelectedRepository}
                                onToggleFavorite={handleRemoveFavorite}
                                isFavorite={true}
                                viewMode="grid"
                            />
                        ))}
                    </div>

                    {filteredFavorites.length === 0 && searchTerm && (
                        <Card className="bg-card/50 backdrop-blur-sm border-border">
                            <CardContent className="text-center py-12">
                                <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                                <h3 className="text-lg font-semibold text-card-foreground mb-2">未找到匹配的收藏</h3>
                                <p className="text-muted-foreground">尝试使用不同的关键词搜索您的收藏</p>
                            </CardContent>
                        </Card>
                    )}
                </>
            )}
        </div>
    )
}
