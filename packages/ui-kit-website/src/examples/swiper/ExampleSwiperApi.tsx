import React from 'react';
import styled from '@emotion/styled';
import Swiper, { SwiperRef, SwiperSlide } from '@via-profit/ui-kit/src/Swiper';
import Button from '@via-profit/ui-kit/src/Button';
import { ColorGenerator } from '@via-profit/ui-kit/src/Color';
import { FormattedMessage, useIntl } from 'react-intl';

const colors = ColorGenerator.generatePalette('swiper-api', 5);

const Slide = styled(SwiperSlide)`
  height: 12em;
  font-size: 2em;
  font-weight: 700;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
  margin-top: 1em;
`;

const Dots = styled.div`
  display: flex;
  gap: 0.5em;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: 0.8em;
  height: 0.8em;
  padding: 0;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${({ theme, $active }) =>
    $active
      ? theme.color.accentPrimary.toString()
      : theme.color.textPrimary.alpha(0.25).toString()};
`;

const ExampleSwiperApi: React.FC = () => {
  const intl = useIntl();
  const swiperRef = React.useRef<SwiperRef | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  return (
    <div>
      <Swiper
        ref={swiperRef}
        onSlideChange={setCurrentIndex}
        aria-label={intl.formatMessage({ defaultMessage: 'Фотографии' })}
      >
        {colors.map((color, index) => (
          <Slide
            key={color.toString()}
            style={{
              backgroundColor: color.toString(),
              color: color.getContrastColor().toString(),
            }}
          >
            {index + 1}
          </Slide>
        ))}
      </Swiper>
      <Controls>
        <Button disabled={currentIndex === 0} onClick={() => swiperRef.current?.prev()}>
          <FormattedMessage defaultMessage="Назад" />
        </Button>
        <Dots>
          {colors.map((color, index) => (
            <Dot
              key={color.toString()}
              type="button"
              $active={index === currentIndex}
              aria-label={intl.formatMessage(
                { defaultMessage: 'Слайд {number}' },
                { number: index + 1 },
              )}
              aria-current={index === currentIndex}
              onClick={() => swiperRef.current?.goToIndex(index)}
            />
          ))}
        </Dots>
        <Button
          disabled={currentIndex === colors.length - 1}
          onClick={() => swiperRef.current?.next()}
        >
          <FormattedMessage defaultMessage="Вперёд" />
        </Button>
      </Controls>
    </div>
  );
};

export default ExampleSwiperApi;
