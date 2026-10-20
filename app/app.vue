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

const siteUrl = 'https://pmdr.abou.dev'
const siteName = 'Pmdr'
const title = 'Pmdr - Simple & Free Pomodoro Timer'
const ogImage = `${siteUrl}/og-image.png`
const description =
  'A minimalist, free online Pomodoro timer. Focus in 25-minute sessions with short and long breaks, sound alerts, notifications and dark mode. No account required.'

const pageTitle = computed(() => {
  if (!isRunning.value) return title
  const label = timer.phase.value === 'work' ? 'Time to focus!' : 'Break time'
  return `${formatTime(timer.timeLeft.value || 0)} - ${label}`
})

useSeoMeta({
  title: pageTitle,
  description,
  author: 'davidabou',
  robots: 'index, follow, max-image-preview:large',
  themeColor: [
    { content: '#ffffff', media: '(prefers-color-scheme: light)' },
    { content: '#0a0a0a', media: '(prefers-color-scheme: dark)' }
  ],
  applicationName: siteName,
  ogType: 'website',
  ogUrl: siteUrl,
  ogSiteName: siteName,
  ogLocale: 'en_US',
  ogTitle: title,
  ogDescription: description,
  ogImage,
  ogImageType: 'image/png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Pmdr - Simple Pomodoro Timer',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImage,
  twitterImageAlt: 'Pmdr - Simple Pomodoro Timer'
})

useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'canonical', href: siteUrl },
    { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: siteName,
        url: siteUrl,
        description,
        image: ogImage,
        applicationCategory: 'ProductivityApplication',
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript',
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        author: {
          '@type': 'Person',
          name: 'davidabou',
          url: 'https://github.com/davidabou'
        }
      })
    }
  ]
})
</script>

<template>
  <TooltipProvider :ignoreNonKeyboardFocus="true">
    <div>
      <header class="flex justify-between p-6">
        <h1 class="font-bold text-2xl select-none">
          pmdr<span class="sr-only"> - Simple Pomodoro Timer</span>
        </h1>

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

      <main class="flex flex-col w-full h-[calc(100vh-116px)]">
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

      <footer class="flex justify-center p-2.5">
        <p class="text-xs">
          <span class="opacity-50">Crafted with 🍅 by </span>
          <NuxtLink
            to="https://github.com/davidabou"
            class="underline opacity-50 transition-opacity hover:opacity-90"
            @click="play('select')"
            >@davidabou</NuxtLink
          >
          <span class="opacity-50"> · </span>
          <NuxtLink
            to="https://github.com/davidabou/pmdr"
            class="underline opacity-50 transition-opacity hover:opacity-90"
            @click="play('select')"
            >source</NuxtLink
          >
        </p>
      </footer>
    </div>
  </TooltipProvider>
</template>
