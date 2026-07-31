import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface GlowButtonProps {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  loading?: boolean
  icon?: ReactNode
}

export const GlowButton = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  loading = false,
  icon,
}: GlowButtonProps) => {
  const variants = {
    primary: 'bg-gradient-to-r from-astra-primary to-astra-secondary text-white border-transparent',
    secondary: 'bg-astra-surface border-astra-primary/30 text-astra-primary hover:bg-astra-primary/10',
    accent: 'bg-gradient-to-r from-astra-accent to-amber-500 text-astra-bg font-semibold border-transparent',
    outline: 'bg-transparent border border-astra-muted/30 text-astra-text hover:border-astra-primary/50 hover:bg-astra-primary/5',
    danger: 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.03, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={[
        'relative rounded-lg font-medium transition-all duration-300',
        'inline-flex items-center justify-center gap-2 overflow-hidden',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className,
      ].join(' ')}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full hover:animate-[shimmer_1.5s_infinite]" />
      {loading && (
        <span className="inline-block h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      )}
      {!loading && icon}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
