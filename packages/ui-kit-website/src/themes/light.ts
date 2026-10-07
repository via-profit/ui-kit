import { UIThemeOverrides } from '@via-profit/ui-kit/src/ThemeProvider';

/**
 * Every token of the theme is set: the theme is the sample of all the fields,
 * and a new token of ui-kit is a type error here until it gets a value
 */
export type AppTheme = Required<UIThemeOverrides>;

/**
 * Light theme: the green accent, the dark sidebar and the macOS-like shadows
 */
const light: AppTheme = {
  isDark: false,
  fontSize: {
    small: 14,
    normal: 16,
    medium: 18,
    large: 20,
  },
  zIndex: {
    header: 20,
    modal: 30,
  },
  color: {
    backgroundPrimary: '#fafafa',
    backgroundSecondary: '#0e1200',
    surface: '#fff',
    textPrimary: '#0b1643',
    textSecondary: '#525252',
    accentPrimary: '#009900',
    accentPrimaryContrast: '#e0f2ea',
    accentSecondary: '#0b1643',
    accentSecondaryContrast: '#FFFFFF',
    error: '#ff2b2b',
    errorContrast: '#ffffff',
    warning: '#d48217',
    warningContrast: '#010103',
    success: '#4cc60e',
    successContrast: '#ffffff',
    mainSidebar: '#181d2a',
    mainSidebarContrast: '#ffffff',
    border: '#ebebeb',
    codeBackground: '#f7f9fb',
  },
  shape: {
    radiusFactor: 0.3,
  },
  spacing: {
    xs: '0.25em',
    sm: '0.5em',
    md: '1em',
    lg: '1.5em',
    xl: '2em',
  },
  padding: {
    control: { y: '0.75em', x: '1em' },
    item: { y: '0.6em', x: '0.8em' },
    container: { y: '1em', x: '1em' },
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, sans-serif',
  },
  // Empty: every component keeps its own focus. With `width` or `color` all of them get the same outline,
  // e.g. `{ width: '2px', offset: '1px', color: '#009900' }`
  focusRing: {},
  /**
   * The shadows of the levels, in `px`: the components with a smaller font (tooltips, toasts)
   * get the same shadow as the menus
   */
  elevation: {
    // macOS: the hairline instead of the border and the short soft shadow
    surface: '0 0 0 0.5px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.08)',
    // The menus, the calendar, the toasts, the tooltips and the modal windows
    popup: '0 8px 32px -10px rgba(16, 24, 40, 0.35)',
    // The knob of the switch
    control: '0 0 0 0.5px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.2)',
  },
};

export default light;
