import type { SoundName, SoundPreset } from './types'

export const presets: Record<SoundName, SoundPreset> = {
  click: [
    {
      type: 'noise',
      duration: 0.012,
      gain: 0.22,
      attack: 0.0005,
      release: 0.018,
      filterType: 'bandpass',
      filterFreq: 3000,
      filterQ: 1.8
    },
    {
      freq: 1568, // G6
      type: 'sine',
      duration: 0.035,
      gain: 0.12,
      attack: 0.001,
      release: 0.04,
      filterType: 'lowpass',
      filterFreq: 4000,
      filterQ: 0.7
    }
  ],
  sheetOpen: [
    {
      freq: 600,
      sweepTo: 1100,
      type: 'sine',
      duration: 0.2,
      gain: 0.14,
      attack: 0.005,
      release: 0.08
    }
  ],
  sheetClose: [
    {
      freq: 1100,
      sweepTo: 600,
      type: 'sine',
      duration: 0.2,
      gain: 0.14,
      attack: 0.005,
      release: 0.08
    }
  ],
  switchOn: [
    {
      type: 'noise',
      duration: 0.008,
      gain: 0.22,
      attack: 0.0005,
      release: 0.015,
      filterType: 'bandpass',
      filterFreq: 3500,
      filterQ: 2
    },
    {
      freq: 1400,
      type: 'sine',
      duration: 0.025,
      delay: 0.04,
      gain: 0.16,
      attack: 0.001,
      release: 0.04
    }
  ],
  switchOff: [
    {
      type: 'noise',
      duration: 0.008,
      gain: 0.22,
      attack: 0.0005,
      release: 0.015,
      filterType: 'bandpass',
      filterFreq: 3500,
      filterQ: 2
    },
    {
      freq: 900,
      type: 'sine',
      duration: 0.025,
      delay: 0.04,
      gain: 0.16,
      attack: 0.001,
      release: 0.04
    }
  ],
  select: [
    {
      type: 'noise',
      duration: 0.01,
      gain: 0.18,
      attack: 0.0005,
      release: 0.014,
      filterType: 'bandpass',
      filterFreq: 3500,
      filterQ: 2
    },
    {
      freq: 1046, // C6
      type: 'sine',
      duration: 0.06,
      gain: 0.18,
      attack: 0.001,
      release: 0.07,
      filterType: 'lowpass',
      filterFreq: 5000,
      filterQ: 0.7
    },
    {
      freq: 1568, // G6 — quinte juste, sonorité positive
      type: 'sine',
      duration: 0.07,
      gain: 0.16,
      attack: 0.001,
      release: 0.08,
      delay: 0.045,
      filterType: 'lowpass',
      filterFreq: 5500,
      filterQ: 0.7
    }
  ],
  navigate: [
    // Micro-transitoire (le "détachement" de l'onglet précédent)
    {
      type: 'noise',
      duration: 0.018,
      gain: 0.12,
      attack: 0.001,
      release: 0.018,
      filterType: 'bandpass',
      filterFreq: 4000,
      filterQ: 1.5
    },
    {
      freq: 1175, // D6
      sweepTo: 1760, // A6
      type: 'sine',
      duration: 0.08,
      gain: 0.15,
      attack: 0.002,
      release: 0.06,
      delay: 0.005,
      filterType: 'lowpass',
      filterFreq: 5000,
      filterQ: 0.7
    },
    {
      freq: 2349, // D7
      type: 'sine',
      duration: 0.05,
      gain: 0.05,
      attack: 0.003,
      release: 0.045,
      delay: 0.025
    }
  ],
  success: [
    {
      freq: 880,
      type: 'sine',
      duration: 0.06,
      gain: 0.16,
      attack: 0.002,
      release: 0.08
    },
    {
      freq: 1175,
      type: 'sine',
      duration: 0.06,
      gain: 0.16,
      attack: 0.002,
      release: 0.08,
      delay: 0.07
    },
    {
      freq: 1568,
      type: 'sine',
      duration: 0.1,
      gain: 0.16,
      attack: 0.002,
      release: 0.12,
      delay: 0.14
    }
  ],
  error: [
    {
      freq: 440,
      type: 'sine',
      duration: 0.08,
      gain: 0.18,
      attack: 0.002,
      release: 0.08
    },
    {
      freq: 330,
      type: 'sine',
      duration: 0.12,
      gain: 0.18,
      attack: 0.002,
      release: 0.1,
      delay: 0.08
    }
  ],
  ring: [
    {
      freq: 1047,
      type: 'sine',
      duration: 0.12,
      gain: 0.18,
      attack: 0.003,
      release: 0.1
    },
    {
      freq: 2093,
      type: 'sine',
      duration: 0.1,
      gain: 0.05,
      attack: 0.003,
      release: 0.09
    },
    {
      freq: 1318,
      type: 'sine',
      duration: 0.12,
      gain: 0.18,
      attack: 0.003,
      release: 0.1,
      delay: 0.11
    },
    {
      freq: 2637,
      type: 'sine',
      duration: 0.1,
      gain: 0.05,
      attack: 0.003,
      release: 0.09,
      delay: 0.11
    },
    {
      freq: 1568,
      type: 'sine',
      duration: 0.12,
      gain: 0.18,
      attack: 0.003,
      release: 0.1,
      delay: 0.22
    },
    {
      freq: 3136,
      type: 'sine',
      duration: 0.1,
      gain: 0.05,
      attack: 0.003,
      release: 0.09,
      delay: 0.22
    },
    {
      freq: 2093,
      type: 'sine',
      duration: 0.35,
      gain: 0.2,
      attack: 0.003,
      release: 0.32,
      delay: 0.33
    }
  ]
}
