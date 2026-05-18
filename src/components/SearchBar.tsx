import { copy } from '../lib/i18n'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex items-center gap-[13px] rounded-[24px] border border-[rgba(31,27,24,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(251,248,241,0.8))] px-[13px] py-[13px] shadow-[0_13px_34px_-21px_rgba(31,27,24,0.24)] backdrop-blur-sm transition duration-[300ms] focus-within:border-[rgba(201,166,70,0.4)] focus-within:bg-white">
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
          className="min-h-11 min-w-11 rounded-full border border-transparent text-[var(--color-ink-muted)] transition duration-[300ms] hover:border-[rgba(31,27,24,0.08)] hover:bg-white hover:text-[var(--color-sumi)]"
        >
          ×
        </button>
      ) : null}
    </div>
  )
}
