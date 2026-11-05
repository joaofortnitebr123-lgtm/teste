import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { whatsappUrl } from '../config/site'
import { ButtonLink } from '../components/ui/Button'
import { WhatsAppIcon } from '../components/ui/BrandIcons'
import { Reveal } from '../components/ui/Reveal'
import { LogoMark } from '../components/ui/Logo'

export function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1])
  const glowY = useTransform(scrollYProgress, [0, 1], ['20%', '-20%'])
  const wa = whatsappUrl()

  return (
    <section className="relative py-16 sm:py-24" aria-labelledby="cta-title">
      <div className="container-x" ref={ref}>
        <motion.div
          style={{ scale }}
          className="noise ring-gradient relative isolate overflow-hidden rounded-[36px] bg-ink-900 px-6 py-20 text-center sm:px-12 sm:py-28"
        >
          <div aria-hidden className="absolute inset-0 -z-10">
            <div className="grid-bg mask-radial absolute inset-0 opacity-60" />
            <motion.div
              style={{ y: glowY }}
              className="absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(36_86_240/.55),transparent)]"
            />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-volt-300/70 to-transparent" />
          </div>

          <Reveal>
            <LogoMark className="mx-auto h-14 w-14 drop-shadow-[0_0_30px_rgb(58_115_255/.7)]" />
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="cta-title" className="mx-auto mt-8 max-w-4xl text-[2.2rem] font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
              Sua empresa merece uma presença digital <span className="text-gradient">à altura.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              Conte para nós o que você precisa. Vamos entender o seu negócio e propor o site ideal para a sua empresa.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {wa ? (
              <ButtonLink href={wa} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="lg" className="w-full sm:w-auto">
                <WhatsAppIcon className="h-5 w-5" /> Solicitar orçamento pelo WhatsApp
              </ButtonLink>
            ) : (
              <ButtonLink href="#contato" variant="whatsapp" size="lg" className="w-full sm:w-auto">
                <WhatsAppIcon className="h-5 w-5" /> Solicitar orçamento pelo WhatsApp
              </ButtonLink>
            )}
            <ButtonLink href="#contato" variant="secondary" size="lg" className="w-full sm:w-auto">
              Outros canais <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </motion.div>
      </div>
    </section>
  )
}
