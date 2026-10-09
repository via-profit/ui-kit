import React from 'react';
import styled from '@emotion/styled';
import Swiper, { SwiperSlide } from '@via-profit/ui-kit/src/Swiper';
import { ColorGenerator } from '@via-profit/ui-kit/src/Color';
import { useIntl } from 'react-intl';

const colors = ColorGenerator.generatePalette('swiper-fade', 3);

const Slide = styled(SwiperSlide)`
  height: 12em;
  font-size: 1.8em;
  font-weight: 700;
`;

const ExampleSwiperFade: React.FC = () => {
  const intl = useIntl();
  const works = [
    intl.formatMessage({ defaultMessage: 'Интерьер кофейни' }),
    intl.formatMessage({ defaultMessage: 'Упаковка для чая' }),
    intl.formatMessage({ defaultMessage: 'Сайт обжарщика' }),
  ];

  return (
    <Swiper
      effect="fade"
      speed={1000}
      infinite
      autoplay
      aria-label={intl.formatMessage({ defaultMessage: 'Работы' })}
    >
      {works.map((work, index) => (
        <Slide
          key={work}
          style={{
            backgroundColor: colors[index].toString(),
            color: colors[index].getContrastColor().toString(),
          }}
        >
          {work}
        </Slide>
      ))}
    </Swiper>
  );
};

export default ExampleSwiperFade;
