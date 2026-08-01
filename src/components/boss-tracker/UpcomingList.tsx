import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Calendar } from 'lucide-react'
import { getUpcoming, fmtT, fmtD } from '../../utils/astraTime.ts'
import { getBossName } from '../../data/astraViewer.ts'
import type { Language, BossTimers } from '../../data/astraViewer.ts'

interface UpcomingListProps {
  lang: Language
  timers: BossTimers
  limit?: number
}

export const UpcomingList = ({ lang, timers, limit = 8 }: UpcomingListProps) => {
  const [, setTick] = useState(0)
  const upcoming = getUpcoming(timers).slice(0, limit)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60000)
    return () => clearInterval(id)
  }, [limit])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="glass rounded-2xl p-6 gradient-border h-full flex flex-col"
    >
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-astra-primary" />
        <h3 className="text-lg font-bold text-astra-text font-display">Upcoming Spawns</h3>
        <span className="ml-auto text-xs text-astra-muted bg-astra-primary/10 px-2 py-1 rounded-full">
          {upcoming.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[400px] space-y-2 pr-1">
        {upcoming.length === 0 ? (
          <p className="text-astra-muted text-center py-8">No upcoming spawns</p>
        ) : (
          upcoming.map(({ boss, time }, index) => (
            <div
              key={boss.id}
              className="flex items-center justify-between p-3 rounded-xl bg-astra-surface/40 border border-astra-primary/10 hover:border-astra-primary/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-astra-primary w-6">#{index + 1}</span>
                <div>
                  <p className="text-astra-text font-medium">{getBossName(boss, lang)}</p>
                  <p className="text-xs text-astra-muted">Lv.{boss.lvl}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-white tabular-nums">{fmtT(time)}</p>
                <p className="text-xs text-astra-muted flex items-center gap-1 justify-end">
                  <Calendar className="w-3 h-3" /> {fmtD(time)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  )
}
