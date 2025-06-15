"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, HelpCircle, ExternalLink } from "lucide-react"
import { useTheme } from "../contexts/theme-context"
import Link from "next/link"

export default function HelpPage() {
  const { theme, isDarkMode, fontSize } = useTheme()

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
            <h1 className={`text-2xl font-bold ${theme.textColor}`}>Help</h1>
          </div>
          <HelpCircle className={`h-6 w-6 ${theme.textColor}`} />
        </div>
      </header>

      {/* Content */}
      <main className="px-4 sm:px-6 pb-6">
        <div className="max-w-4xl mx-auto">
          <Card className={`${theme.cardColor} rounded-3xl shadow-lg`}>
            <CardContent className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              <p className={`${theme.textColor} text-base`} style={{ fontSize: `${fontSize}px` }}>
                Welcome to the Help section. Here's an overview of the main features and how to use them:
              </p>

              <div>
                <h3 className={`text-lg font-bold ${theme.textColor} mb-3`} style={{ fontSize: `${fontSize + 2}px` }}>
                  Features Guide:
                </h3>
                <ul className={`${theme.textColor} space-y-2`} style={{ fontSize: `${fontSize}px` }}>
                  <li>• Translation: How to translate text and use the output box.</li>
                  <li>• Speech Recognition: Using voice input and supported languages.</li>
                  <li>• History: Viewing and managing translation history.</li>
                  <li>• Settings: Adjusting text size, dark mode, and notifications.</li>
                </ul>
                <div className="mt-2">
                  <a
                    href="https://dev-dinig2.pantheonsite.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center ${isDarkMode ? "text-blue-400" : "text-blue-600"} hover:underline`}
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    Visit Our User Guide <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>

              <div>
                <h3 className={`text-lg font-bold ${theme.textColor} mb-3`} style={{ fontSize: `${fontSize + 2}px` }}>
                  Frequently Asked Questions:
                </h3>
                <ul className={`${theme.textColor} space-y-2`} style={{ fontSize: `${fontSize}px` }}>
                  <li>• How do I clear my translation history?</li>
                  <li>• Can I translate without using voice input?</li>
                  <li>• What languages does the app support?</li>
                </ul>
                <div className="mt-2">
                  <a
                    href="https://dev-dinig2.pantheonsite.io/faq/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center ${isDarkMode ? "text-blue-400" : "text-blue-600"} hover:underline`}
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    Visit Our FAQ <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>

              <div>
                <h3 className={`text-lg font-bold ${theme.textColor} mb-3`} style={{ fontSize: `${fontSize + 2}px` }}>
                  Troubleshooting Tips:
                </h3>
                <ul className={`${theme.textColor} space-y-2`} style={{ fontSize: `${fontSize}px` }}>
                  <li>• Issues with translations not displaying correctly.</li>
                  <li>• Troubleshooting speech recognition.</li>
                  <li>• Steps to reset settings.</li>
                </ul>
                <div className="mt-2">
                  <a
                    href="https://dev-dinig2.pantheonsite.io/troubleshooting-tips/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center ${isDarkMode ? "text-blue-400" : "text-blue-600"} hover:underline`}
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    Visit Our Troubleshooting Tips <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>

              <div>
                <h3 className={`text-lg font-bold ${theme.textColor} mb-3`} style={{ fontSize: `${fontSize + 2}px` }}>
                  Contact and Feedback:
                </h3>
                <p className={`${theme.textColor} mb-4`} style={{ fontSize: `${fontSize}px` }}>
                  If you have further questions or suggestions, please contact us.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="https://dev-dinig2.pantheonsite.io/contact/" target="_blank" rel="noopener noreferrer">
                    <Button className={`${theme.buttonsColor} hover:opacity-90 text-white px-6 py-2 rounded-full`}>
                      Contact Support <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>

                  <Link href="/feedback">
                    <Button className={`${theme.buttonsColor} hover:opacity-90 text-white px-6 py-2 rounded-full`}>
                      Send Feedback
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
