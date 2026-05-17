import { useEffect, useMemo, useRef, useState } from 'react'
import { AppShell } from './components/AppShell'
import { NoteEditor } from './components/NoteEditor'
import { NotesList } from './components/NotesList'
import { copy, getPreferredLocale } from './lib/i18n'
import { loadNotes, saveNotes } from './lib/storage'
import type { Note } from './types/note'

const AUTOSAVE_DELAY_MS = 360
const SAVED_STATE_VISIBLE_MS = 2200

type SaveState = 'idle' | 'saving' | 'saved'

const sortNotes = (notes: Note[]) =>
  [...notes].sort((left, right) => {
    if (left.isFavorite !== right.isFavorite) {
      return Number(right.isFavorite) - Number(left.isFavorite)
    }

    return new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
  })

const matchesSearch = (note: Note, query: string) => {
  const normalizedQuery = query.trim().toLocaleLowerCase()

  if (!normalizedQuery) {
    return true
  }

  return `${note.title} ${note.body}`.toLocaleLowerCase().includes(normalizedQuery)
}

const createNote = (): Note => {
  const now = new Date().toISOString()

  return {
    id: crypto.randomUUID(),
    title: '',
    body: '',
    createdAt: now,
    updatedAt: now,
    isFavorite: false,
    locale: getPreferredLocale(),
  }
}

function App() {
  const [notes, setNotes] = useState<Note[]>(() => loadNotes())
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [saveState, setSaveState] = useState<SaveState>('idle')

  const latestNotesRef = useRef(notes)
  const isFirstPersistRef = useRef(true)

  useEffect(() => {
    latestNotesRef.current = notes
  }, [notes])

  useEffect(() => {
    const flushNotes = () => {
      saveNotes(latestNotesRef.current)
    }

    window.addEventListener('beforeunload', flushNotes)

    return () => {
      flushNotes()
      window.removeEventListener('beforeunload', flushNotes)
    }
  }, [])

  useEffect(() => {
    if (isFirstPersistRef.current) {
      isFirstPersistRef.current = false
      return
    }

    setSaveState('saving')

    const timer = window.setTimeout(() => {
      saveNotes(notes)
      setSaveState('saved')
    }, AUTOSAVE_DELAY_MS)

    return () => window.clearTimeout(timer)
  }, [notes])

  useEffect(() => {
    if (saveState !== 'saved') {
      return
    }

    const timer = window.setTimeout(() => {
      setSaveState('idle')
    }, SAVED_STATE_VISIBLE_MS)

    return () => window.clearTimeout(timer)
  }, [saveState])

  const activeNote = useMemo(
    () => notes.find((note) => note.id === selectedNoteId) ?? null,
    [notes, selectedNoteId],
  )

  const visibleNotes = useMemo(
    () => sortNotes(notes).filter((note) => matchesSearch(note, searchQuery)),
    [notes, searchQuery],
  )

  const handleCreateNote = () => {
    const note = createNote()

    setNotes((currentNotes) => [note, ...currentNotes])
    setSelectedNoteId(note.id)
    setSaveState('saving')
  }

  const handleChangeNote = (changes: Pick<Note, 'title' | 'body'>) => {
    if (!selectedNoteId) {
      return
    }

    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === selectedNoteId
          ? {
              ...note,
              ...changes,
              updatedAt: new Date().toISOString(),
            }
          : note,
      ),
    )
  }

  const handleToggleFavorite = () => {
    if (!selectedNoteId) {
      return
    }

    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === selectedNoteId
          ? {
              ...note,
              isFavorite: !note.isFavorite,
              updatedAt: new Date().toISOString(),
            }
          : note,
      ),
    )
  }

  const handleDeleteNote = () => {
    if (!activeNote) {
      return
    }

    const confirmed = window.confirm(`${copy.deleteConfirm}\n${copy.deleteConfirmEn}`)

    if (!confirmed) {
      return
    }

    setNotes((currentNotes) => currentNotes.filter((note) => note.id !== activeNote.id))
    setSelectedNoteId(null)
    setSaveState('saving')
  }

  return (
    <AppShell isEditorOpen={Boolean(activeNote)}>
      {activeNote ? (
        <NoteEditor
          note={activeNote}
          saveState={saveState}
          onBack={() => setSelectedNoteId(null)}
          onToggleFavorite={handleToggleFavorite}
          onDelete={handleDeleteNote}
          onChange={handleChangeNote}
        />
      ) : (
        <NotesList
          notes={visibleNotes}
          totalNotes={notes.length}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onCreateNote={handleCreateNote}
          onOpenNote={setSelectedNoteId}
        />
      )}
    </AppShell>
  )
}

export default App
