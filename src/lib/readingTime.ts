/**
 * Calculate estimated reading time for Arabic/English text
 * @param text - The text content to analyze
 * @param wordsPerMinute - Reading speed (default: 200 for Arabic)
 * @returns Formatted reading time string in Arabic
 */
export function calculateReadingTime(text: string, wordsPerMinute = 200): string {
  if (!text || text.trim().length === 0) {
    return 'أقل من دقيقة'
  }

  const words = text.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)

  if (minutes === 1) {
    return 'دقيقة واحدة للقراءة'
  } else if (minutes === 2) {
    return 'دقيقتان للقراءة'
  } else if (minutes <= 10) {
    return `${minutes} دقائق للقراءة`
  } else {
    return `${minutes} دقيقة للقراءة`
  }
}

/**
 * Get reading time in minutes only (for custom formatting)
 */
export function getReadingTimeMinutes(text: string, wordsPerMinute = 200): number {
  if (!text || text.trim().length === 0) return 0
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}
