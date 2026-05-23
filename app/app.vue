<script setup lang="ts">
const { settings, update, applyPreset } = useSettings()
const { play } = useSound()
const { isSupported, permissionGranted, ensurePermissions, show } =
  useWebNotification()

const requestNotifications = async () => {
  await ensurePermissions()
  update({ notifications: permissionGranted.value })
}

const onPhaseEnd = createPhaseEndHandler({ settings, isSupported, play, show })
const timer = useTimer({ settings, onPhaseEnd })

const isRunning = computed(() => timer.status.value === 'running')
const isPristine = computed(() => timer.timeLeft.value === timer.total.value)

const cycleProgress = computed(() =>
  timer.phase.value === 'longBreak'
    ? settings.value.longBreakInterval
    : timer.cycleCount.value
)

const toggleTimer = () => (isRunning.value ? timer.pause() : timer.start())

useHead({
  title: computed(() => {
    if (!isRunning.value) return 'pmdr'
    const label = timer.phase.value === 'work' ? 'Time to focus!' : 'Break time'
    return `${formatTime(timer.timeLeft.value || 0)} - ${label}`
  })
})
</script>

<template>
  <TooltipProvider :ignoreNonKeyboardFocus="true">
    <div>
      <header class="flex justify-between p-6">
        <span class="font-bold text-2xl">pmdr</span>

        <div class="flex items-center gap-2">
          <ThemeToggler />
          <SoundToggle />
          <SettingsSheet
            :settings="settings"
            :update="update"
            :apply-preset="applyPreset"
            :request-notifications="requestNotifications"
          />
        </div>
      </header>

      <main class="flex flex-col w-full h-[calc(100vh-5rem)]">
        <div class="flex flex-col items-center space-y-16 my-auto pb-20">
          <div class="flex flex-col items-center space-y-4">
            <ClientOnly>
              <PhaseNav :value="timer.phase.value" :timer="timer" />
              <template #fallback>
                <PhaseNav value="work" :timer="timer" />
              </template>
            </ClientOnly>

            <TimerDisplay :seconds="Number(timer.timeLeft.value || 0)" />

            <TimerControls
              :is-running="isRunning"
              :is-pristine="isPristine"
              @reset="timer.reset()"
              @toggle="toggleTimer"
              @skip="timer.skip()"
            />
          </div>

          <CycleProgress
            :total="settings.longBreakInterval"
            :current="cycleProgress"
          />
        </div>
      </main>
    </div>
  </TooltipProvider>
</template>
