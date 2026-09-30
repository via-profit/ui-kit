import React from 'react';
import styled from '@emotion/styled';
import Checkbox from '@via-profit/ui-kit/src/Checkbox';
import { FormattedMessage, useIntl } from 'react-intl';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75em;
`;

const Nested = styled(Column)`
  padding-left: 1.75em;
`;

const ExampleCheckboxIndeterminate: React.FC = () => {
  const intl = useIntl();
  const toppings = [
    intl.formatMessage({ defaultMessage: 'Сыр' }),
    intl.formatMessage({ defaultMessage: 'Грибы' }),
    intl.formatMessage({ defaultMessage: 'Оливки' }),
  ];
  const [selected, setSelected] = React.useState<readonly number[]>([0]);
  const isAllSelected = selected.length === toppings.length;

  return (
    <Column>
      <Checkbox
        checked={isAllSelected}
        indeterminate={selected.length > 0 && !isAllSelected}
        onChange={() => setSelected(isAllSelected ? [] : toppings.map((_, index) => index))}
      >
        <FormattedMessage defaultMessage="Все добавки" />
      </Checkbox>
      <Nested>
        {toppings.map((topping, index) => (
          <Checkbox
            key={topping}
            checked={selected.includes(index)}
            onChange={event => {
              // Read the value right away: currentTarget is null inside the state updater
              const { checked } = event.currentTarget;
              setSelected(current =>
                checked ? [...current, index] : current.filter(item => item !== index),
              );
            }}
          >
            {topping}
          </Checkbox>
        ))}
      </Nested>
    </Column>
  );
};

export default ExampleCheckboxIndeterminate;
