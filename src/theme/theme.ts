import { createTheme, type Shadows } from '@mui/material/styles'
import {
  focusRing,
  font,
  gold,
  motion,
  navy,
  neutral,
  overlay,
  shadow,
  status,
} from './tokens'

// Portfolio scale: fluid display type for headings, comfortable reading size for body.
const px = (size: number) => `${size / 16}rem`
const fluid = (min: number, max: number) => `clamp(${px(min)}, ${px(min)} + ${((max - min) / 16) * 2.2}vw, ${px(max)})`

const shadows = [
  'none',
  shadow.card,
  ...Array(3).fill(shadow.raised),
  ...Array(20).fill(shadow.dialog),
] as Shadows

export const theme = createTheme({
  cssVariables: true,
  breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 } },
  palette: {
    mode: 'light',
    primary: { main: gold.active, light: gold.onNavy, dark: gold.text, contrastText: navy.primary },
    secondary: { main: navy.primary, light: navy.raised, dark: navy.deep, contrastText: neutral.white },
    success: { main: status.success.fill, dark: status.success.text, light: status.success.wash, contrastText: neutral.white },
    warning: { main: status.warning.fill, dark: status.warning.text, light: status.warning.wash, contrastText: neutral.white },
    error: { main: status.error.fill, dark: status.error.text, light: status.error.wash, contrastText: neutral.white },
    info: { main: status.info.fill, dark: status.info.text, light: status.info.wash, contrastText: neutral.white },
    background: { default: neutral.canvas, paper: neutral.white },
    text: { primary: neutral.ink, secondary: neutral.inkSoft, disabled: neutral.disabledText },
    divider: neutral.border,
    action: {
      hover: gold.light,
      selected: gold.active,
      disabled: neutral.disabledText,
      disabledBackground: neutral.disabledFill,
      focus: gold.light,
    },
  },
  shape: { borderRadius: 8 },
  spacing: 4,
  shadows,
  transitions: {
    duration: {
      shortest: motion.fast,
      shorter: motion.fast,
      short: motion.base,
      standard: motion.slow,
      complex: motion.slow,
      enteringScreen: motion.slow,
      leavingScreen: motion.base,
    },
  },
  zIndex: { appBar: 1100, drawer: 1200, modal: 1300, snackbar: 1400, tooltip: 1500 },
  typography: {
    fontFamily: font.sans,
    htmlFontSize: 16,
    fontSize: 15,
    h1: { fontSize: fluid(38, 60), fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.035em', color: navy.primary },
    h2: { fontSize: fluid(28, 42), fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.03em', color: navy.primary },
    h3: { fontSize: px(18), fontWeight: 600, lineHeight: 1.35, letterSpacing: '-0.01em', color: navy.primary },
    h4: { fontSize: px(16), fontWeight: 600, lineHeight: 1.4, color: navy.primary },
    subtitle1: { fontSize: px(16), fontWeight: 500, lineHeight: 1.55 },
    subtitle2: { fontSize: px(14), fontWeight: 600, lineHeight: 1.5 },
    body1: { fontSize: px(16), lineHeight: 1.65 },
    body2: { fontSize: px(14.5), lineHeight: 1.6 },
    caption: { fontSize: px(13), lineHeight: 1.5, color: neutral.inkMuted },
    overline: { fontSize: px(12), fontWeight: 600, letterSpacing: '0.1em', lineHeight: 1.5 },
    button: { fontSize: px(15), fontWeight: 600, textTransform: 'none', letterSpacing: 0 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body, #root': { minHeight: '100%' },
        html: { scrollBehavior: 'smooth', scrollPaddingTop: 96 },
        body: {
          backgroundColor: neutral.canvas,
          color: neutral.ink,
          overflowX: 'hidden',
          WebkitFontSmoothing: 'antialiased',
        },
        '::selection': { backgroundColor: gold.light, color: navy.primary },
        ':focus-visible': focusRing.light,
        'code, kbd, samp': { fontFamily: font.mono },
        '.visually-hidden': {
          position: 'absolute',
          width: 1,
          height: 1,
          margin: -1,
          padding: 0,
          overflow: 'hidden',
          clip: 'rect(0 0 0 0)',
          whiteSpace: 'nowrap',
          border: 0,
        },
        '@media (prefers-reduced-motion: reduce)': {
          '*, *::before, *::after': {
            animationDuration: '0.01ms !important',
            animationIterationCount: '1 !important',
            transitionDuration: '0.01ms !important',
            scrollBehavior: 'auto !important',
          },
        },
      },
    },

    MuiButtonBase: { defaultProps: { disableRipple: true } },

    MuiButton: {
      defaultProps: { disableElevation: true, color: 'primary' },
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: 42,
          padding: '9px 20px',
          borderRadius: 999,
          border: 0,
          transition: `background-color ${motion.fast}ms, color ${motion.fast}ms`,
          '&:focus-visible': focusRing.light,
          [theme.breakpoints.down('sm')]: { minHeight: 44 },
          '&.Mui-disabled': {
            backgroundColor: neutral.disabledFill,
            color: neutral.disabledText,
            boxShadow: `inset 0 0 0 1px ${neutral.borderStrong}`,
          },
        }),
        sizeSmall: { minHeight: 32, padding: '5px 10px', fontSize: px(14) },
        sizeLarge: { minHeight: 46, padding: '11px 22px', fontSize: px(15) },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            backgroundColor: gold.active,
            color: navy.primary,
            '&:hover': { backgroundColor: gold.onNavy },
            '&:active': { backgroundColor: gold.active },
          },
        },
        {
          props: { variant: 'contained', color: 'error' },
          style: {
            backgroundColor: status.error.fill,
            color: neutral.white,
            '&:hover': { backgroundColor: status.error.text },
          },
        },
        // Borderless actions (§4): secondary buttons are gold text, never an outline.
        {
          props: { variant: 'outlined' },
          style: {
            backgroundColor: neutral.white,
            color: gold.text,
            border: 0,
            '&:hover': { backgroundColor: gold.light, border: 0 },
          },
        },
        {
          props: { variant: 'text' },
          style: {
            color: gold.text,
            '&:hover': { backgroundColor: gold.light },
          },
        },
        {
          props: { variant: 'text', color: 'secondary' },
          style: { color: neutral.inkSoft, '&:hover': { backgroundColor: neutral.mist } },
        },
      ],
    },

    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 10,
          color: neutral.inkSoft,
          '&:hover': { backgroundColor: neutral.mist },
          '&:focus-visible': focusRing.light,
          [theme.breakpoints.down('sm')]: { minWidth: 44, minHeight: 44 },
        }),
      },
    },

    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { backgroundImage: 'none', borderRadius: 16 } },
    },

    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          border: `1px solid ${neutral.border}`,
          boxShadow: shadow.card,
          borderRadius: 20,
        },
      },
    },
    MuiCardHeader: {
      defaultProps: { slotProps: { title: { variant: 'h2' } } },
      styleOverrides: {
        root: { padding: '16px 20px', borderBottom: `1px solid ${neutral.border}` },
        action: { margin: 0, alignSelf: 'center' },
        subheader: { fontSize: px(13), color: neutral.inkMuted },
      },
    },
    MuiCardContent: {
      styleOverrides: { root: { padding: 20, '&:last-child': { paddingBottom: 20 } } },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          height: 26,
          fontSize: px(13),
          fontWeight: 500,
          backgroundColor: neutral.mist,
          color: neutral.inkSoft,
        },
        label: { paddingLeft: 10, paddingRight: 10 },
        icon: { marginLeft: 6, marginRight: -2, fontSize: 14 },
      },
    },

    MuiTooltip: {
      defaultProps: { arrow: false, enterDelay: 300 },
      styleOverrides: {
        tooltip: {
          backgroundColor: navy.deep,
          color: neutral.white,
          borderRadius: 6,
          fontSize: px(12),
          fontWeight: 500,
          padding: '4px 8px',
        },
      },
    },

    MuiBackdrop: {
      styleOverrides: {
        root: { '&:not(.MuiBackdrop-invisible)': { backgroundColor: overlay } },
      },
    },
    MuiDrawer: {
      styleOverrides: { paper: { borderRadius: 0, border: 0 } },
    },
    MuiDialog: {
      styleOverrides: { paper: { borderRadius: 16, boxShadow: shadow.dialog } },
    },
    MuiDialogTitle: {
      defaultProps: { variant: 'h2' },
      styleOverrides: { root: { padding: '16px 16px 8px' } },
    },
    MuiDialogContent: { styleOverrides: { root: { padding: '8px 16px' } } },
    MuiDialogActions: { styleOverrides: { root: { padding: 16, gap: 4 } } },

    MuiMenu: {
      styleOverrides: {
        paper: { borderRadius: 12, boxShadow: shadow.dialog, border: `1px solid ${neutral.border}` },
        list: { padding: 4 },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          minHeight: 36,
          fontSize: px(15),
          '&:hover': { backgroundColor: gold.light },
          '&.Mui-focusVisible': { backgroundColor: gold.light },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: { fontSize: px(15), color: neutral.inkSoft, '&.Mui-focused': { color: navy.primary } },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: neutral.white,
          fontSize: px(15),
          '& .MuiOutlinedInput-notchedOutline': { borderColor: neutral.border },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: neutral.borderStrong },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: navy.primary, borderWidth: 2 },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': { borderColor: status.error.fill },
          '&.Mui-disabled': { backgroundColor: neutral.disabledFill },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: { marginLeft: 0, fontSize: px(13), color: neutral.inkMuted, '&.Mui-error': { color: status.error.text } },
      },
    },

    MuiTableContainer: {
      styleOverrides: { root: { borderRadius: 4 } },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          height: 40,
          padding: '0 12px',
          fontSize: px(13),
          borderBottom: `1px solid ${neutral.border}`,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        head: {
          backgroundColor: neutral.mist,
          color: navy.primary,
          fontSize: px(12),
          fontWeight: 600,
          height: 36,
        },
        body: { color: neutral.ink },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          position: 'relative',
          transition: `background-color ${motion.fast}ms`,
          '&.MuiTableRow-hover:hover': { backgroundColor: gold.light },
          '&:focus-visible': { outline: `2px solid ${navy.primary}`, outlineOffset: -2 },
          // Selected rows copy the sidebar: gold fill, navy type, 3px navy marker.
          '&.Mui-selected, &.Mui-selected:hover': { backgroundColor: gold.active },
          '&.Mui-selected .MuiTableCell-body': { color: navy.primary, fontWeight: 500 },
          '&.Mui-selected > .MuiTableCell-body:first-of-type': { boxShadow: `inset 3px 0 0 ${navy.primary}` },
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        root: { minHeight: 40 },
        indicator: { backgroundColor: gold.active, height: 3 },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 40,
          minWidth: 0,
          padding: '8px 12px',
          fontSize: px(15),
          fontWeight: 500,
          color: neutral.inkSoft,
          '&.Mui-selected': { color: gold.text, fontWeight: 600 },
          '&:hover': { color: navy.primary },
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 10, fontSize: px(14), alignItems: 'center' },
        // On light surfaces: text colour on the wash (§5.1).
        standard: {
          '&.MuiAlert-colorSuccess': { backgroundColor: status.success.wash, color: status.success.text },
          '&.MuiAlert-colorWarning': { backgroundColor: status.warning.wash, color: status.warning.text },
          '&.MuiAlert-colorError': { backgroundColor: status.error.wash, color: status.error.text },
          '&.MuiAlert-colorInfo': { backgroundColor: status.info.wash, color: status.info.text },
        },
      },
    },

    MuiLink: {
      defaultProps: { underline: 'hover' },
      styleOverrides: { root: { color: gold.text, fontWeight: 500 } },
    },

    MuiAvatar: {
      styleOverrides: {
        root: { fontSize: px(13), fontWeight: 600 },
      },
    },

    MuiDivider: { styleOverrides: { root: { borderColor: neutral.border } } },

    MuiListItemIcon: { styleOverrides: { root: { minWidth: 0 } } },
    MuiListItemText: {
      styleOverrides: { primary: { fontSize: 'inherit', fontWeight: 'inherit' } },
    },

    MuiSkeleton: {
      styleOverrides: { root: { backgroundColor: neutral.quietFill, borderRadius: 4 } },
    },
  },
})
