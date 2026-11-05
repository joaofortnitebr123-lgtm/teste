import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'motion/react'
import { ArrowRight, ArrowUpRight, Check, MonitorSmartphone, MousePointer2, Sparkles, Zap } from 'lucide-react'
import type { PointerEvent, ReactNode } from 'react'
import { ButtonLink } from '../components/ui/Button'
import { ease } from '../components/ui/Reveal'
import { useMediaQuery } from '../hooks/useMediaQuery'

const words = ['Transformamos', 'sua', 'presença', 'digital', 'em', 'resultados.']
const highlight = new Set([2, 3])

export function Hero() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18 })
  const sy = useSpring(my, { stiffness: 60, damping: 18 })
  const desktop = useMediaQuery('(min-width: 1024px) and (pointer: fine)')

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!desktop) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <section
      id="inicio"
      onPointerMove={onMove}
      onPointerLeave={() => {
        mx.set(0)
        my.set(0)
      }}
      className="noise relative isolate overflow-hidden pb-20 pt-32 sm:pt-40 lg:min-h-[100svh] lg:pb-28 lg:pt-44"
      aria-labelledby="hero-title"
    >
      <HeroBackground />

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1.02fr_1fr] lg:gap-10">
        <div className="relative z-10 flex flex-col items-start">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="eyebrow"
          >
            <Sparkles className="h-3.5 w-3.5 text-volt-300" />
            Estúdio de design &amp; desenvolvimento web
          </motion.span>

          <h1
            id="hero-title"
            className="mt-7 text-[2.6rem] font-semibold leading-[1.04] sm:text-6xl lg:text-[3.9rem] xl:text-[4.4rem]"
          >
            {words.map((w, i) => (
              <span key={i}>
                <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <motion.span
                    className={`inline-block ${highlight.has(i) ? 'text-gradient' : 'text-white'}`}
                    initial={{ y: '110%', rotate: 4 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ duration: 0.9, delay: 0.25 + i * 0.07, ease }}
                  >
                    {w}
                  </motion.span>
                </span>
                {i < words.length - 1 && ' '}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            Criamos sites institucionais, landing pages e páginas personalizadas com design exclusivo,
            navegação intuitiva e desenvolvimento cuidadoso — para que sua empresa transmita
            profissionalismo, confiança e credibilidade desde o primeiro clique.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease }}
            className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <ButtonLink href="#contato" size="lg">
              Solicitar orçamento
              <ArrowUpRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href="#projetos" size="lg" variant="secondary">
              Conhecer nossos projetos
              <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
            </ButtonLink>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.15 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400"
          >
            {['Design personalizado', '100% responsivo', 'Foco em experiência'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-volt-500/15 text-volt-300 ring-1 ring-volt-400/30">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        <HeroVisual sx={sx} sy={sy} />
      </div>

      <motion.a
        href="#sobre"
        aria-label="Rolar para a próxima seção"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500 transition-colors hover:text-slate-300 lg:flex"
      >
        Role
        <span className="relative h-9 w-[22px] rounded-full border border-white/15">
          <motion.span
            className="absolute left-1/2 top-1.5 h-1.5 w-1 -translate-x-1/2 rounded-full bg-volt-400"
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.a>
    </section>
  )
}

function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="grid-bg mask-radial absolute inset-0 opacity-70" />
      <div className="absolute -top-40 left-1/2 h-[640px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(36_86_240/.38),transparent)]" />
      <div className="absolute right-[-10%] top-[22%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(79_214_255/.16),transparent)]" />
      <div className="absolute left-[-15%] top-[55%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgb(58_115_255/.18),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
    </div>
  )
}

function useLayer(v: MotionValue<number>, amount: number) {
  return useTransform(v, (n) => n * amount)
}

const codeLines = [
  [['c-k', '<section'], ['c-a', ' className'], ['c-p', '='], ['c-s', '"hero"'], ['c-k', '>']],
  [['c-p', '  '], ['c-k', '<h1>'], ['c-t', 'Sua marca, '], ['c-s', 'online'], ['c-k', '</h1>']],
  [['c-p', '  '], ['c-k', '<Button'], ['c-a', ' variant'], ['c-p', '='], ['c-s', '"primary"'], ['c-k', '>']],
  [['c-p', '    '], ['c-t', 'Fale conosco']],
  [['c-p', '  '], ['c-k', '</Button>']],
  [['c-k', '</section>']],
] as const

const tone: Record<string, string> = {
  'c-k': 'text-volt-300',
  'c-a': 'text-cyan-glow',
  'c-p': 'text-slate-500',
  'c-s': 'text-emerald-300',
  'c-t': 'text-slate-200',
}

