<script setup lang="ts">
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <TooltipRoot>
    <TooltipTrigger as-child>
      <slot />
    </TooltipTrigger>

    <AnimatePresence>
      <TooltipPortal>
        <TooltipContent as-child :side-offset="4">
          <Motion
            :initial="{ opacity: 0, scale: 0.75 }"
            :animate="{ opacity: 1, scale: 1 }"
            :exit="{ opacity: 0, scale: 0.75 }"
            :transition="{ type: 'spring', stiffness: 500, damping: 30 }"
            class="flex items-center gap-1 rounded-xl h-8 px-3 py-1 text-xs text-neutral-100 dark:text-neutral-800 bg-neutral-700 dark:bg-neutral-200 select-none origin-(--reka-tooltip-content-transform-origin) pointer-events-auto"
          >
            <span>{{ text }}</span>
            <TooltipArrow as-child :width="20" :height="10">
              <svg
                width="20"
                height="10"
                viewBox="0 0 20 10"
                class="fill-neutral-700 dark:fill-neutral-200"
              >
                <path d="M0 0 Q5 0 7.5 3.5 Q10 7 12.5 3.5 Q15 0 20 0 Z" />
              </svg>
            </TooltipArrow>
          </Motion>
        </TooltipContent>
      </TooltipPortal>
    </AnimatePresence>
  </TooltipRoot>
</template>
