import { Asterisk } from 'lucide-react'

const items = [
  'Sites institucionais',
  'Landing pages',
  'Redesign de sites',
  'Páginas personalizadas',
  'Experiência do usuário',
  'Design responsivo',
  'SEO técnico básico',
  'Interfaces modernas',
]

export function Marquee() {
  const row = [...items, ...items]
  return (
    <div className="relative border-y border-white/[0.06] bg-ink-900/40 py-6" aria-label="O que fazemos">
      <div className="mask-fade-x flex overflow-hidden">
        <ul className="animate-marquee flex shrink-0 items-center gap-10 pr-10 motion-reduce:animate-none">
          {row.map((t, i) => (
            <li key={i} aria-hidden={i >= items.length} className="flex shrink-0 items-center gap-10 font-display text-lg font-medium text-slate-400 sm:text-xl">
              {t}
              <Asterisk className="h-4 w-4 text-volt-400" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
