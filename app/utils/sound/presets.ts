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

// import type { SoundName, SoundPreset } from './types'

// export const presets: Record<SoundName, SoundPreset> = {
//   // Action de base : tap sur un bouton — court, tactile, neutre
//   click: [
//     {
//       type: 'noise',
//       duration: 0.012,
//       gain: 0.22,
//       attack: 0.0005,
//       release: 0.018,
//       filterType: 'bandpass',
//       filterFreq: 3000,
//       filterQ: 1.8,
//     },
//     {
//       freq: 1568, // G6
//       type: 'sine',
//       duration: 0.035,
//       gain: 0.12,
//       attack: 0.001,
//       release: 0.04,
//       filterType: 'lowpass',
//       filterFreq: 4000,
//       filterQ: 0.7,
//     },
//   ],

//   // Ouverture de panneau : mouvement ascendant, doux et aéré
//   sheetOpen: [
//     // Note de ponctuation : C5 stable, douce, en fond
//     {
//       freq: 523, // C5
//       type: 'sine',
//       duration: 0.25,
//       gain: 0.08,
//       attack: 0.05,
//       release: 0.2,
//       delay: 0.02,
//       filterType: 'lowpass',
//       filterFreq: 2500,
//       filterQ: 0.7,
//     },
//     // Harmonique discrète pour la brillance finale
//     {
//       freq: 1046, // C6
//       type: 'sine',
//       duration: 0.18,
//       gain: 0.04,
//       attack: 0.08,
//       release: 0.15,
//       delay: 0.06,
//     },
//   ],

//   // Fermeture : whoosh descendant + note stable G4 qui s'éteint
//   sheetClose: [
//     // Note de ponctuation : G4, plus grave que sheetOpen pour signifier "fermé/posé"
//     {
//       freq: 392, // G4
//       type: 'sine',
//       duration: 0.22,
//       gain: 0.08,
//       attack: 0.015,
//       release: 0.21,
//       delay: 0.01,
//       filterType: 'lowpass',
//       filterFreq: 2000,
//       filterQ: 0.7,
//     },
//     // Harmonique douce qui s'éteint
//     {
//       freq: 784, // G5
//       type: 'sine',
//       duration: 0.15,
//       gain: 0.03,
//       attack: 0.02,
//       release: 0.14,
//       delay: 0.01,
//     },
//   ],

//   // Switch ON : tactile + petit "ping" ascendant clair
//   switchOn: [
//     {
//       type: 'noise',
//       duration: 0.01,
//       gain: 0.26,
//       attack: 0.0005,
//       release: 0.015,
//       filterType: 'bandpass',
//       filterFreq: 3200,
//       filterQ: 2,
//     },
//     {
//       freq: 1318, // E6
//       type: 'sine',
//       duration: 0.05,
//       gain: 0.16,
//       attack: 0.001,
//       release: 0.06,
//       delay: 0.012,
//       filterType: 'lowpass',
//       filterFreq: 5000,
//       filterQ: 0.7,
//     },
//     {
//       freq: 1976, // B6
//       type: 'sine',
//       duration: 0.04,
//       gain: 0.08,
//       attack: 0.001,
//       release: 0.05,
//       delay: 0.018,
//     },
//   ],

//   // Switch OFF : tactile + petit "tock" descendant assourdi
//   switchOff: [
//     {
//       type: 'noise',
//       duration: 0.01,
//       gain: 0.26,
//       attack: 0.0005,
//       release: 0.015,
//       filterType: 'bandpass',
//       filterFreq: 2400,
//       filterQ: 2,
//     },
//     {
//       freq: 880, // A5
//       type: 'sine',
//       duration: 0.05,
//       gain: 0.16,
//       attack: 0.001,
//       release: 0.06,
//       delay: 0.012,
//       filterType: 'lowpass',
//       filterFreq: 3500,
//       filterQ: 0.7,
//     },
//     {
//       freq: 587, // D5
//       type: 'sine',
//       duration: 0.04,
//       gain: 0.06,
//       attack: 0.001,
//       release: 0.05,
//       delay: 0.018,
//     },
//   ],

//   // Sélection confirmée : double-ping mélodique (quinte) — plus présent que click
//   select: [
//     {
//       type: 'noise',
//       duration: 0.01,
//       gain: 0.18,
//       attack: 0.0005,
//       release: 0.014,
//       filterType: 'bandpass',
//       filterFreq: 3500,
//       filterQ: 2,
//     },
//     {
//       freq: 1046, // C6
//       type: 'sine',
//       duration: 0.06,
//       gain: 0.18,
//       attack: 0.001,
//       release: 0.07,
//       filterType: 'lowpass',
//       filterFreq: 5000,
//       filterQ: 0.7,
//     },
//     {
//       freq: 1568, // G6 — quinte juste, sonorité positive
//       type: 'sine',
//       duration: 0.07,
//       gain: 0.16,
//       attack: 0.001,
//       release: 0.08,
//       delay: 0.045,
//       filterType: 'lowpass',
//       filterFreq: 5500,
//       filterQ: 0.7,
//     },
//   ],

