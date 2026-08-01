import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Globe, X, MessageCircle, Heart } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="relative mt-auto border-t border-astra-primary/10 bg-astra-bg/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-astra-primary to-astra-secondary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold font-display text-astra-text">ASTRA</h3>
            </div>
            <p className="text-sm text-astra-muted leading-relaxed">
              A celestial MMORPG guild forged among the stars. Join us and rise beyond the limits.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-astra-text uppercase tracking-wider mb-4">Portal</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', path: '/' },
                { label: 'Members', path: '/members' },
                { label: 'Boss Tracker', path: '/boss-tracker' },
                { label: 'About', path: '/about' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-astra-muted hover:text-astra-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-astra-text uppercase tracking-wider mb-4">Connect</h4>
            <div className="flex items-center gap-3">
              {[MessageCircle, X, Globe].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center text-astra-muted hover:text-astra-primary hover:border-astra-primary/30 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-astra-primary/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-astra-muted">
            © {new Date().getFullYear()} ASTRA Guild. All rights reserved.
          </p>
          <p className="text-xs text-astra-muted flex items-center gap-1">
            Crafted with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> among the stars
          </p>
        </div>
      </div>
    </footer>
  )
}
