import Color from '../Color';
import { CreateTheme, UIThemeOverrides } from './index';

export const createTheme: CreateTheme = overrides => {
  const {
    isDark,
    fontSize,
    zIndex,
    color,
    shape,
    spacing,
    padding,
    typography,
    focusRing,
    elevation,
    ...rest
  } = overrides || {};

  const theme: Omit<ReturnType<CreateTheme>, 'color'> & {
    color: Record<string, Color>;
  } = {
    ...rest,
    isDark: typeof isDark === 'boolean' ? isDark : false,
    // Empty by default: the components keep their own fonts, focus and shadows
    typography: { ...typography },
    focusRing: { ...focusRing },
    elevation: { ...elevation },
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
    spacing: {
      xs: '0.25em',
      sm: '0.5em',
      md: '1em',
      lg: '1.5em',
      xl: '2em',
      ...spacing,
    },
    padding: {
      control: { y: '0.75em', x: '1em', ...padding?.control },
      item: { y: '0.6em', x: '0.8em', ...padding?.item },
      container: { y: '1em', x: '1em', ...padding?.container },
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
    theme.color[colorName] = Color.fromString(colorValue);
  });

  return theme as ReturnType<CreateTheme>;
};

export default createTheme;
