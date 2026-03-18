import * as React from 'react';
import styled from '@emotion/styled';
import { ColorGenerator } from '@via-profit/ui-kit/src/Color';
import Swiper, { SwiperSlide } from '@via-profit/ui-kit/src/Swiper';

const Slide = styled(SwiperSlide)`
  font-size: 3em;
  padding: 1em 0;
  font-weight: bold;
`;

const colors = ColorGenerator.generatePalette('swiper', 8);

const ExampleSwiperSlidesPerView: React.FC = () => (
  <div>
  <Swiper slidesPerView={3} infinite>
    {colors.map((color, index) => (
      <Slide key={color.toString()} style={{ backgroundColor: color.darken(80).toString() }}>
        Индекс {index}
      </Slide>
    ))}
  </Swiper>
    <p>{' '}</p>
    <Swiper slidesPerView={3}>
      {colors.map((color, index) => (
        <Slide key={color.toString()} style={{ backgroundColor: color.darken(80).toString() }}>
          Индекс {index}
        </Slide>
      ))}
    </Swiper>
  </div>
);

export default ExampleSwiperSlidesPerView;
