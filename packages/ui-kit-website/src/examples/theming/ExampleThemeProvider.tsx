import React from 'react';
import createTheme from '@via-profit/ui-kit/src/ThemeProvider/createTheme';
import ThemeProvider from '@via-profit/ui-kit/src/ThemeProvider';
import Button from '@via-profit/ui-kit/src/Button';
import styled from '@emotion/styled';

const Container = styled.div`
  & > button:last-of-type {
    margin-left: 1em;
  }
`;

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
      <Container>
        <Button color="primary">The Button Standard</Button>
        <Button color="primary" variant="outlined">
          The Button Outlined
        </Button>
      </Container>
    </ThemeProvider>
  );
};

export default ExampleThemeProvider;
