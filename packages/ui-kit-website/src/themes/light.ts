import { UIThemeOverrides } from '@via-profit/ui-kit/src/ThemeProvider';

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
    dropdown: 9,
    modal: 10,
  },
  color: {
    backgroundPrimary: '#F9F9F9',
    backgroundSecondary: '#0e1200',
    textPrimary: '#212121',
    textSecondary: '#474747',
    accentPrimary: '#FFA800',
    accentPrimaryContrast: '#FFFFFF',
    accentSecondary: '#bd00ff',
    accentSecondaryContrast: '#FFFFFF',
    error: '#ff2b2b',
    surface: '#fff',
  },
  shape: {
    radiusFactor: 0.5,
  },
};

export default light;
