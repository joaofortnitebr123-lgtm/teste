import { motion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article'
} & Omit<HTMLMotionProps<'div'>, 'children'>

export const ease = [0.22, 1, 0.36, 1] as const

export function Reveal({ children, delay = 0, y = 28, className, as = 'div', ...rest }: Props) {
  const C = motion[as] as typeof motion.div
  return (
    <C
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
      {...rest}
    >
      {children}
    </C>
  )
}
