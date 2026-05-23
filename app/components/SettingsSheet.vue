<script setup lang="ts">
const props = defineProps<{
  settings: Settings
  update: (p: Partial<Settings>) => void
  applyPreset: (k: PresetKey) => void
  requestNotifications: () => void
}>()

const PRESET_OPTS: { value: PresetKey; label: string; meta: string }[] = [
  { value: 'classic', label: 'Classic', meta: '25 · 5 · 15' },
  { value: 'short', label: 'Sprint', meta: '15 · 3 · 10' },
  { value: 'long', label: 'Deep work', meta: '50 · 10 · 20' },
  { value: 'custom', label: 'Custom', meta: 'your own' }
]

const { play } = useSound()
const { isSupported } = useWebNotification()
</script>

<template>
  <UiSheet title="Settings" tooltip="Settings">
    <UiButton variant="ghost" :sound="false" class="size-8">
      <Icon name="gravity-ui:sliders" class="shrink-0" />
    </UiButton>

    <template #body>
      <div class="space-y-6">
        <section>
          <span class="uppercase text-xs text-neutral-500">Preset</span>
          <div class="grid grid-cols-2 gap-2 mt-2">
            <button
              v-for="p in PRESET_OPTS"
              :key="p.value"
              :class="[
                'rounded-2xl p-4 text-left cursor-pointer transition-[color,background-color,scale] active:scale-97',
                props.settings.preset === p.value
                  ? 'bg-neutral-800 dark:bg-neutral-100'
                  : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800'
              ]"
              @click="
                () => {
                  play('select')
                  applyPreset(p.value)
                }
              "
            >
              <div
                :class="[
                  'font-semibold text-sm',
                  props.settings.preset === p.value
                    ? 'text-white dark:text-neutral-800'
                    : 'text-neutral-700 dark:text-neutral-300'
                ]"
              >
                {{ p.label }}
              </div>
              <div
                :class="[
                  'text-xs',
                  props.settings.preset === p.value
                    ? 'text-neutral-300 dark:text-neutral-500'
                    : 'text-neutral-500'
                ]"
              >
                {{ p.meta }}
              </div>
            </button>
          </div>
        </section>

        <section class="space-y-2">
          <span class="uppercase text-xs text-neutral-500"
            >Custom durations (minutes)</span
          >
          <div class="grid grid-cols-3 gap-2 mt-2">
            <div
              v-for="k in ['work', 'shortBreak', 'longBreak'] as const"
              :key="k"
            >
              <Label :for="k" class="text-xs font-semibold">
                {{
                  k === 'work' ? 'Focus' : k === 'shortBreak' ? 'Pause' : 'Long'
                }}
              </Label>
              <UiInputNumber
                v-model="settings[k]"
                :id="k"
                :min="1"
                :max="180"
                class="mt-1"
                @change="
                  (v) =>
                    update({ [k]: Math.max(1, +v! || 1), preset: 'custom' })
                "
              />
            </div>
          </div>

          <div>
            <Label for="longBreakInterval" class="text-xs font-semibold"
              >Long break every N pomodori</Label
            >
            <UiInputNumber
              v-model="settings.longBreakInterval"
              :min="2"
              :max="12"
              id="longBreakInterval"
              class="mt-1"
              @change="
                (v) => update({ longBreakInterval: Math.max(2, +v! || 4) })
              "
            />
          </div>
        </section>

        <section>
          <span class="uppercase text-xs text-neutral-500">Behavior</span>
          <div class="space-y-2 mt-2">
            <UiSwitch
              v-model="settings.autoStart"
              label="Automatic sequence"
              description="Automatically launches the next phase"
              @change="(v) => update({ autoStart: v })"
            />
            <UiSwitch
              v-model="settings.ringtone"
              label="Ringtone"
              description="Plays a sound when a phase ends"
              @change="(v) => update({ ringtone: v })"
            />
            <UiSwitch
              v-if="isSupported"
              v-model="settings.notifications"
              label="Notifications"
              description="Browser alerts"
              @change="
                (v) => {
                  if (v) requestNotifications()
                  else update({ notifications: false })
                }
              "
            />
          </div>
        </section>
      </div>
    </template>
  </UiSheet>
</template>
