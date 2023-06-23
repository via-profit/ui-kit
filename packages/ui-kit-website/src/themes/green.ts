import { UIThemeOverrides } from '@via-profit/ui-kit/src/ThemeProvider';

const green: UIThemeOverrides = {
  isDark: false,
  fontSize: {
    small: 14,
    normal: 16,
    medium: 18,
    large: 21,
  },
  zIndex: {
    header: 8,
    mainDrawer: 9,
    modal: 10,
  },
  colors: {
    backgroundPrimary: '#f1f1f1',
    backgroundSecondary: '#ffffff',
    textPrimary: '#212121',
    textSecondary: '#343434',
    accentPrimary: '#66b13d',
    accentPrimaryContrast: '#FFFFFF',
    accentSecondary: '#ffc41f',
    accentSecondaryContrast: '#FFFFFF',
    error: '#ff2b2b',
    surface: '#fff',
  },
  shape: {
    radiusFactor: 0.5,
  },
};

export default green;