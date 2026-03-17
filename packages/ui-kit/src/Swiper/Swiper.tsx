import * as React from 'react';
import Container, { SwiperContainerProps } from './SwiperContainer';
import Wrapper, { SwiperWrapperProps } from './SwiperWrapper';
import Track, { SwiperTrackProps } from './SwiperTrack';

export type SwiperRef = {
  next: () => void;
  prev: () => void;
  goToIndex: (index: number) => void;
};

export interface SwiperOverrides {
  /**
   * Swiper main container
   */
  readonly Container?: React.ComponentType<
    SwiperContainerProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Swiper wrapper
   */
  readonly Wrapper?: React.ComponentType<SwiperWrapperProps & React.RefAttributes<HTMLDivElement>>;

  /**
   * Swiper slides track
   */
  readonly Track?: React.ComponentType<SwiperTrackProps & React.RefAttributes<HTMLDivElement>>;
}

export type SwiperProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly dragThreshold?: number;
  readonly snap?: boolean;
  readonly draggable?: boolean;
  readonly initialIndex?: number;
  readonly infinite?: boolean;
  readonly onSlideChange?: (realIndex: number) => void;
  /**
   * Overridable components map
   */
  readonly overrides?: SwiperOverrides;
};

export const Swiper = React.forwardRef((props: SwiperProps, ref: React.ForwardedRef<SwiperRef>) => {
  const {
    children,
    dragThreshold = 240,
    snap = true,
    draggable = true,
    overrides,
    initialIndex = 0,
    infinite = false,
    onSlideChange,
    ...restProps
  } = props;

  const slides = React.useMemo(() => {
    const childrenSlides = React.Children.toArray(children);
    if (infinite) {
      if (childrenSlides.length < 2) {
        throw new Error('To infinite loop counts of the slides must be greater than 2');
      }

      const firstSlide = childrenSlides[0];
      const lastSlide = childrenSlides[childrenSlides.length - 1];

      return [
        lastSlide, // ← clone last
        ...childrenSlides,
        firstSlide, // ← clone first
      ];
    }

    return childrenSlides;
  }, [children, infinite]);
  const total = slides.length;

  const [index, setIndex] = React.useState(infinite ? initialIndex + 1 : initialIndex);
  const [offset, setOffset] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const dragging = React.useRef(false);
  const startX = React.useRef(0);
  const lastX = React.useRef(0);
  const lastTime = React.useRef(0);
  const velocity = React.useRef(0);
  const width = React.useRef(0);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const [disableAnimation, setDisableAnimation] = React.useState(false);
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const realIndex = React.useMemo(() => {
    if (!infinite) return index;

    if (index === 0) {
      return total - 3; // clone last → last real
    }
    if (index === total - 1) {
      return 0; // clone first → first real
    }

    return index - 1; // shift by 1
  }, [index, total, infinite]);

  const prevRealIndex = React.useRef(realIndex);

  React.useEffect(() => {
    if (realIndex !== prevRealIndex.current) {
      onSlideChange?.(realIndex);
      prevRealIndex.current = realIndex;
    }
  }, [realIndex, onSlideChange]);

  const onPointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      if (!wrapperRef.current || !draggable) {
        return;
      }

      width.current = wrapperRef.current.offsetWidth;
      dragging.current = true;
      setIsDragging(true);

      startX.current = e.clientX;
      lastX.current = e.clientX;
      lastTime.current = performance.now();
      velocity.current = 0;

      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [draggable],
  );

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) {
        return;
      }

      const now = performance.now();
      const dx = e.clientX - lastX.current;
      const dt = now - lastTime.current;

      if (dt > 0) {
        velocity.current = dx / dt;
      }

      lastX.current = e.clientX;
      lastTime.current = now;

      let delta = lastX.current - startX.current;

      if (index === 0 && delta > 0) {
        delta *= 0.3;
      }
      if (index === total - 1 && delta < 0) {
        delta *= 0.3;
      }

      setOffset(delta);
    },
    [index, total],
  );

  const onPointerUp = React.useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) {
        return;
      }

      const delta = lastX.current - startX.current;

      const v = Math.abs(velocity.current);
      const velocityFactor = Math.min(v * 250, 0.65);

      const threshold = Math.max(20, Math.min(dragThreshold * (1 - velocityFactor), dragThreshold));

      let next = index;

      if (Math.abs(delta) > threshold) {
        next = delta < 0 ? index + 1 : index - 1;
      }

      next = Math.max(0, Math.min(total - 1, next));

      if (snap) {
        setIndex(next);
        setOffset(0);
      } else {
        setIndex(next);
      }

      dragging.current = false;
      setIsDragging(false);
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    },
    [dragThreshold, index, snap, total],
  );

  const next = React.useCallback(() => {
    setIndex(i => Math.min(total - 1, i + 1));
  }, [total]);

  const prev = React.useCallback(() => {
    setIndex(i => Math.max(0, i - 1));
  }, []);

  const goToIndex = React.useCallback(
    (i: number) => {
      setIndex(Math.max(0, Math.min(total - 1, i)));
    },
    [total],
  );

  React.useImperativeHandle(ref, () => ({ next, prev, goToIndex }), [next, prev, goToIndex]);

  // #region Teleport: infinite loop supports
  React.useEffect(() => {
    if (!infinite) {
      return;
    }

    const track = trackRef.current;
    if (!track) {
      return;
    }

    const handleTransitionEnd = () => {
      // total = children.length + 2
      const lastReal = total - 2;

      if (index === 0) {
        // clone of last → teleport to last real
        setDisableAnimation(true);
        setIndex(lastReal);
      } else if (index === total - 1) {
        // clone of first → teleport to first real
        setDisableAnimation(true);
        setIndex(1);
      }
    };

    track.addEventListener('transitionend', handleTransitionEnd);

    // eslint-disable-next-line consistent-return
    return () => track.removeEventListener('transitionend', handleTransitionEnd);
  }, [index, total, infinite]);

  React.useEffect(() => {
    if (!disableAnimation) {
      return;
    }

    const id = requestAnimationFrame(() => {
      setDisableAnimation(false);
    });

    // eslint-disable-next-line consistent-return
    return () => cancelAnimationFrame(id);
  }, [disableAnimation]);

  const overridesMap = React.useMemo(
    () => ({
      Container: overrides?.Container || Container,
      Track: overrides?.Track || Track,
      Wrapper: overrides?.Wrapper || Wrapper,
    }),
    [overrides],
  );

  return (
    <overridesMap.Container {...restProps}>
      <overridesMap.Wrapper
        ref={wrapperRef}
        draggable={draggable}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <overridesMap.Track
          ref={trackRef}
          dragging={isDragging}
          index={index}
          offset={offset}
          disableAnimation={disableAnimation}
        >
          {slides.map((slide, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={i}>{slide}</React.Fragment>
          ))}
        </overridesMap.Track>
      </overridesMap.Wrapper>
    </overridesMap.Container>
  );
});

Swiper.displayName = 'Swiper';

export default Swiper;
