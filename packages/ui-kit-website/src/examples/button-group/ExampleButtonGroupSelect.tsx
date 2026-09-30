import React from 'react';
import styled from '@emotion/styled';
import ButtonGroup from '@via-profit/ui-kit/src/ButtonGroup';
import Button from '@via-profit/ui-kit/src/Button';
import { FormattedMessage, useIntl } from 'react-intl';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1em;
`;

const ExampleButtonGroupSelect: React.FC = () => {
  const intl = useIntl();
  const [period, setPeriod] = React.useState<string | null>('week');

  return (
    <Column>
      <ButtonGroup
        aria-label={intl.formatMessage({ defaultMessage: 'Период' })}
        value={period}
        onChange={setPeriod}
      >
        <Button value="day">
          <FormattedMessage defaultMessage="День" />
        </Button>
        <Button value="week">
          <FormattedMessage defaultMessage="Неделя" />
        </Button>
        <Button value="month">
          <FormattedMessage defaultMessage="Месяц" />
        </Button>
      </ButtonGroup>
      <span>
        <FormattedMessage defaultMessage="Выбрано: {period}" values={{ period }} />
      </span>
    </Column>
  );
};

export default ExampleButtonGroupSelect;
