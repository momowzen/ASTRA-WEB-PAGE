import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  delay?: number
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export const GlassCard = ({ children, className = '', hover = true, glow = false, delay = 0, padding = 'md' }: GlassCardProps) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.28)',
            }
          : undefined
      }
      className={[
        'glass rounded-2xl relative overflow-hidden',
        paddings[padding],
        glow ? 'shadow-[0_0_30px_rgba(139,92,246,0.12)]' : '',
        className,
      ].join(' ')}
    >
      {children}
    </motion.div>
  )
}
