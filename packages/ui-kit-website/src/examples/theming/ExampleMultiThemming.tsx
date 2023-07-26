import React from 'react';
import ThemeProvider, { createTheme } from '@via-profit/ui-kit/src/ThemeProvider';
import Button from '@via-profit/ui-kit/src/Button';
import styled from '@emotion/styled';

const Container = styled.div`
  & > button:last-of-type {
    margin-left: 1em;
  }
`;

const ExampleMultiThemming: React.FC = () => {
  const themeBlue = React.useMemo(
    () =>
      createTheme({
        isDark: false,
        color: {
          accentPrimary: '#2a78fd',
        },
      }),
    [],
  );
  const themeRed = React.useMemo(
    () =>
      createTheme({
        isDark: false,
        color: {
          accentPrimary: '#ff5671',
        },
      }),
    [],
  );

  return (
    <Container>
      <ThemeProvider theme={themeBlue}>
        <Button color="primary" variant="outlined">
          Button
        </Button>
      </ThemeProvider>
      <ThemeProvider theme={themeRed}>
        <Button color="primary" variant="outlined">
          Button
        </Button>
      </ThemeProvider>
    </Container>
  );
};

export default ExampleMultiThemming;
