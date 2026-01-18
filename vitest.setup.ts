import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Next.js headers
vi.mock('next/headers', () => ({
  headers: vi.fn(() => Promise.resolve(new Map())),
}))
