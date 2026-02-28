import React, { useState, useRef, useCallback } from 'react';
import styled from '@emotion/styled';
import Button from '@via-profit/ui-kit/src/Button';

type Props = {
  readonly children: readonly React.ReactNode[];
};

const SliderContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 200px;
  background-color: gray;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
`;

const SliderWrapper = styled.div`
  overflow: hidden;
  touch-action: pan-y;
  height: 100%;
  user-select: none;
`;

const SliderTrack = styled.div<{ isDragging: boolean }>`
  display: flex;
  height: 100%;
  transition: ${props => (props.isDragging ? 'none' : 'transform 0.3s ease')};
`;

export const Slide = styled.div`
  flex: 0 0 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  border: 1px solid #ddd;
  font-size: 24px;
  user-select: none;
  box-sizing: border-box;
`;

const SliderControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 15px;
`;

const ControlButton = styled(Button)`
  padding: 8px 16px;
  font-size: 18px;
  cursor: pointer;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 4px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Swiper: React.FC<Props> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offset, setOffset] = useState(0);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const lastX = useRef(0);
  const width = useRef(0);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const minSwipe = 50;

  const onPointerDown = (e: React.PointerEvent) => {
    if (!wrapperRef.current) return;

    width.current = wrapperRef.current.offsetWidth;
    isDragging.current = true;
    startX.current = e.clientX;
    lastX.current = e.clientX;

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;

    lastX.current = e.clientX;
    const delta = lastX.current - startX.current;

    let newOffset = delta;

    if (currentIndex === 0 && delta > 0) newOffset = delta * 0.3;
    if (currentIndex === children.length - 1 && delta < 0) newOffset = delta * 0.3;

    setOffset(newOffset);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;

    const delta = lastX.current - startX.current;

    if (Math.abs(delta) > minSwipe) {
      if (delta < 0 && currentIndex < children.length - 1) {
        setCurrentIndex(i => i + 1);
      } else if (delta > 0 && currentIndex > 0) {
        setCurrentIndex(i => i - 1);
      }
    }

    setOffset(0);
    isDragging.current = false;

    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const goNext = useCallback(() => {
    setCurrentIndex(i => Math.min(i + 1, children.length - 1));
  }, [children.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex(i => Math.max(i - 1, 0));
  }, []);

  const trackX = `calc(${-currentIndex * 100}% + ${offset}px)`;

  return (
    <SliderContainer>
      <SliderWrapper
        ref={wrapperRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <SliderTrack isDragging={isDragging.current} style={{ transform: `translateX(${trackX})` }}>
          {React.Children.map(children, child => (
            <Slide>{child}</Slide>
          ))}
        </SliderTrack>
      </SliderWrapper>

      <SliderControls>
        <ControlButton type="button" onClick={goPrev} disabled={currentIndex === 0}>
          ←
        </ControlButton>
        <span>
          {currentIndex + 1} / {children.length}
        </span>
        <ControlButton
          type="button"
          onClick={goNext}
          disabled={currentIndex === children.length - 1}
        >
          →
        </ControlButton>
      </SliderControls>
    </SliderContainer>
  );
};

export default Swiper;
