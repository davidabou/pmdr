import type { WebNotificationOptions } from '@vueuse/core'
import type { SoundName } from './sound/types'

const PHASE_COPY = {
  work: {
    title: 'Time to focus!',
    body: (m: number) =>
      `Get back to work and focus for ${pluralize(m, 'minute')} 💪`
  },
  break: {
    title: 'Take a break',
    body: (m: number) => `You can relax for ${pluralize(m, 'minute')} 😮‍💨`
  }
} as const

interface PhaseEndHandlerDeps {
  settings: Ref<Settings>
  isSupported: Ref<boolean>
  play: (name: SoundName) => void
  show: (options: WebNotificationOptions) => void
}

export function createPhaseEndHandler(deps: PhaseEndHandlerDeps) {
  return (_finished: Phase, next: Phase) => {
    const { settings, isSupported, play, show } = deps

    if (settings.value.ringtone) play('ring')
    if (!settings.value.notifications || !isSupported.value) return

    const copy = next === 'work' ? PHASE_COPY.work : PHASE_COPY.break
    show({
      title: copy.title,
      body: copy.body(settings.value[next]),
      vibrate: [200, 100, 200]
    })
  }
}
