import React from 'react';
import styled from '@emotion/styled';
import Slider from '@via-profit/ui-kit/src/Slider';
import { FormattedMessage, useIntl } from 'react-intl';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const ExampleSliderRange: React.FC = () => {
  const intl = useIntl();
  const [price, setPrice] = React.useState<readonly [number, number]>([2000, 6000]);
  const [committed, setCommitted] = React.useState(price);

  const formatPrice = (value: number) =>
    intl.formatNumber(value, { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });

  return (
    <Column>
      <span id="example-slider-price">
        <FormattedMessage
          defaultMessage="Цена: от {from} до {to}"
          values={{ from: formatPrice(price[0]), to: formatPrice(price[1]) }}
        />
      </span>
      <Slider
        value={price}
        onChange={setPrice}
        onChangeCommitted={setCommitted}
        min={0}
        max={10000}
        step={100}
        aria-labelledby="example-slider-price"
        getAriaLabel={index =>
          index === 0
            ? intl.formatMessage({ defaultMessage: 'Минимальная цена' })
            : intl.formatMessage({ defaultMessage: 'Максимальная цена' })
        }
        getAriaValueText={formatPrice}
      />
      <small>
        <FormattedMessage
          defaultMessage="Запрос к серверу: от {from} до {to}"
          values={{ from: formatPrice(committed[0]), to: formatPrice(committed[1]) }}
        />
      </small>
    </Column>
  );
};

export default ExampleSliderRange;
