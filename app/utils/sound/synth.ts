import type { ToneSpec } from './types'
import { getAudioContext, getMasterGain } from './engine'

function createNoiseBuffer(ctx: AudioContext, duration: number): AudioBuffer {
  const length = Math.max(1, Math.floor(ctx.sampleRate * duration))
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1
  }
  return buffer
}

export function playTone(
  spec: ToneSpec,
  baseTime?: number,
  volumeMul = 1
): void {
  const ctx = getAudioContext()
  const master = getMasterGain()
  if (!ctx || !master) return

  const {
    freq = 440,
    type = 'sine',
    duration = 0.15,
    delay = 0,
    attack = 0.005,
    release = 0.1,
    gain = 0.3,
    sweepTo,
    filterType = 'bandpass',
    filterFreq = 2000,
    filterQ = 1
  } = spec

  const start = (baseTime ?? ctx.currentTime) + delay
  const end = start + duration
  const peak = Math.max(0.0001, gain * volumeMul)

  // Enveloppe ADSR commune
  const env = ctx.createGain()
  env.gain.setValueAtTime(0.0001, start)
  env.gain.exponentialRampToValueAtTime(peak, start + attack)
  env.gain.exponentialRampToValueAtTime(0.0001, end + release)
  env.connect(master)

  if (type === 'noise') {
    const noise = ctx.createBufferSource()
    noise.buffer = createNoiseBuffer(ctx, duration + release)

    const filter = ctx.createBiquadFilter()
    filter.type = filterType
    filter.frequency.value = filterFreq
    filter.Q.value = filterQ

    noise.connect(filter).connect(env)
    noise.start(start)
    noise.stop(end + release + 0.02)
  } else {
    const osc = ctx.createOscillator()
    osc.type = type
    osc.frequency.setValueAtTime(freq, start)
    if (sweepTo !== undefined) {
      osc.frequency.exponentialRampToValueAtTime(sweepTo, end)
    }
    osc.connect(env)
    osc.start(start)
    osc.stop(end + release + 0.02)
  }
}
