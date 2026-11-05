import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, CheckCircle2, Clock, Mail, Send, type LucideIcon } from 'lucide-react'
import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { emailUrl, formatPhone, instagramUrl, site, whatsappUrl } from '../config/site'
import { InstagramIcon, WhatsAppIcon } from '../components/ui/BrandIcons'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'

const types = ['Site institucional', 'Landing page', 'Redesign', 'Página personalizada', 'Otimização de UX', 'Ainda não sei']

type Status = { kind: 'idle' | 'ok' | 'pending' | 'error'; msg?: string }

export function Contact() {
  return (
    <section id="contato" className="relative py-24 sm:py-32" aria-labelledby="contato-title">
      <div className="container-x grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            id="contato-title"
            eyebrow="Contato"
            title={
              <>
                Vamos conversar sobre o seu <span className="text-gradient">projeto?</span>
              </>
            }
            description="Escolha o canal de sua preferência ou preencha o formulário. Sua mensagem chega organizada para agilizarmos o atendimento."
          />
          <ul className="mt-10 space-y-3">
            <Reveal as="li" delay={0.05}>
              <Channel
                icon={<WhatsAppIcon className="h-5 w-5" />}
                label="WhatsApp"
                value={site.contact.whatsapp ? formatPhone(site.contact.whatsapp) : null}
                href={whatsappUrl()}
                tone="from-[#2fe07a]/25 to-[#13a84f]/10 text-[#5ef09a]"
              />
            </Reveal>
            <Reveal as="li" delay={0.1}>
              <Channel
                icon={<InstagramIcon className="h-5 w-5" />}
                label="Instagram"
                value={site.contact.instagram ? `@${site.contact.instagram.replace(/^@/, '')}` : null}
                href={instagramUrl()}
                tone="from-[#f58529]/25 via-[#dd2a7b]/20 to-[#8134af]/10 text-[#ff8ab8]"
              />
            </Reveal>
            <Reveal as="li" delay={0.15}>
              <Channel
                icon={<Mail className="h-5 w-5" />}
                label="E-mail"
                value={site.contact.email || null}
                href={emailUrl()}
                tone="from-volt-400/25 to-volt-700/10 text-volt-200"
              />
            </Reveal>
          </ul>
        </div>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}

function Channel({
  icon,
  label,
  value,
  href,
  tone,
}: {
  icon: ReactNode
  label: string
  value: string | null
  href: string | null
  tone: string
}) {
  const inner = (
    <>
      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ring-1 ring-white/10 ${tone}`}>{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm text-slate-500">{label}</span>
        <span className="block truncate font-semibold text-white">{value ?? 'Em breve'}</span>
      </span>
      {href ? (
        <ArrowUpRight className="h-5 w-5 text-slate-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
      ) : (
        <span className="flex items-center gap-1.5 rounded-full bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500 ring-1 ring-white/10">
          <Clock className="h-3 w-3" /> Em configuração
        </span>
      )}
    </>
  )
  const cls = 'group glass flex items-center gap-4 rounded-2xl p-4 transition-all duration-300'
  return href ? (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={`${cls} hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07]`}>
      {inner}
    </a>
  ) : (
    <div className={cls} aria-label={`${label}: em breve`}>
      {inner}
    </div>
  )
}

function Field({ label, id, children, hint }: { label: string; id: string; children: ReactNode; hint?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-slate-300">
        {label} {hint && <span className="font-normal text-slate-500">{hint}</span>}
      </label>
      {children}
    </div>
  )
}

const input =
  'w-full rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3.5 text-[15px] text-white placeholder:text-slate-600 outline-none transition focus:border-volt-400/70 focus:bg-ink-950 focus:ring-4 focus:ring-volt-500/15'

function ContactForm() {
  const uid = useId()
  const [type, setType] = useState(types[0]!)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name') || '').trim()
    const company = String(fd.get('company') || '').trim()
    const message = String(fd.get('message') || '').trim()
    if (!name || !message) {
      setStatus({ kind: 'error', msg: 'Preencha seu nome e uma breve mensagem para continuar.' })
      return
    }
    const text = [
      `Olá, Kael.Web! Meu nome é ${name}${company ? `, da empresa ${company}` : ''}.`,
      `Tenho interesse em: ${type}.`,
      '',
      message,
    ].join('\n')

    const wa = whatsappUrl(text)
    const mail = emailUrl(`Orçamento — ${type}`, text)
    if (wa) {
      window.open(wa, '_blank', 'noopener,noreferrer')
      setStatus({ kind: 'ok', msg: 'Abrimos o WhatsApp com a sua mensagem pronta. É só enviar!' })
    } else if (mail) {
      window.location.href = mail
      setStatus({ kind: 'ok', msg: 'Abrimos o seu aplicativo de e-mail com a mensagem pronta.' })
    } else {
      setStatus({
        kind: 'pending',
        msg: 'Nossos canais de atendimento estão sendo configurados. Em breve você poderá enviar sua mensagem por aqui.',
      })
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="ring-gradient relative overflow-hidden rounded-[28px] bg-gradient-to-b from-ink-800/80 to-ink-900/90 p-6 sm:p-9"
      aria-describedby={`${uid}-status`}
    >
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-volt-500/20 blur-3xl" />
      <div className="relative">
        <h3 className="text-2xl font-semibold">Solicitar orçamento</h3>
        <p className="mt-2 text-slate-400">Leva menos de um minuto.</p>

        <fieldset className="mt-8">
          <legend className="mb-3 text-sm font-medium text-slate-300">O que você precisa?</legend>
          <div className="flex flex-wrap gap-2">
            {types.map((t) => {
              const active = t === type
              return (
                <button
                  type="button"
                  key={t}
                  onClick={() => setType(t)}
                  aria-pressed={active}
                  className={`relative min-h-10 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active ? 'text-white' : 'text-slate-400 ring-1 ring-white/10 hover:text-white hover:ring-white/25'
                  }`}
                >
                  {active && (
                    <motion.span layoutId={`${uid}-chip`} className="absolute inset-0 rounded-full bg-volt-500/90 shadow-[0_8px_24px_-8px_rgb(58_115_255/.9)]" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />
                  )}
                  <span className="relative">{t}</span>
                </button>
              )
            })}
          </div>
        </fieldset>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field label="Seu nome" id={`${uid}-name`}>
            <input id={`${uid}-name`} name="name" autoComplete="name" required placeholder="Como podemos te chamar?" className={input} />
          </Field>
          <Field label="Empresa" hint="(opcional)" id={`${uid}-company`}>
            <input id={`${uid}-company`} name="company" autoComplete="organization" placeholder="Nome da sua empresa" className={input} />
          </Field>
        </div>
        <div className="mt-5">
          <Field label="Mensagem" id={`${uid}-msg`}>
            <textarea
              id={`${uid}-msg`}
              name="message"
              required
              rows={4}
              placeholder="Conte um pouco sobre o seu negócio e o que você espera do novo site."
              className={`${input} resize-none`}
            />
          </Field>
        </div>

        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">Seus dados são usados apenas para responder ao seu contato.</p>
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Enviar mensagem <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </div>

        <div id={`${uid}-status`} aria-live="polite">
          <AnimatePresence>
            {status.kind !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <StatusBox status={status} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  )
}

function StatusBox({ status }: { status: Status }) {
  const map: Record<Exclude<Status['kind'], 'idle'>, { icon: LucideIcon; cls: string }> = {
    ok: { icon: CheckCircle2, cls: 'border-emerald-400/25 bg-emerald-400/[0.06] text-emerald-100' },
    pending: { icon: Clock, cls: 'border-amber-300/25 bg-amber-300/[0.06] text-amber-100' },
    error: { icon: Clock, cls: 'border-rose-400/25 bg-rose-400/[0.06] text-rose-100' },
  }
  const m = map[status.kind as Exclude<Status['kind'], 'idle'>]
  return (
    <div className={`mt-5 flex items-start gap-3 rounded-2xl border p-4 text-sm ${m.cls}`}>
      <m.icon className="mt-0.5 h-4 w-4 shrink-0" />
      {status.msg}
    </div>
  )
}
