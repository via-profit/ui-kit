import React from 'react';
import { ThemeProvider as EmotionProvider } from '@emotion/react';
import type { ThemeProviderProps, UIThemeOverrides } from '@via-profit/ui-kit/ThemeProvider';

const ThemeProvider: React.FC<ThemeProviderProps> = props => {
  const { children, theme } = props;

  return <EmotionProvider theme={theme}>{children}</EmotionProvider>;
};

export type { UIThemeOverrides };

export default ThemeProvider;
