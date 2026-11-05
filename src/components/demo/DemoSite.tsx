import type { CSSProperties, ReactNode } from 'react'
import type { Project } from '../../config/portfolio'

/**
 * Renderiza uma página demonstrativa completa, feita apenas com HTML/CSS
 * (sem imagens externas), para ser exibida dentro dos mockups.
 * Desenhada em largura fixa (1280px desktop / 390px mobile) e escalada pelo container.
 */

type Copy = {
  brand: string
  nav: string[]
  kicker: string
  title: ReactNode
  lead: string
  cta: string
  cta2: string
  features: { t: string; d: string }[]
  sectionTitle: string
  ctaTitle: string
  serif?: boolean
}

const copy: Record<Project['kind'], Copy> = {
  architecture: {
    brand: 'ATELIER NORTE',
    nav: ['Projetos', 'Estúdio', 'Processo', 'Contato'],
    kicker: 'Arquitetura & Interiores',
    title: (
      <>
        Espaços que contam <em>histórias</em>.
      </>
    ),
    lead: 'Projetos residenciais e comerciais pensados com luz, matéria e propósito.',
    cta: 'Ver projetos',
    cta2: 'Agendar conversa',
    features: [
      { t: 'Residencial', d: 'Casas e apartamentos com identidade.' },
      { t: 'Comercial', d: 'Ambientes que reforçam marcas.' },
      { t: 'Interiores', d: 'Curadoria de materiais e mobiliário.' },
    ],
    sectionTitle: 'Projetos selecionados',
    ctaTitle: 'Vamos desenhar o seu próximo espaço?',
    serif: true,
  },
  health: {
    brand: 'Vitalis',
    nav: ['Especialidades', 'Equipe', 'Convênios', 'Dúvidas'],
    kicker: 'Cuidado completo para você',
    title: (
      <>
        Sua saúde em <span data-accent>boas mãos</span>.
      </>
    ),
    lead: 'Atendimento humanizado, estrutura moderna e agendamento on-line em poucos cliques.',
    cta: 'Agendar consulta',
    cta2: 'Especialidades',
    features: [
      { t: 'Clínica geral', d: 'Acompanhamento preventivo.' },
      { t: 'Cardiologia', d: 'Exames e consultas.' },
      { t: 'Dermatologia', d: 'Cuidados com a pele.' },
    ],
    sectionTitle: 'Nossas especialidades',
    ctaTitle: 'Agende sua consulta hoje mesmo',
  },
  food: {
    brand: 'Brasa & Co.',
    nav: ['Cardápio', 'Ambiente', 'Reservas', 'Contato'],
    kicker: 'Cozinha de fogo · Desde a brasa',
    title: (
      <>
        Sabor que nasce <span data-accent>no fogo</span>.
      </>
    ),
    lead: 'Cortes selecionados, acompanhamentos da casa e uma carta de drinks autorais.',
    cta: 'Reservar mesa',
    cta2: 'Ver cardápio',
    features: [
      { t: 'Ancho na brasa', d: 'Farofa da casa e vinagrete.' },
      { t: 'Costela 12h', d: 'Defumada lentamente.' },
      { t: 'Burrata grelhada', d: 'Tomates assados e pesto.' },
    ],
    sectionTitle: 'Destaques do cardápio',
    ctaTitle: 'Garanta sua mesa para o fim de semana',
  },
  consulting: {
    brand: 'lumen',
    nav: ['Soluções', 'Metodologia', 'Conteúdos', 'Contato'],
    kicker: 'Consultoria empresarial',
    title: (
      <>
        Clareza para decisões que <span data-accent>movem</span> empresas.
      </>
    ),
    lead: 'Estratégia, processos e gestão com uma abordagem prática e orientada a resultados.',
    cta: 'Falar com especialista',
    cta2: 'Nossa metodologia',
    features: [
      { t: 'Estratégia', d: 'Planejamento e posicionamento.' },
      { t: 'Processos', d: 'Eficiência operacional.' },
      { t: 'Gestão', d: 'Indicadores e rotinas.' },
    ],
    sectionTitle: 'Como podemos ajudar',
    ctaTitle: 'Pronto para o próximo nível?',
  },
}

