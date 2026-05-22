import { useStorage } from '@vueuse/core'

type Status = 'idle' | 'running' | 'paused'

interface UseTimerOpts {
  settings: Ref<Settings>
  onPhaseEnd?: (finished: Phase, next: Phase) => void
}

const KEY = 'pomodoro:timer'
const TICK_MS = 250

const phaseDurationSec = (phase: Phase, s: Settings) =>
  Math.max(1, Math.round(s[phase] * 60))

const computeNextPhase = (
  current: Phase,
  cycleCount: number,
  longBreakInterval: number
): Phase => {
  if (current !== 'work') return 'work'
  return cycleCount >= longBreakInterval ? 'longBreak' : 'shortBreak'
}

export function useTimer({ settings, onPhaseEnd }: UseTimerOpts) {
  const phase = useStorage<Phase>(`${KEY}:phase`, 'work')
  const status = useStorage<Status>(`${KEY}:status`, 'idle')
  const cycleCount = useStorage<number>(`${KEY}:cycleCount`, 0)
  const endAt = useStorage<number | null>(`${KEY}:endAt`, null)
  const pausedRemaining = useStorage<number | null>(
    `${KEY}:pausedRemaining`,
    null
  )

  const timeLeft = ref<number | null>(null)
  const total = ref<number | null>(null)

  let intervalId: ReturnType<typeof setInterval> | null = null

  const clearTick = () => {
    if (intervalId) clearInterval(intervalId)
    intervalId = null
  }

  const currentDuration = () => phaseDurationSec(phase.value, settings.value)

  const computeTimeLeft = (): number => {
    if (status.value === 'running' && endAt.value) {
      return Math.max(0, Math.ceil((endAt.value - Date.now()) / 1000))
    }
    if (status.value === 'paused' && pausedRemaining.value !== null) {
      return pausedRemaining.value
    }
    return currentDuration()
  }

  const applyPhase = (p: Phase) => {
    phase.value = p
    const d = phaseDurationSec(p, settings.value)
    total.value = d
    timeLeft.value = d
    endAt.value = null
    pausedRemaining.value = null
    status.value = 'idle'
  }

  const handlePhaseEnd = () => {
    clearTick()
    const finished = phase.value

    if (finished === 'work') {
      cycleCount.value++
    } else if (finished === 'longBreak') {
      cycleCount.value = 0
    }

    const next = computeNextPhase(
      finished,
      cycleCount.value,
      settings.value.longBreakInterval
    )
    applyPhase(next)

    onPhaseEnd?.(finished, next)

    if (settings.value.autoStart) start()
  }

  const tick = () => {
    timeLeft.value = computeTimeLeft()
    if (timeLeft.value <= 0) handlePhaseEnd()
  }

  const startTick = () => {
    clearTick()
    intervalId = setInterval(tick, TICK_MS)
  }

  const start = () => {
    if (status.value === 'running') return

    const remaining =
      status.value === 'paused' && pausedRemaining.value !== null
        ? pausedRemaining.value
        : (timeLeft.value ?? currentDuration())

    endAt.value = Date.now() + remaining * 1000
    pausedRemaining.value = null
    status.value = 'running'
    timeLeft.value = remaining
    startTick()
  }

  const pause = () => {
    if (status.value !== 'running') return
    pausedRemaining.value = computeTimeLeft()
    timeLeft.value = pausedRemaining.value
    endAt.value = null
    status.value = 'paused'
    clearTick()
  }

  const reset = () => {
    clearTick()
    applyPhase(phase.value)
  }

  const skip = () => handlePhaseEnd()

  const switchPhase = (p: Phase) => {
    clearTick()
    applyPhase(p)
  }

  watch(
    () => currentDuration(),
    (d) => {
      if (status.value === 'idle') {
        total.value = d
        timeLeft.value = d
      }
    }
  )

  watch(
    () => settings.value.longBreakInterval,
    (interval) => {
      if (cycleCount.value > interval) cycleCount.value = interval
    }
  )

  onMounted(() => {
    total.value = currentDuration()

    if (status.value === 'running' && endAt.value) {
      const remaining = Math.ceil((endAt.value - Date.now()) / 1000)
      if (remaining <= 0) {
        handlePhaseEnd()
      } else {
        timeLeft.value = remaining
        startTick()
      }
    } else if (status.value === 'paused' && pausedRemaining.value !== null) {
      timeLeft.value = pausedRemaining.value
    } else {
      timeLeft.value = currentDuration()
    }
  })

  if (import.meta.client) {
    useEventListener(document, 'visibilitychange', () => {
      if (!document.hidden && status.value === 'running') tick()
    })
  }

  onUnmounted(clearTick)

  return {
    phase,
    status,
    timeLeft,
    total,
    cycleCount,
    start,
    pause,
    reset,
    skip,
    switchPhase
  }
}
