import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Eye, FlaskConical, Monitor, Smartphone, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { projects, type Project } from '../config/portfolio'
import { DemoSite, DEMO_WIDTH } from '../components/demo/DemoSite'
import { ScaledScreen } from '../components/demo/ScaledScreen'
import { Desktop, Laptop, Phone } from '../components/demo/Devices'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal, ease } from '../components/ui/Reveal'
import { Button, ButtonLink } from '../components/ui/Button'

export function Portfolio() {
  const [open, setOpen] = useState<Project | null>(null)

  return (
    <section id="projetos" className="relative py-24 sm:py-32" aria-labelledby="projetos-title">
      <div aria-hidden className="pointer-events-none absolute right-0 top-40 h-[500px] w-[500px] rounded-full bg-[radial-gradient(closest-side,rgb(79_214_255/.12),transparent)]" />
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            id="projetos-title"
            eyebrow="Portfólio"
            title={
              <>
                Projetos que mostram o nosso <span className="text-gradient">padrão visual</span>
              </>
            }
            description="Conceitos desenvolvidos para demonstrar estilo, qualidade e possibilidades. Em breve, esta seção receberá os trabalhos reais da Kael.Web."
          />
          <Reveal delay={0.15}>
            <div className="flex max-w-xs items-start gap-3 rounded-2xl border border-amber-300/20 bg-amber-300/[0.06] p-4 text-sm text-amber-100/90">
              <FlaskConical className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
              <p>
                <strong className="font-semibold text-amber-200">Projetos demonstrativos.</strong> Marcas e conteúdos
                fictícios, criados apenas para ilustração.
              </p>
            </div>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 2) * 0.1}>
              <ProjectCard project={p} onOpen={() => setOpen(p)} />
            </Reveal>
          ))}
        </ul>
      </div>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  )
}

