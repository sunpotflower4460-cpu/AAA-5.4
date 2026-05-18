import type { PropsWithChildren } from 'react'

type AppShellProps = PropsWithChildren<{
  isEditorOpen: boolean
}>

export function AppShell({ children, isEditorOpen }: AppShellProps) {
  return (
    <div className="min-h-svh bg-[var(--color-washi)] text-[var(--color-sumi)]">
      <div className="mx-auto flex min-h-svh max-w-[860px] items-stretch px-[13px] pb-[calc(13px+env(safe-area-inset-bottom))] pt-[calc(13px+env(safe-area-inset-top))] md:px-[34px] md:py-[34px]">
        <main
          className={[
            'app-shell relative isolate min-h-[calc(100svh-26px)] w-full overflow-hidden rounded-[34px] border border-[rgba(31,27,24,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.74),rgba(251,248,241,0.94))] shadow-[0_34px_89px_-55px_rgba(31,27,24,0.45)] backdrop-blur-[2px] transition-all duration-[400ms]',
            isEditorOpen ? 'md:min-h-[calc(100svh-68px)]' : '',
          ].join(' ')}
        >
          <div className="relative z-10 flex min-h-[calc(100svh-26px)] flex-col md:min-h-[calc(100svh-68px)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
