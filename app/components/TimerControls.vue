<script setup lang="ts">
interface Props {
  isRunning: boolean
  isPristine: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  reset: []
  toggle: []
  skip: []
}>()

const label = computed(() => {
  if (props.isRunning) return 'Pause'
  return props.isPristine ? 'Start' : 'Resume'
})
</script>

<template>
  <div class="flex items-center gap-4">
    <UiButton
      variant="ghost"
      class="size-10 rounded-2xl"
      @click="emit('reset')"
    >
      <Icon name="gravity-ui:arrow-uturn-ccw-left" class="shrink-0" />
    </UiButton>

    <UiButton
      variant="primary"
      class="gap-2 h-14 px-6 rounded-3xl"
      @click="emit('toggle')"
    >
      <ClientOnly>
        <Icon
          :name="isRunning ? 'gravity-ui:pause-fill' : 'gravity-ui:play-fill'"
          class="shrink-0"
        />
        <template #fallback>
          <Icon name="gravity-ui:play-fill" class="shrink-0" />
        </template>
      </ClientOnly>
      <TextMorph :text="label" />
    </UiButton>

    <UiButton variant="ghost" class="size-10 rounded-2xl" @click="emit('skip')">
      <Icon name="gravity-ui:forward-step" class="shrink-0" />
    </UiButton>
  </div>
</template>
