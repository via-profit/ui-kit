import { UIThemeOverrides } from '@via-profit/ui-kit/src/ThemeProvider';

import light from './light';

const dark: UIThemeOverrides = {
  ...light,
  isDark: true,
  colors: {
    ...light.colors,
    backgroundPrimary: '#1e1e2e',
    backgroundSecondary: '#28293c',
    accentPrimary: '#b97a00',
    accentPrimaryContrast: '#231700',
    textPrimary: '#c4c4d8',
    textSecondary: '#9e9e9e',
  },
};

export default dark;
