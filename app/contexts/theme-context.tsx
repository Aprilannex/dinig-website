"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Theme {
  backgroundColor: string
  textColor: string
  cardColor: string
  buttonsColor: string
}

interface ThemeContextType {
  isDarkMode: boolean
  toggleTheme: () => void
  theme: Theme
  fontSize: number
  setAppFontSize: (size: number) => void
  dailyTips: boolean
  setDailyTips: (value: boolean) => void
  dataCollection: boolean
  setDataCollection: (value: boolean) => void
  voiceCommands: boolean
  setVoiceCommands: (value: boolean) => void
}

const lightTheme: Theme = {
  backgroundColor: "bg-gradient-to-b from-blue-300 to-blue-400",
  textColor: "text-black",
  cardColor: "bg-white",
  buttonsColor: "bg-orange-400",
}

const darkTheme: Theme = {
  backgroundColor: "bg-gradient-to-b from-gray-800 to-gray-900",
  textColor: "text-white",
  cardColor: "bg-gray-800",
  buttonsColor: "bg-blue-600",
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [dailyTips, setDailyTips] = useState(true)
  const [dataCollection, setDataCollection] = useState(true)
  const [voiceCommands, setVoiceCommands] = useState(true)

  const theme = isDarkMode ? darkTheme : lightTheme

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    if (typeof window !== "undefined") {
      localStorage.setItem("isDarkMode", (!isDarkMode).toString())
    }
  }

  const setAppFontSize = (size: number) => {
    setFontSize(size)
    if (typeof window !== "undefined") {
      localStorage.setItem("fontSize", size.toString())
    }
  }

  // Save settings to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dailyTips", dailyTips.toString())
    }
  }, [dailyTips])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dataCollection", dataCollection.toString())
    }
  }, [dataCollection])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("voiceCommands", voiceCommands.toString())
    }
  }, [voiceCommands])

  // Load all settings from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("isDarkMode")
      const savedFontSize = localStorage.getItem("fontSize")
      const savedDailyTips = localStorage.getItem("dailyTips")
      const savedDataCollection = localStorage.getItem("dataCollection")
      const savedVoiceCommands = localStorage.getItem("voiceCommands")

      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === "true")
      }
      if (savedFontSize !== null) {
        setFontSize(Number.parseFloat(savedFontSize))
      }
      if (savedDailyTips !== null) {
        setDailyTips(savedDailyTips === "true")
      }
      if (savedDataCollection !== null) {
        setDataCollection(savedDataCollection === "true")
      }
      if (savedVoiceCommands !== null) {
        setVoiceCommands(savedVoiceCommands === "true")
      }
    }
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        theme,
        fontSize,
        setAppFontSize,
        dailyTips,
        setDailyTips,
        dataCollection,
        setDataCollection,
        voiceCommands,
        setVoiceCommands,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
