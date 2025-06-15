import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("Translation API called")

    const body = await request.json()
    const { text, sourceLang, targetLang } = body

    console.log("Request body:", { text, sourceLang, targetLang })

    if (!text || !sourceLang || !targetLang) {
      return NextResponse.json({ error: "Missing required fields: text, sourceLang, targetLang" }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      console.error("OpenAI API key not found")
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 })
    }

    console.log("Making request to OpenAI API...")

    const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a translation assistant. Provide only the translation without any additional text or explanations.",
          },
          {
            role: "user",
            content: `Translate the following text from ${sourceLang} to ${targetLang}: "${text}"`,
          },
        ],
        max_tokens: 1000,
        temperature: 0.3,
      }),
    })

    console.log("OpenAI response status:", openAIResponse.status)

    if (!openAIResponse.ok) {
      const errorText = await openAIResponse.text()
      console.error("OpenAI API error:", errorText)
      return NextResponse.json({ error: `OpenAI API error: ${openAIResponse.status} - ${errorText}` }, { status: 500 })
    }

    const data = await openAIResponse.json()
    console.log("OpenAI response data:", data)

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Invalid OpenAI response structure:", data)
      return NextResponse.json({ error: "Invalid response from OpenAI API" }, { status: 500 })
    }

    const translatedText = data.choices[0].message.content.trim()

    if (!translatedText) {
      return NextResponse.json({ error: "Empty translation received" }, { status: 500 })
    }

    console.log("Translation successful:", translatedText)
    return NextResponse.json({ translatedText })
  } catch (error) {
    console.error("Translation API error:", error)
    return NextResponse.json(
      { error: `Server error: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 },
    )
  }
}
