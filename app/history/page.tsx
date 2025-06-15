"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Trash2, Users, History } from "lucide-react"
import { getHistory, clearHistory, deleteHistoryItem } from "../lib/storage"
import { useTheme } from "../contexts/theme-context"
import Link from "next/link"

interface HistoryEntry {
  sourceLang: string
  targetLang: string
  input: string
  output: string
  timestamp: string
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const { theme, isDarkMode, dataCollection } = useTheme()

  useEffect(() => {
    setHistory(getHistory())
  }, [])

  const handleClearHistory = () => {
    if (confirm("Are you sure you want to delete all translation history?")) {
      clearHistory()
      setHistory([])
    }
  }

  const handleDeleteItem = (index: number) => {
    if (confirm("Are you sure you want to delete this history entry?")) {
      deleteHistoryItem(index)
      setHistory(getHistory())
    }
  }

  // Format timestamp to a readable format
  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp)
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }).format(date)
    } catch (error) {
      return ""
    }
  }

  return (
    <div className={`min-h-screen ${theme.backgroundColor} flex flex-col`}>
      {/* Header */}
      <header className="flex items-center p-6">
        <div className="max-w-4xl mx-auto w-full flex items-center">
          <Link href="/">
            <Button variant="ghost" size="icon" className={`${theme.textColor} hover:bg-black/10 mr-4`}>
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className={`text-2xl font-bold ${theme.textColor}`}>History</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 sm:px-6 pb-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 h-full">
            {!dataCollection ? (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <Card className={`${theme.cardColor} rounded-3xl shadow-lg p-8`}>
                  <div className="text-center">
                    <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-4`}>
                      History is unavailable
                    </p>
                    <p className={`text-base ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      Data collection is disabled. Enable it in Settings to save translation history.
                    </p>
                  </div>
                </Card>
              </div>
            ) : history.length === 0 ? (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <Card className={`${theme.cardColor} rounded-3xl shadow-lg p-8`}>
                  <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"} text-center`}>
                    No translation history yet.
                  </p>
                </Card>
              </div>
            ) : (
              <>
                <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto">
                  {history.map((entry, index) => (
                    <Card key={index} className={`${theme.cardColor} rounded-2xl shadow-sm`}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-2">
                              <div className={`font-semibold ${theme.textColor}`}>
                                {entry.sourceLang} → {entry.targetLang}
                              </div>
                              <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                {formatTimestamp(entry.timestamp)}
                              </div>
                            </div>
                            <div className={`${theme.textColor} mb-2`}>{entry.input}</div>
                            <div className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} italic`}>
                              {entry.output}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteItem(index)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center pt-4">
                  <Button
                    onClick={handleClearHistory}
                    className={`${theme.buttonsColor} hover:opacity-90 text-white px-8 py-3 rounded-full font-medium`}
                  >
                    CLEAR HISTORY
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="relative">
        <div className={`${theme.buttonsColor} px-6 py-4 flex justify-center`}>
          <div className="max-w-4xl w-full flex justify-between items-center">
            <Link href="/" className="flex flex-col items-center text-white">
              <Users className="h-6 w-6 mb-1" />
              <span className="text-sm">Translation</span>
            </Link>

            <div className="w-16" />

            <div className="flex flex-col items-center text-white opacity-100">
              <History className="h-6 w-6 mb-1" />
              <span className="text-sm font-semibold">History</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
