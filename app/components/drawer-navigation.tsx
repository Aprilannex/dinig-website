"use client"

import { Button } from "@/components/ui/button"
import { Info, HelpCircle, MessageSquare, Lightbulb, X } from "lucide-react"
import { useTheme } from "../contexts/theme-context"
import { TutorialTrigger } from "./tutorial-trigger"
import Link from "next/link"

interface DrawerNavigationProps {
  isOpen: boolean
  onClose: () => void
}

export function DrawerNavigation({ isOpen, onClose }: DrawerNavigationProps) {
  const { theme, isDarkMode } = useTheme()

  const menuItems = [
    { href: "/about", icon: Info, label: "About" },
    { href: "/help", icon: HelpCircle, label: "Help" },
    { href: "/feedback", icon: MessageSquare, label: "Feedback" },
    { href: "/trivia", icon: Lightbulb, label: "Trivia of the Day" },
  ]

  return (
    <div
      className={`fixed top-0 left-0 h-full w-80 ${theme.backgroundColor} transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } shadow-2xl`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className={`text-2xl font-bold ${theme.textColor}`}>Menu</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className={`${theme.textColor}`}>
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Menu Items */}
      <div className="p-6">
        <div className={`${theme.cardColor} rounded-3xl shadow-lg p-6`}>
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={onClose}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start h-14 text-lg font-medium ${theme.textColor} hover:bg-gray-100 ${isDarkMode ? "hover:bg-gray-700" : ""} rounded-xl`}
                >
                  <item.icon className="h-6 w-6 mr-4" />
                  {item.label}
                </Button>
              </Link>
            ))}

            {/* Tutorial Trigger */}
            <TutorialTrigger />
          </div>
        </div>
      </div>
    </div>
  )
}
