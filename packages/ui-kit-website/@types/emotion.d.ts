import { UITheme } from '../../ui-kit/src/ThemeProvider';

declare module '@emotion/react' {
  export interface Theme extends UITheme {}
  // import Color from '../../ui-kit/src/Color';

  // export interface UIThemeOverrideColor {
  //   readonly backgroundPrimary: string;
  //   readonly backgroundSecondary: string;
  //   readonly surface: string;
  //   readonly textPrimary: string;
  //   readonly textSecondary: string;
  //   readonly accentPrimary: string;
  //   readonly accentPrimaryContrast: string;
  //   readonly accentSecondary: string;
  //   readonly accentSecondaryContrast: string;
  //   readonly error: string;
  // }

  // export interface Theme {
  //   readonly isDark: boolean;
  //   readonly colors: Record<keyof UIThemeOverrideColor, Color>;
  // }
}
