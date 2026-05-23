<script setup lang="ts">
import { cn } from 'tailwind-variants'

const props = withDefaults(
  defineProps<{
    animate?: boolean
    barCount?: number
    class?: any
  }>(),
  {
    animate: true,
    barCount: 4
  }
)

const heights = ref<number[]>(Array(props.barCount).fill(30))
let intervalId: ReturnType<typeof setInterval> | null = null

const randomizeHeights = () => {
  heights.value = heights.value.map(() => Math.floor(Math.random() * 80) + 30)
}

const startAnimation = () => {
  if (intervalId) clearInterval(intervalId)
  randomizeHeights()

  intervalId = setInterval(randomizeHeights, 350)
}

const stopAnimation = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }

  heights.value = heights.value.map(() => 30)
}

watch(
  () => props.animate,
  (isAnimating) => {
    if (isAnimating) {
      startAnimation()
    } else {
      stopAnimation()
    }
  }
)

onMounted(() => {
  if (props.animate) {
    startAnimation()
  }
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <div :class="cn('flex items-center gap-0.5 h-4', props.class)">
    <Motion
      v-for="i in barCount"
      :key="i"
      class="w-0.5 rounded-full bg-neutral-700 dark:bg-neutral-100"
      :animate="{ height: `${heights[i - 1]}%` }"
      :transition="{
        type: 'spring',
        stiffness: 250,
        damping: 15,
        mass: 0.8
      }"
    />
  </div>
</template>
