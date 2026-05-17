import { ZanshinMark } from './ZanshinMark'

type EmptyStateProps = {
  title: string
  subtitle: string
  actionLabel: string
  onAction: () => void
}

export function EmptyState({ title, subtitle, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-[21px] px-[13px] py-[55px] text-center">
      <div className="rounded-full border border-[var(--color-line)] bg-white/40 p-[13px]">
        <ZanshinMark />
      </div>
      <div className="space-y-[8px]">
        <h2 className="font-serif text-[24px] leading-tight text-[var(--color-sumi)]">{title}</h2>
        <p className="text-[15px] leading-[1.618] text-[var(--color-ink-muted)]">{subtitle}</p>
      </div>
      <button
        type="button"
        onClick={onAction}
        className="min-h-11 rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] px-[21px] py-[13px] text-[15px] font-medium text-[var(--color-sumi)] transition duration-[300ms] hover:border-[var(--color-gold)] hover:text-[var(--color-indigo)]"
      >
        {actionLabel}
      </button>
    </div>
  )
}
