import type { PropsWithChildren } from 'react'

type AppShellProps = PropsWithChildren<{
  isEditorOpen: boolean
}>

export function AppShell({ children, isEditorOpen }: AppShellProps) {
  return (
    <div className="min-h-svh bg-[var(--color-washi)] text-[var(--color-sumi)]">
      <div className="mx-auto min-h-svh max-w-[720px] px-[21px] pb-[calc(21px+env(safe-area-inset-bottom))] pt-[calc(21px+env(safe-area-inset-top))] md:px-[34px] md:py-[34px]">
        <main
          className={[
            'app-shell relative min-h-[calc(100svh-42px)] overflow-hidden rounded-[21px] border border-[var(--color-line)] bg-[var(--color-paper)]/95 shadow-[0_21px_55px_var(--color-shadow)] transition-all duration-[400ms]',
            isEditorOpen ? 'md:min-h-[calc(100svh-68px)]' : '',
          ].join(' ')}
        >
          <div className="relative z-10 flex min-h-[calc(100svh-42px)] flex-col md:min-h-[calc(100svh-68px)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
