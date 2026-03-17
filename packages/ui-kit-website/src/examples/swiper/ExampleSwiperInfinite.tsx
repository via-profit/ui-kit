import * as React from 'react';
import Swiper, { SwiperSlide } from '@via-profit/ui-kit/src/Swiper';
import { ColorGenerator } from '@via-profit/ui-kit/src/Color';
import styled from '@emotion/styled';

const colors = ColorGenerator.generatePalette('swiper-infinite', 16);

const Slide = styled(SwiperSlide)`
  font-size: 3em;
  padding: 1em 0;
  font-weight: bold;
`;

const ExampleSwiperInfinite: React.FC = () => (
  <Swiper infinite>
    {colors.map((color, index) => (
      <Slide key={index} style={{ backgroundColor: color.darken(60).toString() }}>
        {index + 1}
      </Slide>
    ))}
  </Swiper>
);

export default ExampleSwiperInfinite;
