import React from 'react';
import styled from '@emotion/styled';
import Slider from '@via-profit/ui-kit/src/Slider';
import { useIntl } from 'react-intl';

const Row = styled.div`
  display: flex;
  gap: 2em;
`;

const ExampleSliderVertical: React.FC = () => {
  const intl = useIntl();
  const label = intl.formatMessage({ defaultMessage: 'Уровень' });

  return (
    <Row>
      <Slider orientation="vertical" defaultValue={30} aria-label={label} />
      <Slider orientation="vertical" defaultValue={[20, 70]} color="#e0435f" getAriaLabel={() => label} />
      <Slider
        orientation="vertical"
        defaultValue={50}
        marks={[
          { value: 0, label: '0 °C' },
          { value: 50, label: '50 °C' },
          { value: 100, label: '100 °C' },
        ]}
        aria-label={label}
      />
      <Slider orientation="vertical" defaultValue={60} disabled aria-label={label} />
    </Row>
  );
};

export default ExampleSliderVertical;
