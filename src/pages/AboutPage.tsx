import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Target, Heart, Shield, Scroll, Crown, Sparkles } from 'lucide-react'
import { ParticleBackground } from '../components/layout/ParticleBackground.tsx'
import { Navbar } from '../components/layout/Navbar.tsx'
import { Footer } from '../components/layout/Footer.tsx'
import { GlassCard } from '../components/ui/GlassCard.tsx'
import { GlowButton } from '../components/ui/GlowButton.tsx'

export const AboutPage = () => {
  const rules = [
    { icon: Shield, title: 'Respect Everyone', desc: 'Treat guildmates with respect. No toxicity, harassment, or drama.' },
    { icon: Target, title: 'Participate', desc: 'Join guild events, raids, and wars when you are available.' },
    { icon: Heart, title: 'Help Each Other', desc: 'Share knowledge, resources, and support newer members.' },
    { icon: Scroll, title: 'Communicate', desc: 'Stay active on Discord and inform us about absences.' },
  ]

  const goals = [
    'Dominate endgame PvE content and world bosses',
    'Build a competitive and coordinated PvP presence',
    'Foster a community that feels like family',
    'Maintain a top-tier guild roster with active members',
  ]

  return (
    <div className="min-h-screen bg-astra-bg">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 text-astra-accent mb-4">
              <Star className="w-4 h-4" />
              <span className="text-xs uppercase tracking-[0.3em] font-semibold">About Us</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-astra-text font-display mb-4">
              The Story of ASTRA
            </h1>
            <p className="text-astra-muted max-w-2xl mx-auto text-lg">
              A guild built on ambition, loyalty, and the desire to reach for the stars.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <GlassCard>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-astra-primary/10 flex items-center justify-center border border-astra-primary/20">
                  <Crown className="w-6 h-6 text-astra-primary" />
                </div>
                <h2 className="text-2xl font-bold text-astra-text font-display">Our Vision</h2>
              </div>
              <p className="text-astra-muted leading-relaxed mb-6">
                ASTRA was founded with a clear vision: to become one of the most respected and powerful guilds in the game. We believe that through coordination, dedication, and mutual respect, ordinary players can achieve extraordinary things.
              </p>
              <ul className="space-y-3">
                {goals.map((goal, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 text-astra-text"
                  >
                    <Sparkles className="w-4 h-4 text-astra-accent mt-1 flex-shrink-0" />
                    <span>{goal}</span>
                  </motion.li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-astra-secondary/10 flex items-center justify-center border border-astra-secondary/20">
                  <Scroll className="w-6 h-6 text-astra-secondary" />
                </div>
                <h2 className="text-2xl font-bold text-astra-text font-display">Guild Rules</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {rules.map((rule, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl bg-astra-bg/40 border border-astra-primary/10 hover:border-astra-primary/30 transition-colors"
                  >
                    <rule.icon className="w-5 h-5 text-astra-primary mb-2" />
                    <h3 className="font-semibold text-astra-text mb-1">{rule.title}</h3>
                    <p className="text-sm text-astra-muted leading-relaxed">{rule.desc}</p>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>

          <GlassCard glow className="text-center py-16">
            <Sparkles className="w-12 h-12 text-astra-accent mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-astra-text font-display mb-4">Ready to Join the Stars?</h2>
            <p className="text-astra-muted max-w-2xl mx-auto mb-8">
              We are always looking for dedicated players who share our vision. If you are ready to commit, grow, and conquer together, ASTRA is waiting for you.
            </p>
            <Link to="/register">
              <GlowButton size="lg" icon={<Sparkles className="w-5 h-5" />}>
                Apply Now
              </GlowButton>
            </Link>
          </GlassCard>
        </div>
      </main>
      <Footer />
    </div>
  )
}
