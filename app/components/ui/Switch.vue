<script setup lang="ts">
const model = defineModel<boolean>({ required: true })

const props = defineProps<{
  id?: string
  label?: string
  description?: string
  class?: any
}>()

const emits = defineEmits<{
  change: [payload: boolean]
}>()

const { play } = useSound()

function handleChange(val: boolean) {
  val ? play('switchOn') : play('switchOff')
  emits('change', val)
}
</script>

<template>
  <Label :for="props.id" class="flex items-center">
    <div v-if="props.label || props.description" class="flex flex-col flex-1">
      <span v-if="props.label" class="font-semibold text-sm">{{
        props.label
      }}</span>
      <span v-if="props.description" class="text-xs text-neutral-500">{{
        props.description
      }}</span>
    </div>

    <SwitchRoot
      v-model="model"
      :id="props.id"
      class="w-10 h-5 rounded-full bg-neutral-100 shrink-0 cursor-pointer transition-colors data-[state=checked]:bg-neutral-800"
      @update:model-value="handleChange"
    >
      <SwitchThumb
        class="block w-5.5 h-4 rounded-full bg-white shadow transition-transform translate-x-0.5 will-change-transform data-[state=checked]:translate-x-4"
      />
    </SwitchRoot>
  </Label>
</template>
