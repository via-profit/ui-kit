import Color, { ColorInterface } from '../color';

export type CreateTheme = (overrides?: UIThemeOverrides) => UITheme;

export type ColorManipulator = () => ColorInterface;

export interface UITheme {
  readonly isDark: boolean;
  readonly fontSize: Record<'small' | 'normal' | 'medium' | 'large', number>;
  readonly zIndex: {
    readonly header: number;
    readonly mainDrawer: number;
    readonly modal: number;
  };
  readonly colors: {
    readonly backgroundPrimary: ColorManipulator;
    readonly backgroundSecondary: ColorManipulator;
    readonly backgroundGrey: ColorManipulator;
    readonly textPrimary: ColorManipulator;
    readonly textSecondary: ColorManipulator;
    readonly accentPrimary: ColorManipulator;
    readonly accentPrimaryContrast: ColorManipulator;
    readonly accentSecondary: ColorManipulator;
    readonly accentSecondaryContrast: ColorManipulator;
    readonly error: ColorManipulator;
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

  const theme: UITheme = {
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
    colors: {
      backgroundPrimary: () => new Color(colors?.backgroundPrimary || '#fff'),
      backgroundSecondary: () => new Color(colors?.backgroundSecondary || '#F9F9F9'),
      backgroundGrey: () => new Color(colors?.backgroundGrey || '#F4F6FA'),
      textPrimary: () => new Color(colors?.textPrimary || '#212121'),
      textSecondary: () => new Color(colors?.textSecondary || '#343434'),
      accentPrimary: () => new Color(colors?.accentPrimary || '#FFA800'),
      accentPrimaryContrast: () => new Color(colors?.accentPrimaryContrast || '#FFFFFF'),
      accentSecondary: () => new Color(colors?.accentSecondary || '#bd00ff'),
      accentSecondaryContrast: () => new Color(colors?.accentSecondaryContrast || '#FFFFFF'),
      error: () => new Color(colors?.error || '#ff2b2b'),
    },
    shape: {
      radiusFactor: 0.5,
      ...shape,
    },
  };

  return theme;
};

export default createTheme;
