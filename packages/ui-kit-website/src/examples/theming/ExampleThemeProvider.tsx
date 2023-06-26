import React from 'react';
import createTheme from '@via-profit/ui-kit/src/ThemeProvider/createTheme';
import ThemeProvider from '@via-profit/ui-kit/src/ThemeProvider';
import Button from '@via-profit/ui-kit/src/Button';

const ExampleThemeProvider: React.FC = () => {
  const theme = React.useMemo(
    () =>
      createTheme({
        isDark: false,
        colors: {
          accentPrimary: '#66b13d',
          accentPrimaryContrast: '#FFFFFF',
        },
      }),
    [],
  );

  return (
    <ThemeProvider theme={theme}>
      <Button color="primary">The Button Standard</Button>
      <Button color="primary" variant="outlined">
        The Button Outlined
      </Button>
    </ThemeProvider>
  );
};

export default ExampleThemeProvider;
