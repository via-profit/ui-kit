import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
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
  dragThreshold?: number; // базовый threshold
  snap?: boolean;
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
  transition: ${p => (p.dragging ? 'none' : 'transform 0.3s ease')};
`;

const Slide = styled.div`
  flex: 0 0 100%;
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
      dragThreshold = 50,
      snap = true,
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

    const onPointerDown = (e: React.PointerEvent) => {
      if (!wrapperRef.current) return;

      width.current = wrapperRef.current.offsetWidth;
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
        if (index === total - 1 && delta < 0) delta *= 0.3;
      }

      setOffset(delta);
    };

    const onPointerUp = (e: React.PointerEvent) => {
      if (!dragging.current) return;

      const delta = lastX.current - startX.current;

      const v = Math.abs(velocity.current);
      const velocityFactor = Math.min(v * 250, 0.65);

      const effectiveThreshold = dragThreshold * (1 - velocityFactor);
      const clampedThreshold = Math.max(20, Math.min(effectiveThreshold, dragThreshold));

      let next = index;

      if (Math.abs(delta) > clampedThreshold) {
        next = delta < 0 ? index + 1 : index - 1;
      }

      if (loop) {
        next = (next + total) % total;
      } else {
        next = Math.max(0, Math.min(total - 1, next));
      }

      if (snap) {
        setIndex(next);
        setOffset(0);
      } else {
        setIndex(next);
      }

      dragging.current = false;
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    };

    useEffect(() => {
      if (!autoplay) return;

      const id = setInterval(() => {
        setIndex(i => (loop ? (i + 1) % total : Math.min(i + 1, total - 1)));
      }, autoplayInterval);

      return () => clearInterval(id);
    }, [autoplay, autoplayInterval, loop, total]);

    const next = useCallback(() => {
      setIndex(i => (loop ? (i + 1) % total : Math.min(i + 1, total - 1)));
    }, [loop, total]);

    const prev = useCallback(() => {
      setIndex(i => (loop ? (i - 1 + total) % total : Math.max(i - 1, 0)));
    }, [loop, total]);

    const goTo = useCallback(
      (i: number) => {
        if (loop) setIndex((i + total) % total);
        else setIndex(Math.max(0, Math.min(total - 1, i)));
      },
      [loop, total],
    );

    useImperativeHandle(ref, () => ({ next, prev, goTo }), [next, prev, goTo]);

    const trackX = `calc(${-(index * 100)}% + ${offset}px)`;

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
                <Slide key={i}>{child}</Slide>
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