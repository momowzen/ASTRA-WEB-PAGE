import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-astra-muted mb-2 tracking-wide">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-astra-muted">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={[
              'w-full bg-astra-bg/60 border border-astra-primary/20 rounded-lg',
              'text-astra-text placeholder:text-astra-muted/60',
              'focus:border-astra-primary/60 focus:ring-2 focus:ring-astra-primary/20',
              'transition-all duration-300 outline-none',
              icon ? 'pl-11 pr-4' : 'px-4',
              'py-3',
              error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : '',
              className,
            ].join(' ')}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-400 animate-pulse">{error}</p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
