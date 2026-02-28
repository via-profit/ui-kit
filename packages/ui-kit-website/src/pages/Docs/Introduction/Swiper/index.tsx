import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useImperativeHandle,
  forwardRef,
} from 'react';
import styled from '@emotion/styled';
import Button from '@via-profit/ui-kit/src/Button';

export type SwiperRef = {
  next(): void;
  prev(): void;
  goTo(index: number): void;
};

type Props = {
  children: React.ReactNode[];
  loop?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  inertia?: boolean;
  slidesPerView?: number;
};

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  height: 200px;
  margin: 0 auto;
  overflow: hidden;
  background: gray;
  position: relative;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  touch-action: pan-y;
  user-select: none;
`;

const Track = styled.div<{ dragging: boolean }>`
  display: flex;
  height: 100%;
  transition: ${p => (p.dragging ? 'none' : 'transform 0.35s cubic-bezier(0.22, 0.61, 0.36, 1)')};
`;

const Slide = styled.div<{ width: number }>`
  flex: 0 0 ${p => p.width}%;
  height: 100%;
  background: #f0f0f0;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  box-sizing: border-box;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
`;

const Btn = styled(Button)`
  padding: 8px 16px;
  font-size: 18px;
`;

const Swiper = forwardRef<SwiperRef, Props>(
  (
    {
      children,
      loop = true,
      autoplay = false,
      autoplayInterval = 3000,
      inertia = true,
      slidesPerView = 1,
    },
    ref,
  ) => {
    const total = children.length;

    const [index, setIndex] = useState(0);
    const [offset, setOffset] = useState(0);
    const dragging = useRef(false);

    const startX = useRef(0);
    const lastX = useRef(0);
    const lastTime = useRef(0);
    const velocity = useRef(0);
    const width = useRef(0);

    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const slideWidthPercent = 100 / slidesPerView;

    const onPointerDown = (e: React.PointerEvent) => {
      if (!wrapperRef.current) return;

      width.current = wrapperRef.current.offsetWidth / slidesPerView;
      dragging.current = true;

      startX.current = e.clientX;
      lastX.current = e.clientX;
      lastTime.current = performance.now();
      velocity.current = 0;

      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: React.PointerEvent) => {
      if (!dragging.current) return;

      const now = performance.now();
      const dx = e.clientX - lastX.current;
      const dt = now - lastTime.current;

      if (dt > 0) velocity.current = dx / dt;

      lastX.current = e.clientX;
      lastTime.current = now;

      let delta = lastX.current - startX.current;

      if (!loop) {
        if (index === 0 && delta > 0) delta *= 0.3;
        if (index === total - slidesPerView && delta < 0) delta *= 0.3;
      }

      setOffset(delta);
    };

    const onPointerUp = (e: React.PointerEvent) => {
      if (!dragging.current) return;

      const delta = lastX.current - startX.current;
      const threshold = width.current * 0.25;

      let next = index;

      if (Math.abs(delta) > threshold) {
        next = delta < 0 ? index + 1 : index - 1;
      } else if (inertia && Math.abs(velocity.current) > 0.4) {
        next = velocity.current < 0 ? index + 1 : index - 1;
      }

      if (loop) {
        next = (next + total) % total;
      } else {
        next = Math.max(0, Math.min(total - slidesPerView, next));
      }

      setIndex(next);
      setOffset(0);
      dragging.current = false;

      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    };

    useEffect(() => {
      if (!autoplay) return;

      const id = setInterval(() => {
        setIndex(i =>
          loop ? (i + 1) % total : Math.min(i + 1, total - slidesPerView),
        );
      }, autoplayInterval);

      return () => clearInterval(id);
    }, [autoplay, autoplayInterval, loop, total, slidesPerView]);

    const next = useCallback(() => {
      setIndex(i =>
        loop ? (i + 1) % total : Math.min(i + 1, total - slidesPerView),
      );
    }, [loop, total, slidesPerView]);

    const prev = useCallback(() => {
      setIndex(i =>
        loop ? (i - 1 + total) % total : Math.max(i - 1, 0),
      );
    }, [loop, total]);

    const goTo = useCallback(
      (i: number) => {
        if (loop) setIndex((i + total) % total);
        else setIndex(Math.max(0, Math.min(total - slidesPerView, i)));
      },
      [loop, total, slidesPerView],
    );

    useImperativeHandle(ref, () => ({ next, prev, goTo }), [next, prev, goTo]);

    const trackX = `calc(${-(index * slideWidthPercent)}% + ${offset}px)`;

    return (
      <>
        <Container>
          <Wrapper
            ref={wrapperRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            <Track dragging={dragging.current} style={{ transform: `translateX(${trackX})` }}>
              {React.Children.map(children, (child, i) => (
                <Slide key={i} width={slideWidthPercent}>
                  {child}
                </Slide>
              ))}
            </Track>
          </Wrapper>
        </Container>

        <Controls>
          <Btn type="button" onClick={prev}>
            ←
          </Btn>
          <Btn type="button" onClick={next}>
            →
          </Btn>
        </Controls>
      </>
    );
  },
);

export default Swiper;