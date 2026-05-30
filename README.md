# 🍅 pmdr

A minimalist and modern web application to apply the Pomodoro technique, built with **Nuxt 4** and **Tailwind CSS**.

## ✨ Features

- ⏱️ **Pomodoro timer** with work, short break, and long break phases
- 🎛️ **Preset durations** (classic 25/5/15) and **fully customizable** ones
- 🔄 **Automatic or manual phase transitions** — your choice
- 🔔 **Sound alerts** at the end of each phase
- 📲 **Browser push notifications** to stay informed even outside the tab
- 💾 **Local persistence** of preferences (no account required)
- 🎨 **Minimalist and modern design**, responsive, with dark mode

## 🛠️ Tech Stack

- [Nuxt 4](https://nuxt.com/) — Vue.js framework
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [VueUse](https://vueuse.org/) — Composables collection
- [Motion](https://motion.dev/) — Animation library
- [Reka UI](https://reka-ui.com/) — Unstyled, primitive component library

## ⚙️ Configuration

### Default durations

| Phase       | Duration |
| ----------- | -------- |
| Work        | 25 min   |
| Short break | 5 min    |
| Long break  | 15 min   |

A long break is triggered every **4 work cycles** by default. All these values can be changed in the settings.

### Browser notifications

Notifications require explicit browser permission. On the first click on the "Notifications" toggle, a permission request will be displayed.

## 🎯 The Pomodoro Technique

Invented by Francesco Cirillo in the late 1980s, the Pomodoro technique is a time management method that consists of breaking work into short intervals (typically 25 minutes), separated by brief breaks, in order to improve focus and reduce mental fatigue.

1. Choose a task
2. Work for **25 minutes** without interruption
3. Take a **5-minute break**
4. Repeat — after 4 cycles, take a **15-minute long break**

## ⚖️ License

Copyright © 2026-present davidabou — All rights reserved.

_Made with 🍅 by <a href="https://github.com/davidabou">@davidabou</a>_
