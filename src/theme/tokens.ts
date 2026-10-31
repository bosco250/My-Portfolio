// The house palette (design system §5). These are the only colours allowed.
// Add nothing here without updating the design system first.

export const navy = {
  deep: '#001A42',
  primary: '#012D6E',
  raised: '#1B3654',
  line: '#2B4A75',
  soft: '#D6E0EF',
  tint: '#EAF0F8',
} as const

export const gold = {
  text: '#8A7300',
  active: '#BF9F00',
  onNavy: '#D8A83C',
  light: '#F3E7B0',
  soft: '#FAF5DC',
} as const

export const neutral = {
  white: '#FFFFFF',
  canvas: '#F3F5F9',
  mist: '#E8EDF4',
  quietFill: '#E4E9F1',
  disabledFill: '#DBE2EC',
  sidebarText: '#CFD9E6',
  sidebarMuted: '#9CADC4',
  disabledText: '#5F6D82',
  border: '#D9E0EA',
  borderStrong: '#B6C2D3',
  ink: '#0E1D33',
  inkSoft: '#3C4A5F',
  inkMuted: '#5A677B',
} as const

export const status = {
  success: { fill: '#15803D', text: '#166534', wash: '#DCFCE7' },
  warning: { fill: '#C2410C', text: '#9A3412', wash: '#FFEDD5' },
  error: { fill: '#DC2626', text: '#991B1B', wash: '#FEE2E2' },
  failed: { fill: '#BE123C', text: '#9F1239', wash: '#FFE4E6' },
  info: { fill: '#0369A1', text: '#075985', wash: '#E0F2FE' },
} as const

export type StatusIntent = keyof typeof status

/** Fade a house colour. Opacity is the only way to soften a colour (§5.3). */
export function alpha(hex: string, opacity: number) {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${opacity})`
}

export const shadow = {
  card: `0 1px 2px ${alpha(navy.deep, 0.08)}`,
  raised: `0 2px 6px ${alpha(navy.deep, 0.1)}`,
  sidebarEdge: `1px 0 0 ${alpha(navy.deep, 0.14)}`,
  topBar: `0 6px 14px -12px ${alpha(navy.deep, 0.45)}`,
  dialog: `0 8px 24px ${alpha(navy.deep, 0.18)}`,
} as const

export const overlay = alpha(navy.deep, 0.55)

export const layout = {
  sidebarOpen: 256,
  sidebarCollapsed: 56,
  topBar: 52,
  navItem: 36,
  navItemTouch: 44,
  panel: { sm: 420, md: 520, lg: 760, xl: 1040 },
  panelMax: '80vw',
  listVisible: 160,
  nestedStep: 72,
} as const

export const motion = { fast: 150, base: 200, slow: 250 } as const

/** Corner radii: soft cards and pill controls. */
export const radius = { sm: 8, md: 12, lg: 20, pill: 999 } as const

export const font = {
  sans: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
  /** Italic display serif, for taglines only. */
  serif: "'Fraunces', Georgia, 'Times New Roman', serif",
  mono: "'JetBrains Mono', ui-monospace, 'SFMono-Regular', Consolas, monospace",
} as const

/** Focus rings (§14): navy on light, gold on navy. */
export const focusRing = {
  light: { outline: `2px solid ${navy.primary}`, outlineOffset: 2 },
  navy: { outline: `2px solid ${gold.active}`, outlineOffset: -2 },
} as const
