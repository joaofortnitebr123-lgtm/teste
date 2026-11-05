import { ArrowUpRight, Building2, Code2, MousePointerClick, RefreshCcw, Rocket, type LucideIcon } from 'lucide-react'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { SpotlightCard } from '../components/ui/SpotlightCard'

type Service = { icon: LucideIcon; title: string; text: string; tags: string[]; featured?: boolean }

const services: Service[] = [
  {
    icon: Building2,
    title: 'Sites institucionais',
    text: 'Um site completo que apresenta sua empresa, seus serviços e seus diferenciais com clareza, elegância e credibilidade.',
    tags: ['Multipáginas', 'SEO básico', 'Responsivo'],
    featured: true,
  },
  {
    icon: Rocket,
    title: 'Landing pages',
    text: 'Páginas focadas em um objetivo — captar contatos, divulgar um serviço ou lançar uma campanha.',
    tags: ['Conversão', 'Campanhas'],
  },
  {
    icon: RefreshCcw,
    title: 'Redesign de sites',
    text: 'Modernizamos sites desatualizados, mantendo o que funciona e elevando visual, desempenho e navegação.',
    tags: ['Modernização', 'Performance'],
  },
  {
    icon: Code2,
    title: 'Páginas personalizadas',
    text: 'Desenvolvimento sob medida para necessidades específicas do seu negócio, sem limitações de templates.',
    tags: ['Sob medida', 'Componentes'],
  },
  {
    icon: MousePointerClick,
    title: 'Otimização de UX',
    text: 'Análise e melhoria da experiência do usuário: hierarquia, leitura, chamadas para ação e fluidez da navegação.',
    tags: ['Usabilidade', 'Acessibilidade'],
  },
]

export function Services() {
  return (
    <section id="servicos" className="relative py-24 sm:py-32" aria-labelledby="servicos-title">
      <div aria-hidden className="divider-glow absolute inset-x-0 top-0" />
      <div className="container-x">
        <SectionHeading
          id="servicos-title"
          eyebrow="Serviços"
          title={
            <>
              Soluções web para cada <span className="text-gradient">momento</span> da sua empresa
            </>
          }
          description="Do primeiro site ao redesign completo: projetamos e desenvolvemos páginas que comunicam valor e facilitam o contato com seus clientes."
        />

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {services.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              delay={(i % 3) * 0.08}
              className={s.featured ? 'sm:col-span-2 lg:col-span-4' : i === services.length - 1 ? 'sm:col-span-2 lg:col-span-2' : 'lg:col-span-2'}
            >
              <ServiceCard s={s} index={i} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ServiceCard({ s, index }: { s: Service; index: number }) {
  return (
    <SpotlightCard className="h-full transition-transform duration-500 hover:-translate-y-1.5">
      <a
        href="#contato"
        className="relative flex h-full min-h-[280px] flex-col p-7 sm:p-8"
        aria-label={`${s.title} — solicitar orçamento`}
      >
        {s.featured && (
          <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 hidden h-72 w-[55%] sm:block">
            <FeaturedArt />
          </div>
        )}
        <div className="flex items-start justify-between">
          <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-b from-volt-400 to-volt-700 text-white shadow-[0_12px_30px_-10px_rgb(58_115_255/.9),inset_0_1px_0_rgb(255_255_255/.3)] transition-transform duration-500 group-hover/spot:scale-105 group-hover/spot:-rotate-3">
            <s.icon className="h-6 w-6" strokeWidth={1.75} />
          </span>
          <span className="font-mono text-xs text-slate-600">/0{index + 1}</span>
        </div>

        <div className="relative mt-auto pt-10">
          <h3 className="text-xl font-semibold sm:text-2xl">{s.title}</h3>
          <p className={`mt-3 leading-relaxed text-slate-400 ${s.featured ? 'max-w-md' : ''}`}>{s.text}</p>
          <div className="mt-6 flex items-center justify-between gap-4">
            <ul className="flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <li key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300">
                  {t}
                </li>
              ))}
            </ul>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-slate-400 transition-all duration-500 group-hover/spot:border-volt-400/60 group-hover/spot:bg-volt-500 group-hover/spot:text-white">
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover/spot:rotate-45" />
            </span>
          </div>
        </div>
      </a>
    </SpotlightCard>
  )
}

function FeaturedArt() {
  return (
    <div className="relative h-full w-full [perspective:900px]">
      <div className="absolute right-10 top-16 w-[85%] rotate-[-8deg] rounded-xl border border-white/10 bg-ink-800/90 p-3 shadow-2xl transition-transform duration-700 [transform:rotateY(-18deg)_rotateX(8deg)] group-hover/spot:[transform:rotateY(-8deg)_rotateX(4deg)_translateY(-6px)]">
        <div className="mb-2 flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        </div>
        <div className="h-16 rounded-lg bg-gradient-to-br from-volt-500/60 to-ink-700" />
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          <div className="h-8 rounded-md bg-white/[0.06]" />
          <div className="h-8 rounded-md bg-white/[0.06]" />
          <div className="h-8 rounded-md bg-white/[0.06]" />
        </div>
      </div>
      <div className="absolute right-0 top-8 w-[50%] rotate-[6deg] rounded-xl border border-white/10 bg-ink-700/80 p-2.5 opacity-70 shadow-2xl backdrop-blur transition-transform duration-700 group-hover/spot:translate-x-2 group-hover/spot:-translate-y-2">
        <div className="h-1.5 w-2/3 rounded-full bg-white/30" />
        <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-white/15" />
        <div className="mt-3 h-4 w-1/2 rounded-full bg-volt-500/80" />
      </div>
    </div>
  )
}
