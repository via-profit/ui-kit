import React from 'react';
import styled from '@emotion/styled';
import ThemeProvider, { createTheme } from '@via-profit/ui-kit/src/ThemeProvider';
import Button from '@via-profit/ui-kit/src/Button';
import Badge from '@via-profit/ui-kit/src/Badge';
import Switch from '@via-profit/ui-kit/src/Switch';
import { FormattedMessage } from 'react-intl';

import useSiteThemeOverrides from './useSiteThemeOverrides';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5em;
`;

const ExampleThemeProvider: React.FC = () => {
  const base = useSiteThemeOverrides();
  const [checked, setChecked] = React.useState(true);

  // Only the accent differs from the site theme
  const theme = React.useMemo(
    () =>
      createTheme({
        ...base,
        color: {
          ...base.color,
          accentPrimary: '#66b13d',
          accentPrimaryContrast: '#ffffff',
        },
      }),
    [base],
  );

  return (
    <ThemeProvider theme={theme}>
      <Row>
        <Button color="primary">
          <FormattedMessage defaultMessage="Кнопка" />
        </Button>
        <Button color="primary" variant="outlined">
          <FormattedMessage defaultMessage="Кнопка" />
        </Button>
        <Badge color="primary">
          <FormattedMessage defaultMessage="Бейдж" />
        </Badge>
        <Switch checked={checked} onChange={() => setChecked(value => !value)} />
      </Row>
    </ThemeProvider>
  );
};

export default ExampleThemeProvider;
