import type { UITheme, UIThemeOverrides } from '@via-profit/ui-kit';

import Color from '../color';

export type CreateTheme = (overrides?: UIThemeOverrides) => UITheme;

const createTheme = (overrides?: UIThemeOverrides): UITheme => {
  const { isDark, fontSize, zIndex, grid, colors, shape } = overrides || {};

  const theme: UITheme = {
    isDark: typeof isDark === 'boolean' ? isDark : false,
    fontSize: {
      small: 14,
      normal: 16,
      medium: 18,
      large: 20,
      ...fontSize,
    },
    zIndex: {
      header: 8,
      mainDrawer: 9,
      modal: 10,
      ...zIndex,
    },
    grid: {
      frameGutter: 30,
      safeFrame: '80rem',
      ...grid,
    },
    colors: {
      backgroundPrimary: new Color(colors?.backgroundPrimary || '#fff'),
      backgroundSecondary: new Color(colors?.backgroundSecondary || '#F9F9F9'),
      backgroundGrey: new Color(colors?.backgroundGrey || '#F4F6FA'),
      textPrimary: new Color(colors?.textPrimary || '#212121'),
      textSecondary: new Color(colors?.textSecondary || '#343434'),
      accentPrimary: new Color(colors?.accentPrimary || '#FFA800'),
      accentPrimaryContrast: new Color(colors?.accentPrimaryContrast || '#FFFFFF'),
      accentSecondary: new Color(colors?.accentSecondary || '#bd00ff'),
      accentSecondaryContrast: new Color(colors?.accentSecondaryContrast || '#FFFFFF'),
      error: new Color(colors?.error || '#ff2b2b'),
    },
    shape: {
      radiusFactor: 0.5,
      ...shape,
    },
  };

  return theme;
};

export default createTheme;
