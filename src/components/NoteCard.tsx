import { formatUpdatedAt } from '../lib/date'
import { getUntitledLabel } from '../lib/i18n'
import type { Note } from '../types/note'

type NoteCardProps = {
  note: Note
  onOpen: (id: string) => void
}

const maxPreviewChars = 96

const getPreview = (body: string) => {
  const normalized = body.replace(/\s+/g, ' ').trim()

  if (!normalized) {
    return '…'
  }

  return normalized.length > maxPreviewChars
    ? `${normalized.slice(0, maxPreviewChars)}…`
    : normalized
}

export function NoteCard({ note, onOpen }: NoteCardProps) {
  const title = note.title.trim() || getUntitledLabel(note.locale)
  const preview = getPreview(note.body)

  return (
    <button
      type="button"
      onClick={() => onOpen(note.id)}
      aria-label={`${title} を開く / Open note ${title}`}
      className="group soft-fade-up relative flex w-full items-start gap-[13px] overflow-hidden rounded-[24px] border border-[rgba(31,27,24,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(251,248,241,0.78))] px-[21px] py-[21px] text-left shadow-[0_21px_55px_-34px_rgba(31,27,24,0.32)] transition duration-[300ms] hover:-translate-y-px hover:border-[rgba(201,166,70,0.34)] hover:bg-white"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[21px] top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.78),transparent)]"
      />
      <span
        aria-hidden="true"
        className={[
          'mt-[4px] h-[55px] w-[2px] shrink-0 rounded-full transition duration-[300ms]',
          note.isFavorite ? 'bg-[var(--color-gold)] shadow-[0_0_21px_rgba(201,166,70,0.28)]' : 'bg-[rgba(31,27,24,0.12)]',
        ].join(' ')}
      />
      <span className="min-w-0 flex-1 space-y-[13px]">
        <span className="flex items-start justify-between gap-[13px]">
          <span className="line-clamp-2 font-serif text-[19px] leading-[1.45] text-[var(--color-sumi)]">
            {title}
          </span>
          <span className="flex shrink-0 items-center gap-[8px] rounded-full border border-[rgba(31,27,24,0.06)] bg-white/72 px-[8px] py-[4px] text-[12px] text-[var(--color-ink-muted)]">
            {note.isFavorite ? (
              <span
                aria-hidden="true"
                className="inline-flex h-[8px] w-[8px] rounded-full bg-[var(--color-gold)] shadow-[0_0_13px_rgba(201,166,70,0.34)]"
              />
            ) : (
              <span aria-hidden="true" className="h-[8px] w-[8px] rounded-full bg-[rgba(31,27,24,0.12)]" />
            )}
            <span className="whitespace-nowrap">{formatUpdatedAt(note.updatedAt, note.locale)}</span>
          </span>
        </span>
        <span
          className="block text-[15px] leading-[1.75] text-[var(--color-ink-muted)]"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {preview}
        </span>
        {note.isFavorite ? (
          <span className="inline-flex items-center gap-[8px] text-[12px] uppercase tracking-[0.16em] text-[var(--color-gold)]">
            <span aria-hidden="true">★</span>
            大切な余白 / Treasured note
          </span>
        ) : null}
      </span>
    </button>
  )
}
