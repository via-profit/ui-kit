import React from 'react';
import styled from '@emotion/styled';
import Swiper, { SwiperSlide } from '@via-profit/ui-kit/src/Swiper';
import Surface from '@via-profit/ui-kit/src/Surface';
import { useIntl } from 'react-intl';

const Slide = styled(SwiperSlide)`
  padding: 0.5em;
  height: auto;
  align-items: stretch;
`;

const Card = styled(Surface)`
  width: 100%;
  margin: 0;
`;

const Price = styled.div`
  font-size: 1.6em;
  font-weight: 700;
`;

const ExampleSwiperCentered: React.FC = () => {
  const intl = useIntl();
  const plans = [
    { name: intl.formatMessage({ defaultMessage: 'Старт' }), price: 0 },
    { name: intl.formatMessage({ defaultMessage: 'Базовый' }), price: 490 },
    { name: intl.formatMessage({ defaultMessage: 'Команда' }), price: 1490 },
    { name: intl.formatMessage({ defaultMessage: 'Бизнес' }), price: 3990 },
  ];

  return (
    <Swiper
      infinite
      centered
      slidesPerView={1.4}
      aria-label={intl.formatMessage({ defaultMessage: 'Тарифы' })}
    >
      {plans.map(plan => (
        <Slide key={plan.name}>
          <Card header={plan.name}>
            <Price>
              {intl.formatNumber(plan.price, {
                style: 'currency',
                currency: 'RUB',
                maximumFractionDigits: 0,
              })}
            </Price>
            {intl.formatMessage({ defaultMessage: 'в месяц' })}
          </Card>
        </Slide>
      ))}
    </Swiper>
  );
};

export default ExampleSwiperCentered;