function HeroVisual({ sx, sy }: { sx: MotionValue<number>; sy: MotionValue<number> }) {
  const bx = useLayer(sx, -14)
  const by = useLayer(sy, -10)
  const cx = useLayer(sx, 26)
  const cy = useLayer(sy, 20)
  const px = useLayer(sx, 36)
  const py = useLayer(sy, 28)
  const rX = useTransform(sy, (n) => n * -6)
  const rY = useTransform(sx, (n) => n * 8)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.35, ease }}
      className="relative mx-auto w-full max-w-[620px] [perspective:1400px] lg:mx-0"
    >
      {/* anel luminoso */}
      <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[115%] -translate-x-1/2 -translate-y-1/2">
        <div className="animate-spin-slow absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgb(58_115_255/.35)_80deg,transparent_160deg,rgb(79_214_255/.25)_260deg,transparent_340deg)] blur-3xl" />
      </div>

      <motion.div style={{ rotateX: rX, rotateY: rY, x: bx, y: by }} className="relative [transform-style:preserve-3d]">
        {/* Janela do navegador */}
        <div className="ring-gradient relative overflow-hidden rounded-[22px] bg-ink-900/90 shadow-[0_50px_120px_-30px_rgb(0_0_0/.9),0_0_0_1px_rgb(255_255_255/.04)]">
          <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
            </div>
            <div className="mx-auto flex h-7 w-full max-w-[260px] items-center justify-center gap-2 rounded-lg bg-white/[0.04] px-3 font-mono text-[11px] text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              suaempresa.com.br
            </div>
            <div className="w-10" />
          </div>

          <div className="relative grid aspect-[16/11] grid-cols-12 gap-3 p-4 sm:p-5">
            {/* mini site em construção */}
            <div className="col-span-12 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-md bg-gradient-to-br from-volt-300 to-volt-600" />
                <Bar w="w-16" d={0.9} />
              </div>
              <div className="hidden gap-2 sm:flex">
                <Bar w="w-9" d={1} tone="dim" />
                <Bar w="w-9" d={1.05} tone="dim" />
                <Bar w="w-9" d={1.1} tone="dim" />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="h-5 w-14 rounded-full bg-volt-500"
              />
            </div>

            <div className="col-span-7 flex flex-col justify-center gap-2.5 pt-2">
              <Bar w="w-[38%]" d={1.1} tone="accent" h="h-2" />
              <Bar w="w-[92%]" d={1.2} h="h-4 sm:h-5" tone="bright" />
              <Bar w="w-[70%]" d={1.3} h="h-4 sm:h-5" tone="bright" />
              <Bar w="w-[85%]" d={1.4} tone="dim" />
              <Bar w="w-[60%]" d={1.45} tone="dim" />
              <div className="mt-2 flex gap-2">
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }} className="h-6 w-20 rounded-full bg-gradient-to-r from-volt-400 to-volt-600 shadow-[0_6px_20px_-6px_rgb(58_115_255/.9)]" />
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7 }} className="h-6 w-16 rounded-full border border-white/15" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.9, ease }}
              className="relative col-span-5 overflow-hidden rounded-2xl bg-gradient-to-br from-volt-500/40 via-ink-700 to-ink-850 ring-1 ring-white/10"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgb(79_214_255/.5),transparent_55%)]" />
              <div className="absolute bottom-3 left-3 right-3 space-y-1.5">
                <div className="h-1.5 w-1/2 rounded-full bg-white/50" />
                <div className="h-1.5 w-1/3 rounded-full bg-white/25" />
              </div>
              <motion.div
                className="absolute right-4 top-4 h-10 w-10 rounded-xl border border-white/30 bg-white/10 backdrop-blur"
                animate={{ y: [0, -6, 0], rotate: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            <div className="col-span-12 grid grid-cols-3 gap-3 pt-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.75 + i * 0.12, duration: 0.6, ease }}
                  className="space-y-2 rounded-xl border border-white/[0.06] bg-white/[0.025] p-2.5 sm:p-3"
                >
                  <div className="h-4 w-4 rounded-md bg-volt-500/30 ring-1 ring-volt-400/40" />
                  <div className="h-1.5 w-3/4 rounded-full bg-white/20" />
                  <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
                </motion.div>
              ))}
            </div>

            {/* cursor animado */}
            <motion.div
              aria-hidden
              className="absolute left-0 top-0 text-white drop-shadow-[0_4px_10px_rgb(0_0_0/.6)]"
              initial={{ x: 300, y: 230, opacity: 0 }}
              animate={{
                x: [300, 120, 120, 380, 380, 300],
                y: [230, 205, 205, 120, 120, 230],
                opacity: [0, 1, 1, 1, 1, 0],
              }}
              transition={{ duration: 7, delay: 2.2, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
            >
              <MousePointer2 className="h-5 w-5 fill-white" />
            </motion.div>
          </div>
        </div>

        {/* editor de código flutuante */}
        <motion.div
          style={{ x: cx, y: cy }}
          className="absolute -bottom-10 -left-4 w-[62%] sm:-left-10 sm:w-[54%]"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{ opacity: { delay: 1.1, duration: 0.8 }, y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.1 } }}
            className="glass-strong overflow-hidden rounded-2xl shadow-[0_30px_80px_-20px_rgb(0_0_0/.9)]"
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] px-3.5 py-2.5">
              <span className="font-mono text-[10px] text-slate-400">Hero.tsx</span>
              <span className="flex items-center gap-1 rounded-full bg-volt-500/15 px-2 py-0.5 font-mono text-[9px] text-volt-200">
                <span className="animate-pulse-soft h-1 w-1 rounded-full bg-volt-300" /> editando
              </span>
            </div>
            <pre className="overflow-hidden px-3.5 py-3 font-mono text-[9.5px] leading-[1.7] sm:text-[11px]">
              {codeLines.map((line, li) => (
                <motion.div
                  key={li}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + li * 0.14 }}
                  className="whitespace-pre"
                >
                  <span className="mr-3 select-none text-slate-600">{li + 1}</span>
                  {line.map(([c, t], ti) => (
                    <span key={ti} className={tone[c]}>
                      {t}
                    </span>
                  ))}
                  {li === codeLines.length - 1 && (
                    <motion.span
                      className="ml-0.5 inline-block h-3 w-[2px] translate-y-0.5 bg-volt-300"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              ))}
            </pre>
          </motion.div>
        </motion.div>

        {/* celular flutuante */}
        <motion.div style={{ x: px, y: py }} className="absolute -right-2 -top-10 w-[27%] sm:-right-8 sm:w-[24%]">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ opacity: { delay: 1.25, duration: 0.8 }, y: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.25 } }}
            className="rounded-[22px] border border-white/15 bg-gradient-to-b from-ink-700 to-ink-900 p-1.5 shadow-[0_30px_70px_-15px_rgb(0_0_0/.9),0_0_40px_-10px_rgb(58_115_255/.5)]"
          >
            <div className="relative aspect-[9/19] overflow-hidden rounded-[17px] bg-ink-850">
              <div className="mx-auto mt-1.5 h-1.5 w-8 rounded-full bg-black/80" />
              <div className="space-y-1.5 p-2 pt-3">
                <div className="h-14 rounded-lg bg-gradient-to-br from-volt-400/70 to-ink-700" />
                <div className="h-1.5 w-4/5 rounded-full bg-white/40" />
                <div className="h-1.5 w-3/5 rounded-full bg-white/20" />
                <div className="mt-2 h-3.5 w-1/2 rounded-full bg-volt-500" />
                <div className="grid grid-cols-2 gap-1 pt-1.5">
                  <div className="h-7 rounded-md bg-white/[0.06]" />
                  <div className="h-7 rounded-md bg-white/[0.06]" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* chips */}
        <FloatChip className="-left-3 top-[18%] sm:-left-12" delay={1.5} icon={<MonitorSmartphone className="h-4 w-4" />} title="Responsivo" sub="Desktop · Tablet · Mobile" />
        <FloatChip className="-right-2 bottom-[16%] sm:-right-10" delay={1.7} icon={<Zap className="h-4 w-4" />} title="Carregamento leve" sub="Código otimizado" alt />
      </motion.div>
    </motion.div>
  )
}

