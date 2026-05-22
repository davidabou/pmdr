import { useStorage } from '@vueuse/core'
import type { SoundName, SoundOptions } from '@/utils/sound/types'
import {
  getAudioContext,
  resumeContext,
  setMasterVolume
} from '@/utils/sound/engine'
import { playTone } from '@/utils/sound/synth'
import { presets } from '@/utils/sound/presets'

const KEY = 'pomodoro:sound'

interface SoundPrefs {
  enabled: boolean
  volume: number
}

const DEFAULT_PREFS: SoundPrefs = {
  enabled: true,
  volume: 0.5
}

export function useSound() {
  const prefs = useStorage<SoundPrefs>(KEY, DEFAULT_PREFS, undefined, {
    mergeDefaults: true
  })

  if (import.meta.client) {
    setMasterVolume(prefs.value.volume)
  }

  async function play(
    name: SoundName,
    options: SoundOptions = {}
  ): Promise<void> {
    if (!prefs.value.enabled) return

    const ctx = getAudioContext()
    if (!ctx) return

    await resumeContext()

    const preset = presets[name]
    if (!preset) return

    const base = ctx.currentTime
    const vol = options.volume ?? 1
    preset.forEach((spec) => playTone(spec, base, vol))
  }

  function setEnabled(value: boolean): void {
    prefs.value.enabled = value
  }

  function setVolume(value: number): void {
    const v = Math.max(0, Math.min(1, value))
    prefs.value.volume = v
    setMasterVolume(v)
  }

  function toggle(): void {
    setEnabled(!prefs.value.enabled)
  }

  return {
    play,
    toggle,
    setEnabled,
    setVolume,
    enabled: computed(() => prefs.value.enabled),
    volume: computed(() => prefs.value.volume)
  }
}