function Showcase({ project }: { project: Project }) {
  const d = project.devices
  const desktopScreen = (
    <ScaledScreen baseWidth={DEMO_WIDTH.desktop} className="h-full w-full" hoverScroll>
      <DemoSite project={project} />
    </ScaledScreen>
  )
  const phoneScreen = (
    <ScaledScreen baseWidth={DEMO_WIDTH.mobile} className="h-full w-full" hoverScroll>
      <DemoSite project={project} mobile />
    </ScaledScreen>
  )

  if (d.includes('laptop') && d.includes('phone')) {
    return (
      <div className="relative mx-auto w-[88%] pb-2 pt-4">
        <Laptop className="transition-transform duration-700 group-hover/proj:-translate-y-1.5">{desktopScreen}</Laptop>
        <div className="absolute -bottom-3 -right-[5%] w-[23%] transition-transform duration-700 group-hover/proj:-translate-y-3 group-hover/proj:rotate-2">
          <Phone>{phoneScreen}</Phone>
        </div>
      </div>
    )
  }
  if (d.includes('desktop')) {
    return (
      <div className="mx-auto w-[80%] pt-2 transition-transform duration-700 group-hover/proj:-translate-y-1.5">
        <Desktop>{desktopScreen}</Desktop>
      </div>
    )
  }
  if (d.includes('phone')) {
    return (
      <div className="relative mx-auto flex w-[80%] items-end justify-center gap-[5%] pt-2">
        <Phone className="w-[34%] -rotate-6 opacity-80 transition-transform duration-700 group-hover/proj:-rotate-[8deg] group-hover/proj:-translate-x-1">
          <ScaledScreen baseWidth={DEMO_WIDTH.mobile} className="h-full w-full">
            <div style={{ transform: 'translateY(-1020px)' }}>
              <DemoSite project={project} mobile />
            </div>
          </ScaledScreen>
        </Phone>
        <Phone className="z-10 w-[38%] transition-transform duration-700 group-hover/proj:-translate-y-3">{phoneScreen}</Phone>
      </div>
    )
  }
  return (
    <div className="mx-auto w-[86%] pt-4 transition-transform duration-700 group-hover/proj:-translate-y-1.5">
      <Laptop>{desktopScreen}</Laptop>
    </div>
  )
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <article className="group/proj ring-gradient relative flex h-full flex-col overflow-hidden rounded-[28px] bg-gradient-to-b from-ink-800/70 to-ink-900/90">
      <div className="relative flex aspect-[4/3] items-center overflow-hidden sm:aspect-[16/11]">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgb(58_115_255/.28),transparent_65%)] transition-opacity duration-700 group-hover/proj:opacity-100" />
        <div aria-hidden className="grid-bg absolute inset-0 opacity-30 mask-fade-b" />
        <div
          aria-hidden
          className="absolute left-1/2 top-[55%] h-[60%] w-[70%] -translate-x-1/2 rounded-full opacity-40 blur-3xl transition-opacity duration-700 group-hover/proj:opacity-70"
          style={{ background: project.palette.accent2 }}
        />
        <div className="relative w-full">
          <Showcase project={project} />
        </div>
        {project.demo && (
          <span className="absolute left-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full border border-amber-300/25 bg-ink-950/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-amber-200 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" /> Demonstração
          </span>
        )}
      </div>

      <div className="relative flex flex-1 flex-col border-t border-white/[0.06] p-6 sm:p-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-volt-300">{project.category}</span>
        <h3 className="mt-3 text-2xl font-semibold sm:text-[1.7rem]">{project.name}</h3>
        <p className="mt-3 leading-relaxed text-slate-400">{project.description}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-1 sm:mt-auto sm:pt-6">
          <ul className="flex flex-wrap gap-2">
            {project.highlights.slice(0, 2).map((h) => (
              <li key={h} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                {h}
              </li>
            ))}
          </ul>
          <Button variant="secondary" onClick={onOpen} aria-haspopup="dialog" className="w-full sm:w-auto">
            <Eye className="h-4 w-4" /> Visualizar projeto
          </Button>
        </div>
      </div>
    </article>
  )
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [view, setView] = useState<'desktop' | 'mobile'>('desktop')
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!project) return
    lastFocus.current = document.activeElement as HTMLElement
    setView(window.innerWidth < 768 ? 'mobile' : 'desktop')
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => closeRef.current?.focus(), 50)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      lastFocus.current?.focus()
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink-950/85 backdrop-blur-md" onClick={onClose} />
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease }}
            className="glass-strong relative flex max-h-[94svh] w-full max-w-6xl flex-col overflow-hidden rounded-t-[28px] shadow-[0_40px_120px_-20px_rgb(0_0_0/.9)] sm:rounded-[28px]"
          >
            <header className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-white/[0.07] px-5 py-4 sm:px-7">
              <div className="min-w-0 flex-1">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-volt-300">{project.category}</span>
                  {project.demo && (
                    <span className="shrink-0 rounded-full bg-amber-300/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-amber-200 ring-1 ring-amber-300/25">
                      Demonstração
                    </span>
                  )}
                </div>
                <h3 id="modal-title" className="mt-1 truncate text-xl font-semibold">
                  {project.name}
                </h3>
              </div>
              <div className="order-last flex w-full justify-center rounded-full border border-white/10 bg-white/[0.03] p-1 sm:order-none sm:w-auto" role="tablist" aria-label="Visualização">
                {(['desktop', 'mobile'] as const).map((v) => (
                  <button
                    key={v}
                    role="tab"
                    aria-selected={view === v}
                    onClick={() => setView(v)}
                    className={`relative flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full px-3.5 sm:flex-none text-xs font-semibold transition-colors ${view === v ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    {view === v && <motion.span layoutId="view-pill" className="absolute inset-0 rounded-full bg-volt-500" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                    <span className="relative flex items-center gap-1.5">
                      {v === 'desktop' ? <Monitor className="h-3.5 w-3.5" /> : <Smartphone className="h-3.5 w-3.5" />}
                      {v === 'desktop' ? 'Desktop' : 'Mobile'}
                    </span>
                  </button>
                ))}
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Fechar visualização"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:rotate-90 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="grid min-h-0 flex-1 lg:grid-cols-[1fr_300px]">
              <div className="min-h-0 overflow-y-auto overscroll-contain bg-ink-950/60 p-4 sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={view}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className={`mx-auto overflow-hidden rounded-xl ring-1 ring-white/10 ${view === 'mobile' ? 'max-w-[360px] rounded-[28px]' : ''}`}
                  >
                    <ScaledScreen baseWidth={view === 'desktop' ? DEMO_WIDTH.desktop : DEMO_WIDTH.mobile} fullHeight>
                      <DemoSite project={project} mobile={view === 'mobile'} />
                    </ScaledScreen>
                  </motion.div>
                </AnimatePresence>
              </div>
              <aside className="hidden border-l border-white/[0.07] p-7 lg:block">
                <p className="leading-relaxed text-slate-400">{project.description}</p>
                <h4 className="mt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">Destaques</h4>
                <ul className="mt-3 space-y-2.5">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-volt-400" /> {h}
                    </li>
                  ))}
                </ul>
                {project.demo && (
                  <p className="mt-7 rounded-2xl border border-amber-300/20 bg-amber-300/[0.05] p-4 text-xs leading-relaxed text-amber-100/80">
                    Este é um projeto demonstrativo. A marca e os conteúdos são fictícios.
                  </p>
                )}
                <ButtonLink href="#contato" onClick={onClose} className="mt-7 w-full">
                  Quero um site assim <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
                {project.url && (
                  <ButtonLink href={project.url} target="_blank" rel="noopener noreferrer" variant="secondary" className="mt-3 w-full">
                    Abrir site publicado
                  </ButtonLink>
                )}
              </aside>
            </div>
            <div className="flex gap-3 border-t border-white/[0.07] p-4 lg:hidden">
              <ButtonLink href="#contato" onClick={onClose} className="w-full">
                Quero um site assim <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
