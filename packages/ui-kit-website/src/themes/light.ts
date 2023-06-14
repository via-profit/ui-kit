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
    mainDrawer: 9,
    modal: 10,
  },
  colors: {
    backgroundPrimary: '#fff',
    backgroundSecondary: '#F9F9F9',
    textPrimary: '#212121',
    textSecondary: '#343434',
    accentPrimary: '#FFA800',
    accentPrimaryContrast: '#FFFFFF',
    accentSecondary: '#bd00ff',
    accentSecondaryContrast: '#FFFFFF',
    error: '#ff2b2b',
    surface: '#fff',
    drawer: '#fff',
    drawerContrast: '#000',
  },
  shape: {
    radiusFactor: 0.5,
  },
};

export default light;
