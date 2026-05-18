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
    <section className="flex min-h-[calc(100svh-26px)] flex-1 flex-col px-[21px] pb-[34px] pt-[21px] md:min-h-[calc(100svh-68px)] md:px-[34px] md:pt-[34px]">
      <div className="overflow-hidden rounded-[34px] border border-[rgba(31,27,24,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(251,248,241,0.56))] px-[21px] py-[21px] shadow-[0_21px_55px_-34px_rgba(31,27,24,0.28)]">
        <div className="flex flex-wrap items-center gap-[13px]">
          <button
            type="button"
            aria-label={`${copy.back} / Back to notes list`}
            onClick={onBack}
            className="min-h-11 rounded-full border border-[rgba(31,27,24,0.08)] bg-white/70 px-[13px] text-[15px] text-[var(--color-sumi)] transition duration-[300ms] hover:border-[rgba(201,166,70,0.4)] hover:bg-white"
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
                  ? 'border-[rgba(201,166,70,0.42)] bg-[var(--color-gold)]/12 text-[var(--color-gold)] shadow-[0_13px_34px_-21px_rgba(201,166,70,0.45)]'
                  : 'border-[rgba(31,27,24,0.08)] bg-white/70 text-[var(--color-ink-muted)] hover:border-[rgba(201,166,70,0.4)] hover:text-[var(--color-gold)]',
              ].join(' ')}
            >
              ★
            </button>
            <button
              type="button"
              aria-label={`${copy.delete} / Delete note`}
              onClick={onDelete}
              className="min-h-11 rounded-full border border-[var(--color-vermilion)]/22 bg-white/60 px-[13px] text-[15px] text-[var(--color-vermilion)] transition duration-[300ms] hover:bg-[var(--color-vermilion)]/8"
            >
              {copy.delete}
            </button>
          </div>
        </div>

        <div className="mt-[21px] flex flex-col gap-[13px] sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-[4px] text-[13px] text-[var(--color-ink-muted)]">
            <p className="uppercase tracking-[0.18em] text-[12px]">Quiet editor</p>
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
                ? 'status-breath border-[rgba(201,166,70,0.22)] bg-white/76 opacity-100'
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
      </div>

      <div className="mt-[34px] flex flex-1 flex-col gap-[21px]">
        <label className="sr-only" htmlFor="note-title">
          タイトル / Title
        </label>
        <div className="relative flex flex-1 flex-col overflow-hidden rounded-[34px] border border-[rgba(31,27,24,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(251,248,241,0.82))] px-[21px] py-[21px] shadow-[0_21px_55px_-34px_rgba(31,27,24,0.28)] transition duration-[300ms] focus-within:border-[rgba(201,166,70,0.3)] focus-within:bg-white">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[21px] left-[21px] top-[21px] w-px bg-[linear-gradient(180deg,rgba(201,166,70,0.4),rgba(31,27,24,0.08),transparent)]"
          />
          <div className="relative ml-[13px] border-b border-[rgba(31,27,24,0.08)] pb-[21px]">
            <input
              id="note-title"
              aria-label="タイトル / Title"
              autoFocus
              value={note.title}
              onChange={(event) => onChange({ title: event.target.value, body: note.body })}
              placeholder={copy.titlePlaceholder}
              className="w-full bg-transparent font-serif text-[31px] leading-[1.35] text-[var(--color-sumi)] outline-none placeholder:text-[var(--color-ink-muted)]"
            />
          </div>

          <div className="relative ml-[13px] flex flex-1 pt-[21px]">
            <label className="sr-only" htmlFor="note-body">
              本文 / Note body
            </label>
            <textarea
              id="note-body"
              aria-label="本文 / Note body"
              value={note.body}
              onChange={(event) => onChange({ title: note.title, body: event.target.value })}
              placeholder={copy.bodyPlaceholder}
              className="min-h-[54svh] w-full resize-none bg-transparent text-[16px] leading-[1.85] text-[var(--color-sumi)] outline-none placeholder:text-[var(--color-ink-muted)] md:min-h-[58svh]"
            />
          </div>
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
