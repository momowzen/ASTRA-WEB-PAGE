import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { Sparkles, ChevronRight, Star } from 'lucide-react'
import { GlowButton } from '../ui/GlowButton.tsx'

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!titleRef.current) return
    const chars = titleRef.current.querySelectorAll('.char')
    gsap.fromTo(
      chars,
      { opacity: 0, y: 50, rotateX: -90 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.05,
        duration: 1,
        ease: 'back.out(1.7)',
        delay: 0.3,
      },
    )
  }, [])

  const title = 'ASTRA'

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-astra-primary/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-astra-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-astra-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-astra-accent/20 mb-8"
        >
          <Star className="w-4 h-4 text-astra-accent" />
          <span className="text-xs font-medium text-astra-accent uppercase tracking-[0.2em]">Celestial Guild</span>
          <Star className="w-4 h-4 text-astra-accent" />
        </motion.div>

        <h1
          ref={titleRef}
          className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold font-display text-astra-text text-glow mb-6 leading-none tracking-wider"
        >
          {title.split('').map((char, i) => (
            <span key={i} className="char inline-block">
              {char}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl text-astra-muted max-w-2xl mx-auto mb-4 font-light tracking-wide"
        >
          Forged among the stars. United by destiny.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-sm text-astra-primary/80 uppercase tracking-[0.3em] mb-12"
        >
          Rise beyond the horizon
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/register">
            <GlowButton size="lg" icon={<Sparkles className="w-5 h-5" />}>
              Join ASTRA
            </GlowButton>
          </Link>
          <Link to="/members">
            <GlowButton variant="outline" size="lg" icon={<ChevronRight className="w-5 h-5" />}>
              Explore Members
            </GlowButton>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-astra-primary/30 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-astra-primary"
          />
        </div>
      </motion.div>
    </section>
  )
}
