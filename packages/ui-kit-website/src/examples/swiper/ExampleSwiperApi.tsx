import * as React from 'react';
import Swiper, { SwiperRef, SwiperSlide } from '@via-profit/ui-kit/src/Swiper';
import { ColorGenerator } from '@via-profit/ui-kit/src/Color';
import styled from '@emotion/styled';
import Button from '@via-profit/ui-kit/src/Button';

const colors = ColorGenerator.generatePalette('swiper-api', 4);

const Slide = styled(SwiperSlide)`
  font-size: 3em;
  padding: 1em 0;
  font-weight: bold;
`;

const ExampleSwiperApi: React.FC = () => {
  const swiperRef = React.useRef<SwiperRef | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  return (
    <div>
      <Swiper ref={swiperRef}  onSlideChange={setCurrentIndex} infinite>
        {colors.map((color, index) => (
          <Slide key={color.toString()} style={{ backgroundColor: color.darken(60).toString() }}>
            {index + 1}
          </Slide>
        ))}
      </Swiper>
      <Button
        // disabled={currentIndex === 0}
        onClick={() => swiperRef.current?.prev()}>
        Go to previous slide
      </Button>
      <Button
        // disabled={currentIndex === colors.length - 1}
        onClick={() => swiperRef.current?.next()}
      >
        Go to next slide
      </Button>
    </div>
  );
};

export default ExampleSwiperApi;
