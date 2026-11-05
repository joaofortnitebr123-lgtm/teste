import { motion } from 'motion/react'
import { Compass, Fingerprint, Hammer, Smartphone, Target, type LucideIcon } from 'lucide-react'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal, ease } from '../components/ui/Reveal'

const items: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Fingerprint, title: 'Design exclusivo', text: 'Layouts criados do zero para a sua marca. Seu site não vai parecer com o do concorrente.' },
  { icon: Smartphone, title: 'Sites responsivos', text: 'Experiência impecável em qualquer tela, com cuidado especial para quem acessa pelo celular.' },
  { icon: Compass, title: 'Navegação intuitiva', text: 'Estrutura clara, menus objetivos e caminhos curtos até o contato com a sua empresa.' },
  { icon: Hammer, title: 'Desenvolvimento cuidadoso', text: 'Código limpo, organizado e leve, com atenção a desempenho, acessibilidade e SEO básico.' },
  { icon: Target, title: 'Foco na presença digital', text: 'Cada decisão é tomada pensando em como sua empresa será percebida on-line.' },
]

export function Differentials() {
  return (
    <section id="diferenciais" className="relative overflow-hidden py-24 sm:py-32" aria-labelledby="dif-title">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="grid-bg mask-radial absolute inset-0 opacity-40" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(36_86_240/.2),transparent)]" />
      </div>

      <div className="container-x relative">
        <SectionHeading
          id="dif-title"
          eyebrow="Por que a Kael.Web"
          title={
            <>
              O cuidado que separa um site <span className="text-gradient">comum</span> de um site{' '}
              <span className="text-gradient">memorável</span>
            </>
          }
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-5">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.07} className="group relative bg-ink-900/95 p-7 transition-colors duration-500 hover:bg-ink-850 sm:p-8 lg:min-h-[320px] max-lg:last:sm:col-span-2">
              <div className="flex h-full flex-col">
                <div className="relative h-14 w-14">
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-2xl bg-volt-500/30 blur-xl"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: [0, 0.9, 0.4] }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, delay: 0.3 + i * 0.1, ease }}
                  />
                  <span className="relative grid h-14 w-14 place-items-center rounded-2xl border border-volt-400/30 bg-ink-800 text-volt-300 transition-all duration-500 group-hover:border-volt-300/60 group-hover:text-white">
                    <it.icon className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-semibold lg:mt-auto lg:pt-10">{it.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-400">{it.text}</p>
                <span aria-hidden className="absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-volt-400 to-cyan-glow transition-transform duration-700 group-hover:scale-x-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
