<script setup lang="ts">
import type { VNode } from 'vue'

const props = defineProps<{
  title?: string
  tooltip?: string
  class?: any
}>()

const slots = defineSlots<{
  default(): VNode[]
  body(): VNode[]
}>()

const open = ref(false)

const { play } = useSound()

watch(open, (newVal) => {
  newVal ? play('sheetOpen') : play('sheetClose')
})
</script>

<template>
  <DialogRoot v-model:open="open">
    <UiTooltip v-if="props.tooltip" :text="props.tooltip">
      <DialogTrigger as-child :class="props.class">
        <slot :open="open" />
      </DialogTrigger>
    </UiTooltip>
    <DialogTrigger v-else as-child :class="props.class">
      <slot :open="open" />
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay
        class="fixed z-50 inset-0 bg-neutral-200/75 dark:bg-neutral-900/75 backdrop-blur-xs data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]"
      />

      <AnimatePresence>
        <DialogContent
          class="fixed z-50 flex flex-col p-4 sm:p-6 max-w-md w-full inset-y-0 right-0 rounded-s-3xl bg-white dark:bg-neutral-950 will-change-transform focus:outline-none data-[state=open]:animate-[slide-in-from-right_500ms_cubic-bezier(0.32,0.72,0,1)] data-[state=closed]:animate-[slide-out-to-right_500ms_cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none"
        >
          <div class="flex items-center gap-1.5">
            <DialogTitle
              class="font-semibold text-2xl text-neutral-800 dark:text-neutral-100"
            >
              {{ props.title }}
            </DialogTitle>
            <DialogClose as-child class="absolute top-6 inset-e-6">
              <UiButton variant="ghost" :sound="false" class="size-8">
                <Icon name="gravity-ui:xmark" class="shrink-0" />
              </UiButton>
            </DialogClose>
          </div>

          <div class="flex-1 overflow-y-auto mt-6">
            <slot name="body" />
          </div>
        </DialogContent>
      </AnimatePresence>
    </DialogPortal>
  </DialogRoot>
</template>
