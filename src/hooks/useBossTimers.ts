import { useEffect, useState, useRef } from 'react'
import type { BossTimers } from '../data/astraViewer.ts'

// The original ASTRA-Web-Viewer stores timer data in a separate Firebase project.
// We read it via the Firestore REST API so we don't need a second Firebase SDK.
const TIMER_DOC_URL =
  'https://firestore.googleapis.com/v1/projects/astra-boss-timer-759e5/databases/(default)/documents/timers/global?key=AIzaSyAboQqH7BmtLCO0ciHUvgGIUOU6SMzHnzo'

interface BossTimerState {
  timers: BossTimers
  loading: boolean
  online: boolean
  lastSync: string | null
  error: string | null
}

export function useBossTimers(pollIntervalMs = 30000): BossTimerState {
  const [timers, setTimers] = useState<BossTimers>({})
  const [loading, setLoading] = useState(true)
  const [online, setOnline] = useState(false)
  const [lastSync, setLastSync] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    let mounted = true

    const parseFields = (fields: Record<string, unknown>): BossTimers => {
      const timersMap =
        (fields as { timers?: { mapValue?: { fields?: Record<string, unknown> } } }).timers?.mapValue
          ?.fields || {}
      const parsed: BossTimers = {}
      for (const [id, val] of Object.entries(timersMap)) {
        const map = (val as { mapValue?: { fields?: Record<string, unknown> } }).mapValue?.fields || {}
        const endTime = Number(
          (map.endTime as { integerValue?: string; doubleValue?: number })?.integerValue ??
            (map.endTime as { integerValue?: string; doubleValue?: number })?.doubleValue ??
            0
        )
        const startedAt = Number(
          (map.startedAt as { integerValue?: string; doubleValue?: number })?.integerValue ??
            (map.startedAt as { integerValue?: string; doubleValue?: number })?.doubleValue ??
            0
        )
        if (endTime) {
          parsed[id] = { endTime, startedAt }
        }
      }
      return parsed
    }

    const fetchTimers = async () => {
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller
      try {
        const res = await fetch(TIMER_DOC_URL, { signal: controller.signal })
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }
        const data = (await res.json()) as { fields?: Record<string, unknown> }
        const parsed = data.fields ? parseFields(data.fields) : {}
        if (mounted) {
          setTimers(parsed)
          setOnline(true)
          setLastSync(new Date().toLocaleTimeString())
          setError(null)
        }
      } catch (err) {
        if (mounted && err instanceof Error && err.name !== 'AbortError') {
          setOnline(false)
          setError(err.message)
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchTimers()
    const interval = setInterval(fetchTimers, pollIntervalMs)

    return () => {
      mounted = false
      clearInterval(interval)
      abortRef.current?.abort()
    }
  }, [pollIntervalMs])

  return { timers, loading, online, lastSync, error }
}
