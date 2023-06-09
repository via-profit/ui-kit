import React from 'react';
import styled from '@emotion/styled';

import createTheme from '@via-profit/ui-kit/src/ThemeProvider/createTheme';
import Color from '@via-profit/ui-kit/src/color/Color';
import ThemeProvider from '@via-profit/ui-kit/src/ThemeProvider';
import Button from '@via-profit/ui-kit/src/Button';
import H2 from '@via-profit/ui-kit/src/Typography/H2';
import Typography from '@via-profit/ui-kit/src/Typography';

const ColorBox = styled.span<{ $color: string }>`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background-color: ${({ $color }) => $color};
`;

const Theming: React.FC = () => {
  const themeBlue = React.useMemo(
    () =>
      createTheme({
        colors: {
          textPrimary: 'blue',
          accentPrimary: 'blue',
          textSecondary: 'violet',
        },
      }),
    [],
  );
  const redTheme = React.useMemo(
    () =>
      createTheme({
        colors: {
          textPrimary: 'red',
          accentPrimary: 'red',
          textSecondary: 'orange',
        },
      }),
    [],
  );

  const initialColor = new Color('red');
  const color1 = new Color(initialColor).darken(100).hexString();
  const color2 = initialColor.lighten(200).alpha(0.2).rgbString();
  const color3 = initialColor.darken(300).rgbString();

  return (
    <>
      <div>
        <p>
          initial: <ColorBox $color={initialColor.rgbString()} />
        </p>
        <p>
          Color 1: <ColorBox $color={color1} />
        </p>
        <p>
          Color 2: <ColorBox $color={color2} />
        </p>
        <p>
          Color 3: <ColorBox $color={color3} />
        </p>
        <p></p>
      </div>
      <ThemeProvider theme={themeBlue}>
        <H2>Blue theme</H2>
        <Typography>Aliqua elit amet est aliqua minim.</Typography>
        <Button variant="accent">Ok</Button>
      </ThemeProvider>

      <ThemeProvider theme={redTheme}>
        <H2>Red theme</H2>
        <Typography>Deserunt aute elit quis ullamco aute minim sit..</Typography>
        <Button variant="accent">Ok</Button>
      </ThemeProvider>
    </>
  );
};

export default Theming;
