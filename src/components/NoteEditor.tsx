import { formatEditorTimestamp } from '../lib/date'
import { copy, getUntitledLabel } from '../lib/i18n'
import type { Note } from '../types/note'

type SaveState = 'idle' | 'saving' | 'saved'

type NoteEditorProps = {
  note: Note
  saveState: SaveState
  onBack: () => void
  onToggleFavorite: () => void
  onDelete: () => void
  onChange: (changes: Pick<Note, 'title' | 'body'>) => void
}

export function NoteEditor({
  note,
  saveState,
  onBack,
  onToggleFavorite,
  onDelete,
  onChange,
}: NoteEditorProps) {
  const statusCopy =
    saveState === 'saving'
      ? { primary: copy.saving, secondary: copy.savingEn }
      : saveState === 'saved'
        ? { primary: copy.saved, secondary: copy.savedEn }
        : null

  return (
    <section className="flex min-h-[calc(100svh-42px)] flex-1 flex-col px-[21px] pb-[34px] pt-[21px] md:min-h-[calc(100svh-68px)] md:px-[34px] md:pt-[34px]">
      <div className="flex flex-wrap items-center gap-[13px] border-b border-[var(--color-line)] pb-[13px]">
        <button
          type="button"
          aria-label={`${copy.back} / Back to notes list`}
          onClick={onBack}
          className="min-h-11 rounded-full border border-[var(--color-line)] px-[13px] text-[15px] text-[var(--color-sumi)] transition duration-[300ms] hover:border-[var(--color-gold)] hover:bg-white"
        >
          ← {copy.back}
        </button>

        <div className="ml-auto flex flex-wrap items-center justify-end gap-[8px]">
          <button
            type="button"
            aria-label={note.isFavorite ? `${copy.unfavorite} / Remove favorite` : `${copy.favorite} / Favorite note`}
            aria-pressed={note.isFavorite}
            onClick={onToggleFavorite}
            className={[
              'min-h-11 min-w-11 rounded-full border px-[13px] text-[18px] transition duration-[300ms]',
              note.isFavorite
                ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)]'
                : 'border-[var(--color-line)] text-[var(--color-ink-muted)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]',
            ].join(' ')}
          >
            ★
          </button>
          <button
            type="button"
            aria-label={`${copy.delete} / Delete note`}
            onClick={onDelete}
            className="min-h-11 rounded-full border border-[var(--color-vermilion)]/30 px-[13px] text-[15px] text-[var(--color-vermilion)] transition duration-[300ms] hover:bg-[var(--color-vermilion)]/8"
          >
            {copy.delete}
          </button>
        </div>
      </div>

      <div className="mt-[21px] flex flex-col items-start gap-[8px] text-[13px] text-[var(--color-ink-muted)] sm:flex-row sm:items-center sm:justify-between sm:gap-[13px]">
        <div>
          <p>
            {copy.updated} {formatEditorTimestamp(note.updatedAt, note.locale)}
          </p>
          <p>{copy.updatedEn}</p>
        </div>
        <div
          aria-live="polite"
          className={[
            'min-h-[34px] self-stretch rounded-full border px-[13px] py-[8px] text-left transition duration-[400ms] sm:self-auto sm:text-right',
            statusCopy
              ? 'border-[var(--color-line)] bg-white/70 opacity-100'
              : 'border-transparent bg-transparent opacity-0',
          ].join(' ')}
        >
          {statusCopy ? (
            <>
              <p className="text-[13px] text-[var(--color-sumi)]">{statusCopy.primary}</p>
              <p className="text-[12px] text-[var(--color-ink-muted)]">{statusCopy.secondary}</p>
            </>
          ) : null}
        </div>
      </div>

      <div className="mt-[34px] flex flex-1 flex-col gap-[21px]">
        <label className="sr-only" htmlFor="note-title">
          タイトル / Title
        </label>
        <input
          id="note-title"
          aria-label="タイトル / Title"
          autoFocus
          value={note.title}
          onChange={(event) => onChange({ title: event.target.value, body: note.body })}
          placeholder={copy.titlePlaceholder}
          className="rounded-[13px] bg-transparent font-serif text-[28px] leading-tight text-[var(--color-sumi)] outline-none placeholder:text-[var(--color-ink-muted)]"
        />

        <div className="rounded-[21px] border border-[var(--color-line)] bg-white/65 px-[13px] py-[13px] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition duration-[300ms] focus-within:border-[var(--color-gold)] focus-within:bg-white">
          <label className="sr-only" htmlFor="note-body">
            本文 / Note body
          </label>
          <textarea
            id="note-body"
            aria-label="本文 / Note body"
            value={note.body}
            onChange={(event) => onChange({ title: note.title, body: event.target.value })}
            placeholder={copy.bodyPlaceholder}
            className="min-h-[52svh] w-full resize-none bg-transparent text-[16px] leading-[1.618] text-[var(--color-sumi)] outline-none placeholder:text-[var(--color-ink-muted)] md:min-h-[58svh]"
          />
        </div>
      </div>

      {!note.title.trim() && !note.body.trim() ? (
        <p className="mt-[13px] text-[13px] text-[var(--color-ink-muted)]">
          {getUntitledLabel(note.locale)}
        </p>
      ) : null}
    </section>
  )
}
