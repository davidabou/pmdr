<script setup lang="ts">
import { tv, type VariantProps } from 'tailwind-variants'
import type { SoundName } from '~/utils/sound/types'

const props = withDefaults(
  defineProps<{
    variant?: VariantProps<typeof button>['variant']
    disabled?: boolean
    sound?: SoundName | false
    class?: any
  }>(),
  {
    variant: 'primary',
    sound: 'click'
  }
)

const { play } = useSound()

const emits = defineEmits<{
  click: [payload: PointerEvent]
}>()

const button = tv({
  base: 'flex items-center justify-center font-semibold rounded-xl px-4 h-8 cursor-pointer transition-[color,background-color,scale] active:scale-97 disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    variant: {
      primary:
        'bg-neutral-800 text-white hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-800 dark:hover:bg-neutral-200',
      secondary:
        'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800',
      ghost: 'bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
})

function handleClick(event: PointerEvent) {
  if (props.sound && !props.disabled) play(props.sound)
  emits('click', event)
}
</script>

<template>
  <Primitive
    as="button"
    :disabled="props.disabled"
    :class="button({ variant: props.variant, class: props.class })"
    @click="handleClick"
  >
    <slot />
  </Primitive>
</template>
