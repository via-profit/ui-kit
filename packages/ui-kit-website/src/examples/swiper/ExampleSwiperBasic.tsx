import * as React from 'react';
import Swiper, { SwiperSlide } from '@via-profit/ui-kit/src/Swiper';
import { ColorGenerator } from '@via-profit/ui-kit/src/Color';
import styled from '@emotion/styled';

const colors = ColorGenerator.generatePalette('swiper', 4);

const Slide = styled(SwiperSlide)`
  font-size: 3em;
  padding: 4em 0;
  font-weight: bold;
`;

const ExampleSwiperBasic: React.FC = () => (
  <Swiper>
    {colors.map((color, index) => (
      <Slide key={color.toString()} style={{ backgroundColor: color.toString() }}>
        {index + 1}
      </Slide>
    ))}
  </Swiper>
);

export default ExampleSwiperBasic;
