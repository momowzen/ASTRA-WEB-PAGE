import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  delay?: number
}

export const GlassCard = ({ children, className = '', hover = true, glow = false, delay = 0 }: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={
        hover
          ? {
              y: -6,
              boxShadow: '0 20px 40px rgba(76, 201, 240, 0.15)',
            }
          : undefined
      }
      className={[
        'glass rounded-2xl p-6 relative overflow-hidden',
        glow ? 'shadow-[0_0_30px_rgba(139,92,246,0.15)]' : '',
        className,
      ].join(' ')}
    >
      {children}
    </motion.div>
  )
}
