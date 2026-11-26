import React from 'react';
import UIThemeProvider from '@via-profit/ui-kit/ThemeProvider';
import type { UITheme } from '@via-profit/ui-kit/ThemeProvider';

import { useUi } from '~/providers/UiProvider';
import createSiteTheme from '~/themes/createSiteTheme';
import themeDark from '~/themes/dark';
import themeLight from '~/themes/light';
import GlobalStyles from './GlobalStyles';

const ThemeProvider: React.FC<{ readonly children: React.ReactNode }> = ({ children }) => {
  const { theme: themeName } = useUi();
  const theme = React.useMemo(
    () => createSiteTheme(themeName === 'dark' ? themeDark : themeLight),
    [themeName],
  );

  return (
    <UIThemeProvider theme={theme as UITheme}>
      <GlobalStyles />
      {children}
    </UIThemeProvider>
  );
};

export default ThemeProvider;
