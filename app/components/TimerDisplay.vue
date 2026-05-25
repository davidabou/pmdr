<script setup lang="ts">
import NumberFlow, { type Format } from '@number-flow/vue'

const props = defineProps<{ seconds: number }>()

const minutes = computed(() => Math.floor(props.seconds / 60))
const seconds = computed(() => props.seconds % 60)

const format = { minimumIntegerDigits: 2 } satisfies Format
</script>

<template>
  <div
    class="tabular-nums font-semibold text-8xl sm:text-9xl text-neutral-800 dark:text-white"
  >
    <NumberFlow :value="minutes" :format="format" />
    <span>:</span>
    <NumberFlow
      :value="seconds"
      :format="format"
      :trend="-1"
      :digits="{ 1: { max: 5 } }"
    />
  </div>
</template>
