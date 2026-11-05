import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp'
type Size = 'md' | 'lg'

const base =
  'group relative inline-flex select-none items-center justify-center gap-2.5 overflow-hidden rounded-full font-semibold tracking-tight transition-[transform,box-shadow,background-color,border-color,color] duration-300 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60'

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-14 px-7 text-[15px]',
}

const variants: Record<Variant, string> = {
  primary:
    'text-white bg-gradient-to-b from-volt-400 to-volt-600 shadow-[0_0_0_1px_rgb(147_182_255/.35)_inset,0_10px_30px_-10px_rgb(58_115_255/.8)] hover:shadow-[0_0_0_1px_rgb(196_216_255/.5)_inset,0_18px_44px_-12px_rgb(58_115_255/.95)] hover:-translate-y-0.5',
  secondary:
    'text-white glass hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5',
  ghost: 'text-slate-300 hover:text-white',
  whatsapp:
    'text-white bg-gradient-to-b from-[#2fe07a] to-[#13a84f] shadow-[0_0_0_1px_rgb(255_255_255/.2)_inset,0_12px_34px_-10px_rgb(37_211_102/.75)] hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgb(255_255_255/.3)_inset,0_20px_46px_-12px_rgb(37_211_102/.9)]',
}

function Shine({ show }: { show: boolean }) {
  if (!show) return null
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
    />
  )
}

type Common = { variant?: Variant; size?: Size; children: ReactNode; className?: string }

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>
      <Shine show={variant === 'primary' || variant === 'whatsapp'} />
      <span className="relative inline-flex items-center gap-2.5">{children}</span>
    </a>
  )
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>
      <Shine show={variant === 'primary' || variant === 'whatsapp'} />
      <span className="relative inline-flex items-center gap-2.5">{children}</span>
    </button>
  )
}
