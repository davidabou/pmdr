<script setup lang="ts">
const colorMode = useColorMode()
const { play } = useSound()

const nextTheme = computed(() =>
  colorMode.value === 'dark' ? 'light' : 'dark'
)

const themeButton = useTemplateRef('themeButton')

const switchTheme = () => {
  colorMode.preference = nextTheme.value
}

const triggerTransition = (event?: MouseEvent) => {
  if (!document.startViewTransition) {
    switchTheme()
    return
  }

  let x: number, y: number

  if (event) {
    x = event.clientX
    y = event.clientY
  } else {
    const el = themeButton.value?.$el as HTMLElement | undefined
    if (el) {
      const rect = el.getBoundingClientRect()
      x = rect.left + rect.width / 2
      y = rect.top + rect.height / 2
    } else {
      switchTheme()
      return
    }
  }

  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  const transition = document.startViewTransition(() => {
    switchTheme()
  })

  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ]
      },
      {
        duration: 600,
        easing: 'cubic-bezier(.76,.32,.29,.99)',
        pseudoElement: '::view-transition-new(root)'
      }
    )
  })
}
</script>

<template>
  <UiTooltip :text="`Switch to ${nextTheme} mode`">
    <UiButton
      ref="themeButton"
      variant="ghost"
      sound="switchOn"
      class="size-8"
      :aria-label="`Switch to ${nextTheme} mode`"
      @click="triggerTransition"
    >
      <ClientOnly>
        <AnimatePresence mode="popLayout" :initial="false">
          <Motion
            :key="colorMode.value"
            as="span"
            :initial="{ rotate: -90, opacity: 0, scale: 0.5 }"
            :animate="{ rotate: 0, opacity: 1, scale: 1 }"
            :exit="{ rotate: 90, opacity: 0, scale: 0.5 }"
            :transition="{ duration: 0.35, ease: [0.76, 0.32, 0.29, 0.99] }"
            class="inline-flex items-center justify-center"
          >
            <Icon
              v-if="colorMode.value === 'light'"
              name="gravity-ui:sun"
              class="shrink-0"
            />
            <Icon v-else name="gravity-ui:moon" class="shrink-0" />
          </Motion>
        </AnimatePresence>
      </ClientOnly>
    </UiButton>
  </UiTooltip>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-new(root) {
  z-index: 9999;
}
::view-transition-old(root) {
  z-index: 1;
}
</style>
