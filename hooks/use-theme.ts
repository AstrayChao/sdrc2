"use client"

import { useState, useEffect } from "react"
import { themes } from "@/lib/themes"
import type { Theme } from "@/types/theme"

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState("light")

  useEffect(() => {
    const saved = localStorage.getItem("repository-theme")
    if (saved && themes[saved]) {
      setCurrentTheme(saved)
    }
  }, [])

  const changeTheme = (themeName: string) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName)
      localStorage.setItem("repository-theme", themeName)
    }
  }

  const theme: Theme = themes[currentTheme] || themes.light

  return {
    currentTheme,
    theme,
    changeTheme,
  }
}
