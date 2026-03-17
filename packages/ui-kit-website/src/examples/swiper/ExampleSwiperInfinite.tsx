import * as React from 'react';
import Swiper, { SwiperSlide } from '@via-profit/ui-kit/src/Swiper';
import { ColorGenerator } from '@via-profit/ui-kit/src/Color';
import styled from '@emotion/styled';

const colors = ColorGenerator.generatePalette('swiper-infinite', 4);

const Slide = styled(SwiperSlide)`
  font-size: 3em;
  padding: 1em 0;
  font-weight: bold;
`;

const ExampleSwiperInfinite: React.FC = () => (
  <Swiper infinite onSlideChange={realIndex => console.debug(`Slide changed to ${realIndex}`)}>
    {colors.map((color, index) => (
      <Slide key={color.toString()} style={{ backgroundColor: color.darken(60).toString() }}>
        {index + 1}
      </Slide>
    ))}
  </Swiper>
);

export default ExampleSwiperInfinite;
