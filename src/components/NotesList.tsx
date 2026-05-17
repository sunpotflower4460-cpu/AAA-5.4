import { copy } from '../lib/i18n'
import type { Note } from '../types/note'
import { EmptyState } from './EmptyState'
import { NoteCard } from './NoteCard'
import { SearchBar } from './SearchBar'

type NotesListProps = {
  notes: Note[]
  totalNotes: number
  searchQuery: string
  onSearchChange: (value: string) => void
  onCreateNote: () => void
  onOpenNote: (id: string) => void
}

export function NotesList({
  notes,
  totalNotes,
  searchQuery,
  onSearchChange,
  onCreateNote,
  onOpenNote,
}: NotesListProps) {
  const isSearching = searchQuery.trim().length > 0
  const hasNotes = totalNotes > 0

  return (
    <section className="relative flex min-h-[calc(100svh-42px)] flex-1 flex-col px-[21px] pb-[34px] pt-[34px] md:min-h-[calc(100svh-68px)] md:px-[34px]">
      <header className="space-y-[21px]">
        <div className="space-y-[13px]">
          <div className="space-y-[4px]">
            <p className="text-[13px] uppercase tracking-[0.24em] text-[var(--color-ink-muted)]">
              {copy.appSubtitle}
            </p>
            <h1 className="font-serif text-[34px] leading-none text-[var(--color-sumi)]">
              {copy.appName}
            </h1>
          </div>
          <div className="space-y-[8px]">
            <p className="text-[16px] leading-[1.618] text-[var(--color-sumi)]">{copy.tagline}</p>
            <p className="text-[14px] leading-[1.618] text-[var(--color-ink-muted)]">{copy.taglineEn}</p>
          </div>
        </div>

        <div className="space-y-[13px]">
          <div className="flex items-end justify-between gap-[13px]">
            <div>
              <p className="text-[15px] text-[var(--color-sumi)]">{copy.listTitle}</p>
              <p className="text-[13px] text-[var(--color-ink-muted)]">{copy.listTitleEn}</p>
            </div>
            <p className="text-[13px] text-[var(--color-ink-muted)]">
              {totalNotes} {copy.notesCount} / {totalNotes} {copy.notesCountEn}
            </p>
          </div>
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>
      </header>

      <div className="mt-[34px] flex-1 pb-[89px]">
        {notes.length > 0 ? (
          <div className="space-y-[13px]">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} onOpen={onOpenNote} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={hasNotes && isSearching ? copy.searchEmptyTitle : copy.emptyTitle}
            subtitle={hasNotes && isSearching ? copy.searchEmptySubtitle : copy.emptySubtitle}
            actionLabel={hasNotes && isSearching ? '検索をほどく / Clear search' : copy.emptyAction}
            onAction={hasNotes && isSearching ? () => onSearchChange('') : onCreateNote}
          />
        )}
      </div>

      <div className="pointer-events-none sticky bottom-[calc(21px+env(safe-area-inset-bottom))] flex justify-end">
        <button
          type="button"
          aria-label={`${copy.newNote} / New note`}
          onClick={onCreateNote}
          className="pointer-events-auto flex h-[55px] min-w-[55px] items-center justify-center gap-[8px] rounded-full bg-[var(--color-indigo)] px-[21px] text-[15px] font-medium text-[var(--color-paper)] shadow-[0_21px_34px_rgba(36,59,83,0.24)] transition duration-[300ms] hover:scale-[1.02] hover:bg-[var(--color-sumi)]"
        >
          <span aria-hidden="true" className="text-[21px] leading-none">
            ＋
          </span>
          <span>{copy.newNote}</span>
        </button>
      </div>
    </section>
  )
}
