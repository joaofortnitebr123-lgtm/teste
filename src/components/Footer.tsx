import type { ReactNode } from 'react'
import { ArrowUp, Mail } from 'lucide-react'
import { emailUrl, instagramUrl, nav, site, whatsappUrl } from '../config/site'
import { InstagramIcon, WhatsAppIcon } from './ui/BrandIcons'
import { Logo } from './ui/Logo'

const services = ['Sites institucionais', 'Landing pages', 'Redesign de sites', 'Páginas personalizadas', 'Otimização de UX']

export function Footer() {
  const socials = [
    { label: 'WhatsApp', href: whatsappUrl(), icon: <WhatsAppIcon className="h-[18px] w-[18px]" /> },
    { label: 'Instagram', href: instagramUrl(), icon: <InstagramIcon className="h-[18px] w-[18px]" /> },
    { label: 'E-mail', href: emailUrl(), icon: <Mail className="h-[18px] w-[18px]" /> },
  ]
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] pt-20">
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-[900px] -translate-x-1/2 translate-y-1/2 rounded-full bg-volt-600/20 blur-[100px]" />
      <div className="container-x relative">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs leading-relaxed text-slate-400">{site.tagline}</p>
            <ul className="mt-7 flex gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  {s.href ? (
                    <a
                      href={s.href}
                      target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-volt-400/50 hover:bg-volt-500/15 hover:text-white"
                    >
                      {s.icon}
                    </a>
                  ) : (
                    <span
                      title={`${s.label} — em breve`}
                      aria-label={`${s.label} — em breve`}
                      className="grid h-11 w-11 cursor-not-allowed place-items-center rounded-xl border border-dashed border-white/10 text-slate-600"
                    >
                      {s.icon}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <FooterCol title="Navegação">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="footer-link">
                  {n.label}
                </a>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Serviços">
            {services.map((s) => (
              <li key={s}>
                <a href="#servicos" className="footer-link">
                  {s}
                </a>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Contato">
            {socials.map((s) => (
              <li key={s.label}>
                {s.href ? (
                  <a href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="footer-link">
                    {s.label}
                  </a>
                ) : (
                  <span className="text-slate-600">
                    {s.label} <span className="text-xs">· em breve</span>
                  </span>
                )}
              </li>
            ))}
            <li>
              <a href="#contato" className="footer-link">
                Solicitar orçamento
              </a>
            </li>
          </FooterCol>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-6 border-t border-white/[0.06] py-8 text-sm text-slate-500 sm:flex-row sm:items-center">
          <p>© {year} Kael.Web. Todos os direitos reservados.</p>
          <a href="#inicio" className="group inline-flex items-center gap-2 text-slate-400 transition-colors hover:text-white">
            Voltar ao topo
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 transition-all group-hover:-translate-y-0.5 group-hover:border-volt-400/50">
              <ArrowUp className="h-4 w-4" />
            </span>
          </a>
        </div>

        <div aria-hidden className="pointer-events-none select-none overflow-hidden">
          <div className="text-gradient-soft -mb-[0.22em] text-center font-display text-[22vw] font-bold leading-none tracking-[-0.06em] opacity-[0.06] lg:text-[17rem]">
            Kael.Web
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">{title}</h3>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  )
}
