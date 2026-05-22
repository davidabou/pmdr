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
  <UiButton variant="ghost" :sound="false" @click="handleClick">
    <AudioWave :animate="enabled" />
  </UiButton>
</template>
