import * as React from 'react';
import Container, { SwiperContainerProps } from './SwiperContainer';
import Wrapper, { SwiperWrapperProps } from './SwiperWrapper';
import Track, { SwiperTrackProps } from './SwiperTrack';
import SwiperSlide, { SwiperSlideBaseProps, SwiperSlideProps } from './SwiperSlide';
import SwiperSlidesRenderer from './SwiperSlidesRenderer';
import useThemeProps from '../ThemeProvider/useThemeProps';

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
  readonly threshold?: number;
  readonly resistance?: boolean;
  readonly slidesPerView?: number;

  /**
   * Arrow keys switch the slides when the swiper is focused\
   * **Default:** `true`
   */
  readonly keyboardControl?: boolean;

  /**
   * The label of the slide for screen readers\
   * **Default:** `(index, total) => \`${index + 1} / ${total}\``
   */
  readonly slideLabel?: (index: number, total: number) => string;

  /**
   * The slides: `<SwiperSlide>` elements. `null`, `false` and other non-elements are skipped
   */
  readonly children?: React.ReactNode;
  readonly overrides?: SwiperOverrides;
};

const defaultSlideLabel = (index: number, total: number) => `${index + 1} / ${total}`;

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
    threshold = 20,
    resistance = true,
    slidesPerView = 1,
    keyboardControl = true,
    slideLabel = defaultSlideLabel,
    ...restProps
  } = useThemeProps('Swiper', props);

  // #region Slides
  const slides = React.useMemo(() => {
    // toArray skips null/false and keeps the user keys (prefixed), so the slides are not remounted
    // when a slide is added to the start
    const childrenSlides = React.Children.toArray(children).filter(
      React.isValidElement,
    ) as SwiperSlideElement[];

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

      // Используем стабильные ключи без Date.now()
      const headClones = childrenSlides.slice(-slidesPerView).map((slide, i) =>
        React.cloneElement(slide as any, {
          key: `clone-head-${i}`,
          'data-clone': 'head',
        }),
      );

      const tailClones = childrenSlides.slice(0, slidesPerView).map((slide, i) =>
        React.cloneElement(slide as any, {
          key: `clone-tail-${i}`,
          'data-clone': 'tail',
        }),
      );

      return [...headClones, ...childrenSlides, ...tailClones];
    }

    return childrenSlides;
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
  // The long decelerating transition after a free swipe (snap=false)
  const [isMomentum, setIsMomentum] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [disableAnimation, setDisableAnimation] = React.useState(false);
  const [isPausedByApi, setIsPausedByApi] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  // The pause by the API is not cancelled when the mouse leaves the swiper
  const isPaused = isPausedByApi || isHovered || isFocused;

  // #region Refs
  const dragging = React.useRef(false);
  const startX = React.useRef(0);
  const lastX = React.useRef(0);
  const lastTime = React.useRef(0);
  const velocity = React.useRef(0);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const isAnimating = React.useRef(false);
  const mounted = React.useRef(true);
  const suppressClick = React.useRef(false);

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

    // In the infinite mode any slide can be the first visible one, so there is no clamp
    return realIndex;
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

    // The slides were removed: keep the index inside the allowed range
    const lastIndex = infinite ? total - slidesPerView : maxIndex;
    if (index > lastIndex) {
      setIndex(infinite ? slidesPerView : maxIndex);
      setOffset(0);
    }
  }, [index, infinite, total, slidesPerView, maxIndex]);

  // #region Normalization
  const normalizeIndex = React.useCallback(() => {
    if (!infinite || !mounted.current) return;

    const firstRealIndex = slidesPerView;
    const lastRealIndex = total - slidesPerView - 1;

    if (index < firstRealIndex || index > lastRealIndex) {
      // A clone position shows the same slides as the real position shifted by the slides count.
      // Not always the first/last real slide: after several fast clicks the index may be deeper in the clones
      const target = index < firstRealIndex ? index + realSlidesCount : index - realSlidesCount;

      setDisableAnimation(true);

      requestAnimationFrame(() => {
        if (!mounted.current) return;

        trackRef.current?.getBoundingClientRect();
        // The offset is kept: in the free mode (snap=false) the track stops between the slides
        setIndex(target);

        requestAnimationFrame(() => {
          if (mounted.current) {
            setDisableAnimation(false);
          }
        });
      });
    }
  }, [index, infinite, slidesPerView, total, realSlidesCount]);

  // #region Navigation API

  const indexRef = React.useRef(index);
  React.useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const goToIndex = React.useCallback(
    (i: number) => {
      // In the infinite mode the index is normalized after the transition, so wait for it.
      // In the regular mode the transition is simply retargeted
      if (infinite && isAnimating.current) return;

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
      setIsMomentum(false);
      setOffset(0);
      setIndex(targetIndex);
      isAnimating.current = true;
    },
    [infinite, slidesPerView, realSlidesCount, maxIndex],
  );

  const next = React.useCallback(() => {
    setDisableAnimation(false);
    setIsMomentum(false);
    setOffset(0);

    setIndex(prev => {
      let nextIndex: number;

      if (infinite) {
        // The last position is the first tail clone: it mirrors the first real slide.
        // Further positions would show the empty space when slidesPerView > 1
        nextIndex = Math.min(prev + 1, total - slidesPerView);
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
  }, [infinite, maxIndex, total, slidesPerView]);

  const prev = React.useCallback(() => {
    setDisableAnimation(false);
    setIsMomentum(false);
    setOffset(0);

    setIndex(prev => {
      const nextIndex = Math.max(prev - 1, 0);

      if (nextIndex === prev) {
        return prev;
      }

      isAnimating.current = true;

      return nextIndex;
    });
  }, []);

  // #region Position
  // The position is the distance in pixels from the start of the track to the left edge of the view.
  // The state keeps it as index (whole slides) + offset (pixels), the track is translated by both
  const getSlideWidth = React.useCallback(
    () => (wrapperRef.current?.clientWidth || 0) / slidesPerView,
    [slidesPerView],
  );

  // The last allowed position. In the infinite mode it is the first tail clone
  const maxPosition = React.useCallback(
    () => (infinite ? total - slidesPerView : maxIndex) * getSlideWidth(),
    [infinite, total, slidesPerView, maxIndex, getSlideWidth],
  );

  // The position on the screen right now, also in the middle of a transition
  const readPosition = React.useCallback(() => {
    const track = trackRef.current;
    if (track && typeof DOMMatrixReadOnly !== 'undefined') {
      const { transform } = getComputedStyle(track);
      if (transform && transform !== 'none') {
        return -new DOMMatrixReadOnly(transform).m41;
      }
    }

    return index * getSlideWidth() - offset;
  }, [index, offset, getSlideWidth]);

  // Infinite mode: the same view is shown by the real slides and by the clones,
  // so the position is moved by the whole slides count when it comes close to the edge of the track
  const wrapPosition = React.useCallback(
    (position: number) => {
      const width = getSlideWidth();
      const span = realSlidesCount * width;
      if (!infinite || width === 0) return 0;
      if (position < width * 0.5) return span;
      if (position > maxPosition() - width * 0.5) return -span;

      return 0;
    },
    [infinite, realSlidesCount, getSlideWidth, maxPosition],
  );

  const dragBasePosition = React.useRef(0);
  const dragAnchorIndex = React.useRef(0);
  const dragPosition = React.useRef(0);

  // #region Pointer Events
  const onPointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      if (!wrapperRef.current || !draggable) return;

      // Only the main mouse button, the touch or the pen
      if (e.pointerType === 'mouse' && e.button !== 0) return;

      const width = getSlideWidth();
      // Grab the track where it is now: a running transition stops under the finger instead of jumping
      let position = readPosition();
      position += wrapPosition(position);

      const anchor = width > 0 ? Math.round(position / width) : index;
      dragBasePosition.current = position;
      dragPosition.current = position;
      dragAnchorIndex.current = anchor;

      suppressClick.current = false;
      dragging.current = true;
      isAnimating.current = false;
      setDisableAnimation(true);
      setIsMomentum(false);
      setIsDragging(true);
      setIndex(anchor);
      setOffset(anchor * width - position);

      startX.current = e.clientX;
      lastX.current = e.clientX;
      lastTime.current = performance.now();
      velocity.current = 0;

      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [draggable, getSlideWidth, readPosition, wrapPosition, index],
  );

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;

      const now = performance.now();
      const dx = e.clientX - lastX.current;
      const dt = now - lastTime.current;

      if (dt > 0) {
        velocity.current = dx / dt;
      }

      lastX.current = e.clientX;
      lastTime.current = now;

      const width = getSlideWidth();
      let position = dragBasePosition.current - (e.clientX - startX.current);

      // Endless drag in the infinite mode: move the base together with the position
      const shift = wrapPosition(position);
      if (shift !== 0) {
        dragBasePosition.current += shift;
        dragAnchorIndex.current += Math.round(shift / width);
        position += shift;
      }

      if (!infinite) {
        const max = maxPosition();
        if (position < 0) {
          position = resistance ? position * 0.3 : 0;
        } else if (position > max) {
          position = resistance ? max + (position - max) * 0.3 : max;
        }
      }

      dragPosition.current = position;

      // snap: the index stays the same during the drag, the slide changes after the release.
      // free: the index follows the position, so onSlideChange reports the slide under the view
      const nextIndex = snap ? dragAnchorIndex.current : Math.round(position / width);
      setIndex(nextIndex);
      setOffset(nextIndex * width - position);
    },
    [getSlideWidth, wrapPosition, infinite, maxPosition, resistance, snap],
  );

  const onPointerUp = React.useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;

      const width = getSlideWidth();
      const position = dragPosition.current;
      const delta = lastX.current - startX.current;
      // The pointer stopped before the release: no inertia
      const v = performance.now() - lastTime.current > 100 ? 0 : velocity.current;
      const lastIndex = infinite ? total - slidesPerView : maxIndex;

      // It was a drag, not a click: the click on a link or a button inside the slide must not fire
      if (Math.abs(delta) > threshold) {
        suppressClick.current = true;
      }

      setDisableAnimation(false);

      if (snap) {
        const anchor = dragAnchorIndex.current;
        const displacement = position - anchor * width;
        const velocityFactor = Math.min(Math.abs(v) * 250, 0.65);
        const dynamicThreshold = Math.max(
          threshold,
          Math.min(dragThreshold * (1 - velocityFactor), dragThreshold),
        );
        let nextIndex = anchor;

        if (Math.abs(displacement) > dynamicThreshold) {
          // At least one slide, more if the slide was dragged further
          nextIndex =
            displacement > 0
              ? Math.max(anchor + 1, Math.round(position / width))
              : Math.min(anchor - 1, Math.round(position / width));
        }

        nextIndex = Math.max(0, Math.min(lastIndex, nextIndex));
        setIndex(nextIndex);
        setOffset(0);
        // A click without movement does not start a transition, so transitionend never comes
        // and the flag would block autoplay and goToIndex forever
        isAnimating.current = Math.abs(nextIndex * width - position) > 0.5;
      } else {
        // Free mode: the track keeps moving by inertia and stops where it stops
        const projected = Math.max(0, Math.min(lastIndex * width, position - v * 300));
        const nextIndex = width > 0 ? Math.round(projected / width) : index;

        setIsMomentum(true);
        setIndex(nextIndex);
        setOffset(nextIndex * width - projected);
        isAnimating.current = Math.abs(projected - position) > 0.5;
      }

      dragging.current = false;
      setIsDragging(false);

      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    },
    [
      getSlideWidth,
      infinite,
      total,
      slidesPerView,
      maxIndex,
      threshold,
      snap,
      dragThreshold,
      index,
    ],
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
  const autoplayStep = React.useRef<() => void>(() => undefined);
  autoplayStep.current = () => {
    // Without the infinite loop the autoplay returns to the first slide instead of stopping at the end
    if (!infinite && indexRef.current >= maxIndex) {
      goToIndex(0);
    } else {
      next();
    }
  };

  const pause = React.useCallback(() => setIsPausedByApi(true), []);
  const resume = React.useCallback(() => setIsPausedByApi(false), []);

  React.useEffect(() => {
    if (!autoplay || isPaused) return undefined;

    const timer = setInterval(() => {
      if (!dragging.current && !isAnimating.current && mounted.current) {
        autoplayStep.current();
      }
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [autoplay, autoplayInterval, isPaused]);

  // #region Hover and focus
  // The autoplay pauses while the pointer is over the swiper (pauseOnHover)
  // and always while the focus is inside it, so the keyboard user is not interrupted
  React.useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!autoplay || !wrapper) return undefined;

    const handleMouseEnter = () => pauseOnHover && setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleFocusIn = () => setIsFocused(true);
    const handleFocusOut = (event: FocusEvent) => {
      if (!wrapper.contains(event.relatedTarget as Node | null)) {
        setIsFocused(false);
      }
    };

    wrapper.addEventListener('mouseenter', handleMouseEnter);
    wrapper.addEventListener('mouseleave', handleMouseLeave);
    wrapper.addEventListener('focusin', handleFocusIn);
    wrapper.addEventListener('focusout', handleFocusOut);

    return () => {
      wrapper.removeEventListener('mouseenter', handleMouseEnter);
      wrapper.removeEventListener('mouseleave', handleMouseLeave);
      wrapper.removeEventListener('focusin', handleFocusIn);
      wrapper.removeEventListener('focusout', handleFocusOut);
    };
  }, [autoplay, pauseOnHover]);

  // #region Keyboard
  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!keyboardControl) return;

      // Do not steal the arrows from the fields inside the slides
      const target = event.target as HTMLElement;
      if (target.closest('input, textarea, select, [contenteditable="true"]')) return;

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prev();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        next();
      }
    },
    [keyboardControl, prev, next],
  );

  const onClickCapture = React.useCallback((event: React.MouseEvent) => {
    if (suppressClick.current) {
      suppressClick.current = false;
      event.preventDefault();
      event.stopPropagation();
    }
  }, []);

  // The images and the links are dragged by the browser as files, it breaks the swipe
  const onDragStart = React.useCallback(
    (event: React.DragEvent) => {
      if (draggable) {
        event.preventDefault();
      }
    },
    [draggable],
  );

  // #region Transition End
  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName !== 'transform') return;
      isAnimating.current = false;
      normalizeIndex(); // <-- вот здесь
    };

    const handleTransitionCancel = (e: TransitionEvent) => {
      if (e.propertyName !== 'transform') return;
      isAnimating.current = false;
    };

    track.addEventListener('transitionend', handleTransitionEnd);
    track.addEventListener('transitioncancel', handleTransitionCancel);

    return () => {
      track.removeEventListener('transitionend', handleTransitionEnd);
      track.removeEventListener('transitioncancel', handleTransitionCancel);
    };
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

  const getSlideRealIndex = React.useCallback(
    (domIndex: number): number => {
      if (!infinite) {
        return domIndex;
      }

      const totalSlides = realSlidesCount;

      if (domIndex < slidesPerView) {
        return totalSlides - slidesPerView + domIndex;
      }

      if (domIndex >= total - slidesPerView) {
        return domIndex - (total - slidesPerView);
      }

      return domIndex - slidesPerView;
    },
    [infinite, realSlidesCount, slidesPerView, total],
  );

  // The slides at least partially in the view: they are not inert, so a partially visible slide
  // can be clicked. Between the slides (drag, free mode) one more slide is partially visible
  const slideWidth = wrapperRef.current ? wrapperRef.current.clientWidth / slidesPerView : 0;
  let firstVisibleDomIndex = index;
  let visibleCount = slidesPerView;
  if (slideWidth > 0 && Math.abs(offset) > 0.5) {
    const position = index * slideWidth - offset;
    firstVisibleDomIndex = Math.floor(position / slideWidth + 0.001);
    const lastVisibleDomIndex =
      Math.ceil((position + slidesPerView * slideWidth) / slideWidth - 0.001) - 1;
    visibleCount = lastVisibleDomIndex - firstVisibleDomIndex + 1;
  }
  firstVisibleDomIndex = Math.max(0, Math.min(total - 1, firstVisibleDomIndex));

  return (
    <overridesMap.Container role="region" aria-roledescription="carousel" {...restProps}>
      <overridesMap.Wrapper
        ref={wrapperRef}
        draggable={draggable}
        slidesPerView={slidesPerView}
        tabIndex={keyboardControl ? 0 : undefined}
        aria-live={autoplay && !isPaused ? 'off' : 'polite'}
        onKeyDown={onKeyDown}
        onClickCapture={onClickCapture}
        onDragStart={onDragStart}
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
          momentum={isMomentum}
          slidesPerView={slidesPerView}
        >
          <SwiperSlidesRenderer
            slides={slides as readonly SwiperSlideElement[]}
            slidesPerView={slidesPerView}
            realIndex={realIndex}
            firstVisibleIndex={getSlideRealIndex(firstVisibleDomIndex)}
            visibleCount={visibleCount}
            realSlidesCount={realSlidesCount}
            getSlideRealIndex={getSlideRealIndex}
            slideLabel={slideLabel}
          />
        </overridesMap.Track>
      </overridesMap.Wrapper>
    </overridesMap.Container>
  );
});

Swiper.displayName = 'Swiper';

export default Swiper;
