import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Timer, Swords } from 'lucide-react'
import { getNextSpawn, fmtT, fmtD, fmtDur } from '../../utils/astraTime.ts'
import { getBossName } from '../../data/astraViewer.ts'
import type { Language, BossTimers } from '../../data/astraViewer.ts'

interface NextSpawnProps {
  lang: Language
  timers: BossTimers
}

export const NextSpawn = ({ lang, timers }: NextSpawnProps) => {
  const [, setTick] = useState(0)
  const next = getNextSpawn(timers)
  const bossName = next ? getBossName(next.boss, lang) : 'None'
  const remaining = next ? Math.max(0, next.time - Date.now()) : 0

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const isLive = next ? remaining === 0 : false

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-strong rounded-2xl p-6 md:p-8 gradient-border relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-astra-primary/10 via-transparent to-astra-secondary/10 pointer-events-none" />
      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div
            className={[
              'w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0',
              isLive ? 'bg-red-500/20 animate-pulse' : 'bg-astra-primary/10',
            ].join(' ')}
          >
            {isLive ? (
              <Swords className="w-8 h-8 text-red-300" />
            ) : (
              <Timer className="w-8 h-8 text-astra-primary" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm text-astra-muted uppercase tracking-wider">Next Spawn</p>
            <h2 className="text-3xl md:text-4xl font-bold text-astra-text font-display text-glow truncate">
              {bossName}
            </h2>
            {next && (
              <p className="text-astra-primary text-sm font-medium">
                Lv.{next.boss.lvl} · {next.boss.rs ? 'Interval' : 'Scheduled'}
              </p>
            )}
          </div>
        </div>

        <div className="text-right md:text-right text-left">
          {next ? (
            <>
              <div className="text-4xl md:text-5xl font-bold text-white font-display tabular-nums">
                {isLive ? 'SPAWNED' : fmtDur(remaining, lang)}
              </div>
              <p className="text-astra-muted text-sm mt-1">
                {fmtT(next.time)} · {fmtD(next.time)} JST
              </p>
            </>
          ) : (
            <p className="text-astra-muted text-lg">No upcoming spawns</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
