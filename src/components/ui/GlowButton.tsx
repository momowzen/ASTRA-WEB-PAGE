import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface GlowButtonProps {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'danger' | 'ghost'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  loading?: boolean
  icon?: ReactNode
  fullWidth?: boolean
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
  fullWidth = false,
}: GlowButtonProps) => {
  const variants = {
    primary: 'bg-gradient-to-r from-astra-primary to-astra-secondary text-white border-transparent shadow-[0_4px_16px_rgba(76,201,240,0.25)] hover:shadow-[0_8px_24px_rgba(139,92,246,0.35)]',
    secondary: 'bg-astra-surface border border-astra-primary/30 text-astra-primary hover:bg-astra-primary/10 hover:border-astra-primary/50',
    accent: 'bg-gradient-to-r from-astra-accent to-amber-500 text-astra-bg font-semibold border-transparent shadow-[0_4px_16px_rgba(251,191,36,0.25)] hover:shadow-[0_8px_24px_rgba(251,191,36,0.35)]',
    outline: 'bg-transparent border border-astra-muted/30 text-astra-text hover:border-astra-primary/50 hover:bg-astra-primary/5',
    danger: 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50',
    ghost: 'bg-transparent border-transparent text-astra-muted hover:text-astra-text hover:bg-astra-primary/5',
  }

  const sizes = {
    xs: 'h-8 px-3 text-xs gap-1.5',
    sm: 'h-9 px-4 text-sm gap-1.5',
    md: 'h-10 px-5 text-sm gap-2',
    lg: 'h-12 px-6 text-base gap-2',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={[
        'relative rounded-lg font-medium transition-all duration-300',
        'inline-flex items-center justify-center overflow-hidden',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'whitespace-nowrap',
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full hover:animate-[shimmer_1.5s_infinite]" />
      {loading ? (
        <span className="inline-block h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        icon && <span className="relative z-10 flex-shrink-0">{icon}</span>
      )}
      <span className="relative z-10 truncate">{children}</span>
    </motion.button>
  )
}
