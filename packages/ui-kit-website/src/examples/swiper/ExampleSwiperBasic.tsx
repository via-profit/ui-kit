import * as React from 'react';
import styled from '@emotion/styled';
import { ColorGenerator } from '@via-profit/ui-kit/src/Color';
import Swiper, { SwiperSlide } from '@via-profit/ui-kit/src/Swiper';

const Slide = styled(SwiperSlide)`
  font-size: 3em;
  padding: 1em 0;
  font-weight: bold;
`;

const colors = ColorGenerator.generatePalette('swiper', 3);

const ExampleSwiperBasic: React.FC = () => (
  <Swiper infinite>
    {colors.map((color, index) => (
      <Slide key={color.toString()} style={{ backgroundColor: color.toString() }}>
        Слайд {index + 1}
      </Slide>
    ))}
  </Swiper>
);

export default ExampleSwiperBasic;
