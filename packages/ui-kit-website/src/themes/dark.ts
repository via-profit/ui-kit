import { UIThemeOverrides } from '@via-profit/ui-kit/src/ThemeProvider';

import light from './light';

const dark: UIThemeOverrides = {
  ...light,
  isDark: true,
  colors: {
    ...light.colors,
    backgroundPrimary: '#1e1e2e',
    backgroundSecondary: '#262739',
    accentPrimary: '#e77b00',
    accentPrimaryContrast: '#f1f1f1',
    textPrimary: '#c4c4d8',
    textSecondary: '#717275',
    surface: '#262739',
  },
};

export default dark;
