import { motion, useScroll, useSpring } from 'motion/react'
import { ClipboardList, Code, MessageCircle, PackageCheck, PenTool, type LucideIcon } from 'lucide-react'
import { useRef } from 'react'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ease } from '../components/ui/Reveal'

const steps: { icon: LucideIcon; title: string; text: string; points: string[] }[] = [
  {
    icon: MessageCircle,
    title: 'Primeiro contato',
    text: 'Você nos conta sobre a sua empresa e o que precisa. Uma conversa simples, sem compromisso.',
    points: ['WhatsApp, Instagram ou e-mail', 'Retorno com os próximos passos'],
  },
  {
    icon: ClipboardList,
    title: 'Entendimento das necessidades',
    text: 'Mergulhamos no seu negócio, público e objetivos para definir o escopo ideal do projeto.',
    points: ['Objetivos e público-alvo', 'Conteúdo e referências'],
  },
  {
    icon: PenTool,
    title: 'Planejamento e criação',
    text: 'Estruturamos as páginas e criamos o design visual alinhado à identidade da sua marca.',
    points: ['Arquitetura de informação', 'Layout para desktop e mobile'],
  },
  {
    icon: Code,
    title: 'Desenvolvimento do site',
    text: 'Transformamos o design em um site rápido, responsivo e funcional, com código limpo.',
    points: ['Responsividade total', 'SEO básico e acessibilidade'],
  },
  {
    icon: PackageCheck,
    title: 'Revisão e entrega',
    text: 'Revisamos cada detalhe com você, fazemos os ajustes e colocamos o site no ar.',
    points: ['Rodada de ajustes', 'Publicação e orientações'],
  },
]

export function Process() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <section id="processo" className="relative overflow-x-clip py-24 sm:py-32" aria-labelledby="processo-title">
      <div aria-hidden className="divider-glow absolute inset-x-0 top-0" />
      <div className="container-x">
        <SectionHeading
          id="processo-title"
          eyebrow="Processo de trabalho"
          title={
            <>
              Do primeiro contato ao site <span className="text-gradient">no ar</span>
            </>
          }
          description="Um processo claro e transparente, em cinco etapas, para você saber exatamente o que acontece em cada momento do projeto."
        />

        <ol ref={ref} className="relative mx-auto mt-20 max-w-5xl">
          {/* trilho */}
          <div aria-hidden className="absolute bottom-0 left-[27px] top-0 w-px bg-white/[0.08] md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            aria-hidden
            style={{ scaleY }}
            className="absolute bottom-0 left-[27px] top-0 w-px origin-top bg-gradient-to-b from-volt-300 via-volt-500 to-cyan-glow shadow-[0_0_14px_rgb(97_148_255/.9)] md:left-1/2 md:-translate-x-1/2"
          />

          {steps.map((s, i) => {
            const right = i % 2 === 1
            return (
              <li key={s.title} className="relative grid grid-cols-[56px_1fr] gap-5 pb-14 last:pb-0 md:grid-cols-[1fr_72px_1fr] md:gap-0 md:pb-20">
                <div className={`hidden md:block ${right ? 'md:order-1' : 'md:order-3'}`} />
                <div className="relative flex justify-center md:order-2">
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '0px 0px -30% 0px' }}
                    transition={{ duration: 0.6, ease }}
                    className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl border border-volt-400/40 bg-ink-900 font-display text-lg font-semibold text-white shadow-[0_0_0_6px_var(--color-ink-950),0_0_30px_-4px_rgb(58_115_255/.7)]"
                  >
                    <span className="absolute inset-0 rounded-2xl bg-gradient-to-b from-volt-500/30 to-transparent" />
                    <span className="relative">0{i + 1}</span>
                  </motion.span>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: right ? 40 : -40, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '0px 0px -20% 0px' }}
                  transition={{ duration: 0.8, ease }}
                  className={`${right ? 'md:order-3' : 'md:order-1 md:text-right'}`}
                >
                  <div className="glass group rounded-3xl p-6 transition-colors duration-500 hover:border-volt-400/30 sm:p-7">
                    <div className={`flex items-center gap-3 ${right ? '' : 'md:flex-row-reverse'}`}>
                      <s.icon className="h-5 w-5 text-volt-300" strokeWidth={1.75} />
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">Etapa {i + 1}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold sm:text-2xl">{s.title}</h3>
                    <p className="mt-3 leading-relaxed text-slate-400">{s.text}</p>
                    <ul className={`mt-5 flex flex-wrap gap-2 ${right ? '' : 'md:justify-end'}`}>
                      {s.points.map((p) => (
                        <li key={p} className="rounded-full bg-white/[0.04] px-3 py-1 text-xs text-slate-300 ring-1 ring-white/10">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
