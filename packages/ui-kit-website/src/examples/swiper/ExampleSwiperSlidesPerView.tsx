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
  font-size: 1.3em;
  font-weight: 700;
`;

const ExampleSwiperSlidesPerView: React.FC = () => {
  const intl = useIntl();
  const products = [
    { name: intl.formatMessage({ defaultMessage: 'Кофе в зёрнах' }), price: 890 },
    { name: intl.formatMessage({ defaultMessage: 'Френч-пресс' }), price: 1450 },
    { name: intl.formatMessage({ defaultMessage: 'Кофемолка' }), price: 2990 },
    { name: intl.formatMessage({ defaultMessage: 'Турка' }), price: 760 },
    { name: intl.formatMessage({ defaultMessage: 'Капельная кофеварка' }), price: 5490 },
    { name: intl.formatMessage({ defaultMessage: 'Набор чашек' }), price: 1290 },
  ];

  return (
    <Swiper
      infinite
      slidesPerView={3}
      aria-label={intl.formatMessage({ defaultMessage: 'Похожие товары' })}
    >
      {products.map(product => (
        <Slide key={product.name}>
          <Card header={product.name}>
            <Price>
              {intl.formatNumber(product.price, {
                style: 'currency',
                currency: 'RUB',
                maximumFractionDigits: 0,
              })}
            </Price>
          </Card>
        </Slide>
      ))}
    </Swiper>
  );
};

export default ExampleSwiperSlidesPerView;
