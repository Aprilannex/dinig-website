"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Info } from "lucide-react"
import { useTheme } from "../contexts/theme-context"
import Link from "next/link"

export default function AboutPage() {
  const { theme, isDarkMode } = useTheme()

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
            <h1 className={`text-2xl font-bold ${theme.textColor}`}>About</h1>
          </div>
          <Info className={`h-6 w-6 ${theme.textColor}`} />
        </div>
      </header>

      {/* Content */}
      <main className="px-4 sm:px-6 pb-6">
        <div className="max-w-4xl mx-auto">
          <Card className={`${theme.cardColor} rounded-3xl shadow-lg`}>
            <CardContent className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              <div>
                <h2 className={`text-xl font-bold ${theme.textColor} mb-3`}>Welcome to Dinig!</h2>
                <p className={`${theme.textColor} leading-relaxed`}>
                  Dinig is an innovative application designed to bridge the linguistic diversity of the Philippines,
                  where over 175 distinct languages are spoken. Our primary function is to facilitate seamless
                  communication among locals and travelers alike, making it easier for everyone to connect and engage in
                  meaningful conversations.
                </p>
              </div>

              <div>
                <h3 className={`text-lg font-bold ${theme.textColor} mb-2`}>Who We Serve:</h3>
                <p className={`${theme.textColor} leading-relaxed`}>
                  Dinig caters to travelers both local and foreign as well as language learners eager to explore the
                  rich tapestry of Philippine languages. Whether you're navigating a bustling market or engaging in
                  cultural exchanges, Dinig is your trusted companion.
                </p>
              </div>

              <div>
                <h3 className={`text-lg font-bold ${theme.textColor} mb-2`}>Key Features:</h3>
                <ul className={`${theme.textColor} space-y-2`}>
                  <li>
                    • Speech Recognition: Harness the power of your voice to translate and understand various Philippine
                    languages effortlessly.
                  </li>
                  <li>
                    • Language Learning Tool: Enhance your language skills with practical translation exercises and
                    features tailored to assist learners of all levels.
                  </li>
                  <li>
                    • Translation History Checker: Keep track of your translations to revisit important phrases and
                    conversations whenever needed.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className={`text-lg font-bold ${theme.textColor} mb-2`}>Our Story:</h3>
                <p className={`${theme.textColor} leading-relaxed`}>
                  Founded and developed by a dedicated team — Kyle Caliwan, Angel Rose Padolina, Romedz Medel, and
                  Anjelo Vergara. Dinig was born out of a shared motivation: to empower locals and foreigners to
                  communicate with ease throughout the Philippines. We understand the challenges posed by language
                  barriers and strive to provide an intuitive solution.
                </p>
              </div>

              <div>
                <h3 className={`text-lg font-bold ${theme.textColor} mb-2`}>Why Choose Dinig?</h3>
                <p className={`${theme.textColor} leading-relaxed`}>
                  What sets Dinig apart is our unwavering focus on Philippine languages. We believe that by embracing
                  the unique linguistic landscape of our nation, we can foster greater understanding and connection
                  among people.
                </p>
              </div>

              <div>
                <h3 className={`text-lg font-bold ${theme.textColor} mb-2`}>Looking Ahead:</h3>
                <p className={`${theme.textColor} leading-relaxed`}>
                  Our vision for the future includes expanding our language offerings and incorporating advanced
                  features, such as spoken output of translations. We aim to continuously enhance user experience and
                  further support communication across diverse linguistic groups.
                </p>
              </div>

              <div>
                <h3 className={`text-lg font-bold ${theme.textColor} mb-2`}>Get in Touch:</h3>
                <p className={`${theme.textColor} leading-relaxed`}>
                  We value your feedback and suggestions! For inquiries, please contact us at dinig2025@gmail.com
                </p>
              </div>

              <div>
                <p className={`${theme.textColor} leading-relaxed font-medium`}>
                  Thank you for choosing Dinig! Together, let's break down language barriers and celebrate the richness
                  of Philippine culture.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
