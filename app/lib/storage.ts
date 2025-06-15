interface HistoryEntry {
  sourceLang: string
  targetLang: string
  input: string
  output: string
  timestamp: string
}

export async function saveToHistory(
  sourceLang: string,
  targetLang: string,
  inputText: string,
  outputText: string,
): Promise<void> {
  try {
    // Check if data collection is enabled (we'll also check this in the component)
    const dataCollection = localStorage.getItem("dataCollection")
    if (dataCollection === "false") {
      return
    }

    const existingHistory = localStorage.getItem("translationHistory")
    const parsedHistory: HistoryEntry[] = existingHistory ? JSON.parse(existingHistory) : []

    const newEntry: HistoryEntry = {
      sourceLang,
      targetLang,
      input: inputText,
      output: outputText,
      timestamp: new Date().toISOString(),
    }

    parsedHistory.unshift(newEntry)
    localStorage.setItem("translationHistory", JSON.stringify(parsedHistory))
  } catch (error) {
    console.error("Failed to save history:", error)
  }
}

export function getHistory(): HistoryEntry[] {
  try {
    const stored = localStorage.getItem("translationHistory")
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Failed to load history:", error)
    return []
  }
}

export function clearHistory(): void {
  localStorage.removeItem("translationHistory")
}

export function deleteHistoryItem(index: number): void {
  try {
    const history = getHistory()
    history.splice(index, 1)
    localStorage.setItem("translationHistory", JSON.stringify(history))
  } catch (error) {
    console.error("Failed to delete history item:", error)
  }
}
