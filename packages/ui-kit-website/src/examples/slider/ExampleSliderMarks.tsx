import React from 'react';
import styled from '@emotion/styled';
import Slider from '@via-profit/ui-kit/src/Slider';
import { useIntl } from 'react-intl';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
`;

const ExampleSliderMarks: React.FC = () => {
  const intl = useIntl();

  const discounts = [0, 5, 10, 15, 20, 25].map(value => ({ value, label: `${value}%` }));

  return (
    <Column>
      <Slider
        defaultValue={10}
        min={0}
        max={25}
        step={5}
        marks={discounts}
        aria-label={intl.formatMessage({ defaultMessage: 'Скидка' })}
        getAriaValueText={value => `${value}%`}
      />
      <Slider
        defaultValue={3}
        min={1}
        max={10}
        marks
        color="secondary"
        aria-label={intl.formatMessage({ defaultMessage: 'Количество мест' })}
      />
    </Column>
  );
};

export default ExampleSliderMarks;
