import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface LoadingSpinnerProps {
  fullScreen?: boolean
  message?: string
}

export const LoadingSpinner = ({ fullScreen = false, message = 'Loading...' }: LoadingSpinnerProps) => {
  return (
    <div
      className={[
        'flex flex-col items-center justify-center gap-4',
        fullScreen ? 'fixed inset-0 z-50 bg-astra-bg/80 backdrop-blur-sm' : 'py-12',
      ].join(' ')}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="relative w-16 h-16"
      >
        <div className="absolute inset-0 rounded-full border-4 border-astra-primary/20" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-astra-primary border-r-astra-secondary" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sparkles className="w-6 h-6 text-astra-accent" />
        </motion.div>
      </motion.div>
      <p className="text-astra-muted animate-pulse text-sm">{message}</p>
    </div>
  )
}
