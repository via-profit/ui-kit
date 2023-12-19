import { UIThemeOverrides } from '@via-profit/ui-kit/src/ThemeProvider';

import light from './light';

const dark: UIThemeOverrides = {
  ...light,
  isDark: true,
  color: {
    ...light.color,
    backgroundPrimary: '#130a10',
    backgroundSecondary: '#262739',
    accentPrimary: '#ff3d3d',
    accentPrimaryContrast: '#fee0e0',
    accentSecondary: '#6d07b3',
    accentSecondaryContrast: '#FFFFFF',
    textPrimary: '#e8cece',
    textSecondary: '#717275',
    surface: '#131213 ',
    mainSidebar: '#130f1d',
    mainSidebarContrast: '#e0f2ea',
  },
};

export default dark;
