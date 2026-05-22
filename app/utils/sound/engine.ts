let ctx: AudioContext | null = null
let masterGain: GainNode | null = null

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (ctx) return ctx

  const AC = window.AudioContext || (window as any).webkitAudioContext
  if (!AC) return null

  ctx = new AC()
  masterGain = ctx.createGain()
  masterGain.gain.value = 0.5
  masterGain.connect(ctx.destination)
  return ctx
}

export function getMasterGain(): GainNode | null {
  if (!ctx) getAudioContext()
  return masterGain
}

export async function resumeContext(): Promise<void> {
  const c = getAudioContext()
  if (c?.state === 'suspended') await c.resume()
}

export function setMasterVolume(value: number): void {
  const g = getMasterGain()
  if (g) g.gain.value = Math.max(0, Math.min(1, value))
}
