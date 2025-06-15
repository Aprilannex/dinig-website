"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Check } from "lucide-react"
import { useTheme } from "../contexts/theme-context"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

export default function SettingsPage() {
  const {
    isDarkMode,
    toggleTheme,
    fontSize,
    setAppFontSize,
    theme,
    dailyTips,
    setDailyTips,
    dataCollection,
    setDataCollection,
    voiceCommands,
    setVoiceCommands,
  } = useTheme()

  const handleFontSizeChange = (value: number[]) => {
    const newSize = value[0]
    setAppFontSize(newSize)

    // Show toast for font size change
    const sizeLabel = newSize <= 16 ? "Small" : newSize <= 20 ? "Medium" : "Large"
    toast({
      title: "Text Size Changed",
      description: `Text size set to ${sizeLabel} (${newSize}px)`,
      duration: 1500,
    })
  }

  const getTextSizeLabel = () => {
    if (fontSize <= 16) return "Small"
    if (fontSize <= 20) return "Medium"
    return "Large"
  }

  const handleDailyTipsToggle = () => {
    const newValue = !dailyTips
    setDailyTips(newValue)
    toast({
      title: newValue ? "Daily Tips Enabled" : "Daily Tips Disabled",
      description: newValue
        ? "You will now receive daily language tips and trivia."
        : "You will no longer receive daily language tips and trivia.",
      duration: 2000,
    })
  }

  const handleDataCollectionToggle = () => {
    const newValue = !dataCollection
    setDataCollection(newValue)
    toast({
      title: newValue ? "Data Collection Enabled" : "Data Collection Disabled",
      description: newValue
        ? "Your translation history will now be saved."
        : "Your translation history will no longer be saved.",
      duration: 2000,
    })
  }

  const handleVoiceCommandsToggle = () => {
    const newValue = !voiceCommands
    setVoiceCommands(newValue)
    toast({
      title: newValue ? "Voice Commands Enabled" : "Voice Commands Disabled",
      description: newValue
        ? "You can now use voice input for translations."
        : "Voice input for translations has been disabled.",
      duration: 2000,
    })
  }

  const handleThemeToggle = () => {
    toggleTheme()
    toast({
      title: !isDarkMode ? "Dark Mode Enabled" : "Light Mode Enabled",
      description: !isDarkMode
        ? "The app will now use a dark color scheme."
        : "The app will now use a light color scheme.",
      duration: 2000,
    })
  }

  return (
    <div className={`min-h-screen ${theme.backgroundColor}`}>
      {/* Header */}
      <header className="flex items-center p-6">
        <div className="max-w-4xl mx-auto w-full flex items-center">
          <Link href="/">
            <Button variant="ghost" size="icon" className={`${theme.textColor} hover:bg-black/10 mr-4`}>
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className={`text-2xl font-bold ${theme.textColor}`}>Settings</h1>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <Card className={`${theme.cardColor} rounded-3xl shadow-lg`}>
            <CardContent className="p-6 space-y-6">
              {/* Dark Mode */}
              <div className="flex items-center justify-between py-2">
                <label className={`text-lg font-medium ${theme.textColor}`}>Dark Mode</label>
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={handleThemeToggle}
                  className="data-[state=checked]:bg-blue-500"
                />
              </div>

              {/* Notification Settings */}
              <div className="space-y-4">
                <h3 className={`text-lg font-bold ${theme.textColor}`}>Notification Settings</h3>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleDailyTipsToggle}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                        dailyTips
                          ? "bg-green-500 border-green-500"
                          : `border-gray-300 ${isDarkMode ? "border-gray-600" : ""}`
                      }`}
                    >
                      {dailyTips && <Check className="h-4 w-4 text-white" />}
                    </button>
                    <label className={`text-base ${theme.textColor}`}>Receive Daily Language Tips</label>
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="space-y-4">
                <h3 className={`text-lg font-bold ${theme.textColor}`}>Privacy Settings</h3>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleDataCollectionToggle}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                        dataCollection
                          ? "bg-green-500 border-green-500"
                          : `border-gray-300 ${isDarkMode ? "border-gray-600" : ""}`
                      }`}
                    >
                      {dataCollection && <Check className="h-4 w-4 text-white" />}
                    </button>
                    <label className={`text-base ${theme.textColor}`}>Allow Data Collection</label>
                  </div>
                </div>
              </div>

              {/* Accessibility Options */}
              <div className="space-y-4">
                <h3 className={`text-lg font-bold ${theme.textColor}`}>Accessibility Options</h3>

                {/* Text Size */}
                <div className="space-y-4">
                  <label className={`text-lg font-medium ${theme.textColor}`}>Text Size</label>

                  {/* Sample Text Preview */}
                  <div
                    className={`border-2 ${isDarkMode ? "border-gray-600 bg-gray-700" : "border-gray-200 bg-gray-50"} rounded-xl p-4`}
                  >
                    <p
                      className={`text-center ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      Sample text ({getTextSizeLabel()})
                    </p>
                  </div>

                  {/* Slider */}
                  <div className="space-y-2">
                    <Slider
                      value={[fontSize]}
                      onValueChange={handleFontSizeChange}
                      max={24}
                      min={14}
                      step={2}
                      className="w-full"
                    />
                    <div className={`flex justify-between text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      <span>Small</span>
                      <span>Medium</span>
                      <span>Large</span>
                    </div>
                  </div>
                </div>

                {/* Voice Commands */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleVoiceCommandsToggle}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                        voiceCommands
                          ? "bg-green-500 border-green-500"
                          : `border-gray-300 ${isDarkMode ? "border-gray-600" : ""}`
                      }`}
                    >
                      {voiceCommands && <Check className="h-4 w-4 text-white" />}
                    </button>
                    <label className={`text-base ${theme.textColor}`}>Enable Voice Commands</label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
