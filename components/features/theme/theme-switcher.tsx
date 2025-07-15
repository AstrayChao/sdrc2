"use client"

import { Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ThemeSwitcherProps {
  currentTheme: string
  onThemeChange: (theme: string) => void
}

const themes = [
  { id: "light", name: "Light", color: "#ffffff" },
  { id: "dark", name: "Dark", color: "#1a1a1a" },
  { id: "blue", name: "Ocean Blue", color: "#0ea5e9" },
  { id: "green", name: "Forest Green", color: "#10b981" },
  { id: "purple", name: "Royal Purple", color: "#8b5cf6" },
  { id: "warm", name: "Warm Sunset", color: "#f59e0b" },
  { id: "autumn", name: "Autumn", color: "#dc2626" },
  { id: "winter", name: "Winter", color: "#06b6d4" },
  { id: "spring", name: "Spring", color: "#84cc16" },
  { id: "summer", name: "Summer", color: "#f97316" },
]

export function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  const currentThemeData = themes.find((t) => t.id === currentTheme) || themes[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="justify-start w-full">
          <div className="flex items-center">
            <div
              className="w-4 h-4 rounded-full mr-2 border border-gray-300"
              style={{ backgroundColor: currentThemeData.color }}
            />
            <Palette className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">{currentThemeData.name}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {themes.map((theme) => (
          <DropdownMenuItem key={theme.id} onClick={() => onThemeChange(theme.id)} className="flex items-center">
            <div
              className="w-4 h-4 rounded-full mr-2 border border-gray-300"
              style={{ backgroundColor: theme.color }}
            />
            {theme.name}
            {currentTheme === theme.id && <span className="ml-auto text-xs">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
