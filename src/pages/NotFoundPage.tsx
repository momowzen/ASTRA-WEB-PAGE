import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Home } from 'lucide-react'
import { ParticleBackground } from '../components/layout/ParticleBackground.tsx'
import { Navbar } from '../components/layout/Navbar.tsx'
import { Footer } from '../components/layout/Footer.tsx'
import { GlassCard } from '../components/ui/GlassCard.tsx'
import { GlowButton } from '../components/ui/GlowButton.tsx'

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-astra-bg">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100svh-80px)] px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg w-full text-center"
        >
          <GlassCard glow padding="lg">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-astra-secondary to-astra-primary flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-bold text-astra-text font-display mb-2 text-glow">404</h1>
            <p className="text-xl text-astra-primary font-display mb-4">Lost in the Void</p>
            <p className="text-astra-muted mb-8">
              The page you are looking for has drifted into the nebula. Return to the guild portal.
            </p>
            <Link to="/">
              <GlowButton size="lg" icon={<Home className="w-5 h-5" />}>
                Return Home
              </GlowButton>
            </Link>
          </GlassCard>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
