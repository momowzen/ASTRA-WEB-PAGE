import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Check, ArrowRight } from 'lucide-react'
import { GlowButton } from '../ui/GlowButton.tsx'

export const RecruitmentSection = () => {
  const requirements = [
    'Active and communicative on Discord',
    'Willing to participate in guild events',
    'Respectful and team-oriented attitude',
    'Committed to character progression',
  ]

  return (
    <section className="section overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-astra-secondary/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="section-inner relative z-10">
        <div className="glass rounded-3xl p-8 md:p-16 gradient-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-astra-primary/5 via-transparent to-astra-secondary/5 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-eyebrow text-astra-accent">Recruitment</span>
              <h2 className="section-title text-left mx-0 mt-4">Join The Celestial Ranks</h2>
              <p className="text-astra-muted text-lg mb-8 leading-relaxed">
                ASTRA is recruiting dedicated players who want to push their limits, conquer endgame content, and become part of a guild that feels like home.
              </p>
              <Link to="/register">
                <GlowButton size="lg" icon={<Sparkles className="w-5 h-5" />}>
                  Apply To Join
                </GlowButton>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-astra-text mb-6 font-display">What We Look For</h3>
              {requirements.map((req, index) => (
                <motion.div
                  key={req}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-astra-bg/40 border border-astra-primary/10 hover:border-astra-primary/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-astra-accent/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-astra-accent" />
                  </div>
                  <p className="text-astra-text font-medium">{req}</p>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="pt-4"
              >
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-astra-primary hover:text-astra-text transition-colors group"
                >
                  Learn more about our rules
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
