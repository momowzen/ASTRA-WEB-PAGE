import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface StatCardProps {
  label: string
  value: ReactNode
  icon?: ReactNode
  delay?: number
  accent?: 'primary' | 'secondary' | 'accent' | 'purple'
}

export const StatCard = ({ label, value, icon, delay = 0, accent = 'primary' }: StatCardProps) => {
  const accentStyles = {
    primary: 'from-astra-primary/20 to-astra-primary/5 border-astra-primary/20',
    secondary: 'from-astra-secondary/20 to-astra-secondary/5 border-astra-secondary/20',
    accent: 'from-astra-accent/20 to-astra-accent/5 border-astra-accent/20',
    purple: 'from-fuchsia-500/20 to-purple-500/5 border-fuchsia-500/20',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, boxShadow: '0 15px 30px rgba(0,0,0,0.3)' }}
      className={[
        'glass rounded-xl p-5 relative overflow-hidden',
        'bg-gradient-to-br',
        accentStyles[accent],
      ].join(' ')}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          {icon && <span className="text-astra-primary">{icon}</span>}
          <p className="text-sm text-astra-muted uppercase tracking-wider">{label}</p>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-astra-text font-display">{value}</div>
      </div>
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br from-astra-primary/10 to-transparent rounded-full blur-2xl" />
    </motion.div>
  )
}
