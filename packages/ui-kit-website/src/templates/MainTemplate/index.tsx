import React from 'react';
import { Outlet } from 'react-router-dom';
import ThemeProvider, { createTheme } from '@via-profit/ui-kit/ThemeProvider';

import Inner from './Inner';
import themeDark from '~/themes/dark';
import themeLight from '~/themes/light';

const MainTemplate: React.FC = () => {
  const theme = createTheme(themeLight);

  return (
    <ThemeProvider theme={theme}>
      <Inner>
        <Outlet />
      </Inner>
    </ThemeProvider>
  );
};

export default MainTemplate;
