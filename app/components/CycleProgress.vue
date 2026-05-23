<script setup lang="ts">
interface Props {
  total: number
  current: number
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-center gap-2">
    <ClientOnly>
      <div
        v-for="i in total"
        :key="i"
        class="h-1.5 w-6 rounded-full transition-colors"
        :class="
          i <= current
            ? 'bg-neutral-800 dark:bg-neutral-100'
            : 'bg-neutral-300 dark:bg-neutral-800'
        "
      />
      <template #fallback>
        <div
          v-for="i in 4"
          :key="i"
          class="h-1.5 w-6 rounded-full bg-neutral-300 dark:bg-neutral-800"
        />
      </template>
    </ClientOnly>
  </div>
</template>
