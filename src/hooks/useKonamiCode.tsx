'use client'

import { useEffect, useState, useCallback } from 'react'

// The legendary Konami Code: ↑↑↓↓←→←→BA
const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

/**
 * Custom hook that detects the Konami Code and triggers a callback
 * @param callback - Function to execute when Konami Code is entered
 */
export function useKonamiCode(callback: () => void) {
  const [input, setInput] = useState<string[]>([])

  const handleCallback = useCallback(callback, [callback])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      setInput((prev) => {
        const newInput = [...prev.slice(-(KONAMI_CODE.length - 1)), e.key]
        return newInput
      })
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (input.length === KONAMI_CODE.length) {
      const matches = input.every((key, index) =>
        key.toLowerCase() === KONAMI_CODE[index].toLowerCase()
      )

      if (matches) {
        handleCallback()
        // Level 38: Cognitive Closure
        import('@/lib/confetti').then(mod => mod.triggerConfetti())
        setInput([])
      }
    }
  }, [input, handleCallback])
}

/**
 * Provider component that enables the Easter Egg site-wide
 */
export function EasterEggProvider({ children }: { children: React.ReactNode }) {
  const [revealed, setRevealed] = useState(false)

  useKonamiCode(() => {
    setRevealed(true)
    // Show secret message
    if (typeof window !== 'undefined') {
      const audio = new Audio('/sounds/secret.mp3') // Optional sound
      audio.volume = 0.3
      audio.play().catch(() => { }) // Ignore if no sound file

      // Create floating message
      const div = document.createElement('div')
      div.innerHTML = `
        <div style="
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.9);
          z-index: 9999;
          animation: fadeIn 0.3s ease;
        ">
          <div style="
            text-align: center;
            color: #D4AF37;
            font-size: 2rem;
            font-weight: bold;
          ">
            🎮 You found the secret! 🏆<br/>
            <span style="font-size: 1rem; color: #888;">WATMEDIA - مهندسو النمو الرقمي</span>
            <br/><br/>
            <button onclick="this.parentElement.parentElement.remove()" style="
              padding: 10px 30px;
              background: #D4AF37;
              color: black;
              border: none;
              border-radius: 999px;
              cursor: pointer;
              font-weight: bold;
            ">أغلق</button>
          </div>
        </div>
      `
      document.body.appendChild(div)

      // Auto-remove after 5 seconds
      setTimeout(() => div.remove(), 10000)
    }
  })

  return <>{children}</>
}
