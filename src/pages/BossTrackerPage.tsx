import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { ParticleBackground } from '../components/layout/ParticleBackground.tsx'
import { Navbar } from '../components/layout/Navbar.tsx'
import { Footer } from '../components/layout/Footer.tsx'
import { NextSpawn } from '../components/boss-tracker/NextSpawn.tsx'
import { UpcomingList } from '../components/boss-tracker/UpcomingList.tsx'
import { IntervalGrid } from '../components/boss-tracker/IntervalGrid.tsx'
import { WeeklySchedule } from '../components/boss-tracker/WeeklySchedule.tsx'
import { useBossTimers } from '../hooks/useBossTimers.ts'

export const BossTrackerPage = () => {
  const { timers, loading, online, lastSync, error } = useBossTimers(30000)
  const lang = 'en'

  return (
    <div className="min-h-screen bg-astra-bg">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-astra-primary to-astra-secondary flex items-center justify-center shadow-[0_0_20px_rgba(76,201,240,0.3)]">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-astra-text font-display text-glow">
                  Boss Tracker
                </h1>
                <p className="text-astra-muted text-sm">
                  Real-time world boss respawn tracking for ASTRA
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-astra-muted">
              <span
                className={[
                  'w-2 h-2 rounded-full',
                  online ? 'bg-emerald-400 animate-pulse' : 'bg-red-400',
                ].join(' ')}
              />
              <span>{online ? 'Live timer data' : 'Offline timer data'}</span>
              {lastSync && <span className="text-astra-primary/60">· Last sync: {lastSync}</span>}
              {loading && <span className="text-astra-primary/60">· Loading...</span>}
              {error && <span className="text-red-400">· Error: {error}</span>}
            </div>
          </motion.div>

          {/* Next spawn banner */}
          <div className="mb-6">
            <NextSpawn lang={lang} timers={timers} online={online} />
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-1 h-full">
              <UpcomingList lang={lang} timers={timers} limit={10} />
            </div>
            <div className="lg:col-span-2">
              <IntervalGrid lang={lang} timers={timers} />
            </div>
          </div>

          {/* Weekly schedule */}
          <WeeklySchedule lang={lang} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
