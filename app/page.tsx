"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mic, ArrowLeftRight, Copy, Trash2, Menu, Settings, Users, History } from "lucide-react"
import { useTheme } from "./contexts/theme-context"
import { translateTextWithOpenAI } from "./lib/translation"
import { saveToHistory } from "./lib/storage"
import { DrawerNavigation } from "./components/drawer-navigation"
import { Tutorial } from "./components/tutorial"
import { AnalyticsWrapper } from "./analytics"
import { useRouter } from "next/navigation"
import Link from "next/link"

const languages = ["English", "Bicol", "Cebuano", "Chavacano", "Hiligaynon", "Ilocano", "Maranao", "Tagalog", "Waray"]

export default function TranslationPage() {
  const [selectedLanguage1, setSelectedLanguage1] = useState("English")
  const [selectedLanguage2, setSelectedLanguage2] = useState("Tagalog")
  const [text, setText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [isTranslating, setIsTranslating] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)
  const { theme, isDarkMode, dataCollection, voiceCommands, fontSize } = useTheme()
  const router = useRouter()

  // Check if tutorial should be shown on first visit
  useEffect(() => {
    const tutorialCompleted = localStorage.getItem("dinig_tutorial_completed")
    if (!tutorialCompleted) {
      setShowTutorial(true)
    }
  }, [])

  // Auto-translate with debounce
  useEffect(() => {
    if (!text.trim()) {
      setTranslatedText("")
      return
    }

    const debounceTimeout = setTimeout(async () => {
      setIsTranslating(true)
      try {
        const result = await translateTextWithOpenAI(text, selectedLanguage1, selectedLanguage2)
        setTranslatedText(result)

        // Only save to history if data collection is enabled
        if (dataCollection) {
          await saveToHistory(selectedLanguage1, selectedLanguage2, text, result)
        }
      } catch (error) {
        console.error("Translation error:", error)
        const errorMessage = error instanceof Error ? error.message : "Translation failed. Please try again."
        setTranslatedText(`Error: ${errorMessage}`)
      } finally {
        setIsTranslating(false)
      }
    }, 500)

    return () => clearTimeout(debounceTimeout)
  }, [text, selectedLanguage1, selectedLanguage2, dataCollection])

  const swapLanguages = () => {
    setSelectedLanguage1(selectedLanguage2)
    setSelectedLanguage2(selectedLanguage1)
  }

  const clearText = () => {
    setText("")
    setTranslatedText("")
  }

  const copyToClipboard = async () => {
    if (translatedText) {
      await navigator.clipboard.writeText(translatedText)
    }
  }

  const startVoiceRecognition = () => {
    // Check if voice commands are enabled
    if (!voiceCommands) {
      alert("Voice commands are disabled. Please enable them in Settings.")
      return
    }

    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = selectedLanguage1 === "English" ? "en-US" : "fil-PH"

      recognition.onstart = () => setIsRecording(true)
      recognition.onend = () => setIsRecording(false)
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setText(transcript)
      }

      recognition.start()
    } else {
      alert("Speech recognition not supported in this browser")
    }
  }

  const handleTutorialComplete = () => {
    setShowTutorial(false)
  }

  return (
    <div className={`min-h-screen ${theme.backgroundColor} flex flex-col relative`}>
      {/* Tutorial Overlay */}
      {showTutorial && <Tutorial onComplete={handleTutorialComplete} />}

      <DrawerNavigation isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsDrawerOpen(false)} />
      )}

      {/* Header */}
      <header className="flex items-center justify-between p-6 relative z-30">
        <Button
          variant="ghost"
          size="icon"
          className={`${theme.textColor} hover:bg-black/10`}
          onClick={() => setIsDrawerOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        <h1 className={`text-3xl font-bold ${theme.textColor}`}>DINIG</h1>
        <Link href="/settings">
          <Button variant="ghost" size="icon" className={`${theme.textColor} hover:bg-black/10`}>
            <Settings className="h-6 w-6" />
          </Button>
        </Link>
      </header>

      {/* Main Content - Responsive Container */}
      <main className="flex-1 px-4 sm:px-6 pb-6">
        <div className="max-w-4xl mx-auto">
          <Card className={`${theme.cardColor} rounded-3xl shadow-lg h-full`}>
            <CardContent className="p-4 sm:p-6 h-full flex flex-col">
              {/* Language Selection */}
              <div className="flex items-center justify-between mb-6 gap-4">
                <Select value={selectedLanguage1} onValueChange={setSelectedLanguage1}>
                  <SelectTrigger
                    className={`w-32 sm:w-40 border-none bg-transparent text-lg font-medium ${theme.textColor}`}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="ghost" size="icon" onClick={swapLanguages} className="mx-2 sm:mx-4">
                  <ArrowLeftRight className={`h-6 w-6 ${theme.textColor}`} />
                </Button>

                <Select value={selectedLanguage2} onValueChange={setSelectedLanguage2}>
                  <SelectTrigger
                    className={`w-32 sm:w-40 border-none bg-transparent text-lg font-medium ${theme.textColor}`}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Text Input Areas */}
              <div className="flex-1 flex flex-col gap-4">
                <Textarea
                  placeholder="Enter Text Here"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className={`flex-1 min-h-[120px] sm:min-h-[150px] resize-none border-2 ${isDarkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200"} rounded-2xl p-4 text-base`}
                  style={{ fontSize: `${fontSize}px` }}
                />

                <Textarea
                  value={isTranslating ? "Translating..." : translatedText}
                  readOnly
                  className={`flex-1 min-h-[120px] sm:min-h-[150px] resize-none border-2 ${isDarkMode ? "border-gray-600 bg-gray-800 text-gray-300" : "border-gray-200 bg-gray-50"} rounded-2xl p-4 text-base`}
                  style={{ fontSize: `${fontSize}px` }}
                />

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyToClipboard}
                    disabled={!translatedText}
                    className={`${theme.textColor} hover:bg-gray-200 ${isDarkMode ? "hover:bg-gray-700" : ""}`}
                  >
                    <Copy className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearText}
                    disabled={!text}
                    className={`${theme.textColor} hover:bg-gray-200 ${isDarkMode ? "hover:bg-gray-700" : ""}`}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="relative">
        <div className={`${theme.buttonsColor} px-6 py-4 flex justify-center`}>
          <div className="max-w-4xl w-full flex justify-between items-center">
            <button className="flex flex-col items-center text-white">
              <Users className="h-6 w-6 mb-1" />
              <span className="text-sm font-semibold">Translation</span>
            </button>
            <div className="w-16" />
            <Link href="/history" className="flex flex-col items-center text-white">
              <History className="h-6 w-6 mb-1" />
              <span className="text-sm">History</span>
            </Link>
          </div>
        </div>

        {/* Floating Mic Button */}
        <Button
          onClick={startVoiceRecognition}
          className={`absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full shadow-lg ${
            isRecording ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
          } text-white ${!voiceCommands ? "opacity-50" : ""}`}
        >
          <Mic className="h-8 w-8" />
        </Button>
      </div>

      {/* Analytics */}
      <AnalyticsWrapper />
    </div>
  )
}
