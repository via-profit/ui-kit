import React from 'react';
import UIThemeProvider, { UIThemeOverrides } from '@via-profit/ui-kit/src/ThemeProvider';
import createTheme from '@via-profit/ui-kit/src/ThemeProvider/createTheme';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import GloalStyles from './GlobalStyles';
import themeDark from '~/themes/dark';
import themeLight from '~/themes/light';
import themeGreen from '~/themes/green';
import themeGreenDark from '~/themes/greenDark';

export interface ThemeProviderProps {
  readonly children: React.ReactNode | readonly React.ReactNode[];
}

const selector = createStructuredSelector({
  themeName: (store: ReduxStore) => store.ui.theme,
});

const ThemeProvider: React.FC<ThemeProviderProps> = props => {
  const { children } = props;
  const { themeName } = useSelector(selector);
  const theme = React.useMemo(() => {
    const themesMap: Record<ReduxStore['ui']['theme'], UIThemeOverrides> = {
      light: themeLight,
      dark: themeDark,
      green: themeGreen,
      greenDark: themeGreenDark,
    };

    return createTheme(themesMap[themeName]);
  }, [themeName]);

  return (
    <UIThemeProvider theme={theme}>
      <GloalStyles />
      {children}
    </UIThemeProvider>
  );
};

export default ThemeProvider;
