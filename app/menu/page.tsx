"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Info, HelpCircle, MessageSquare, Lightbulb, LogOut } from "lucide-react"
import Link from "next/link"

export default function MenuPage() {
  const menuItems = [
    { href: "/about", icon: Info, label: "About" },
    { href: "/help", icon: HelpCircle, label: "Help" },
    { href: "/feedback", icon: MessageSquare, label: "Feedback" },
    { href: "/trivia", icon: Lightbulb, label: "Trivia of the Day" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-blue-400 relative">
      {/* Header */}
      <header className="flex items-center p-6">
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-black hover:bg-black/10 mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-black">Menu</h1>
      </header>

      {/* Content */}
      <main className="px-6">
        <Card className="bg-white rounded-3xl shadow-lg max-w-md">
          <CardContent className="p-6">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-14 text-lg font-medium text-black hover:bg-gray-50 rounded-xl"
                  >
                    <item.icon className="h-6 w-6 mr-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}

              <Button
                variant="ghost"
                className="w-full justify-start h-14 text-lg font-medium text-black hover:bg-gray-50 rounded-xl"
                onClick={() => {
                  if (confirm("Are you sure you want to exit?")) {
                    window.close()
                  }
                }}
              >
                <LogOut className="h-6 w-6 mr-4" />
                Exit
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
