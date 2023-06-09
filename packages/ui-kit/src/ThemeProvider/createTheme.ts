import Color, { ColorInterface } from '../color';

export type CreateTheme = (overrides?: UIThemeOverrides) => UITheme;

export interface UITheme {
  readonly isDark: boolean;
  readonly fontSize: Record<'small' | 'normal' | 'medium' | 'large', number>;
  readonly zIndex: {
    readonly header: number;
    readonly mainDrawer: number;
    readonly modal: number;
  };
  readonly colors: {
    readonly backgroundPrimary: ColorInterface;
    readonly backgroundSecondary: ColorInterface;
    readonly backgroundGrey: ColorInterface;
    readonly textPrimary: ColorInterface;
    readonly textSecondary: ColorInterface;
    readonly accentPrimary: ColorInterface;
    readonly accentPrimaryContrast: ColorInterface;
    readonly accentSecondary: ColorInterface;
    readonly accentSecondaryContrast: ColorInterface;
    readonly error: ColorInterface;
  };
  readonly shape: {
    readonly radiusFactor: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
  };
}

export interface UIThemeOverrides {
  readonly isDark?: UITheme['isDark'];
  readonly fontSize?: UITheme['fontSize'];
  readonly zIndex?: UITheme['zIndex'];
  readonly colors?: Partial<Record<keyof UITheme['colors'], string>>;
  readonly shape?: UITheme['shape'];
}

const createTheme = (overrides?: UIThemeOverrides): UITheme => {
  const { isDark, fontSize, zIndex, colors, shape, ...rest } = overrides || {};

  const theme: Omit<UITheme, 'colors'> & { colors: Record<string, ColorInterface> } = {
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
    backgroundGrey: '#F4F6FA',
    textPrimary: '#212121',
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

  return theme as UITheme;
};

export default createTheme;
