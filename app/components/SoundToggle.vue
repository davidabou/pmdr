<script setup lang="ts">
const { play, enabled, toggle } = useSound()

const handleClick = () => {
  if (enabled.value) {
    play('switchOff')
    toggle()
  } else {
    toggle()
    play('switchOn')
  }
}
</script>

<template>
  <UiTooltip :text="enabled ? 'Disable sounds' : 'Enable sounds'">
    <UiButton
      variant="ghost"
      :sound="false"
      class="size-8"
      @click="handleClick"
    >
      <AudioWave :animate="enabled" />
    </UiButton>
  </UiTooltip>
</template>
