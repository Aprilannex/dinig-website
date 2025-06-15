"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Lightbulb } from "lucide-react"
import { useTheme } from "../contexts/theme-context"
import Link from "next/link"

export default function TriviaPage() {
  const [trivia, setTrivia] = useState("")
  const [loading, setLoading] = useState(true)
  const { theme, isDarkMode, dailyTips } = useTheme()

  useEffect(() => {
    const loadTrivia = async () => {
      try {
        // If daily tips are disabled, don't load trivia
        if (!dailyTips) {
          setTrivia("")
          setLoading(false)
          return
        }

        if (typeof window !== "undefined") {
          const savedTrivia = localStorage.getItem("trivia")
          const lastFetched = localStorage.getItem("triviaTimestamp")
          const now = new Date().getTime()

          // If it's been less than 24 hours, use cached trivia
          if (savedTrivia && lastFetched && now - Number.parseInt(lastFetched) < 24 * 60 * 60 * 1000) {
            setTrivia(savedTrivia)
            setLoading(false)
            return
          }

          // Otherwise, fetch new trivia
          const response = await fetch("/api/trivia")
          if (response.ok) {
            const data = await response.json()
            setTrivia(data.trivia)
            localStorage.setItem("trivia", data.trivia)
            localStorage.setItem("triviaTimestamp", now.toString())
          } else {
            setTrivia(
              "The Philippines is home to over 175 languages, making it one of the most linguistically diverse countries in the world!",
            )
          }
        }
        setLoading(false)
      } catch (error) {
        setTrivia(
          "The Philippines is home to over 175 languages, making it one of the most linguistically diverse countries in the world!",
        )
        setLoading(false)
        console.error(error)
      }
    }

    loadTrivia()
  }, [dailyTips])

  return (
    <div className={`min-h-screen ${theme.backgroundColor}`}>
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" size="icon" className={`${theme.textColor} hover:bg-black/10 mr-4`}>
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
            <h1 className={`text-2xl font-bold ${theme.textColor}`}>Trivia</h1>
          </div>
          <Lightbulb className={`h-6 w-6 ${theme.textColor}`} />
        </div>
      </header>

      {/* Content */}
      <main className="px-4 sm:px-6 pb-6">
        <div className="max-w-2xl mx-auto">
          <Card className={`${theme.cardColor} rounded-3xl shadow-lg`}>
            <CardContent className="p-6 text-center">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : !dailyTips ? (
                <div className="py-8">
                  <h2 className={`text-xl font-bold ${theme.textColor} mb-6`}>Trivia Unavailable</h2>
                  <p className={`${theme.textColor} text-lg`}>
                    Daily language tips are currently disabled. Enable them in Settings to view trivia.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className={`text-xl font-bold ${theme.textColor} mb-6`}>DID YOU KNOW?</h2>
                  <div className={`${theme.textColor} text-lg leading-relaxed space-y-4`}>
                    {trivia.includes("Source:") ? (
                      <>
                        <p>{trivia.split("Source:")[0].trim()}</p>
                        <div className="border-t border-gray-300 pt-4 mt-4">
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} italic`}>
                            Source: {trivia.split("Source:")[1].trim()}
                          </p>
                        </div>
                      </>
                    ) : (
                      <p>{trivia}</p>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
