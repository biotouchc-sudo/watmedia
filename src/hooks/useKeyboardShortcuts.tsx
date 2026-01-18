'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

type ShortcutMap = {
  [key: string]: string
}

const shortcuts: ShortcutMap = {
  'gh': '/',           // Go Home
  'gd': '/dashboard',  // Go Dashboard
  'gp': '/dashboard/projects',   // Go Projects
  'gi': '/dashboard/invoices',   // Go Invoices
  'gs': '/dashboard/settings',   // Go Settings
  'gc': '/contact',    // Go Contact
}

/**
 * Custom hook for keyboard shortcuts navigation
 * Supports two-key combinations like "G + H" for Go Home
 */
export function useKeyboardShortcuts() {
  const router = useRouter()

  useEffect(() => {
    let buffer = ''
    let timeout: NodeJS.Timeout

    const handler = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return
      }

      // Ignore if modifier keys are pressed (except shift)
      if (e.ctrlKey || e.metaKey || e.altKey) {
        return
      }

      // Add key to buffer
      buffer += e.key.toLowerCase()

      // Check for matching shortcut
      const matchedRoute = shortcuts[buffer]
      if (matchedRoute) {
        e.preventDefault()
        router.push(matchedRoute)
        buffer = ''
        return
      }

      // Clear buffer after a short delay
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        buffer = ''
      }, 800)
    }

    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
      clearTimeout(timeout)
    }
  }, [router])
}

/**
 * Client wrapper component to enable keyboard shortcuts
 */
export function KeyboardShortcutsProvider({ children }: { children: React.ReactNode }) {
  useKeyboardShortcuts()
  return <>{children}</>
}
