import React from 'react';
import styled from '@emotion/styled';
import ThemeProvider, { createTheme } from '@via-profit/ui-kit/src/ThemeProvider';
import Button from '@via-profit/ui-kit/src/Button';
import Surface from '@via-profit/ui-kit/src/Surface';
import Paragraph from '@via-profit/ui-kit/src/Typography/Paragraph';
import { FormattedMessage } from 'react-intl';

import useSiteThemeOverrides from './useSiteThemeOverrides';
import themeDark from '~/themes/dark';
import themeLight from '~/themes/light';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16em, 1fr));
  gap: 1em;
`;

const Block = styled.div`
  padding: 1em;
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  background-color: ${({ theme }) => theme.color.backgroundPrimary.toString()};
  color: ${({ theme }) => theme.color.textPrimary.toString()};
`;

const ExampleMultiThemming: React.FC = () => {
  const base = useSiteThemeOverrides();

  const blueTheme = React.useMemo(
    () =>
      createTheme({
        ...base,
        color: { ...base.color, accentPrimary: '#2a78fd', accentPrimaryContrast: '#ffffff' },
      }),
    [base],
  );
  const pinkTheme = React.useMemo(
    () =>
      createTheme({
        ...base,
        color: { ...base.color, accentPrimary: '#ff5671', accentPrimaryContrast: '#ffffff' },
      }),
    [base],
  );
  // The opposite of the site theme: a light block on a dark page and vice versa
  const invertedTheme = React.useMemo(
    () => createTheme(base.isDark ? themeLight : themeDark),
    [base],
  );

  return (
    <Grid>
      {[blueTheme, pinkTheme, invertedTheme].map((theme, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ThemeProvider key={index} theme={theme}>
          <Block>
            <Surface header={<FormattedMessage defaultMessage="Карточка" />}>
              <Paragraph>
                <FormattedMessage defaultMessage="Своя тема внутри блока" />
              </Paragraph>
              <Button color="primary">
                <FormattedMessage defaultMessage="Действие" />
              </Button>
            </Surface>
          </Block>
        </ThemeProvider>
      ))}
    </Grid>
  );
};

export default ExampleMultiThemming;
