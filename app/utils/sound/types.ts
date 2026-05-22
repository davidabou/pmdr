export type SoundName =
  | 'click'
  | 'sheetOpen'
  | 'sheetClose'
  | 'switchOn'
  | 'switchOff'
  | 'select'
  | 'navigate'
  | 'success'
  | 'error'
  | 'ring'

export interface SoundOptions {
  volume?: number
  detune?: number
  playbackRate?: number
}

export interface ToneSpec {
  freq?: number
  type?: OscillatorType | 'noise'
  duration?: number
  delay?: number
  attack?: number
  release?: number
  gain?: number
  sweepTo?: number
  filterType?: BiquadFilterType
  filterFreq?: number
  filterQ?: number
}

export type SoundPreset = ToneSpec[]
