import * as React from 'react';
import Container, { SwiperContainerProps } from './SwiperContainer';
import Wrapper, { SwiperWrapperProps } from './SwiperWrapper';
import Track, { SwiperTrackProps } from './SwiperTrack';
import SwiperSlide from './SwiperSlide';

export type SwiperRef = {
  next: () => void;
  prev: () => void;
  goToIndex: (index: number) => void;
  getRealIndex: () => number;
  getTotalSlides: () => number;
  pause: () => void;
  resume: () => void;
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
  readonly autoplay?: boolean;
  readonly autoplayInterval?: number;
  readonly pauseOnHover?: boolean;
  readonly keyboardControl?: boolean;
  readonly threshold?: number; // минимальное расстояние для свайпа
  readonly resistance?: boolean; // сопротивление на границах
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
    autoplay = false,
    autoplayInterval = 3000,
    pauseOnHover = true,
    keyboardControl = true,
    threshold = 20,
    resistance = true,
    ...restProps
  } = props;

  // Проверка на минимальное количество слайдов для infinite режима
  const childrenCount = React.Children.count(children);

  // #region Slides
  const slides = React.useMemo(() => {
    const childrenSlides = Array.isArray(children) ? children : [children];

    if (infinite) {
      if (childrenSlides.length < 2) {
        console.error('To infinite loop counts of the slides must be greater than 2');

        return childrenSlides;
      }

      const firstSlide = childrenSlides[0];
      const lastSlide = childrenSlides[childrenSlides.length - 1];

      return [
        React.cloneElement(lastSlide as any, { key: `clone-last-${Date.now()}` }),
        ...childrenSlides.map((slide, idx) =>
          // eslint-disable-next-line react/no-array-index-key
          React.cloneElement(slide as any, { key: `slide-${idx}-${Date.now()}` }),
        ),
        React.cloneElement(firstSlide as any, { key: `clone-first-${Date.now()}` }),
      ];
    }

    return childrenSlides.map((slide, idx) =>
      // eslint-disable-next-line react/no-array-index-key
      React.cloneElement(slide as any, { key: `slide-${idx}-${Date.now()}` }),
    );
  }, [children, infinite]);

  const total = slides.length;
  const realSlidesCount = infinite ? total - 2 : total;

  /**
   * Return the initial index
   */
  const getInitialIndex = React.useCallback(() => {
    if (!infinite) {
      return Math.max(0, Math.min(initialIndex, total - 1));
    }
    if (realSlidesCount < 2) {
      return 0;
    }

    return Math.min(initialIndex + 1, total - 2);
  }, [infinite, initialIndex, total, realSlidesCount]);

  // #region States
  const [index, setIndex] = React.useState(getInitialIndex);
  const [offset, setOffset] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [disableAnimation, setDisableAnimation] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);

  // #region Refs
  const dragging = React.useRef(false);
  const startX = React.useRef(0);
  const lastX = React.useRef(0);
  const lastTime = React.useRef(0);
  const velocity = React.useRef(0);
  const width = React.useRef(0);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const isAnimating = React.useRef(false);
  const commandQueue = React.useRef<(() => void)[]>([]);
  const autoplayTimer = React.useRef<NodeJS.Timeout>();
  const mounted = React.useRef(true);

  /**
   * Calculating the real index (excluding clones)
   */
  const realIndex = React.useMemo(() => {
    if (!infinite) return index;

    if (index === 0) return total - 3;
    if (index === total - 1) return 0;

    return index - 1;
  }, [index, total, infinite]);

  const prevRealIndex = React.useRef(realIndex);

  /**
   * On slide change callback
   */
  React.useEffect(() => {
    if (realIndex !== prevRealIndex.current && mounted.current) {
      onSlideChange?.(realIndex);
      prevRealIndex.current = realIndex;
    }
  }, [realIndex, onSlideChange]);

  /**
   * Adjusting the index when changing the number of slides
   */
  React.useEffect(() => {
    if (!mounted.current) return;

    const newTotal = slides.length;
    if (index >= newTotal) {
      setIndex(Math.max(0, newTotal - 1));
    }
  }, [slides.length, index]);

  // #region pointer events
  const onPointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      if (!wrapperRef.current || !draggable) return;

      width.current = wrapperRef.current.offsetWidth;
      dragging.current = true;
      isAnimating.current = false;
      setDisableAnimation(true);
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
      if (!dragging.current || isAnimating.current) return;

      const now = performance.now();
      const dx = e.clientX - lastX.current;
      const dt = now - lastTime.current;

      if (dt > 0) {
        velocity.current = dx / dt;
      }

      lastX.current = e.clientX;
      lastTime.current = now;

      let delta = lastX.current - startX.current;

      // resistances
      if (resistance && !infinite) {
        if (index === 0 && delta > 0) {
          delta *= 0.3;
        }
        if (index === total - 1 && delta < 0) {
          delta *= 0.3;
        }
      }

      setOffset(delta);
    },
    [index, total, infinite, resistance],
  );

  const onPointerUp = React.useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;

      const delta = lastX.current - startX.current;
      const v = Math.abs(velocity.current);
      const velocityFactor = Math.min(v * 250, 0.65);

      const dynamicThreshold = Math.max(
        threshold,
        Math.min(dragThreshold * (1 - velocityFactor), dragThreshold),
      );

      let nextIndex = index;

      if (Math.abs(delta) > dynamicThreshold) {
        nextIndex = delta < 0 ? index + 1 : index - 1;
      }

      // check out of bounds
      nextIndex = Math.max(0, Math.min(total - 1, nextIndex));

      setDisableAnimation(false);

      if (snap) {
        setIndex(nextIndex);
        setOffset(0);
      } else {
        setIndex(nextIndex);
      }

      isAnimating.current = true;
      dragging.current = false;
      setIsDragging(false);

      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    },
    [dragThreshold, index, snap, total, threshold],
  );

  const onLostPointerCapture = React.useCallback(
    (e: React.PointerEvent) => {
      if (dragging.current) {
        onPointerUp(e);
      }
    },
    [onPointerUp],
  );

  /**
   * Index normalization for infinite mode
   */
  const normalizeIndex = React.useCallback(
    (after?: () => void) => {
      if (!infinite || !mounted.current) {
        after?.();

        return;
      }

      const lastReal = total - 2;

      if (index === 0 || index === total - 1) {
        const target = index === 0 ? lastReal : 1;

        setDisableAnimation(true);

        requestAnimationFrame(() => {
          if (!mounted.current) return;

          trackRef.current?.getBoundingClientRect(); // force reflow
          setIndex(target);
          setOffset(0);

          requestAnimationFrame(() => {
            if (!mounted.current) return;
            setDisableAnimation(false);
            after?.();
          });
        });
      } else {
        after?.();
      }
    },
    [index, infinite, total],
  );

  /**
   * Exec commands with animation
   */
  const runCommand = React.useCallback(
    (fn: () => void) => {
      normalizeIndex(() => {
        if (isAnimating.current) {
          commandQueue.current.push(fn);
        } else {
          fn();
        }
      });
    },
    [normalizeIndex],
  );

  // #region Navigation API
  const next = React.useCallback(() => {
    runCommand(() => {
      setDisableAnimation(false);
      setIndex(i => Math.min(i + 1, total - 1));
      isAnimating.current = true;
    });
  }, [runCommand, total]);

  const prev = React.useCallback(() => {
    runCommand(() => {
      setDisableAnimation(false);
      setIndex(i => Math.max(i - 1, 0));
      isAnimating.current = true;
    });
  }, [runCommand]);

  const goToIndex = React.useCallback(
    (i: number) => {
      const targetIndex = infinite ? i + 1 : i;
      setIndex(Math.max(0, Math.min(total - 1, targetIndex)));
    },
    [total, infinite],
  );

  // #region Autoplay
  const startAutoplay = React.useCallback(() => {
    if (!autoplay || isPaused) return;

    autoplayTimer.current = setInterval(() => {
      if (!isDragging && !isAnimating.current && mounted.current) {
        next();
      }
    }, autoplayInterval);
  }, [autoplay, autoplayInterval, isDragging, isPaused, next]);

  const pause = React.useCallback(() => {
    setIsPaused(true);
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
      autoplayTimer.current = undefined;
    }
  }, []);

  const resume = React.useCallback(() => {
    setIsPaused(false);
  }, []);

  React.useEffect(() => {
    if (!keyboardControl) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyboardControl, prev, next]);

  React.useEffect(() => {
    if (!autoplay || !pauseOnHover) return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleMouseEnter = () => pause();
    const handleMouseLeave = () => resume();

    wrapper.addEventListener('mouseenter', handleMouseEnter);
    wrapper.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      wrapper.removeEventListener('mouseenter', handleMouseEnter);
      wrapper.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [autoplay, pauseOnHover, pause, resume]);

  React.useEffect(() => {
    if (autoplay) {
      startAutoplay();
    }

    return () => {
      if (autoplayTimer.current) {
        clearInterval(autoplayTimer.current);
        autoplayTimer.current = undefined;
      }
    };
  }, [autoplay, startAutoplay, isPaused]);

  // #region transition end
  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName !== 'transform') return;

      normalizeIndex();
      isAnimating.current = false;

      const nextCmd = commandQueue.current.shift();
      if (nextCmd) {
        nextCmd();
      }
    };

    track.addEventListener('transitionend', handleTransitionEnd);

    return () => track.removeEventListener('transitionend', handleTransitionEnd);
  }, [normalizeIndex]);

  // disableAnimation clean
  React.useEffect(() => {
    if (!disableAnimation) return;

    const id = requestAnimationFrame(() => {
      if (mounted.current) {
        setDisableAnimation(false);
      }
    });

    return () => cancelAnimationFrame(id);
  }, [disableAnimation]);

  // mount / unmount
  React.useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  // Imperative handle
  React.useImperativeHandle(
    ref,
    () => ({
      next,
      prev,
      goToIndex,
      getRealIndex: () => realIndex,
      getTotalSlides: () => realSlidesCount,
      pause,
      resume,
    }),
    [next, prev, goToIndex, realIndex, realSlidesCount, pause, resume],
  );

  // Overrides
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
        onLostPointerCapture={onLostPointerCapture}
      >
        <overridesMap.Track
          ref={trackRef}
          dragging={isDragging}
          index={index}
          offset={offset}
          disableAnimation={disableAnimation}
        >
          {slides.map((slide, i) => {
            const distance = Math.abs(i - index);
            const isVisible = distance <= 1;
            // const isNearby = distance <= 2;
            const isNearby = true;

            if (!isVisible && !isNearby) {
              return React.cloneElement(slide as any, {
                key: (slide as any).key,
              });
            }

            return React.cloneElement(slide as any, {
              key: (slide as any).key,
              isVisible,
              isActive: i === index,
              distance,
            });
          })}
        </overridesMap.Track>
      </overridesMap.Wrapper>
    </overridesMap.Container>
  );
});

Swiper.displayName = 'Swiper';

export default Swiper;
