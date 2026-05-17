import type { Note } from '../types/note'

export const STORAGE_KEY = 'zanshin.notes.v1'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const isNote = (value: unknown): value is Note => {
  if (!isRecord(value)) {
    return false
  }

  return (
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.body === 'string' &&
    typeof value.createdAt === 'string' &&
    typeof value.updatedAt === 'string' &&
    typeof value.isFavorite === 'boolean' &&
    (value.locale === undefined || value.locale === 'ja' || value.locale === 'en')
  )
}

const clearNotesStorage = () => {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore cleanup errors so the editor remains usable.
  }
}

export function loadNotes(): Note[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)

    if (!raw) {
      return []
    }

    const parsed: unknown = JSON.parse(raw)

    if (!Array.isArray(parsed)) {
      clearNotesStorage()
      return []
    }

    const validNotes = parsed.filter(isNote)

    if (validNotes.length !== parsed.length) {
      saveNotes(validNotes)
    }

    return validNotes
  } catch {
    clearNotesStorage()
    return []
  }
}

export function saveNotes(notes: Note[]): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  } catch {
    // Ignore write errors so the editor remains usable.
  }
}
