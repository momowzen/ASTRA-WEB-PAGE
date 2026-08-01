import type { Boss, BossTimers, Language } from '../data/astraViewer.ts'
import { BOSSES, VIEWER_STRINGS, DAYS } from '../data/astraViewer.ts'

export const TO = 9 * 3600000 // 9h Tokyo offset in ms, as used by the original viewer

export function now(): number {
  return Date.now()
}

export function p2(n: number): string {
  return String(n).padStart(2, '0')
}

export function fmt(ms: number, locale = 'en-US'): string {
  return new Date(ms).toLocaleString(locale, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Tokyo',
  })
}

export function fmtD(ms: number, locale = 'en-US'): string {
  return new Date(ms).toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
    timeZone: 'Asia/Tokyo',
  })
}

export function fmtT(ms: number, locale = 'en-US'): string {
  return new Date(ms).toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Tokyo',
  })
}

export function fmtDur(ms: number, lang: Language = 'en'): string {
  if (ms <= 0) return VIEWER_STRINGS[lang].spawned
  const s = Math.floor(ms / 1000)
  const d = Math.floor(s / 86400)
  const h = Math.floor((s % 86400) / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  if (d) return `${d}d ${h}h`
  if (h) return `${h}h ${m}m`
  return `${m}m ${p2(sec)}s`
}

export function fmtShort(ms: number, lang: Language = 'en'): string {
  if (ms <= 0) return VIEWER_STRINGS[lang].now
  const s = Math.floor(ms / 1000)
  const d = Math.floor(s / 86400)
  const h = Math.floor((s % 86400) / 3600)
  const m = Math.floor((s % 3600) / 60)
  if (d) return `${d}d ${h}h`
  if (h) return `${h}h ${m}m`
  return `${m}m`
}

export function fmtInt(s: number): string {
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  return m ? `${h}h ${m}m` : `${h}h`
}

export function nextSpawn(
  boss: Boss,
  timers: BossTimers,
  n = now()
): number | null {
  const timer = timers[boss.id]

  // Interval-based respawn
  if (boss.rs) {
    return timer?.endTime ? timer.endTime : null
  }

  // Weekly scheduled respawn
  if (boss.wr) {
    const base = new Date(n + TO)
    let best: number | null = null
    for (const w of boss.wr) {
      const c = new Date(base)
      const del = (w.d + 7 - base.getUTCDay()) % 7
      c.setUTCDate(base.getUTCDate() + del)
      c.setUTCHours(w.h, w.m, 0, 0)
      let r = c.getTime() - TO
      if (r < n) r += 604800000 // 7 days
      if (best === null || r < best) best = r
    }
    return best
  }

  return null
}

export interface SpawnEntry {
  boss: Boss
  time: number
}

export function getUpcoming(timers: BossTimers, n = now()): SpawnEntry[] {
  const list: SpawnEntry[] = []
  for (const boss of BOSSES) {
    const t = nextSpawn(boss, timers, n)
    if (t && t > n) list.push({ boss, time: t })
  }
  list.sort((a, b) => a.time - b.time)
  return list
}

export function getNextSpawn(timers: BossTimers, n = now()): SpawnEntry | null {
  const upcoming = getUpcoming(timers, n)
  return upcoming[0] ?? null
}

export interface IntervalGroup {
  seconds: number
  bosses: Boss[]
}

export function getIntervalGroups(): IntervalGroup[] {
  const groups: Record<number, IntervalGroup> = {}
  for (const boss of BOSSES) {
    if (!boss.rs) continue
    const k = boss.rs
    if (!groups[k]) groups[k] = { seconds: k, bosses: [] }
    groups[k].bosses.push(boss)
  }
  return Object.values(groups).sort((a, b) => a.seconds - b.seconds)
}

export interface WeeklyEvent {
  time: string
  boss: Boss
}

export interface WeeklyDay {
  dayIndex: number
  name: string
  events: WeeklyEvent[]
}

export function getWeeklySchedule(lang: Language = 'en'): WeeklyDay[] {
  const order = [1, 2, 3, 4, 5, 6, 0]
  const days = DAYS[lang]
  const by = order.map((d) => ({ dayIndex: d, name: days[d], events: [] as WeeklyEvent[] }))
  for (const boss of BOSSES) {
    if (!boss.wr) continue
    for (const w of boss.wr) {
      const col = by.find((x) => x.dayIndex === w.d)
      if (col) {
        col.events.push({ boss, time: `${p2(w.h)}:${p2(w.m)}` })
      }
    }
  }
  for (const d of by) {
    d.events.sort((a, b) => a.time.localeCompare(b.time))
  }
  return by
}

export function getTodayIndex(): number {
  return new Date(now() + TO).getUTCDay()
}

export function getCurrentTimeString(): string {
  return new Date(now()).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Tokyo',
  })
}

export function isLive(timers: BossTimers, n = now()): boolean {
  return Object.values(timers).some((t) => t.endTime && t.endTime > n)
}
