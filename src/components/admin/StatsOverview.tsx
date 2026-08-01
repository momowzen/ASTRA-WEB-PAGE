import { Users, Zap, TrendingUp, UserPlus } from 'lucide-react'
import { StatCard } from '../ui/StatCard.tsx'
import { AnimatedCounter } from '../ui/AnimatedCounter.tsx'
import type { MemberProfile } from '../../types/index.ts'

interface StatsOverviewProps {
  members: MemberProfile[]
}

export const StatsOverview = ({ members }: StatsOverviewProps) => {
  const roster = members.filter((m) => m.role !== 'applicant')
  const applicants = members.filter((m) => m.role === 'applicant')
  const total = roster.length
  const averageCP = total ? Math.floor(roster.reduce((acc, m) => acc + (m.combatPower || 0), 0) / total) : 0
  const highestCP = total ? Math.max(...roster.map((m) => m.combatPower || 0)) : 0
  const pendingApplicants = applicants.length

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        label="Total Members"
        value={total > 0 ? <AnimatedCounter value={total} /> : '—'}
        icon={<Users className="w-5 h-5" />}
        delay={0}
        accent="primary"
      />
      <StatCard
        label="Average Combat Power"
        value={total > 0 ? <AnimatedCounter value={averageCP} /> : '—'}
        icon={<Zap className="w-5 h-5" />}
        delay={0.1}
        accent="secondary"
      />
      <StatCard
        label="Highest Combat Power"
        value={total > 0 ? <AnimatedCounter value={highestCP} /> : '—'}
        icon={<TrendingUp className="w-5 h-5" />}
        delay={0.2}
        accent="accent"
      />
      <StatCard
        label={pendingApplicants === 1 ? 'Pending Applicant' : 'Pending Applicants'}
        value={pendingApplicants > 0 ? <AnimatedCounter value={pendingApplicants} /> : '—'}
        icon={<UserPlus className="w-5 h-5" />}
        delay={0.3}
        accent="purple"
      />
    </div>
  )
}
