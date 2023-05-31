import React from 'react';
import createTheme from './createTheme';
import { ThemeProvider as EmotionProvider } from '@emotion/react';
import type { ColorInterface } from '../color';

export interface UITheme {
  readonly isDark: boolean;
  readonly fontSize: Record<'small' | 'normal' | 'medium' | 'large', number>;
  readonly zIndex: {
    readonly header: number;
    readonly mainDrawer: number;
    readonly modal: number;
  };
  readonly grid: {
    readonly frameGutter: number;
    readonly safeFrame: string;
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
  readonly grid?: UITheme['grid'];
  readonly colors?: Record<keyof UITheme['colors'], string>;
  readonly shape?: UITheme['shape'];
}

export { createTheme };

export interface ThemeProviderProps {
  readonly children: React.ReactNode | readonly React.ReactNode[];
  readonly theme: UITheme;
}

const ThemeProvider: React.FC<ThemeProviderProps> = props => {
  const { children, theme } = props;

  return <EmotionProvider theme={theme}>{children}</EmotionProvider>;
};

export default ThemeProvider;
