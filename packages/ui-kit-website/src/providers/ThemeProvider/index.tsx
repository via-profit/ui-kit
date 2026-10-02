import React from 'react';
import UIThemeProvider, { UIThemeOverrides } from '@via-profit/ui-kit/src/ThemeProvider';
import createTheme from '@via-profit/ui-kit/src/ThemeProvider/createTheme';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import GloalStyles from './GlobalStyles';
import themeDark from '~/themes/dark';
import themeLight from '~/themes/light';
import createWindows11Theme from '~/themes/windows11';
import createMacosTheme from '~/themes/macos';
import createMaterialTheme from '~/themes/material';
import TEST_THEMES_ENABLED from '~/themes/testThemes';

export interface ThemeProviderProps {
  readonly children: React.ReactNode | readonly React.ReactNode[];
}

const selector = createStructuredSelector({
  themeName: (store: ReduxStore) => store.ui.theme,
  themeStyle: (store: ReduxStore) => store.ui.themeStyle,
});

const ThemeProvider: React.FC<ThemeProviderProps> = props => {
  const { children } = props;
  const { themeName, themeStyle } = useSelector(selector);
  const theme = React.useMemo(() => {
    // The test themes: they check how well ui-kit can be customized
    const testThemes = {
      windows11: createWindows11Theme,
      macos: createMacosTheme,
      material: createMaterialTheme,
    };
    // A saved test theme is ignored on the published site, where the test themes are hidden
    if (TEST_THEMES_ENABLED && themeStyle !== 'default') {
      return createTheme(testThemes[themeStyle](themeName === 'dark'));
    }

    const themesMap: Record<ReduxStore['ui']['theme'], UIThemeOverrides> = {
      light: themeLight,
      dark: themeDark,
    };

    return createTheme(themesMap[themeName]);
  }, [themeName, themeStyle]);

  return (
    <UIThemeProvider theme={theme}>
      <GloalStyles />
      {children}
    </UIThemeProvider>
  );
};

export default ThemeProvider;
