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

export function usePhaseNotifications() {
  const { settings } = useSettings()
  const { play } = useSound()
  const { isSupported, show } = useWebNotification()

  const phaseDuration = (phase: Phase): number => settings.value[phase]

  const notify = (next: Phase) => {
    if (!settings.value.notifications || !isSupported.value) return

    const copy = next === 'work' ? PHASE_COPY.work : PHASE_COPY.break
    show({
      title: copy.title,
      body: copy.body(phaseDuration(next)),
      vibrate: [200, 100, 200]
    })
  }

  const onPhaseEnd = (_finished: Phase, next: Phase) => {
    if (settings.value.ringtone) play('ring')
    notify(next)
  }

  return { onPhaseEnd }
}
