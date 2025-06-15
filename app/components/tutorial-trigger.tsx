"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"
import { Tutorial } from "./tutorial"
import { useTheme } from "../contexts/theme-context"

export function TutorialTrigger() {
  const [showTutorial, setShowTutorial] = useState(false)
  const { theme } = useTheme()

  const handleShowTutorial = () => {
    setShowTutorial(true)
  }

  const handleTutorialComplete = () => {
    setShowTutorial(false)
  }

  return (
    <>
      <Button
        variant="ghost"
        onClick={handleShowTutorial}
        className={`w-full justify-start h-14 text-lg font-medium ${theme.textColor} hover:bg-gray-100 rounded-xl`}
      >
        <HelpCircle className="h-6 w-6 mr-4" />
        Show Tutorial
      </Button>

      {showTutorial && <Tutorial onComplete={handleTutorialComplete} />}
    </>
  )
}
