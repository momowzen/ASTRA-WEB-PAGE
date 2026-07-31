import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Zap, TrendingUp, UserPlus } from 'lucide-react'
import { StatCard } from '../ui/StatCard.tsx'
import { AnimatedCounter } from '../ui/AnimatedCounter.tsx'
import { getAllMembers } from '../../services/userService.ts'
import type { MemberProfile } from '../../types/index.ts'

export const StatsSection = () => {
  const [members, setMembers] = useState<MemberProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllMembers()
      .then(setMembers)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const totalMembers = members.length
  const averageCP = totalMembers
    ? Math.floor(members.reduce((acc, m) => acc + (m.combatPower || 0), 0) / totalMembers)
    : 0
  const highestCP = totalMembers ? Math.max(...members.map((m) => m.combatPower || 0)) : 0
  const newestMember = totalMembers ? members[0]?.ign || '—' : '—'

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-astra-primary/5 via-transparent to-astra-secondary/5 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-astra-primary font-semibold">Live Statistics</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-astra-text mt-4 mb-6">
            Guild Strength
          </h2>
          <p className="text-astra-muted max-w-2xl mx-auto text-lg">
            Real-time metrics that showcase the power and growth of ASTRA.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Total Members"
            value={loading ? '—' : <AnimatedCounter value={totalMembers} />}
            icon={<Users className="w-5 h-5" />}
            delay={0}
            accent="primary"
          />
          <StatCard
            label="Average Combat Power"
            value={loading ? '—' : <AnimatedCounter value={averageCP} />}
            icon={<Zap className="w-5 h-5" />}
            delay={0.1}
            accent="secondary"
          />
          <StatCard
            label="Highest Combat Power"
            value={loading ? '—' : <AnimatedCounter value={highestCP} />}
            icon={<TrendingUp className="w-5 h-5" />}
            delay={0.2}
            accent="accent"
          />
          <StatCard
            label="Newest Member"
            value={newestMember}
            icon={<UserPlus className="w-5 h-5" />}
            delay={0.3}
            accent="purple"
          />
        </div>
      </div>
    </section>
  )
}
