import { MotionConfig } from 'motion/react'
import { Navbar } from './components/Navbar'
import { ScrollProgress } from './components/ScrollProgress'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { Marquee } from './sections/Marquee'
import { About } from './sections/About'
import { Services } from './sections/Services'
import { Differentials } from './sections/Differentials'
import { Portfolio } from './sections/Portfolio'
import { Process } from './sections/Process'
import { Testimonials } from './sections/Testimonials'
import { FinalCTA } from './sections/FinalCTA'
import { Contact } from './sections/Contact'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#conteudo"
        className="fixed left-4 top-4 z-[80] -translate-y-24 rounded-full bg-volt-500 px-5 py-3 text-sm font-semibold text-white transition-transform focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="conteudo">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Portfolio />
        <Differentials />
        <Process />
        <Testimonials />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
