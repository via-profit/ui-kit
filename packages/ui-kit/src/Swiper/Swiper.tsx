import * as React from 'react';
import Container, { SwiperContainerProps } from './SwiperContainer';
import Wrapper, { SwiperWrapperProps } from './SwiperWrapper';
import Track, { SwiperTrackProps } from './SwiperTrack';
import SwiperSlide, { SwiperSlideBaseProps, SwiperSlideProps } from './SwiperSlide';
import SwiperSlidesRenderer from './SwiperSlidesRenderer';

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

export type SwiperDirection = 'horizontal' | 'vertical';
export type SwiperEffect = 'slide' | 'fade';

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

  /**
   * How many slides are visible at once. A fractional value shows a part of the next slide,
   * for example `1.2`\
   * **Default:** `1`
   */
  readonly slidesPerView?: number;

  /**
   * The current slide is in the middle of the view, the neighbours are partially visible on both sides.
   * Makes sense with a fractional `slidesPerView`\
   * **Default:** `false`
   */
  readonly centered?: boolean;

  /**
   * The direction of the scroll. The vertical swiper needs a height: set it on the swiper\
   * **Default:** `'horizontal'`
   */
  readonly direction?: SwiperDirection;

  /**
   * `slide` moves the track, `fade` cross-fades the slides lying on top of each other.
   * With `fade` the slides are always one per view\
   * **Default:** `'slide'`
   */
  readonly effect?: SwiperEffect;

  /**
   * The duration of the slide change in milliseconds\
   * **Default:** `300`
   */
  readonly speed?: number;

  /**
   * Continuous scroll (ticker) in pixels per second, for example the logos of the clients.
   * The track moves without stops in the infinite loop, the drag and the keyboard are off.
   * The scroll pauses with `pauseOnHover`, by the API and when the user asked the system to reduce motion
   */
  readonly autoScroll?: number;

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

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const Swiper = React.forwardRef((props: SwiperProps, ref: React.ForwardedRef<SwiperRef>) => {
  const {
    children,
    dragThreshold = 240,
    snap = true,
    draggable: draggableProp = true,
    overrides,
    initialIndex = 0,
    infinite = false,
    onSlideChange,
    autoplay = false,
    autoplayInterval = 3000,
    pauseOnHover = true,
    threshold = 20,
    resistance = true,
    slidesPerView: slidesPerViewProp = 1,
    centered = false,
    direction = 'horizontal',
    effect = 'slide',
    speed = 300,
    autoScroll,
    keyboardControl: keyboardControlProp = true,
    slideLabel = defaultSlideLabel,
    ...restProps
  } = props;

  const isFade = effect === 'fade';
  const isTicker = typeof autoScroll === 'number' && autoScroll > 0 && !isFade;
  const isVertical = direction === 'vertical';
  const slidesPerView = isFade ? 1 : Math.max(slidesPerViewProp, 0.1);
  const draggable = draggableProp && !isTicker;
  const keyboardControl = keyboardControlProp && !isTicker;

  // The current slide is moved to the middle of the view by this number of slides
  const centerShift = centered && !isFade ? (slidesPerView - 1) / 2 : 0;

  // #region Slides
  const { slides, clones } = React.useMemo(() => {
    // toArray skips null/false and keeps the user keys (prefixed), so the slides are not remounted
    // when a slide is added to the start
    const childrenSlides = React.Children.toArray(children).filter(
      React.isValidElement,
    ) as SwiperSlideElement[];

    // The fade effect does not move the track, the loop does not need the copies
    if (!(infinite || isTicker) || isFade) {
      return { slides: childrenSlides, clones: 0 };
    }

    // The copies on each side cover the whole view (also its partially visible slides)
    // and the part of the view in front of the centered slide
    const count = Math.ceil(slidesPerView) + Math.ceil(centerShift);

    if (childrenSlides.length < Math.max(2, count)) {
      console.error(
        `For infinite loop with slidesPerView=${slidesPerView}${centered ? ' and centered' : ''}, need at least ${Math.max(2, count)} slides`,
      );

      return { slides: childrenSlides, clones: 0 };
    }

    const headClones = childrenSlides.slice(-count).map((slide, i) =>
      React.cloneElement(slide as any, {
        key: `clone-head-${i}`,
        'data-clone': 'head',
      }),
    );

    const tailClones = childrenSlides.slice(0, count).map((slide, i) =>
      React.cloneElement(slide as any, {
        key: `clone-tail-${i}`,
        'data-clone': 'tail',
      }),
    );

    return { slides: [...headClones, ...childrenSlides, ...tailClones], clones: count };
  }, [children, infinite, isTicker, isFade, slidesPerView, centerShift, centered]);

  // The infinite loop by the copies of the slides (slide effect and ticker)
  const isLoop = clones > 0;
  // The fade effect loops by the index alone
  const isFadeLoop = isFade && infinite && slides.length > 1;

  const total = slides.length;
  const realSlidesCount = total - 2 * clones;

  // Without the loop the last position shows the last slide at the end of the view
  // (in the middle of the view when centered). With a fractional slidesPerView it is not a whole
  // slide: the index goes up to the next whole number and the track stops at the last position
  const lastPosition =
    isFade || centerShift > 0 ? Math.max(0, total - 1) : Math.max(0, total - slidesPerView);
  const maxIndex = Math.ceil(lastPosition - 0.001);
  // The index while the track is between the slides (drag, free mode) without the loop
  const maxFreeIndex = Math.floor(lastPosition + 0.001);

  // #region States
  const [index, setIndex] = React.useState(() => {
    if (!isLoop) {
      return Math.max(0, Math.min(initialIndex, maxIndex));
    }

    return initialIndex + clones;
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
  const startCoord = React.useRef(0);
  const lastCoord = React.useRef(0);
  const lastTime = React.useRef(0);
  const velocity = React.useRef(0);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const isAnimating = React.useRef(false);
  const mounted = React.useRef(true);
  const suppressClick = React.useRef(false);

  const getCoord = React.useCallback(
    (e: React.PointerEvent) => (isVertical ? e.clientY : e.clientX),
    [isVertical],
  );

  // #region Real Index
  const realIndex = React.useMemo(() => {
    if (!isLoop) {
      return index;
    }

    const realIndex = index - clones;

    if (realIndex < 0) {
      return realSlidesCount + realIndex;
    }
    if (realIndex >= realSlidesCount) {
      return realIndex - realSlidesCount;
    }

    // In the infinite mode any slide can be the first visible one, so there is no clamp
    return realIndex;
  }, [index, isLoop, clones, realSlidesCount]);

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
    const lastIndex = isLoop ? total - clones : maxIndex;
    if (index > lastIndex) {
      setIndex(isLoop ? clones : maxIndex);
      setOffset(0);
    }
  }, [index, isLoop, total, clones, maxIndex]);

  // #region Normalization
  const normalizeIndex = React.useCallback(() => {
    if (!isLoop || !mounted.current) return;

    const firstRealIndex = clones;
    const lastRealIndex = total - clones - 1;

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
  }, [index, isLoop, clones, total, realSlidesCount]);

  // #region Navigation API

  const indexRef = React.useRef(index);
  React.useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const goToIndex = React.useCallback(
    (i: number) => {
      // In the infinite mode the index is normalized after the transition, so wait for it.
      // In the regular mode the transition is simply retargeted
      if (isLoop && isAnimating.current) return;

      let targetIndex = i;

      if (isLoop) {
        targetIndex = i + clones;
        const minIndex = clones;
        const maxIndex = clones + realSlidesCount - 1;
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
    [isLoop, clones, realSlidesCount, maxIndex],
  );

  const next = React.useCallback(() => {
    setDisableAnimation(false);
    setIsMomentum(false);
    setOffset(0);

    setIndex(prev => {
      let nextIndex: number;

      if (isLoop) {
        // The last position is the first tail clone: it mirrors the first real slide.
        // Further positions would show the empty space when slidesPerView > 1
        nextIndex = Math.min(prev + 1, total - clones);
      } else if (isFadeLoop) {
        nextIndex = (prev + 1) % total;
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
  }, [isLoop, isFadeLoop, maxIndex, total, clones]);

  const prev = React.useCallback(() => {
    setDisableAnimation(false);
    setIsMomentum(false);
    setOffset(0);

    setIndex(prev => {
      const nextIndex = isFadeLoop ? (prev - 1 + total) % total : Math.max(prev - 1, 0);

      if (nextIndex === prev) {
        return prev;
      }

      isAnimating.current = true;

      return nextIndex;
    });
  }, [isFadeLoop, total]);

  // #region Position
  // The position is the distance in pixels from the start of the track to the start of the view
  // without the centering shift. The state keeps it as index (whole slides) + offset (pixels)
  const getSlideSize = React.useCallback(() => {
    const wrapper = wrapperRef.current;
    const size = (isVertical ? wrapper?.clientHeight : wrapper?.clientWidth) || 0;

    return size / slidesPerView;
  }, [isVertical, slidesPerView]);

  // The last allowed position. In the infinite mode it is the first tail clone
  const maxPosition = React.useCallback(
    () => (isLoop ? total - clones : lastPosition) * getSlideSize(),
    [isLoop, total, clones, lastPosition, getSlideSize],
  );

  // The index of the track: without the loop the track stops at the last position
  // even if the index is the next whole number
  const trackIndex = (isLoop ? index : Math.min(index, lastPosition)) - centerShift;

  // The position on the screen right now, also in the middle of a transition
  const readPosition = React.useCallback(() => {
    const track = trackRef.current;
    const size = getSlideSize();
    if (track && typeof DOMMatrixReadOnly !== 'undefined') {
      const { transform } = getComputedStyle(track);
      if (transform && transform !== 'none') {
        const matrix = new DOMMatrixReadOnly(transform);

        return -(isVertical ? matrix.m42 : matrix.m41) + centerShift * size;
      }
    }

    return (trackIndex + centerShift) * size - offset;
  }, [trackIndex, centerShift, offset, getSlideSize, isVertical]);

  // Infinite mode: the same view is shown by the real slides and by the clones,
  // so the position is moved by the whole slides count when it comes close to the edge of the track
  const wrapPosition = React.useCallback(
    (position: number) => {
      const size = getSlideSize();
      const span = realSlidesCount * size;
      if (!isLoop || size === 0) return 0;
      if (position < size * 0.5) return span;
      if (position > maxPosition() - size * 0.5) return -span;

      return 0;
    },
    [isLoop, realSlidesCount, getSlideSize, maxPosition],
  );

  // Without the loop the index between the slides does not go past the last position
  const clampFreeIndex = React.useCallback(
    (i: number) => (isLoop ? i : Math.max(0, Math.min(maxFreeIndex, i))),
    [isLoop, maxFreeIndex],
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

      suppressClick.current = false;
      dragging.current = true;
      startCoord.current = getCoord(e);
      lastCoord.current = getCoord(e);
      lastTime.current = performance.now();
      velocity.current = 0;

      // The capture fails for a pointer that is already gone: the drag still works without it
      try {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      } catch {
        // nothing
      }

      // The fade does not move the track: the slide changes after the release
      if (isFade) return;

      const size = getSlideSize();
      // Grab the track where it is now: a running transition stops under the finger instead of jumping
      let position = readPosition();
      position += wrapPosition(position);

      const anchor = clampFreeIndex(size > 0 ? Math.round(position / size) : index);
      dragBasePosition.current = position;
      dragPosition.current = position;
      dragAnchorIndex.current = anchor;

      isAnimating.current = false;
      setDisableAnimation(true);
      setIsMomentum(false);
      setIsDragging(true);
      setIndex(anchor);
      setOffset(anchor * size - position);
    },
    [draggable, isFade, getCoord, getSlideSize, readPosition, wrapPosition, clampFreeIndex, index],
  );

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;

      const coord = getCoord(e);
      const now = performance.now();
      const delta = coord - lastCoord.current;
      const dt = now - lastTime.current;

      if (dt > 0) {
        velocity.current = delta / dt;
      }

      lastCoord.current = coord;
      lastTime.current = now;

      if (isFade) return;

      const size = getSlideSize();
      let position = dragBasePosition.current - (coord - startCoord.current);

      // Endless drag in the infinite mode: move the base together with the position
      const shift = wrapPosition(position);
      if (shift !== 0) {
        dragBasePosition.current += shift;
        dragAnchorIndex.current += Math.round(shift / size);
        position += shift;
      }

      if (!isLoop) {
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
      const nextIndex = snap
        ? dragAnchorIndex.current
        : clampFreeIndex(Math.round(position / size));
      setIndex(nextIndex);
      setOffset(nextIndex * size - position);
    },
    [
      getCoord,
      isFade,
      getSlideSize,
      wrapPosition,
      isLoop,
      maxPosition,
      resistance,
      snap,
      clampFreeIndex,
    ],
  );

  const onPointerUp = React.useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;

      const delta = lastCoord.current - startCoord.current;

      // It was a drag, not a click: the click on a link or a button inside the slide must not fire
      if (Math.abs(delta) > threshold) {
        suppressClick.current = true;
      }

      dragging.current = false;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // nothing
      }

      if (isFade) {
        if (delta < -threshold) {
          next();
        } else if (delta > threshold) {
          prev();
        }

        return;
      }

      const size = getSlideSize();
      const position = dragPosition.current;
      // The pointer stopped before the release: no inertia
      const v = performance.now() - lastTime.current > 100 ? 0 : velocity.current;
      const lastIndex = isLoop ? total - clones : maxIndex;

      setDisableAnimation(false);

      if (snap) {
        const anchor = dragAnchorIndex.current;
        const displacement = position - anchor * size;
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
              ? Math.max(anchor + 1, Math.round(position / size))
              : Math.min(anchor - 1, Math.round(position / size));
        }

        nextIndex = Math.max(0, Math.min(lastIndex, nextIndex));
        setIndex(nextIndex);
        setOffset(0);
        // A click without movement does not start a transition, so transitionend never comes
        // and the flag would block autoplay and goToIndex forever
        const target = (isLoop ? nextIndex : Math.min(nextIndex, lastPosition)) * size;
        isAnimating.current = Math.abs(target - position) > 0.5;
      } else {
        // Free mode: the track keeps moving by inertia and stops where it stops
        const maxProjected = (isLoop ? lastIndex : lastPosition) * size;
        const projected = Math.max(0, Math.min(maxProjected, position - v * 300));
        const nextIndex = clampFreeIndex(size > 0 ? Math.round(projected / size) : index);

        setIsMomentum(true);
        setIndex(nextIndex);
        setOffset(nextIndex * size - projected);
        isAnimating.current = Math.abs(projected - position) > 0.5;
      }

      setIsDragging(false);
    },
    [
      isFade,
      next,
      prev,
      getSlideSize,
      isLoop,
      total,
      clones,
      maxIndex,
      lastPosition,
      threshold,
      snap,
      dragThreshold,
      clampFreeIndex,
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
    if (!isLoop && !isFadeLoop && indexRef.current >= maxIndex) {
      goToIndex(0);
    } else {
      next();
    }
  };

  const pause = React.useCallback(() => setIsPausedByApi(true), []);
  const resume = React.useCallback(() => setIsPausedByApi(false), []);

  React.useEffect(() => {
    if (!autoplay || isTicker || isPaused) return undefined;

    const timer = setInterval(() => {
      if (!dragging.current && !isAnimating.current && mounted.current) {
        autoplayStep.current();
      }
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [autoplay, isTicker, autoplayInterval, isPaused]);

  // #region Ticker
  // The continuous scroll writes the transform directly: 60 renders per second are not needed for it.
  // The position is kept in slides, so it stays in place when the size of the swiper changes
  const tickerPosition = React.useRef<number | null>(null);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!isTicker || !isLoop || !track) return undefined;
    if (isPaused || prefersReducedMotion()) return undefined;

    let frame = 0;
    let last = performance.now();

    const step = (now: number) => {
      const size = getSlideSize();

      if (size > 0) {
        let position = tickerPosition.current ?? clones;
        position += ((autoScroll || 0) * (now - last)) / 1000 / size;
        if (position >= clones + realSlidesCount) {
          position -= realSlidesCount;
        }

        tickerPosition.current = position;
        const translate = -(position - centerShift) * size;
        track.style.transition = 'none';
        track.style.transform = isVertical
          ? `translateY(${translate}px)`
          : `translateX(${translate}px)`;
      }

      last = now;
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame);
  }, [
    isTicker,
    isLoop,
    isPaused,
    autoScroll,
    getSlideSize,
    realSlidesCount,
    clones,
    centerShift,
    isVertical,
  ]);

  // #region Hover and focus
  // The autoplay pauses while the pointer is over the swiper (pauseOnHover)
  // and always while the focus is inside it, so the keyboard user is not interrupted
  React.useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!(autoplay || isTicker) || !wrapper) return undefined;

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
  }, [autoplay, isTicker, pauseOnHover]);

  // #region Keyboard
  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!keyboardControl) return;

      // Do not steal the arrows from the fields inside the slides
      const target = event.target as HTMLElement;
      if (target.closest('input, textarea, select, [contenteditable="true"]')) return;

      if (event.key === (isVertical ? 'ArrowUp' : 'ArrowLeft')) {
        event.preventDefault();
        prev();
      }
      if (event.key === (isVertical ? 'ArrowDown' : 'ArrowRight')) {
        event.preventDefault();
        next();
      }
    },
    [keyboardControl, isVertical, prev, next],
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

    // The fade changes the opacity of the slides, the event bubbles up to the track
    const property = isFade ? 'opacity' : 'transform';

    const handleTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName !== property) return;
      isAnimating.current = false;
      normalizeIndex();
    };

    const handleTransitionCancel = (e: TransitionEvent) => {
      if (e.propertyName !== property) return;
      isAnimating.current = false;
    };

    track.addEventListener('transitionend', handleTransitionEnd);
    track.addEventListener('transitioncancel', handleTransitionCancel);

    return () => {
      track.removeEventListener('transitionend', handleTransitionEnd);
      track.removeEventListener('transitioncancel', handleTransitionCancel);
    };
  }, [normalizeIndex, isFade]);

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
      if (!isLoop) {
        return domIndex;
      }

      if (domIndex < clones) {
        return realSlidesCount - clones + domIndex;
      }

      if (domIndex >= total - clones) {
        return domIndex - (total - clones);
      }

      return domIndex - clones;
    },
    [isLoop, realSlidesCount, clones, total],
  );

  // The slides at least partially in the view: they are not inert, so a partially visible slide
  // can be clicked. Between the slides (drag, free mode), with a fractional slidesPerView
  // and with the centering one more slide is partially visible
  const wrapper = wrapperRef.current;
  const slideSize = wrapper
    ? (isVertical ? wrapper.clientHeight : wrapper.clientWidth) / slidesPerView
    : 0;
  const viewPosition = slideSize > 0 ? trackIndex - offset / slideSize : trackIndex;
  let firstVisibleDomIndex = Math.floor(viewPosition + 0.001);
  let visibleCount = Math.ceil(viewPosition + slidesPerView - 0.001) - firstVisibleDomIndex;
  if (isFade) {
    firstVisibleDomIndex = index;
    visibleCount = 1;
  }
  firstVisibleDomIndex = Math.max(0, Math.min(total - 1, firstVisibleDomIndex));

  // The ticker moves without the state: all the slides are rendered
  if (isTicker) {
    firstVisibleDomIndex = clones;
    visibleCount = realSlidesCount;
  }

  return (
    <overridesMap.Container role="region" aria-roledescription="carousel" {...restProps}>
      <overridesMap.Wrapper
        ref={wrapperRef}
        draggable={draggable}
        slidesPerView={slidesPerView}
        vertical={isVertical}
        tabIndex={keyboardControl ? 0 : undefined}
        aria-live={(autoplay || isTicker) && !isPaused ? 'off' : 'polite'}
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
          index={isFade ? 0 : trackIndex}
          offset={isFade ? 0 : offset}
          disableAnimation={disableAnimation}
          momentum={isMomentum}
          slidesPerView={slidesPerView}
          vertical={isVertical}
          effect={effect}
          speed={speed}
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
            activeDomIndex={isFade ? index : null}
          />
        </overridesMap.Track>
      </overridesMap.Wrapper>
    </overridesMap.Container>
  );
});

Swiper.displayName = 'Swiper';

export default Swiper;
