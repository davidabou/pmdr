<script setup lang="ts">
const props = defineProps<{
  value: Phase
  timer: ReturnType<typeof useTimer>
}>()

const { play } = useSound()

const handleSwitch = (phase: Phase) => {
  play('navigate')
  props.timer.switchPhase(phase)
}
</script>

<template>
  <TabsRoot
    :model-value="value"
    :default-value="value"
    @update:model-value="handleSwitch"
  >
    <TabsList class="relative flex p-1 rounded-2xl bg-neutral-100 shrink-0">
      <TabsIndicator
        class="absolute inset-x-0 inset-y-1 w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position) rounded-xl transition-[width,translate] duration-300"
      >
        <div class="rounded-xl w-full h-full bg-neutral-800" />
      </TabsIndicator>

      <TabsTrigger
        v-for="p in ['work', 'shortBreak', 'longBreak'] as Phase[]"
        :key="p"
        :value="p"
        class="z-1 px-4 py-1.5 font-semibold text-sm rounded-xl cursor-pointer transition-[color,scale] active:scale-97 data-[state=active]:text-white data-[state=inactive]:hover:text-neutral-500"
      >
        {{
          p === 'work' ? 'Focus' : p === 'shortBreak' ? 'Break' : 'Long break'
        }}
      </TabsTrigger>
    </TabsList>
  </TabsRoot>
</template>
