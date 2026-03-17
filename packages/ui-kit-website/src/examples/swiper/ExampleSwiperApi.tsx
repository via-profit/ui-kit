import * as React from 'react';
import styled from '@emotion/styled';

import Swiper, { SwiperRef, SwiperSlide } from '@via-profit/ui-kit/src/Swiper';
import { ColorGenerator } from '@via-profit/ui-kit/src/Color';
import Button from '@via-profit/ui-kit/src/Button';

const colors = ColorGenerator.generatePalette('swiper-api', 3);

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
      <Swiper ref={swiperRef} onSlideChange={setCurrentIndex} draggable={false}>
        {colors.map((color, index) => (
          <Slide key={color.toString()} style={{ backgroundColor: color.darken(60).toString() }}>
            Слайд {index + 1}
          </Slide>
        ))}
      </Swiper>

      <Button
        disabled={currentIndex === 0}
        onClick={() => swiperRef.current?.prev()}>
        Предыдущий слайд
      </Button>
      <Button
        disabled={currentIndex === colors.length - 1}
        onClick={() => swiperRef.current?.next()}
      >
        Следующий слайд
      </Button>
    </div>
  );
};

export default ExampleSwiperApi;
