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
    accentPrimary: '#0b9fb1',
    accentPrimaryContrast: '#ffffff',
    accentSecondary: '#1f6fd6',
    accentSecondaryContrast: '#ffffff',
    error: '#e0435f',
    errorContrast: '#ffffff',
    warning: '#d9951a',
    warningContrast: '#ffffff',
    success: '#1f9d63',
    successContrast: '#ffffff',
    mainSidebar: '#f5f7fa',
    mainSidebarContrast: '#2a3342',
    border: '#dde3ea',
    codeBackground: '#f7f9fb',
  },
  shape: {
    radiusFactor: 0.5,
  },
};

export default light;
