import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, hint, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-astra-muted mb-2 tracking-wide">
            {label}
            {props.required && <span className="text-astra-accent ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-astra-muted/70 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={[
              'w-full bg-astra-bg/60 border border-astra-primary/20 rounded-lg',
              'text-astra-text placeholder:text-astra-muted/50',
              'focus:border-astra-primary/60 focus:ring-2 focus:ring-astra-primary/20',
              'transition-all duration-300 outline-none',
              'h-11 py-2',
              icon ? 'pl-11 pr-4' : 'px-4',
              'leading-tight',
              error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : '',
              className,
            ].join(' ')}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-400">{error}</p>
        )}
        {hint && !error && (
          <p className="mt-2 text-sm text-astra-muted/70">{hint}</p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
