import { motion } from 'motion/react'
import { MessageSquarePlus, Quote, Star, Info } from 'lucide-react'
import { testimonials, type Testimonial } from '../config/testimonials'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal, ease } from '../components/ui/Reveal'
import { ButtonLink } from '../components/ui/Button'

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('')
}

export function Testimonials() {
  const hasDemo = testimonials.some((t) => t.demo)
  return (
    <section id="avaliacoes" className="relative overflow-hidden py-24 sm:py-32" aria-labelledby="avaliacoes-title">
      <div aria-hidden className="divider-glow absolute inset-x-0 top-0" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-24 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(36_86_240/.16),transparent)]" />
      <div className="container-x relative">
        <SectionHeading
          id="avaliacoes-title"
          eyebrow="Avaliações"
          title={
            <>
              A confiança dos clientes é o nosso <span className="text-gradient">melhor cartão de visita</span>
            </>
          }
          description="Este espaço está preparado para reunir avaliações reais de quem trabalhou com a Kael.Web. Preferimos mostrar apenas depoimentos autênticos."
        />

        {hasDemo && (
          <Reveal delay={0.15} className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-2.5 rounded-full border border-amber-300/20 bg-amber-300/[0.05] px-4 py-2 text-center text-xs text-amber-100/85 sm:text-sm">
            <Info className="h-4 w-4 shrink-0 text-amber-300" />
            Os cards abaixo são exemplos ilustrativos de layout — não são avaliações reais.
          </Reveal>
        )}

        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={i} delay={i * 0.08}>
              <TestimonialCard t={t} index={i} />
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1} className="mt-5">
          <div className="ring-gradient relative flex flex-col items-start gap-6 overflow-hidden rounded-[28px] bg-gradient-to-r from-volt-700/25 via-ink-850 to-ink-900 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div aria-hidden className="absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-volt-500/25 blur-3xl" />
            <div className="relative flex items-center gap-5">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/[0.06] text-volt-200 ring-1 ring-white/10">
                <MessageSquarePlus className="h-6 w-6" strokeWidth={1.6} />
              </span>
              <div>
                <h3 className="text-xl font-semibold">Já é cliente da Kael.Web?</h3>
                <p className="mt-1 text-slate-400">Sua avaliação ajuda outras empresas a conhecerem nosso trabalho.</p>
              </div>
            </div>
            <ButtonLink href="#contato" variant="secondary" className="relative w-full shrink-0 sm:w-auto">
              Enviar minha avaliação
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  return (
    <motion.figure
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease }}
      className="ring-gradient relative flex h-full flex-col overflow-hidden rounded-[28px] bg-gradient-to-b from-ink-800/80 to-ink-900/90 p-7 sm:p-8"
    >
      <Quote aria-hidden className="absolute right-6 top-6 h-14 w-14 text-white/[0.04]" />
      <div className="flex items-center justify-between">
        <div className="flex gap-1" role="img" aria-label={`Nota ${t.rating} de 5${t.demo ? ' (exemplo)' : ''}`}>
          {Array.from({ length: 5 }).map((_, s) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 + index * 0.08 + s * 0.06, type: 'spring', stiffness: 400, damping: 15 }}
            >
              <Star className={`h-[18px] w-[18px] ${s < t.rating ? 'fill-amber-300 text-amber-300' : 'text-white/20'}`} />
            </motion.span>
          ))}
        </div>
        {t.demo && (
          <span className="rounded-full bg-amber-300/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-amber-200 ring-1 ring-amber-300/25">
            Exemplo
          </span>
        )}
      </div>

      <blockquote className={`mt-6 flex-1 text-[17px] leading-relaxed ${t.demo ? 'italic text-slate-400' : 'text-slate-200'}`}>
        “{t.text}”
      </blockquote>

      <figcaption className="mt-8 flex items-center gap-4 border-t border-white/[0.06] pt-6">
        {t.photo ? (
          <img src={t.photo} alt={`Foto de ${t.name}`} width={48} height={48} loading="lazy" className="h-12 w-12 rounded-full object-cover ring-2 ring-volt-400/40" />
        ) : (
          <span
            aria-hidden
            className={`grid h-12 w-12 place-items-center rounded-full font-display text-sm font-semibold ${
              t.demo ? 'border border-dashed border-white/25 text-slate-500' : 'bg-gradient-to-br from-volt-400 to-volt-700 text-white'
            }`}
          >
            {initials(t.name)}
          </span>
        )}
        <div>
          <div className={`font-semibold ${t.demo ? 'text-slate-300' : 'text-white'}`}>{t.name}</div>
          <div className="text-sm text-slate-500">{t.role}</div>
        </div>
      </figcaption>
    </motion.figure>
  )
}
