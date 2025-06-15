export async function translateTextWithOpenAI(
  inputText: string,
  sourceLang: string,
  targetLang: string,
): Promise<string> {
  if (!inputText.trim()) {
    throw new Error("Please enter text to translate.")
  }

  try {
    console.log("Sending translation request:", { inputText, sourceLang, targetLang })

    const response = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: inputText,
        sourceLang,
        targetLang,
      }),
    })

    console.log("Response status:", response.status)

    if (!response.ok) {
      const errorData = await response.text()
      console.error("API Error Response:", errorData)
      throw new Error(`Translation failed: ${response.status} - ${errorData}`)
    }

    const data = await response.json()
    console.log("Translation response:", data)

    if (!data.translatedText) {
      throw new Error("No translation received from API")
    }

    return data.translatedText
  } catch (error) {
    console.error("Translation error details:", error)
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Translation failed due to network error")
  }
}
