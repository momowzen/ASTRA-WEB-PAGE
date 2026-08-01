import { motion } from 'framer-motion'
import { Sparkles, Shield, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ParticleBackground } from '../components/layout/ParticleBackground.tsx'
import { Navbar } from '../components/layout/Navbar.tsx'
import { Footer } from '../components/layout/Footer.tsx'
import { HiddenClassCard } from '../components/hidden-classes/HiddenClassCard.tsx'
import { HIDDEN_CLASSES } from '../data/astraViewer.ts'

export const HiddenClassPage = () => {
  const lang = 'en'

  return (
    <div className="min-h-screen bg-astra-bg">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-astra-accent to-astra-primary flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-astra-text font-display text-glow-gold">
                  Hidden Class Guide
                </h1>
                <p className="text-astra-muted text-sm">
                  Unlock conditions and milestone bonuses for every hidden class
                </p>
              </div>
              <Link
                to="/boss-tracker"
                className="ml-auto hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-astra-surface/60 border border-astra-primary/20 text-astra-primary hover:bg-astra-primary/10 transition-colors"
              >
                <Shield className="w-4 h-4" />
                Boss Tracker
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {HIDDEN_CLASSES.map((hiddenClass, index) => (
              <HiddenClassCard
                key={hiddenClass.className}
                hiddenClass={hiddenClass}
                lang={lang}
                index={index}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
