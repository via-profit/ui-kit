import Color from '../Color';
import type { UIThemeOverrides } from '@via-profit/ui-kit';
import type { ColorInterface } from '@via-profit/ui-kit/Color';
import type { CreateTheme } from '@via-profit/ui-kit/ThemeProvider';

const createTheme: CreateTheme = overrides => {
  const { isDark, fontSize, zIndex, colors, shape, ...rest } = overrides || {};

  const theme: Omit<ReturnType<CreateTheme>, 'colors'> & {
    colors: Record<string, ColorInterface>;
  } = {
    ...rest,
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
    colors: {},
    shape: {
      radiusFactor: 0.5,
      ...shape,
    },
  };

  const defaultColors: Required<UIThemeOverrides['colors']> = {
    backgroundPrimary: '#FFFFFF',
    backgroundSecondary: '#F9F9F9',
    textPrimary: '#212121',
    surface: '#FFFFFF',
    textSecondary: '#343434',
    accentPrimary: '#FFA800',
    accentPrimaryContrast: '#FFFFFF',
    accentSecondary: '#bd00ff',
    accentSecondaryContrast: '#FFFFFF',
    error: '#ff2b2b',
  };

  Object.entries({ ...defaultColors, ...colors }).forEach(([colorName, colorValue]) => {
    theme.colors[colorName] = new Color(colorValue);
  });

  theme.colors.test = new Color('red');

  return theme as ReturnType<CreateTheme>;
};

export default createTheme;
