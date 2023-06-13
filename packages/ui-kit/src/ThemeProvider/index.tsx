import React from 'react';
import { ThemeProvider as EmotionProvider } from '@emotion/react';
import type { UITheme, UIThemeOverrides } from '@via-profit/ui-kit';

export { UITheme, UIThemeOverrides };

export interface ThemeProviderProps {
  readonly children: React.ReactNode | readonly React.ReactNode[];
  readonly theme: UITheme;
}

const ThemeProvider: React.FC<ThemeProviderProps> = props => {
  const { children, theme } = props;

  return <EmotionProvider theme={theme}>{children}</EmotionProvider>;
};

export default ThemeProvider;
