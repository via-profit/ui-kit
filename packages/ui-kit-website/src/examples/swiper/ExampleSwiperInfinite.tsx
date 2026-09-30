import React from 'react';
import styled from '@emotion/styled';
import Swiper, { SwiperSlide } from '@via-profit/ui-kit/src/Swiper';
import { ColorGenerator } from '@via-profit/ui-kit/src/Color';
import { useIntl } from 'react-intl';

const colors = ColorGenerator.generatePalette('swiper-banners', 4);

const Slide = styled(SwiperSlide)`
  height: 12em;
  font-size: 1.8em;
  font-weight: 700;
`;

const ExampleSwiperInfinite: React.FC = () => {
  const intl = useIntl();
  const banners = [
    intl.formatMessage({ defaultMessage: 'Скидки до 50%' }),
    intl.formatMessage({ defaultMessage: 'Бесплатная доставка' }),
    intl.formatMessage({ defaultMessage: 'Новая коллекция' }),
    intl.formatMessage({ defaultMessage: 'Подарок к заказу' }),
  ];

  return (
    <Swiper
      infinite
      autoplay
      autoplayInterval={4000}
      aria-label={intl.formatMessage({ defaultMessage: 'Акции' })}
    >
      {banners.map((banner, index) => (
        <Slide
          key={banner}
          style={{
            backgroundColor: colors[index].toString(),
            color: colors[index].getContrastColor().toString(),
          }}
        >
          {banner}
        </Slide>
      ))}
    </Swiper>
  );
};

export default ExampleSwiperInfinite;
