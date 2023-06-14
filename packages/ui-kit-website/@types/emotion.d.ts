declare module '@emotion/react' {
  import { ColorInterface } from '@via-profit/ui-kit/color';

  export interface UIThemeOverrideColor {
    readonly backgroundPrimary: string;
    readonly backgroundSecondary: string;
    readonly surface: string;
    readonly textPrimary: string;
    readonly textSecondary: string;
    readonly accentPrimary: string;
    readonly accentPrimaryContrast: string;
    readonly accentSecondary: string;
    readonly accentSecondaryContrast: string;
    readonly error: string;
  }

  export interface Theme {
    readonly isDark: boolean;
    readonly colors: Record<keyof UIThemeOverrideColor, ColorInterface>;
  }
}
