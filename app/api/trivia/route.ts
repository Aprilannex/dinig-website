import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({
        trivia:
          "The Philippines is home to over 175 languages, making it one of the most linguistically diverse countries in the world!",
      })
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
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
            content: "You are a helpful trivia generator focused on Philippine culture, languages, and history.",
          },
          {
            role: "user",
            content:
              "Give me one interesting trivia about the Philippines, its languages, or culture in 1 paragraph (3-4 sentences). End with 'Source: [credible source name]' on a new line.",
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error("OpenAI API request failed")
    }

    const data = await response.json()
    const trivia = data.choices[0].message.content.trim()

    return NextResponse.json({ trivia })
  } catch (error) {
    console.error("Trivia API error:", error)
    return NextResponse.json({
      trivia:
        "The Philippines is home to over 175 languages, making it one of the most linguistically diverse countries in the world!",
    })
  }
}
