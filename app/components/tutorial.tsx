"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useTheme } from "../contexts/theme-context"
import Image from "next/image"

interface TutorialStep {
  id: number
  image: string
  title: string
  description: string
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    image: "/tutorial/dng_logo.png",
    title: "Welcome to DINIG!",
    description:
      "Your personal translation companion that breaks language barriers and connects people through seamless communication.",
  },
  {
    id: 2,
    image: "/tutorial/languages.png",
    title: "Choose Your Languages",
    description:
      "Select source and target languages from the dropdown menus. Tap the swap button to quickly switch between languages.",
  },
  {
    id: 3,
    image: "/tutorial/text_input.png",
    title: "Text Input",
    description: "Enter text in the input field. DINIG will instantly translate your message.",
  },
  {
    id: 4,
    image: "/tutorial/mic.png",
    title: "Voice Translation",
    description:
      "Tap the blue microphone button to speak directly. Perfect for real-time conversations and quick translations.",
  },
  {
    id: 5,
    image: "/tutorial/swap.png",
    title: "Language Swap",
    description: "Use the swap button to quickly switch between source and target languages for two-way conversations.",
  },
  {
    id: 6,
    image: "/tutorial/history.png",
    title: "Translation History",
    description: "Access your previous translations anytime. Never lose important conversations or translations.",
  },
  {
    id: 7,
    image: "/tutorial/burger.webp",
    title: "Explore More Features",
    description:
      "Tap the menu button (☰) to access additional features like Help, Feedback, Trivia of the Day, and Settings.",
  },
  {
    id: 8,
    image: "/tutorial/dng_logo.png",
    title: "Ready to Start!",
    description: "You're all set! Start translating and connecting with people around the world. Enjoy using DINIG!",
  },
]

interface TutorialProps {
  onComplete: () => void
}

export function Tutorial({ onComplete }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const { theme, isDarkMode, fontSize } = useTheme()

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      completeTutorial()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completeTutorial = () => {
    setIsVisible(false)
    // Mark tutorial as completed in localStorage
    localStorage.setItem("dinig_tutorial_completed", "true")
    onComplete()
  }

  const skipTutorial = () => {
    completeTutorial()
  }

  if (!isVisible) return null

  const currentTutorialStep = tutorialSteps[currentStep]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className={`${theme.cardColor} rounded-3xl shadow-2xl w-full max-w-md mx-auto min-h-[600px]`}>
        <CardContent className="p-6 h-[600px] flex flex-col">
          {/* Header with close button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-xl font-bold ${theme.textColor}`} style={{ fontSize: `${fontSize + 4}px` }}>
              Tutorial
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={skipTutorial}
              className={`${theme.textColor} hover:bg-gray-200 ${isDarkMode ? "hover:bg-gray-700" : ""}`}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Tutorial Step Content */}
          <div className="text-center space-y-6 flex-1 flex flex-col justify-between">
            {/* Step Image */}
            <div className="flex justify-center">
              <div className="w-32 h-32 relative flex-shrink-0 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <Image
                  src={currentTutorialStep.image || "/placeholder.svg"}
                  alt={currentTutorialStep.title}
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-center space-y-4">
              {/* Step Title */}
              <h3 className={`text-xl font-bold ${theme.textColor}`} style={{ fontSize: `${fontSize + 4}px` }}>
                {currentTutorialStep.title}
              </h3>

              {/* Step Description */}
              <p className={`${theme.textColor} leading-relaxed`} style={{ fontSize: `${fontSize}px` }}>
                {currentTutorialStep.description}
              </p>
            </div>

            {/* Bottom Section */}
            <div className="space-y-4">
              {/* Page Indicators */}
              <div className="flex justify-center space-x-2">
                {tutorialSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentStep ? "bg-blue-500" : isDarkMode ? "bg-gray-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center">
                {/* Previous Button */}
                <Button
                  variant="ghost"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className={`${theme.textColor} hover:bg-gray-200 ${isDarkMode ? "hover:bg-gray-700" : ""} ${
                    currentStep === 0 ? "invisible" : ""
                  }`}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>

                {/* Skip Button */}
                <Button
                  variant="ghost"
                  onClick={skipTutorial}
                  className={`${theme.textColor} hover:bg-gray-200 ${isDarkMode ? "hover:bg-gray-700" : ""}`}
                >
                  Skip
                </Button>

                {/* Next/Get Started Button */}
                <Button
                  onClick={handleNext}
                  className={`${theme.buttonsColor} hover:opacity-90 text-white px-6 py-2 rounded-full`}
                >
                  {currentStep === tutorialSteps.length - 1 ? (
                    "Get Started"
                  ) : (
                    <>
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
