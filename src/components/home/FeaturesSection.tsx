import { motion } from 'framer-motion'
import { Sword, Crown, Flame, Gem, Clock, Globe } from 'lucide-react'
import { GlassCard } from '../ui/GlassCard.tsx'

export const FeaturesSection = () => {
  const features = [
    {
      icon: Sword,
      title: 'Combat Power Tracking',
      description: 'Monitor guild strength with live combat power analytics and leaderboards.',
      color: 'primary',
    },
    {
      icon: Crown,
      title: 'Elite Administration',
      description: 'Admins manage rosters, approve members, and export data with premium tools.',
      color: 'secondary',
    },
    {
      icon: Gem,
      title: 'Equipment Showcase',
      description: 'Display your gear like true in-game inventory slots with rarity and glow effects.',
      color: 'accent',
    },
    {
      icon: Flame,
      title: 'Boss Tracker Ready',
      description: 'Architecture built to expand into boss tracking, loot distribution, and events.',
      color: 'purple',
    },
    {
      icon: Clock,
      title: 'Event Calendar',
      description: 'Future-ready for raid scheduling, guild wars, and attendance tracking.',
      color: 'primary',
    },
    {
      icon: Globe,
      title: 'Discord Integration',
      description: 'Designed for future Discord integration and webhook notifications.',
      color: 'secondary',
    },
  ]

  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-astra-secondary/5 via-transparent to-astra-primary/5 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-astra-secondary font-semibold">Guild Systems</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-astra-text mt-4 mb-6">
            Tools Built For Legends
          </h2>
          <p className="text-astra-muted max-w-2xl mx-auto text-lg">
            Premium systems designed to manage, track, and grow the guild with style and precision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <GlassCard key={feature.title} delay={index * 0.08} className="group">
              <div className="flex items-start gap-4">
                <div className={[
                  'w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 border',
                  feature.color === 'primary' && 'bg-astra-primary/10 border-astra-primary/20 text-astra-primary',
                  feature.color === 'secondary' && 'bg-astra-secondary/10 border-astra-secondary/20 text-astra-secondary',
                  feature.color === 'accent' && 'bg-astra-accent/10 border-astra-accent/20 text-astra-accent',
                  feature.color === 'purple' && 'bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400',
                ].filter(Boolean).join(' ')}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-astra-text mb-2 font-display group-hover:text-astra-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-astra-muted leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
