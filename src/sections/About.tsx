import { motion, useScroll, useTransform } from 'motion/react'
import { Gem, Layers, MonitorSmartphone, ScanEye, ShieldCheck, type LucideIcon } from 'lucide-react'
import { useRef } from 'react'
import { Reveal } from '../components/ui/Reveal'
import { SpotlightCard } from '../components/ui/SpotlightCard'

const pillars: { icon: LucideIcon; title: string; text: string; wide?: boolean }[] = [
  {
    icon: ShieldCheck,
    title: 'Compromisso com qualidade',
    text: 'Cada entrega passa por revisão criteriosa de layout, conteúdo e funcionamento antes de chegar ao ar.',
    wide: true,
  },
  {
    icon: Gem,
    title: 'Design personalizado',
    text: 'Nada de modelos prontos: a identidade da sua empresa guia cada decisão visual.',
  },
  {
    icon: ScanEye,
    title: 'Experiência do usuário',
    text: 'Navegação clara e intuitiva para que o visitante encontre o que procura sem esforço.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Responsividade',
    text: 'Layouts pensados para computadores, tablets e celulares — não apenas adaptados.',
  },
  {
    icon: Layers,
    title: 'Atenção aos detalhes',
    text: 'Espaçamentos, tipografia, microinterações e textos alinhados com cuidado, pixel a pixel.',
    wide: true,
  },
]

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section id="sobre" className="relative py-24 sm:py-32" aria-labelledby="sobre-title">
      <motion.div
        aria-hidden
        style={{ y }}
        className="pointer-events-none absolute -left-40 top-20 h-[460px] w-[460px] rounded-full bg-[radial-gradient(closest-side,rgb(36_86_240/.22),transparent)]"
      />
      <div ref={ref} className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-volt-400 shadow-[0_0_10px_2px_rgb(97_148_255/.8)]" />
              Sobre a Kael.Web
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id="sobre-title" className="mt-5 text-[2rem] font-semibold leading-[1.08] sm:text-5xl">
              Sites que fazem sua empresa ser <span className="text-gradient">levada a sério.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 text-base leading-relaxed text-slate-400 sm:text-lg">
              A Kael.Web trabalha para melhorar a presença digital de empresas por meio de sites
              modernos, funcionais e estratégicos. Unimos design, tecnologia e clareza de comunicação
              para que o seu negócio seja percebido com o profissionalismo que ele tem.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
              Mais do que uma página bonita, entregamos uma experiência pensada para o seu público:
              rápida, intuitiva e coerente com a identidade da sua marca.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <figure className="mt-10 border-l-2 border-volt-500/60 pl-5">
              <blockquote className="font-display text-lg font-medium leading-snug text-white sm:text-xl">
                “Seu site é, muitas vezes, o primeiro contato do cliente com a sua empresa. Ele precisa
                estar à altura.”
              </blockquote>
              <figcaption className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
                Princípio Kael.Web
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.06} className={p.wide ? 'sm:col-span-2' : ''}>
              <SpotlightCard className="h-full p-6 sm:p-7">
                <div className={`relative flex h-full gap-5 ${p.wide ? 'flex-col sm:flex-row sm:items-center' : 'flex-col'}`}>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-volt-500/25 to-volt-700/10 text-volt-300 ring-1 ring-volt-400/25 transition-transform duration-500 group-hover/spot:-rotate-6 group-hover/spot:scale-110">
                    <p.icon className="h-[22px] w-[22px]" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-400">{p.text}</p>
                  </div>
                  <span className="absolute right-0 top-0 font-mono text-xs text-slate-600">0{i + 1}</span>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
