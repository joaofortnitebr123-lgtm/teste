import { useRef, type ReactNode, type PointerEvent } from 'react'

type Props = { children: ReactNode; className?: string }

/** Card com brilho que acompanha o cursor (somente CSS vars, sem re-render). */
export function SpotlightCard({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={`group/spot ring-gradient relative overflow-hidden rounded-3xl bg-gradient-to-b from-ink-800/80 to-ink-900/80 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), rgb(58 115 255 / .16), transparent 45%)',
        }}
      />
      {children}
    </div>
  )
}
