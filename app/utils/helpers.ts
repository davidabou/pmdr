export const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export const pluralize = (
  n: number,
  singular: string,
  plural = `${singular}s`
): string => `${n} ${n === 1 ? singular : plural}`
