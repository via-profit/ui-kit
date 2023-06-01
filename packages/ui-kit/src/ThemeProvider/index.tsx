import React from 'react';
import { UITheme } from './createTheme';
import { ThemeProvider as EmotionProvider } from '@emotion/react';

export interface ThemeProviderProps {
  readonly children: React.ReactNode | readonly React.ReactNode[];
  readonly theme: UITheme;
}

const ThemeProvider: React.FC<ThemeProviderProps> = props => {
  const { children, theme } = props;

  return <EmotionProvider theme={theme}>{children}</EmotionProvider>;
};

export default ThemeProvider;
