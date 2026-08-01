import { Globe, ChevronDown } from 'lucide-react'
import { COUNTRY_OPTIONS } from '../../types/index.ts'

interface CountrySelectProps {
  value: string
  onChange: (value: string) => void
  required?: boolean
  label?: string
}

export const CountrySelect = ({ value, onChange, required = false, label = 'Nationality' }: CountrySelectProps) => {
  const selected = COUNTRY_OPTIONS.find((c) => c.name === value)

  return (
    <div>
      <label className="block text-sm font-medium text-astra-muted mb-2 tracking-wide">
        {label}
        {required && <span className="text-astra-accent ml-1">*</span>}
      </label>
      <div className="relative">
        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-astra-muted/70 pointer-events-none" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={[
            'w-full bg-astra-bg/60 border border-astra-primary/20 rounded-lg text-astra-text text-sm',
            'focus:border-astra-primary/60 focus:ring-2 focus:ring-astra-primary/20',
            'transition-all duration-300 outline-none appearance-none cursor-pointer',
            'h-11 py-2 pl-11 pr-10 leading-tight',
          ].join(' ')}
        >
          <option value="">Select country...</option>
          {COUNTRY_OPTIONS.map((country) => (
            <option key={country.name} value={country.name}>
              {country.flag} {country.name}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-astra-muted/70 pointer-events-none">
          <ChevronDown className="w-4 h-4" />
        </div>
        {selected && value && (
          <div className="absolute right-9 top-1/2 -translate-y-1/2 text-lg pointer-events-none">
            {selected.flag}
          </div>
        )}
      </div>
    </div>
  )
}
