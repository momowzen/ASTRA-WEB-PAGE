import { motion } from 'framer-motion'
import { CalendarDays } from 'lucide-react'
import { getWeeklySchedule, getTodayIndex } from '../../utils/astraTime.ts'
import { getBossName } from '../../data/astraViewer.ts'
import type { Language } from '../../data/astraViewer.ts'

interface WeeklyScheduleProps {
  lang: Language
}

export const WeeklySchedule = ({ lang }: WeeklyScheduleProps) => {
  const schedule = getWeeklySchedule(lang)
  const todayIndex = getTodayIndex()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="glass rounded-2xl p-6 gradient-border"
    >
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="w-5 h-5 text-astra-accent" />
        <h3 className="text-lg font-bold text-astra-text font-display">Weekly Schedule</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-7 gap-3">
        {schedule.map((day) => {
          const isToday = day.dayIndex === todayIndex
          return (
            <div
              key={day.dayIndex}
              className={[
                'rounded-xl border p-3 flex flex-col',
                isToday
                  ? 'border-astra-primary/50 bg-astra-primary/10'
                  : 'border-astra-primary/10 bg-astra-surface/40',
              ].join(' ')}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={[
                  'text-xs font-bold uppercase tracking-wider',
                  isToday ? 'text-astra-primary' : 'text-astra-muted',
                ].join(' ')}>
                  {day.name}
                </span>
                {isToday && (
                  <span className="w-2 h-2 rounded-full bg-astra-primary animate-pulse flex-shrink-0" />
                )}
              </div>
              <div className="space-y-2 flex-1">
                {day.events.length === 0 ? (
                  <p className="text-xs text-astra-muted/60 italic">No spawns</p>
                ) : (
                  day.events.map((event) => (
                    <div
                      key={`${event.boss.id}-${event.time}`}
                      className="text-xs border-b border-astra-primary/10 last:border-0 pb-1 last:pb-0"
                    >
                      <p className="text-astra-text font-medium truncate">{getBossName(event.boss, lang)}</p>
                      <p className="text-astra-primary tabular-nums">{event.time}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
