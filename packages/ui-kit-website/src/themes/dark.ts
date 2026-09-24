import { UIThemeOverrides } from '@via-profit/ui-kit/src/ThemeProvider';

import light from './light';

/**
 * Dark theme (default): graphite background with cyan and blue accents
 */
const dark: UIThemeOverrides = {
  ...light,
  isDark: true,
  color: {
    ...light.color,
    backgroundPrimary: '#15181e',
    backgroundSecondary: '#2d3440',
    surface: '#262c36',
    textPrimary: '#d8dce3',
    textSecondary: '#8b93a1',
    accentPrimary: '#22c7d6',
    accentPrimaryContrast: '#062a30',
    accentSecondary: '#2f7fe6',
    accentSecondaryContrast: '#ffffff',
    error: '#f0506e',
    errorContrast: '#ffffff',
    warning: '#f5b83d',
    warningContrast: '#1d1400',
    success: '#2ec27e',
    successContrast: '#04210f',
    mainSidebar: '#15181e',
    mainSidebarContrast: '#c3c8d1',
    border: '#2e3440',
    codeBackground: '#111419',
  },
};

export default dark;
