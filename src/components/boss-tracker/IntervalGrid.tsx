import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Repeat } from 'lucide-react'
import { getIntervalGroups, fmtShort, getNextSpawn } from '../../utils/astraTime.ts'
import { getBossName } from '../../data/astraViewer.ts'
import type { Language, BossTimers } from '../../data/astraViewer.ts'

interface IntervalGridProps {
  lang: Language
  timers: BossTimers
}

export const IntervalGrid = ({ lang, timers }: IntervalGridProps) => {
  const [, setTick] = useState(0)
  const groups = getIntervalGroups()
  const next = getNextSpawn(timers)
  const now = Date.now()

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 10000)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass rounded-2xl p-6 gradient-border"
    >
      <div className="flex items-center gap-2 mb-4">
        <Repeat className="w-5 h-5 text-astra-secondary" />
        <h3 className="text-lg font-bold text-astra-text font-display">Interval Respawns</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {groups.map((group) => (
          <div
            key={group.seconds}
            className={[
              'rounded-xl border p-4 transition-all',
              next && group.bosses.some((b) => b.id === next.boss.id)
                ? 'border-astra-primary/50 bg-astra-primary/10'
                : 'border-astra-primary/10 bg-astra-surface/40',
            ].join(' ')}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-astra-primary">Every {Math.floor(group.seconds / 3600)}h</h4>
              <span className="text-xs text-astra-muted bg-astra-primary/10 px-2 py-1 rounded-full">
                {group.bosses.length}
              </span>
            </div>
            <div className="space-y-2">
              {group.bosses.map((boss) => {
                const timer = timers[boss.id]
                const active = timer && timer.endTime > now
                const remaining = timer ? timer.endTime - now : 0
                return (
                  <div
                    key={boss.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-astra-text">{getBossName(boss, lang)}</span>
                    <span
                      className={[
                        'tabular-nums font-medium',
                        active ? 'text-emerald-400' : 'text-astra-muted',
                      ].join(' ')}
                    >
                      {active ? fmtShort(remaining, lang) : '--'}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
