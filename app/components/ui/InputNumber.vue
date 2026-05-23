<script setup lang="ts">
const model = defineModel<number>({ required: true })

const props = defineProps<{
  id?: string
  min?: number
  max?: number
  step?: number
  class?: any
}>()

const emits = defineEmits<{
  change: [value: number | undefined]
}>()

const { play } = useSound()

const handleChange = (val: number) => {
  play('click')
  emits('change', val)
}
</script>

<template>
  <NumberFieldRoot
    v-bind="props"
    v-model="model"
    class="flex items-center rounded-xl bg-neutral-100 dark:bg-neutral-900"
    @update:model-value="handleChange"
  >
    <NumberFieldDecrement as-child>
      <UiButton
        variant="secondary"
        :sound="false"
        class="size-8 rounded-e-none border-r border-neutral-200 dark:border-neutral-800"
      >
        <Icon name="gravity-ui:minus" size="14" class="shrink-0" />
      </UiButton>
    </NumberFieldDecrement>

    <NumberFieldInput
      ref="input"
      :style="{ fontKerning: 'none' }"
      class="w-full h-8 font-semibold text-center text-sm tabular-nums bg-neutral-100 dark:bg-neutral-900 focus:outline-none transition-colors"
    />

    <NumberFieldIncrement as-child>
      <UiButton
        variant="secondary"
        :sound="false"
        class="size-8 rounded-s-none border-l border-neutral-200 dark:border-neutral-800"
      >
        <Icon name="gravity-ui:plus" size="14" class="shrink-0" />
      </UiButton>
    </NumberFieldIncrement>
  </NumberFieldRoot>
</template>
