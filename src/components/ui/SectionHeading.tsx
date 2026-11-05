import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  id?: string
}

export function SectionHeading({ eyebrow, title, description, align = 'center', id }: Props) {
  const center = align === 'center'
  return (
    <div className={`flex flex-col gap-5 ${center ? 'mx-auto max-w-3xl items-center text-center' : 'max-w-2xl'}`}>
      <Reveal>
        <span className="eyebrow">
          <span className="h-1.5 w-1.5 rounded-full bg-volt-400 shadow-[0_0_10px_2px_rgb(97_148_255/.8)]" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 id={id} className="text-[2rem] font-semibold leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.12}>
          <p className="text-base leading-relaxed text-slate-400 sm:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  )
}
