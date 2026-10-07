import { UIThemeOverrides } from '@via-profit/ui-kit/src/ThemeProvider';

/**
 * Light theme: the same cyan/blue accents on the cool grey background
 */
const light: UIThemeOverrides = {
  isDark: false,
  fontSize: {
    small: 14,
    normal: 16,
    medium: 18,
    large: 20,
  },
  zIndex: {
    header: 8,
    modal: 10,
  },
  color: {
    backgroundPrimary: '#f5f7fa',
    backgroundSecondary: '#eaeef3',
    surface: '#ffffff',
    textPrimary: '#1b2330',
    textSecondary: '#5d6778',
    accentPrimary: '#1f6fd6',
    accentPrimaryContrast: '#ffffff',
    accentSecondary: '#07aeae',
    accentSecondaryContrast: '#062a30',
    error: '#e0435f',
    errorContrast: '#ffffff',
    warning: '#d9951a',
    warningContrast: '#ffffff',
    success: '#1f9d63',
    successContrast: '#ffffff',
    mainSidebar: '#f3f8fc',
    mainSidebarContrast: '#2a3342',
    border: '#dde3ea',
    codeBackground: '#f7f9fb',
  },
  shape: {
    radiusFactor: 0.5,
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
  // e.g. `{ width: '2px', offset: '1px', color: '#1f6fd6' }`
  focusRing: {},
  // Empty: the components get the default shadows of the kit, the same for every level,
  // e.g. `{ popup: '0 8px 24px rgba(0, 0, 0, 0.14)', surface: '0 1px 3px rgba(0, 0, 0, 0.08)',
  // control: '0 1px 2px rgba(0, 0, 0, 0.2)' }`
  elevation: {},
};

export default light;
