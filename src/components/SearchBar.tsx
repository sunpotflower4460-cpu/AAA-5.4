import { copy } from '../lib/i18n'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex items-center gap-[13px] rounded-[21px] border border-[var(--color-line)] bg-white/70 px-[13px] py-[13px] shadow-[0_13px_34px_rgba(31,27,24,0.04)] backdrop-blur-sm transition duration-[300ms] focus-within:border-[var(--color-gold)] focus-within:bg-white">
      <span aria-hidden="true" className="text-[18px] text-[var(--color-ink-muted)]">
        ⌕
      </span>
      <input
        aria-label={copy.searchPlaceholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={copy.searchPlaceholder}
        className="min-w-0 flex-1 bg-transparent text-[16px] text-[var(--color-sumi)] outline-none placeholder:text-[var(--color-ink-muted)]"
      />
      {value ? (
        <button
          type="button"
          aria-label="検索をクリア / Clear search"
          onClick={() => onChange('')}
          className="min-h-11 min-w-11 rounded-full text-[var(--color-ink-muted)] transition duration-[300ms] hover:bg-[var(--color-washi)] hover:text-[var(--color-sumi)]"
        >
          ×
        </button>
      ) : null}
    </div>
  )
}
