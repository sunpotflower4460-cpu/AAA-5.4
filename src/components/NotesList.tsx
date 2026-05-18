import { copy } from '../lib/i18n'
import type { Note } from '../types/note'
import { EmptyState } from './EmptyState'
import { NoteCard } from './NoteCard'
import { SearchBar } from './SearchBar'
import { ZanshinMark } from './ZanshinMark'

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
    <section className="relative flex min-h-[calc(100svh-26px)] flex-1 flex-col px-[21px] pb-[34px] pt-[21px] md:min-h-[calc(100svh-68px)] md:px-[34px] md:pt-[34px]">
      <header className="space-y-[21px]">
        <div className="relative overflow-hidden rounded-[34px] border border-[rgba(31,27,24,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(251,248,241,0.58))] px-[21px] py-[21px] shadow-[0_21px_55px_-34px_rgba(31,27,24,0.28)]">
          <div className="pointer-events-none absolute right-[-34px] top-[-34px] opacity-50">
            <ZanshinMark />
          </div>
          <div className="relative space-y-[21px]">
            <div className="space-y-[8px]">
              <p className="text-[12px] uppercase tracking-[0.24em] text-[var(--color-ink-muted)]">
                {copy.appSubtitle}
              </p>
              <div className="space-y-[8px]">
                <h1 className="font-serif text-[40px] leading-none text-[var(--color-sumi)]">
                  {copy.appName}
                </h1>
                <p className="max-w-[18ch] text-[16px] leading-[1.75] text-[var(--color-sumi)]">
                  {copy.tagline}
                </p>
                <p className="text-[13px] uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
                  {copy.taglineEn}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-end justify-between gap-[13px]">
              <div className="space-y-[4px]">
                <p className="text-[15px] text-[var(--color-sumi)]">{copy.listTitle}</p>
                <p className="text-[13px] text-[var(--color-ink-muted)]">{copy.listTitleEn}</p>
              </div>
              <div className="flex items-center gap-[8px] rounded-full border border-[rgba(31,27,24,0.08)] bg-white/72 px-[13px] py-[8px] text-[12px] text-[var(--color-ink-muted)]">
                <span aria-hidden="true" className="h-[8px] w-[8px] rounded-full bg-[var(--color-gold)]/75" />
                <span>
                  {isSearching ? `${notes.length} / ${totalNotes}` : totalNotes} {copy.notesCount}
                </span>
                <span className="text-[rgba(95,87,80,0.8)]">· {copy.notesCountEn}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-[8px]">
          <SearchBar value={searchQuery} onChange={onSearchChange} />
          {isSearching ? (
            <p className="px-[4px] text-[12px] uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
              Searching through settled words
            </p>
          ) : null}
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
          className="pointer-events-auto flex h-[55px] min-w-[55px] items-center justify-center gap-[8px] rounded-full border border-[rgba(255,255,255,0.4)] bg-[linear-gradient(180deg,rgba(36,59,83,0.94),rgba(31,27,24,0.96))] px-[21px] text-[15px] font-medium text-[var(--color-paper)] shadow-[0_21px_55px_-21px_rgba(31,27,24,0.5)] backdrop-blur-sm transition duration-[300ms] hover:scale-[1.02] hover:shadow-[0_21px_55px_-13px_rgba(31,27,24,0.45)]"
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
