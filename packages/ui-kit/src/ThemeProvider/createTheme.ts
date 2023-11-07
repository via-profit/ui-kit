import Color from '../Color';
import { CreateTheme, UIThemeOverrides } from './index';

export const createTheme: CreateTheme = overrides => {
  const { isDark, fontSize, zIndex, color, shape, ...rest } = overrides || {};

  const theme: Omit<ReturnType<CreateTheme>, 'color'> & {
    color: Record<string, Color>;
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
      dropdown: 7,
      modal: 10,
      ...zIndex,
    },
    color: {},
    shape: {
      radiusFactor: 0.5,
      ...shape,
    },
  };

  const defaultColors: Required<UIThemeOverrides['color']> = {
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
    errorContrast: '#ffffff',
    warning: '#fcbf03',
    warningContrast: '#ffffff',
    success: '#0ca400',
    successContrast: '#ffffff',
  };

  Object.entries({ ...defaultColors, ...color }).forEach(([colorName, colorValue]) => {
    theme.color[colorName] = new Color(colorValue);
  });

  theme.color.test = new Color('red');

  return theme as ReturnType<CreateTheme>;
};

export default createTheme;
