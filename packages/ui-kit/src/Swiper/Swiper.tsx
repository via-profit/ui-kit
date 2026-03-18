import * as React from 'react';
import Container, { SwiperContainerProps } from './SwiperContainer';
import Wrapper, { SwiperWrapperProps } from './SwiperWrapper';
import Track, { SwiperTrackProps } from './SwiperTrack';
import SwiperSlide, { SwiperSlideBaseProps, SwiperSlideProps } from './SwiperSlide';

export * from './SwiperSlide';

export type SwiperSlideBaseElement = React.ReactElement<SwiperSlideBaseProps, typeof SwiperSlide>;
export type SwiperSlideElement = React.ReactElement<SwiperSlideProps, typeof SwiperSlide>;

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
  readonly Container?: React.ComponentType<
    SwiperContainerProps & React.RefAttributes<HTMLDivElement>
  >;
  readonly Wrapper?: React.ComponentType<SwiperWrapperProps & React.RefAttributes<HTMLDivElement>>;
  readonly Track?: React.ComponentType<SwiperTrackProps & React.RefAttributes<HTMLDivElement>>;
}

export type SwiperProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
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
  readonly threshold?: number;
  readonly resistance?: boolean;
  readonly slidesPerView?: number;
  readonly children?: readonly SwiperSlideBaseElement[];
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
    slidesPerView = 1,
    ...restProps
  } = props;

  // #region Slides
  const slides = React.useMemo(() => {
    const childrenSlides: readonly SwiperSlideElement[] = Array.isArray(children)
      ? children
      : [children];

    if (infinite) {
      if (childrenSlides.length < 2) {
        console.error('To infinite loop counts of the slides must be greater than 2');

        return childrenSlides;
      }

      if (childrenSlides.length < slidesPerView + 1) {
        console.error(
          `For infinite loop with slidesPerView=${slidesPerView}, need at least ${slidesPerView + 1} slides`,
        );

        return childrenSlides;
      }

      const headClones = childrenSlides.slice(-slidesPerView).map((slide, i) =>
        React.cloneElement(slide as any, {
          key: `clone-head-${i}-${Date.now()}`,
        }),
      );

      const tailClones = childrenSlides.slice(0, slidesPerView).map((slide, i) =>
        React.cloneElement(slide as any, {
          key: `clone-tail-${i}-${Date.now()}`,
        }),
      );

      const mainSlides = childrenSlides.map((slide, idx) =>
        React.cloneElement(slide as any, {
          key: `slide-${idx}-${Date.now()}`,
        }),
      );

      return [...headClones, ...mainSlides, ...tailClones];
    }

    return childrenSlides.map((slide, idx) =>
      React.cloneElement(slide as any, {
        key: `slide-${idx}-${Date.now()}`,
      }),
    );
  }, [children, infinite, slidesPerView]);

  const total = slides.length;
  const realSlidesCount = infinite ? total - 2 * slidesPerView : total;
  const maxIndex = Math.max(0, total - slidesPerView);

  // #region States
  const [index, setIndex] = React.useState(() => {
    if (!infinite) {
      return Math.max(0, Math.min(initialIndex, maxIndex));
    }

    return initialIndex + slidesPerView;
  });

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
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const isAnimating = React.useRef(false);
  const autoplayTimer = React.useRef<NodeJS.Timeout>();
  const mounted = React.useRef(true);
  const normalizeTimeout = React.useRef<NodeJS.Timeout>();

  // #region Real Index
  const realIndex = React.useMemo(() => {
    if (!infinite) {
      return index;
    }

    const realIndex = index - slidesPerView;

    if (realIndex < 0) {
      return realSlidesCount + realIndex;
    }
    if (realIndex >= realSlidesCount) {
      return realIndex - realSlidesCount;
    }

    return Math.min(realIndex, realSlidesCount - slidesPerView);
  }, [index, infinite, slidesPerView, realSlidesCount]);

  const prevRealIndex = React.useRef(realIndex);

  // #region Effects
  React.useEffect(() => {
    if (realIndex !== prevRealIndex.current && mounted.current) {
      onSlideChange?.(realIndex);
      prevRealIndex.current = realIndex;
    }
  }, [realIndex, onSlideChange]);

  React.useEffect(() => {
    if (!mounted.current) return;

    const newTotal = slides.length;
    if (index >= newTotal) {
      setIndex(Math.max(0, newTotal - 1));
    }
  }, [slides.length, index]);

  // #region Normalization
  const normalizeIndex = React.useCallback(() => {
    if (!infinite || !mounted.current) return;

    const firstRealIndex = slidesPerView;
    const lastRealIndex = total - slidesPerView - 1;

    if (index < firstRealIndex || index > lastRealIndex) {
      const target = index < firstRealIndex ? lastRealIndex : firstRealIndex;

      setDisableAnimation(true);

      requestAnimationFrame(() => {
        if (!mounted.current) return;

        trackRef.current?.getBoundingClientRect();
        setIndex(target);
        setOffset(0);

        requestAnimationFrame(() => {
          if (mounted.current) {
            setDisableAnimation(false);
          }
        });
      });
    }
  }, [index, infinite, slidesPerView, total]);

  // #region Navigation API

  const indexRef = React.useRef(index);
  React.useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const goToIndex = React.useCallback(
    (i: number) => {
      if (isAnimating.current) return;

      let targetIndex = i;

      if (infinite) {
        targetIndex = i + slidesPerView;
        const minIndex = slidesPerView;
        const maxIndex = slidesPerView + realSlidesCount - 1;
        targetIndex = Math.max(minIndex, Math.min(maxIndex, targetIndex));
      } else {
        targetIndex = Math.max(0, Math.min(maxIndex, i));
      }

      if (targetIndex === indexRef.current) {
        return; // никуда не едем — флаг не трогаем
      }

      setDisableAnimation(false);
      setIndex(targetIndex);
      isAnimating.current = true;
    },
    [infinite, slidesPerView, realSlidesCount, maxIndex],
  );

  const next = React.useCallback(() => {
    // if (isAnimating.current) return;

    setDisableAnimation(false);

    setIndex(prev => {
      let nextIndex: number;

      if (infinite) {
        nextIndex = Math.min(prev + 1, total - 1);
      } else {
        nextIndex = Math.min(prev + 1, maxIndex);
      }

      // если индекс не меняется — не ставим флаг анимации
      if (nextIndex === prev) {
        return prev;
      }

      isAnimating.current = true;

      return nextIndex;
    });
  }, [infinite, maxIndex, total]);

  const prev = React.useCallback(() => {
    // if (isAnimating.current) return;

    setDisableAnimation(false);

    setIndex(prev => {
      const nextIndex = Math.max(prev - 1, 0);

      if (nextIndex === prev) {
        return prev;
      }

      isAnimating.current = true;

      return nextIndex;
    });
  }, []);

  // #region Pointer Events
  const onPointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      if (!wrapperRef.current || !draggable) return;

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

      if (resistance && !infinite) {
        if (index === 0 && delta > 0) {
          delta *= 0.3;
        }
        if (index === maxIndex && delta < 0) {
          delta *= 0.3;
        }
      }

      setOffset(delta);
    },
    [resistance, infinite, index, maxIndex],
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

      if (!infinite) {
        nextIndex = Math.max(0, Math.min(maxIndex, nextIndex));
      } else {
        nextIndex = Math.max(0, Math.min(total - 1, nextIndex));
      }

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
    [threshold, dragThreshold, index, maxIndex, snap, infinite, total],
  );

  const onLostPointerCapture = React.useCallback(
    (e: React.PointerEvent) => {
      if (dragging.current) {
        onPointerUp(e);
      }
    },
    [onPointerUp],
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

  // #region Keyboard
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

  // #region Hover
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

  // #region Autoplay Effect
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

  // #region Transition End
  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName !== 'transform') return;
      isAnimating.current = false;
      normalizeIndex(); // <-- вот здесь
    };

    track.addEventListener('transitionend', handleTransitionEnd);

    return () => track.removeEventListener('transitionend', handleTransitionEnd);
  }, [normalizeIndex]);

  // #region Mount
  React.useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  // #region Imperative Handle
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

  // #region Overrides
  const overridesMap = React.useMemo(
    () => ({
      Container: overrides?.Container || Container,
      Track: overrides?.Track || Track,
      Wrapper: overrides?.Wrapper || Wrapper,
    }),
    [overrides],
  );

  const getSlideRealIndex = React.useCallback((domIndex: number): number => {
    if (!infinite) {
      return domIndex;
    }

    const totalSlides = realSlidesCount; // 8 реальных слайдов

    if (domIndex < slidesPerView) {
      // Левые клоны (индексы 0, 1, 2) - соответствуют последним слайдам
      // domIndex: 0 -> последний слайд (7)
      // domIndex: 1 -> предпоследний (6)
      // domIndex: 2 -> пред-предпоследний (5)
      return totalSlides - slidesPerView + domIndex;
    }

    if (domIndex >= total - slidesPerView) {
      // Правые клоны (индексы 11, 12, 13) - соответствуют первым слайдам
      // domIndex: 11 -> первый слайд (0)
      // domIndex: 12 -> второй слайд (1)
      // domIndex: 13 -> третий слайд (2)
      return domIndex - (total - slidesPerView);
    }

    // Основные слайды (индексы 3-10) - вычитаем количество левых клонов
    return domIndex - slidesPerView;
    },
    [infinite, slidesPerView, realSlidesCount, total],
  );

  return (
    <overridesMap.Container {...restProps}>
      <overridesMap.Wrapper
        ref={wrapperRef}
        draggable={draggable}
        slidesPerView={slidesPerView}
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
          slidesPerView={slidesPerView}
        >
          {slides.map((slide, i) => {
            const slideRealIndex = getSlideRealIndex(i);

            // Текущий реальный индекс первого видимого слайда
            const currentRealIndex = realIndex; // 5

            // Вычисляем какие реальные индексы должны быть видны (только 3 слайда!)
            // При realIndex = 5 должны быть видны реальные индексы: 5, 6, 7
            // При realIndex = 7 должны быть видны: 7, 0, 1
            // При realIndex = 0 должны быть видны: 0, 1, 2

            let isVisible = false;
            let isNearby = false;

            if (realSlidesCount <= slidesPerView) {
              // Если слайдов меньше или равно slidesPerView, все видны
              isVisible = true;
            } else {
              // Вычисляем индексы видимых слайдов с учетом цикличности
              const visibleIndices = [];
              for (let j = 0; j < slidesPerView; j++) {
                visibleIndices.push((currentRealIndex + j) % realSlidesCount);
              }
              // visibleIndices = [5, 6, 7] при currentRealIndex = 5

              // Проверяем, входит ли текущий слайд в видимые
              isVisible = visibleIndices.includes(slideRealIndex);

              // Вычисляем соседние слайды (перед первым видимым и после последнего видимого)
              if (!isVisible) {
                const prevIndex = (currentRealIndex - 1 + realSlidesCount) % realSlidesCount; // 4
                const nextIndex = (currentRealIndex + slidesPerView) % realSlidesCount; // (5 + 3) % 8 = 0

                isNearby = slideRealIndex === prevIndex || slideRealIndex === nextIndex;
              }
            }

            console.log(`DOM[${i}] -> Real[${slideRealIndex}], visible: ${isVisible}, nearby: ${isNearby}`);


            return React.cloneElement<SwiperSlideProps>(slide as SwiperSlideElement, {
              slidesPerView,
              isVisible,
              isNearby,
              key: slide.key || i.toString(),
              'data-index': i,
              'data-real-index': slideRealIndex,
            });
          })}
        </overridesMap.Track>
      </overridesMap.Wrapper>
    </overridesMap.Container>
  );
});

Swiper.displayName = 'Swiper';

export default Swiper;
