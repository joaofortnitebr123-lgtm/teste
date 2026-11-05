import { useId } from 'react'

type Props = { className?: string; showText?: boolean }

export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8fb4ff" />
          <stop offset="1" stopColor="#2f5bff" />
        </linearGradient>
        <radialGradient id={`${id}r`} cx=".3" cy=".2" r="1">
          <stop offset="0" stopColor="#1a2a55" />
          <stop offset="1" stopColor="#070b18" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" rx="17" fill={`url(#${id}r)`} />
      <rect x="1" y="1" width="62" height="62" rx="16" fill="none" stroke={`url(#${id}g)`} strokeOpacity=".55" strokeWidth="1.5" />
      <path d="M20 16h7v32h-7z" fill={`url(#${id}g)`} />
      <path d="M30 32 42 16h9L38.5 32 51 48h-9z" fill={`url(#${id}g)`} />
    </svg>
  )
}

export function Logo({ className = '', showText = true }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      {showText && (
        <span className="font-display text-[1.15rem] font-bold tracking-tight text-white">
          Kael<span className="text-volt-400">.</span>
          <span className="font-medium text-slate-300">Web</span>
        </span>
      )}
    </span>
  )
}
