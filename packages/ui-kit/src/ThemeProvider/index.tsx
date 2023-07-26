import React from 'react';
import { ThemeProvider as EmotionProvider, useTheme } from '@emotion/react';

import type Color from '../Color';

export { useTheme };

export * from './createTheme';

export interface UITheme {
  readonly isDark: boolean;
  readonly fontSize: Record<keyof UIThemeOverrideFontSize, number>;
  readonly zIndex: Required<UIThemeOverrideZIndex>;
  readonly color: Record<keyof UIThemeOverrideColor, Color>;
  readonly shape: Required<UIThemeOverrideShape>;
}

export interface UIThemeOverrideColor {
  readonly backgroundPrimary?: string;
  readonly backgroundSecondary?: string;
  readonly surface?: string;
  readonly textPrimary?: string;
  readonly textSecondary?: string;
  readonly accentPrimary?: string;
  readonly accentPrimaryContrast?: string;
  readonly accentSecondary?: string;
  readonly accentSecondaryContrast?: string;
  readonly error?: string;
  readonly errorContrast?: string;
  readonly warning?: string;
  readonly warningContrast?: string;
  readonly success?: string;
  readonly successContrast?: string;
}

export interface UIThemeOverrideZIndex {
  readonly header?: number;
  readonly mainDrawer?: number;
  readonly modal?: number;
}

export interface UIThemeOverrideShape {
  readonly radiusFactor?: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
}

export interface UIThemeOverrideFontSize {
  readonly small?: number;
  readonly normal?: number;
  readonly medium?: number;
  readonly large?: number;
}

export interface UIThemeOverrides {
  readonly isDark: boolean;
  readonly fontSize?: UIThemeOverrideFontSize;
  readonly zIndex?: UIThemeOverrideZIndex;
  readonly shape?: UIThemeOverrideShape;
  readonly color?: UIThemeOverrideColor;
}

const ThemeProvider: React.FC<ThemeProviderProps> = props => {
  const { children, theme } = props;

  return <EmotionProvider theme={theme}>{children}</EmotionProvider>;
};

export type CreateTheme = (overrides?: UIThemeOverrides) => UITheme;

export interface ThemeProviderProps {
  readonly children: React.ReactNode | readonly React.ReactNode[];
  readonly theme: UITheme;
}

export default ThemeProvider;
