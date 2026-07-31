import { getInitials } from '../../utils/helpers.ts'

interface AvatarProps {
  src?: string | null
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  glow?: boolean
}

export const Avatar = ({ src, name, size = 'md', className = '', glow = false }: AvatarProps) => {
  const sizes = {
    xs: 'w-8 h-8 text-xs',
    sm: 'w-10 h-10 text-sm',
    md: 'w-14 h-14 text-base',
    lg: 'w-20 h-20 text-xl',
    xl: 'w-28 h-28 text-2xl',
  }

  return (
    <div
      className={[
        'relative rounded-full overflow-hidden flex-shrink-0',
        'bg-gradient-to-br from-astra-primary/20 to-astra-secondary/20',
        'border-2 border-astra-primary/30',
        glow ? 'shadow-[0_0_20px_rgba(76,201,240,0.3)]' : '',
        sizes[size],
        className,
      ].join(' ')}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center font-semibold text-astra-primary">
          {getInitials(name)}
        </div>
      )}
    </div>
  )
}