function Bar({
  w,
  d,
  h = 'h-2',
  tone = 'mid',
}: {
  w: string
  d: number
  h?: string
  tone?: 'dim' | 'mid' | 'bright' | 'accent'
}) {
  const c = {
    dim: 'bg-white/10',
    mid: 'bg-white/25',
    bright: 'bg-gradient-to-r from-white/80 to-white/40',
    accent: 'bg-volt-400/70',
  }[tone]
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ delay: d, duration: 0.7, ease }}
      className={`${w} ${h} origin-left rounded-full ${c}`}
    />
  )
}

function FloatChip({
  className,
  delay,
  icon,
  title,
  sub,
  alt,
}: {
  className: string
  delay: number
  icon: ReactNode
  title: string
  sub: string
  alt?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1, y: alt ? [0, 8, 0] : [0, -8, 0] }}
      transition={{
        opacity: { delay, duration: 0.6 },
        scale: { delay, duration: 0.6, ease },
        y: { delay, duration: alt ? 5.5 : 6.5, repeat: Infinity, ease: 'easeInOut' },
      }}
      className={`glass-strong absolute z-10 hidden items-center gap-3 rounded-2xl py-2.5 pl-2.5 pr-4 shadow-[0_20px_50px_-15px_rgb(0_0_0/.8)] sm:flex ${className}`}
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-volt-400 to-volt-600 text-white shadow-[0_6px_18px_-6px_rgb(58_115_255/.9)]">
        {icon}
      </span>
      <span className="leading-tight">
        <span className="block text-[13px] font-semibold text-white">{title}</span>
        <span className="block text-[11px] text-slate-400">{sub}</span>
      </span>
    </motion.div>
  )
}
