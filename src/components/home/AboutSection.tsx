import { motion } from 'framer-motion'
import { Sparkles, Target, Users, Trophy, Shield } from 'lucide-react'
import { GlassCard } from '../ui/GlassCard.tsx'

export const AboutSection = () => {
  const features = [
    {
      icon: Trophy,
      title: 'Endgame Dominance',
      description: 'Conquer the hardest raids, dungeons, and PvP challenges together as an elite force.',
    },
    {
      icon: Target,
      title: 'Strategic Growth',
      description: 'Track combat power, equipment, and progression to ensure every member reaches their peak.',
    },
    {
      icon: Users,
      title: 'Tight-Knit Community',
      description: 'A guild built on respect, teamwork, and shared victories under the same stars.',
    },
    {
      icon: Shield,
      title: 'Reliable Allies',
      description: 'Show up, support each other, and become part of something greater than solo play.',
    },
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-astra-primary mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs uppercase tracking-[0.3em] font-semibold">About ASTRA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-astra-text mb-6">
            Born From The Cosmos
          </h2>
          <p className="text-astra-muted max-w-3xl mx-auto text-lg leading-relaxed">
            ASTRA is more than a guild. We are a constellation of warriors, explorers, and strategists united by a single purpose: to dominate every challenge the game throws at us while building lasting friendships.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <GlassCard key={feature.title} delay={index * 0.1} glow={index === 0}>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-astra-primary/20 to-astra-secondary/20 flex items-center justify-center mb-4 border border-astra-primary/20">
                <feature.icon className="w-6 h-6 text-astra-primary" />
              </div>
              <h3 className="text-xl font-semibold text-astra-text mb-2 font-display">{feature.title}</h3>
              <p className="text-sm text-astra-muted leading-relaxed">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
