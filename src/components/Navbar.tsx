import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { nav } from '../config/site'
import { useActiveSection } from '../hooks/useActiveSection'
import { Logo } from './ui/Logo'
import { ButtonLink } from './ui/Button'
import { ease } from './ui/Reveal'

const ids = nav.map((n) => n.id)

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(ids)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const on = () => mq.matches && setOpen(false)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
        className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4"
      >
        <div className="container-x">
          <nav
            aria-label="Navegação principal"
            className={`flex h-16 items-center justify-between rounded-2xl px-3 pl-4 transition-all duration-500 sm:px-4 sm:pl-5 ${
              scrolled || open
                ? 'glass-strong shadow-[0_20px_50px_-25px_rgb(0_0_0/.8)]'
                : 'border border-transparent bg-transparent'
            }`}
          >
            <a href="#inicio" aria-label="Kael.Web — voltar ao início" onClick={() => setOpen(false)}>
              <Logo />
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {nav.map((item) => {
                const isActive = active === item.id
                return (
                  <li key={item.id} className="relative">
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </a>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <ButtonLink href="#contato" size="md">
                  Solicitar orçamento
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </ButtonLink>
              </div>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Fechar menu' : 'Abrir menu'}
                className="relative grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={open ? 'x' : 'm'}
                    initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.2 }}
                  >
                    {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25, delay: 0.1 } }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <motion.div
              className="absolute inset-0 bg-ink-950/80 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <div aria-hidden className="pointer-events-none absolute -top-20 right-0 h-80 w-80 rounded-full bg-volt-600/30 blur-[100px]" />
            <div className="relative flex h-full flex-col px-5 pb-8 pt-28 sm:px-8">
              <ul className="flex flex-col">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.05 + i * 0.05, duration: 0.5, ease } }}
                    exit={{ opacity: 0, y: 12, transition: { duration: 0.15 } }}
                    className="border-b border-white/[0.07]"
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-5 font-display text-[1.75rem] font-semibold text-white"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-xs text-volt-400">0{i + 1}</span>
                        {item.label}
                      </span>
                      <ArrowUpRight className={`h-5 w-5 ${active === item.id ? 'text-volt-400' : 'text-slate-600'}`} />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.5, ease } }}
                exit={{ opacity: 0 }}
                className="mt-auto"
              >
                <ButtonLink href="#contato" size="lg" className="w-full" onClick={() => setOpen(false)}>
                  Solicitar orçamento <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
