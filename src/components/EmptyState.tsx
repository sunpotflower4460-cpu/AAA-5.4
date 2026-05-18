import { ZanshinMark } from './ZanshinMark'

type EmptyStateProps = {
  title: string
  subtitle: string
  actionLabel: string
  onAction: () => void
}

export function EmptyState({ title, subtitle, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-[13px] py-[55px] text-center">
      <div className="relative w-full max-w-[420px] overflow-hidden rounded-[34px] border border-[rgba(31,27,24,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(251,248,241,0.82))] px-[21px] py-[34px] shadow-[0_21px_55px_-34px_rgba(31,27,24,0.28)]">
        <div className="pointer-events-none absolute right-[-21px] top-[-34px] opacity-50">
          <ZanshinMark />
        </div>
        <div className="relative flex flex-col items-center gap-[21px]">
          <div className="rounded-full border border-[rgba(31,27,24,0.08)] bg-white/55 p-[13px] shadow-[0_13px_34px_-21px_rgba(31,27,24,0.22)]">
            <ZanshinMark />
          </div>
          <div className="space-y-[8px]">
            <h2 className="font-serif text-[24px] leading-tight text-[var(--color-sumi)]">{title}</h2>
            <p className="text-[15px] leading-[1.75] text-[var(--color-ink-muted)]">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onAction}
            className="min-h-11 rounded-full border border-[rgba(31,27,24,0.08)] bg-[var(--color-paper-soft)] px-[21px] py-[13px] text-[15px] font-medium text-[var(--color-sumi)] shadow-[0_13px_34px_-21px_rgba(31,27,24,0.18)] transition duration-[300ms] hover:border-[rgba(201,166,70,0.4)] hover:bg-white hover:text-[var(--color-indigo)]"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
