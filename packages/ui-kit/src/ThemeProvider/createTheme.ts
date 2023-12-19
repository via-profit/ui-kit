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
      modal: 10,
      ...zIndex,
    },
    color: {},
    shape: {
      radiusFactor: 0.3,
      ...shape,
    },
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /* @ts-ignore */
  const defaultColors: Required<UIThemeOverrides['color']> = {
    backgroundPrimary: '#fafafa',
    backgroundSecondary: '#0e1200',
    textPrimary: '#0b1643',
    textSecondary: '#525252',
    accentPrimary: '#009900',
    accentPrimaryContrast: '#e0f2ea',
    accentSecondary: '#0b1643',
    accentSecondaryContrast: '#FFFFFF',
    error: '#ff2b2b',
    surface: '#fff',
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