//   // Navigation entre tabs : sweep court latéral — sensation de glissement
//   navigate: [
//     {
//       type: 'noise',
//       duration: 0.018,
//       gain: 0.12,
//       attack: 0.001,
//       release: 0.018,
//       filterType: 'bandpass',
//       filterFreq: 4000,
//       filterQ: 1.5,
//     },
//     {
//       freq: 1175, // D6
//       sweepTo: 1760, // A6
//       type: 'sine',
//       duration: 0.08,
//       gain: 0.15,
//       attack: 0.002,
//       release: 0.06,
//       delay: 0.005,
//       filterType: 'lowpass',
//       filterFreq: 5000,
//       filterQ: 0.7,
//     },
//     {
//       freq: 2349, // D7
//       type: 'sine',
//       duration: 0.05,
//       gain: 0.05,
//       attack: 0.003,
//       release: 0.045,
//       delay: 0.025,
//     },
//   ],

//   // Succès : arpège ascendant C–E–G (accord parfait majeur) — chaleureux
//   success: [
//     {
//       freq: 1046, // C6
//       type: 'sine',
//       duration: 0.08,
//       gain: 0.17,
//       attack: 0.003,
//       release: 0.1,
//       filterType: 'lowpass',
//       filterFreq: 5000,
//       filterQ: 0.7,
//     },
//     {
//       freq: 1318, // E6
//       type: 'sine',
//       duration: 0.08,
//       gain: 0.17,
//       attack: 0.003,
//       release: 0.1,
//       delay: 0.085,
//       filterType: 'lowpass',
//       filterFreq: 5500,
//       filterQ: 0.7,
//     },
//     {
//       freq: 1568, // G6
//       type: 'sine',
//       duration: 0.18,
//       gain: 0.17,
//       attack: 0.003,
//       release: 0.18,
//       delay: 0.17,
//       filterType: 'lowpass',
//       filterFreq: 6000,
//       filterQ: 0.7,
//     },
//     {
//       freq: 2093, // C7 — harmonique pour la brillance
//       type: 'triangle',
//       duration: 0.18,
//       gain: 0.05,
//       attack: 0.005,
//       release: 0.18,
//       delay: 0.17,
//     },
//   ],

//   // Erreur : intervalle descendant mineur (A → F) — doux mais clairement négatif
//   error: [
//     {
//       freq: 880, // A5
//       type: 'sine',
//       duration: 0.1,
//       gain: 0.18,
//       attack: 0.003,
//       release: 0.1,
//       filterType: 'lowpass',
//       filterFreq: 3500,
//       filterQ: 0.7,
//     },
//     {
//       freq: 698, // F5 — sixte mineure descendante
//       type: 'sine',
//       duration: 0.18,
//       gain: 0.18,
//       attack: 0.003,
//       release: 0.18,
//       delay: 0.105,
//       filterType: 'lowpass',
//       filterFreq: 3000,
//       filterQ: 0.7,
//     },
//     {
//       freq: 1397, // F6 — harmonique douce
//       type: 'triangle',
//       duration: 0.16,
//       gain: 0.04,
//       attack: 0.005,
//       release: 0.16,
//       delay: 0.105,
//     },
//   ],

//   // Sonnerie : mélodie ascendante C–E–G–C avec résonance finale — non bouclable
//   ring: [
//     // Note 1 : C6
//     {
//       freq: 1046,
//       type: 'sine',
//       duration: 0.13,
//       gain: 0.18,
//       attack: 0.004,
//       release: 0.11,
//       filterType: 'lowpass',
//       filterFreq: 5000,
//       filterQ: 0.7,
//     },
//     {
//       freq: 2093, // octave harmonique
//       type: 'triangle',
//       duration: 0.11,
//       gain: 0.05,
//       attack: 0.004,
//       release: 0.1,
//     },
//     // Note 2 : E6
//     {
//       freq: 1318,
//       type: 'sine',
//       duration: 0.13,
//       gain: 0.18,
//       attack: 0.004,
//       release: 0.11,
//       delay: 0.12,
//       filterType: 'lowpass',
//       filterFreq: 5500,
//       filterQ: 0.7,
//     },
//     {
//       freq: 2637,
//       type: 'triangle',
//       duration: 0.11,
//       gain: 0.05,
//       attack: 0.004,
//       release: 0.1,
//       delay: 0.12,
//     },
//     // Note 3 : G6
//     {
//       freq: 1568,
//       type: 'sine',
//       duration: 0.13,
//       gain: 0.18,
//       attack: 0.004,
//       release: 0.11,
//       delay: 0.24,
//       filterType: 'lowpass',
//       filterFreq: 6000,
//       filterQ: 0.7,
//     },
//     {
//       freq: 3136,
//       type: 'triangle',
//       duration: 0.11,
//       gain: 0.05,
//       attack: 0.004,
//       release: 0.1,
//       delay: 0.24,
//     },
//     // Note finale résonnante : C7 (octave supérieure)
//     {
//       freq: 2093,
//       type: 'sine',
//       duration: 0.4,
//       gain: 0.2,
//       attack: 0.004,
//       release: 0.38,
//       delay: 0.36,
//       filterType: 'lowpass',
//       filterFreq: 6500,
//       filterQ: 0.7,
//     },
//     {
//       freq: 1046, // sous-octave pour le corps
//       type: 'sine',
//       duration: 0.4,
//       gain: 0.1,
//       attack: 0.004,
//       release: 0.38,
//       delay: 0.36,
//     },
//   ],
// }
