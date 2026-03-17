import * as React from 'react';
import Swiper, { SwiperSlide } from '@via-profit/ui-kit/src/Swiper';
import { ColorGenerator } from '@via-profit/ui-kit/src/Color';
import styled from '@emotion/styled';
import Button from '@via-profit/ui-kit/src/Button';

const colors = ColorGenerator.generatePalette('swiper-change-slides', 3);

const Slide = styled(SwiperSlide)`
  font-size: 3em;
  padding: 1em 0;
  font-weight: bold;
`;

const ExampleSwiperChangeSlides: React.FC = () => {
  const [slides, setSlides] = React.useState(colors);

  return (
    <div>
      <Swiper infinite>
        {slides.map((slide, index) => (
          <Slide key={index} style={{ backgroundColor: slide.darken(60).toString() }}>
            {index + 1}
          </Slide>
        ))}
      </Swiper>
      <Button
        onClick={() => {
          const newSlides = ColorGenerator.generatePalette(`swiper-${Math.random() * 9000}`, 1);
          setSlides(s => [...newSlides, ...s]);
        }}
      >
        Append 1 slide to start
      </Button>
      <Button
        onClick={() => {
          const newSlides = ColorGenerator.generatePalette(`swiper-${Math.random() * 9000}`, 1);
          setSlides(s => [...s, ...newSlides]);
        }}
      >
        Append 1 slide to end
      </Button>
      <Button
        disabled={slides.length < 3}
        onClick={() => {
          setSlides(s => s.slice(0, -1));
        }}
      >
        Remove 1 slide from the end
      </Button>
    </div>
  );
};

export default ExampleSwiperChangeSlides;
