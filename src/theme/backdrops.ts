import type { CSSObject } from '@mui/material/styles'
import { alpha, gold, navy, neutral } from './tokens'

// Decorative layers for ::before and ::after. Each one is a positioned box
// behind content that ignores the pointer. Callers set where it sits.

const layer = {
  content: '""',
  position: 'absolute',
  zIndex: -1,
  pointerEvents: 'none',
} as const

/** A block of dots, like a printed grid. */
export function dotField(onNavy = false): CSSObject {
  const dot = onNavy ? alpha(neutral.white, 0.22) : alpha(navy.primary, 0.22)
  return {
    ...layer,
    width: 132,
    height: 96,
    backgroundImage: `radial-gradient(${dot} 1.6px, transparent 1.8px)`,
    backgroundSize: '18px 18px',
  }
}

/** A thin dashed circle. */
export function dashedRing(onNavy = false, size = 220): CSSObject {
  return {
    ...layer,
    width: size,
    height: size,
    borderRadius: '50%',
    border: `1.5px dashed ${onNavy ? alpha(gold.onNavy, 0.45) : alpha(navy.primary, 0.18)}`,
  }
}

const svgUrl = (markup: string) => `url("data:image/svg+xml,${encodeURIComponent(markup)}")`

/** A small block of dots as an image, for background-image layers. */
export function dotCluster(color: string, cols = 7, rows = 5, gap = 18, r = 1.8) {
  let dots = ''
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) dots += `<circle cx='${x * gap + r}' cy='${y * gap + r}' r='${r}'/>`
  const w = (cols - 1) * gap + r * 2
  const h = (rows - 1) * gap + r * 2
  return { url: svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' fill='${color}'>${dots}</svg>`), w, h }
}

/** A soft organic blob in one flat colour. */
export function blob(color: string) {
  return svgUrl(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 520'><path fill='${color}' d='M421 46c63 32 133 92 153 167s-10 165-71 222-153 81-236 77S98 478 52 410 -8 245 19 173 112 44 196 18s162-4 225 28z'/></svg>`,
  )
}

/** Soft wave along the bottom edge of the hero, in flat tints. */
export const heroWave = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 220' preserveAspectRatio='none'><path d='M0 140 C 240 60 420 200 720 150 S 1200 40 1440 110 L1440 220 L0 220 Z' fill='${navy.tint}'/><path d='M0 180 C 300 120 520 230 860 180 S 1280 120 1440 160 L1440 220 L0 220 Z' fill='${navy.soft}' fill-opacity='0.55'/></svg>`,
)}")`
