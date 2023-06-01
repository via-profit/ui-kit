import React from 'react';
import UIThemeProvider from '@via-profit/ui-kit/src/ThemeProvider';
import createTheme from '@via-profit/ui-kit/src/ThemeProvider/createTheme';

import GloalStyles from './GlobalStyles';
// import themeDark from '~/themes/dark';
import themeLight from '~/themes/light';

export interface ThemeProviderProps {
  readonly children: React.ReactNode | readonly React.ReactNode[];
}

const ThemeProvider: React.FC<ThemeProviderProps> = props => {
  const { children } = props;
  const theme = createTheme(themeLight);

  return (
    <UIThemeProvider theme={theme}>
      <GloalStyles />
      {children}
    </UIThemeProvider>
  );
};

export default ThemeProvider;
