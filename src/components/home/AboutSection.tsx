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
    <section className="section">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-eyebrow">
            <Sparkles className="w-4 h-4" />
            <span>About ASTRA</span>
          </div>
          <h2 className="section-title">Born From The Cosmos</h2>
          <p className="section-description">
            ASTRA is more than a guild. We are a constellation of warriors, explorers, and strategists united by a single purpose: to dominate every challenge the game throws at us while building lasting friendships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <GlassCard key={feature.title} delay={index * 0.1} glow={index === 0} className="flex flex-col">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-astra-primary/20 to-astra-secondary/20 flex items-center justify-center mb-4 border border-astra-primary/20">
                <feature.icon className="w-6 h-6 text-astra-primary" />
              </div>
              <h3 className="text-xl font-semibold text-astra-text mb-2 font-display">{feature.title}</h3>
              <p className="text-sm text-astra-muted leading-relaxed flex-1">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
