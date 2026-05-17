import { formatUpdatedAt } from '../lib/date'
import { getUntitledLabel } from '../lib/i18n'
import type { Note } from '../types/note'

type NoteCardProps = {
  note: Note
  onOpen: (id: string) => void
}

const getPreview = (body: string) => {
  const normalized = body.replace(/\s+/g, ' ').trim()

  if (!normalized) {
    return '…'
  }

  return normalized.slice(0, 88)
}

export function NoteCard({ note, onOpen }: NoteCardProps) {
  const title = note.title.trim() || getUntitledLabel(note.locale)
  const preview = getPreview(note.body)

  return (
    <button
      type="button"
      onClick={() => onOpen(note.id)}
      aria-label={`${title} を開く / Open note ${title}`}
      className="group flex w-full items-start gap-[13px] rounded-[21px] border border-[var(--color-line)] bg-white/75 px-[21px] py-[21px] text-left shadow-[0_13px_34px_rgba(31,27,24,0.04)] transition duration-[300ms] hover:-translate-y-px hover:border-[var(--color-gold)] hover:bg-white"
    >
      <span
        aria-hidden="true"
        className={[
          'mt-[4px] h-[55px] w-[3px] rounded-full transition duration-[300ms]',
          note.isFavorite ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-line)]',
        ].join(' ')}
      />
      <span className="min-w-0 flex-1 space-y-[8px]">
        <span className="flex items-start justify-between gap-[13px]">
          <span className="line-clamp-2 font-serif text-[18px] leading-tight text-[var(--color-sumi)]">
            {title}
          </span>
          <span className="flex shrink-0 items-center gap-[8px] text-[13px] text-[var(--color-ink-muted)]">
            {note.isFavorite ? (
              <span aria-hidden="true" className="text-[var(--color-gold)]">
                ★
              </span>
            ) : null}
            {formatUpdatedAt(note.updatedAt, note.locale)}
          </span>
        </span>
        <span
          className="block text-[15px] leading-[1.618] text-[var(--color-ink-muted)]"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {preview}
        </span>
      </span>
    </button>
  )
}
