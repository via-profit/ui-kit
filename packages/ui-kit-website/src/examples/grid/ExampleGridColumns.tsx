import React from 'react';
import styled from '@emotion/styled';
import Grid from '@via-profit/ui-kit/src/Grid';
import Surface from '@via-profit/ui-kit/src/Surface';
import { FormattedMessage, useIntl } from 'react-intl';

const Value = styled.div`
  font-size: 1.6em;
  font-weight: 700;
`;

const ExampleGridColumns: React.FC = () => {
  const intl = useIntl();

  return (
    <Grid gap="lg">
      {/* Equal columns */}
      <Grid columns={3}>
        <Surface header={<FormattedMessage defaultMessage="Заказы" />}>
          <Value>128</Value>
        </Surface>
        <Surface header={<FormattedMessage defaultMessage="Выручка" />}>
          <Value>
            {intl.formatNumber(412000, {
              style: 'currency',
              currency: 'RUB',
              notation: 'compact',
            })}
          </Value>
        </Surface>
        <Surface header={<FormattedMessage defaultMessage="Возвраты" />}>
          <Value>3</Value>
        </Surface>
      </Grid>

      {/* The content and the sidebar */}
      <Grid columns="2fr 1fr" align="start">
        <Surface header={<FormattedMessage defaultMessage="Основная часть" />}>
          <FormattedMessage defaultMessage="Колонка в два раза шире боковой." />
        </Surface>
        <Surface header={<FormattedMessage defaultMessage="Боковая колонка" />}>
          <FormattedMessage defaultMessage="Фильтры, сводка, подсказки." />
        </Surface>
      </Grid>
    </Grid>
  );
};

export default ExampleGridColumns;