export const DEMO_WIDTH = { desktop: 1280, mobile: 390 } as const

export function DemoSite({ project, mobile = false }: { project: Project; mobile?: boolean }) {
  const p = project.palette
  const c = copy[project.kind]
  const vars = {
    '--bg': p.bg,
    '--sf': p.surface,
    '--tx': p.text,
    '--mt': p.muted,
    '--ac': p.accent,
    '--ac2': p.accent2,
    width: mobile ? DEMO_WIDTH.mobile : DEMO_WIDTH.desktop,
    fontFamily: c.serif ? 'Georgia, "Times New Roman", serif' : 'Manrope, system-ui, sans-serif',
  } as CSSProperties

  const pad = mobile ? 'px-6' : 'px-20'
  const isDark = project.kind === 'food' || project.kind === 'consulting'

  return (
    <div style={vars} className="demo-site bg-[var(--bg)] text-[var(--tx)] [&_[data-accent]]:text-[var(--ac)] [&_em]:italic [&_em]:text-[var(--ac2)]">
      {/* NAV */}
      <div className={`flex items-center justify-between ${pad} ${mobile ? 'py-5' : 'py-7'}`}>
        <span className={`font-bold tracking-tight ${project.kind === 'architecture' ? 'tracking-[0.3em] text-[15px]' : 'text-[22px]'}`}>
          {project.kind === 'consulting' && <span className="mr-1.5 inline-block h-3.5 w-3.5 rounded-full bg-[var(--ac)] align-middle" />}
          {c.brand}
        </span>
        {mobile ? (
          <span className="flex flex-col gap-1.5">
            <span className="h-[2px] w-6 bg-[var(--tx)]" />
            <span className="h-[2px] w-4 self-end bg-[var(--tx)]" />
          </span>
        ) : (
          <div className="flex items-center gap-10 text-[15px] text-[var(--mt)]">
            {c.nav.map((n) => (
              <span key={n}>{n}</span>
            ))}
            <span className="rounded-full bg-[var(--ac)] px-5 py-2.5 font-semibold text-[var(--bg)]">{c.cta}</span>
          </div>
        )}
      </div>

      {/* HERO */}
      <Hero kind={project.kind} c={c} mobile={mobile} pad={pad} />

      {/* FEATURES */}
      <div className={`${pad} ${mobile ? 'py-12' : 'py-24'}`}>
        <div className={`flex items-end justify-between ${mobile ? 'mb-6' : 'mb-12'}`}>
          <h3 className={`${mobile ? 'text-[26px]' : 'text-[44px]'} font-semibold leading-tight tracking-tight text-[var(--tx)]`} style={{ fontFamily: 'inherit', letterSpacing: '-0.02em' }}>
            {c.sectionTitle}
          </h3>
          {!mobile && <span className="text-[15px] text-[var(--mt)]">Ver todos →</span>}
        </div>
        <div className={`grid gap-5 ${mobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {c.features.map((f, i) => (
            <div key={f.t} className="overflow-hidden rounded-[18px] bg-[var(--sf)]" style={{ boxShadow: isDark ? 'none' : '0 20px 40px -24px rgba(0,0,0,.25)' }}>
              <Art kind={project.kind} i={i} h={mobile ? 170 : 230} />
              <div className={mobile ? 'p-5' : 'p-7'}>
                <div className={`${mobile ? 'text-[19px]' : 'text-[22px]'} font-semibold`}>{f.t}</div>
                <div className="mt-1.5 text-[15px] text-[var(--mt)]">{f.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BAND */}
      <div className={`${pad} ${mobile ? 'pb-12' : 'pb-24'}`}>
        <div className={`grid items-center gap-8 rounded-[24px] ${mobile ? 'grid-cols-1 p-7' : 'grid-cols-2 p-14'}`} style={{ background: 'var(--sf)' }}>
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[var(--ac2)]">Sobre</div>
            <div className={`${mobile ? 'text-[24px]' : 'text-[36px]'} mt-3 font-semibold leading-tight`}>Experiência, cuidado e atenção em cada etapa.</div>
            <div className="mt-4 text-[15px] leading-relaxed text-[var(--mt)]">Texto institucional demonstrativo apresentando a empresa, sua forma de trabalhar e seus valores.</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((k) => (
              <div key={k} className="rounded-2xl p-5" style={{ background: 'var(--bg)' }}>
                <div className="h-8 w-8 rounded-lg" style={{ background: k % 2 ? 'var(--ac2)' : 'var(--ac)', opacity: 0.9 }} />
                <div className="mt-4 h-2 w-3/4 rounded-full" style={{ background: 'var(--tx)', opacity: 0.6 }} />
                <div className="mt-2 h-2 w-1/2 rounded-full" style={{ background: 'var(--mt)', opacity: 0.5 }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className={`${pad} ${mobile ? 'pb-12' : 'pb-24'}`}>
        <div className={`relative overflow-hidden rounded-[28px] text-center ${mobile ? 'px-6 py-12' : 'px-16 py-20'}`} style={{ background: 'var(--ac)', color: 'var(--bg)' }}>
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-30" style={{ background: 'var(--ac2)' }} />
          <div className={`relative mx-auto max-w-2xl font-semibold leading-tight ${mobile ? 'text-[26px]' : 'text-[44px]'}`}>{c.ctaTitle}</div>
          <div className="relative mt-7 inline-block rounded-full px-7 py-3.5 text-[15px] font-semibold" style={{ background: 'var(--bg)', color: 'var(--tx)' }}>
            {c.cta}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className={`${pad} flex ${mobile ? 'flex-col gap-4 py-10' : 'items-center justify-between py-12'} border-t text-[14px] text-[var(--mt)]`} style={{ borderColor: 'color-mix(in srgb, var(--tx) 12%, transparent)' }}>
        <span className="font-bold text-[var(--tx)]">{c.brand}</span>
        <span>Projeto demonstrativo · Kael.Web</span>
      </div>
    </div>
  )
}

function Hero({ kind, c, mobile, pad }: { kind: Project['kind']; c: Copy; mobile: boolean; pad: string }) {
  const title = (
    <h2
      className={`${mobile ? 'text-[40px]' : kind === 'architecture' ? 'text-[84px]' : 'text-[68px]'} font-semibold leading-[1.02] text-[var(--tx)]`}
      style={{ fontFamily: 'inherit', letterSpacing: kind === 'architecture' ? '-0.03em' : '-0.035em', fontWeight: kind === 'architecture' ? 400 : 700 }}
    >
      {c.title}
    </h2>
  )
  const buttons = (
    <div className={`flex gap-3 ${mobile ? 'mt-7 flex-col' : 'mt-10'}`}>
      <span className="rounded-full px-7 py-4 text-center text-[15px] font-semibold" style={{ background: 'var(--ac)', color: 'var(--bg)' }}>
        {c.cta}
      </span>
      <span className="rounded-full border px-7 py-4 text-center text-[15px] font-semibold" style={{ borderColor: 'color-mix(in srgb, var(--tx) 25%, transparent)' }}>
        {c.cta2}
      </span>
    </div>
  )
  const kicker = <div className="mb-5 text-[13px] font-semibold uppercase tracking-[0.22em] text-[var(--ac2)]">{c.kicker}</div>
  const lead = <p className={`${mobile ? 'mt-5 text-[16px]' : 'mt-7 max-w-xl text-[19px]'} leading-relaxed text-[var(--mt)]`}>{c.lead}</p>

  if (mobile || kind === 'food') {
    return (
      <div className={`${pad} ${mobile ? 'pb-4 pt-6' : 'pb-10 pt-10'}`}>
        <div className={kind === 'food' && !mobile ? 'grid grid-cols-2 items-center gap-16' : ''}>
          <div>
            {kicker}
            {title}
            {lead}
            {buttons}
          </div>
          <div className={mobile ? 'mt-9' : ''}>
            <Art kind={kind} i={9} h={mobile ? 300 : 520} rounded />
          </div>
        </div>
      </div>
    )
  }

  if (kind === 'architecture') {
    return (
      <div className={`${pad} pb-8 pt-8`}>
        {kicker}
        <div className="grid grid-cols-[1.4fr_1fr] items-end gap-16">
          {title}
          <div>
            {lead}
            {buttons}
          </div>
        </div>
        <div className="mt-14">
          <Art kind={kind} i={9} h={520} rounded />
        </div>
      </div>
    )
  }

  return (
    <div className={`${pad} grid grid-cols-[1.1fr_1fr] items-center gap-16 pb-10 pt-12`}>
      <div>
        {kicker}
        {title}
        {lead}
        {buttons}
      </div>
      <Art kind={kind} i={9} h={540} rounded />
    </div>
  )
}

/** Ilustrações abstratas por tipo de projeto (somente CSS). */
function Art({ kind, i, h, rounded }: { kind: Project['kind']; i: number; h: number; rounded?: boolean }) {
  const r = rounded ? 'rounded-[24px]' : ''
  const base = `relative w-full overflow-hidden ${r}`
  if (kind === 'architecture') {
    const tones = ['#c9bba5', '#a89880', '#d8cdbb', '#8e7f6a']
    return (
      <div className={base} style={{ height: h, background: `linear-gradient(160deg, ${tones[i % 4]}, #6f6252)` }}>
        <div className="absolute bottom-0 left-[8%] h-[72%] w-[38%] bg-[#efe8dc]" style={{ boxShadow: '30px 0 0 #d9cfbf' }} />
        <div className="absolute bottom-0 right-[10%] h-[52%] w-[30%] bg-[#2c2722]" />
        <div className="absolute bottom-[30%] left-[14%] h-[18%] w-[12%] bg-[#2c2722]/80" />
        <div className="absolute right-[18%] top-[14%] h-24 w-24 rounded-full bg-[#f6efe2]/70 blur-[2px]" />
        <div className="absolute inset-x-0 bottom-0 h-[10%] bg-[#4a4137]" />
      </div>
    )
  }
  if (kind === 'health') {
    return (
      <div className={base} style={{ height: h, background: 'linear-gradient(150deg,#d9f1ec,#e6eefb)' }}>
        <div className="absolute left-1/2 top-1/2 h-[60%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70" />
        <div className="absolute left-1/2 top-1/2 h-[26%] w-[8%] -translate-x-1/2 -translate-y-1/2 rounded-md bg-[#0f9d8a]" />
        <div className="absolute left-1/2 top-1/2 h-[8%] w-[26%] min-w-[60px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-[#0f9d8a]" />
        {i === 9 && (
          <>
            <div className="absolute bottom-8 left-8 rounded-2xl bg-white px-5 py-4 shadow-xl">
              <div className="text-[13px] text-[#5b7384]">Próximo horário</div>
              <div className="text-[18px] font-bold text-[#0d2a3a]">Hoje · 14:30</div>
            </div>
            <div className="absolute right-8 top-8 h-14 w-14 rounded-2xl bg-[#2b6cb0]/80" />
          </>
        )}
      </div>
    )
  }
  if (kind === 'food') {
    return (
      <div className={base} style={{ height: h, background: 'radial-gradient(circle at 50% 60%, #6b2d10, #1a0f0a 70%)' }}>
        <div className="absolute left-1/2 top-[55%] aspect-square w-[62%] max-w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2b1a12] shadow-[0_30px_60px_rgba(0,0,0,.6)]" />
        <div className="absolute left-1/2 top-[55%] aspect-square w-[42%] max-w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(circle at 40% 40%, #b8582a, #6a2a10)' }} />
        <div className="absolute left-[30%] top-[20%] h-16 w-16 rounded-full bg-[#f2b263]/40 blur-2xl" />
        <div className="absolute right-[26%] top-[30%] h-10 w-10 rounded-full bg-[#e8792b]/50 blur-xl" />
      </div>
    )
  }
  return (
    <div className={base} style={{ height: h, background: 'linear-gradient(150deg,#1b2346,#0e1328)' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 70% 25%, rgba(139,123,255,.55), transparent 55%), radial-gradient(circle at 20% 80%, rgba(69,208,196,.35), transparent 50%)' }} />
      <div className="absolute bottom-[14%] left-[10%] right-[10%] flex h-[46%] items-end gap-[4%]">
        {[40, 62, 50, 78, 66, 92].map((v, k) => (
          <div key={k} className="flex-1 rounded-t-lg" style={{ height: `${v}%`, background: k === 5 ? '#8b7bff' : 'rgba(255,255,255,.14)' }} />
        ))}
      </div>
    </div>
  )
}
