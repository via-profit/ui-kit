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
    modal: 10,
  },
  color: {
    backgroundPrimary: '#F9F9F9',
    backgroundSecondary: '#0e1200',
    textPrimary: '#212121',
    textSecondary: '#474747',
    accentPrimary: '#ff3d3d',
    accentPrimaryContrast: '#FFFFFF',
    accentSecondary: '#0b1643',
    accentSecondaryContrast: '#FFFFFF',
    error: '#ff2b2b',
    surface: '#fff',
    mainSidebar: '#130f1d',
    mainSidebarContrast: '#e0f2ea',
  },
  shape: {
    radiusFactor: 0.5,
  },
};

export default light;
