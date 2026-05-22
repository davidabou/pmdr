import { useStorage } from '@vueuse/core'

export type Phase = 'work' | 'shortBreak' | 'longBreak'
export type PresetKey = 'classic' | 'short' | 'long' | 'custom'

export interface Settings {
  preset: PresetKey
  work: number
  shortBreak: number
  longBreak: number
  longBreakInterval: number
  autoStart: boolean
  ringtone: boolean
  notifications: boolean
}

export const PRESETS: Record<
  Exclude<PresetKey, 'custom'>,
  Omit<
    Settings,
    'preset' | 'autoStart' | 'ringtone' | 'notifications' | 'longBreakInterval'
  >
> = {
  classic: { work: 25, shortBreak: 5, longBreak: 15 },
  short: { work: 15, shortBreak: 3, longBreak: 10 },
  long: { work: 50, shortBreak: 10, longBreak: 20 }
}

const DEFAULT: Settings = {
  preset: 'classic',
  ...PRESETS.classic,
  longBreakInterval: 4,
  autoStart: false,
  ringtone: true,
  notifications: true
}

function detectPreset(
  s: Pick<Settings, 'work' | 'shortBreak' | 'longBreak'>
): PresetKey {
  const found = (Object.keys(PRESETS) as Exclude<PresetKey, 'custom'>[]).find(
    (k) =>
      PRESETS[k].work === s.work &&
      PRESETS[k].shortBreak === s.shortBreak &&
      PRESETS[k].longBreak === s.longBreak
  )

  return found ?? 'custom'
}

const KEY = 'pomodoro:settings'

export function useSettings() {
  const settings = useStorage(KEY, { ...DEFAULT }, undefined, {
    mergeDefaults: true
  })

  const update = (patch: Partial<Settings>) => {
    const next = { ...settings.value, ...patch }

    next.preset = detectPreset(next)
    settings.value = next
  }

  const applyPreset = (k: PresetKey) => {
    if (k === 'custom') {
      settings.value = { ...settings.value, preset: 'custom' }
      return
    }
    settings.value = { ...settings.value, ...PRESETS[k], preset: k }
  }

  return { settings, update, applyPreset }
}
