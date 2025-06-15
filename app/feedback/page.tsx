"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, MessageSquare, Mail, Loader2 } from "lucide-react"
import { useTheme } from "../contexts/theme-context"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

export default function FeedbackPage() {
  const { theme, isDarkMode, fontSize } = useTheme()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    feedback: "",
  })

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      feedback: "",
    }

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.feedback.trim()) {
      newErrors.feedback = "Please enter your feedback"
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error !== "")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const sendFeedback = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        duration: 3000,
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/send-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Feedback Sent Successfully!",
          description: "Thank you for your feedback. We'll get back to you soon.",
          duration: 4000,
        })
        // Clear form
        setFormData({ name: "", email: "", feedback: "" })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to send feedback")
      }
    } catch (error) {
      console.error("Error sending feedback:", error)
      toast({
        title: "Failed to Send Feedback",
        description: error instanceof Error ? error.message : "Please try again later.",
        duration: 4000,
      })
    } finally {
      setIsLoading(false)
    }
  }

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
            <h1 className={`text-2xl font-bold ${theme.textColor}`} style={{ fontSize: `${fontSize + 8}px` }}>
              Send Feedback
            </h1>
          </div>
          <MessageSquare className={`h-6 w-6 ${theme.textColor}`} />
        </div>
      </header>

      {/* Content */}
      <main className="px-4 sm:px-6 pb-6">
        <div className="max-w-2xl mx-auto">
          <Card className={`${theme.cardColor} rounded-3xl shadow-lg`}>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className={`text-base font-medium ${theme.textColor}`} style={{ fontSize: `${fontSize}px` }}>
                    Your Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`${
                      isDarkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200"
                    } rounded-xl h-12 ${errors.name ? "border-red-500" : ""}`}
                    style={{ fontSize: `${fontSize}px` }}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm" style={{ fontSize: `${fontSize - 2}px` }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className={`text-base font-medium ${theme.textColor}`} style={{ fontSize: `${fontSize}px` }}>
                    Your Email
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`${
                      isDarkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200"
                    } rounded-xl h-12 ${errors.email ? "border-red-500" : ""}`}
                    style={{ fontSize: `${fontSize}px` }}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm" style={{ fontSize: `${fontSize - 2}px` }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Feedback Field */}
                <div className="space-y-2">
                  <label className={`text-base font-medium ${theme.textColor}`} style={{ fontSize: `${fontSize}px` }}>
                    Your Feedback
                  </label>
                  <Textarea
                    placeholder="Tell us what you think about the app..."
                    value={formData.feedback}
                    onChange={(e) => handleInputChange("feedback", e.target.value)}
                    className={`${
                      isDarkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200"
                    } rounded-xl min-h-[200px] resize-none ${errors.feedback ? "border-red-500" : ""}`}
                    style={{ fontSize: `${fontSize}px` }}
                    rows={8}
                  />
                  {errors.feedback && (
                    <p className="text-red-500 text-sm" style={{ fontSize: `${fontSize - 2}px` }}>
                      {errors.feedback}
                    </p>
                  )}
                </div>

                {/* Send Button */}
                <div className="flex justify-end pt-4">
                  <Button
                    onClick={sendFeedback}
                    disabled={isLoading}
                    className={`${theme.buttonsColor} hover:opacity-90 text-white px-8 py-6 rounded-full font-medium flex items-center gap-3`}
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="h-5 w-5" />
                        <span>Send Feedback</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p
                  className={`${theme.textColor} text-center leading-relaxed`}
                  style={{ fontSize: `${fontSize - 2}px` }}
                >
                  Your feedback helps us improve DINIG and provide better translation services for everyone.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
