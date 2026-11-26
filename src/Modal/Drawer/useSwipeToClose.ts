import React from 'react';

import type { AnchorVariant } from './DrawerInner';

export type UseSwipeToCloseOptions = {
  /**
   * The drawer element: it follows the finger
   */
  readonly elementRef: React.RefObject<HTMLDivElement | null>;
  readonly enabled: boolean;
  readonly isOpen: boolean;
  readonly anchor: AnchorVariant;
  readonly onClose: (event: React.PointerEvent<HTMLDivElement>) => void;
};

// The finger moves this far before the gesture is recognized as a drag or a scroll
const SLOP = 6;

// The drawer is closed when dragged by this part of its size or thrown faster than this
const CLOSE_RATIO = 0.25;
const CLOSE_VELOCITY = 0.5; // px per ms

const RETURN_TRANSITION = 'transform 240ms ease-out';

type Mode = 'idle' | 'pending' | 'drag' | 'scroll';

type GestureState = {
  mode: Mode;
  pointerId: number;
  startX: number;
  startY: number;
  offset: number;
  lastOffset: number;
  lastTime: number;
  velocity: number;
};

const initialState: GestureState = {
  mode: 'idle',
  pointerId: -1,
  startX: 0,
  startY: 0,
  offset: 0,
  lastOffset: 0,
  lastTime: 0,
  velocity: 0,
};

const isVertical = (anchor: AnchorVariant) => anchor === 'bottom' || anchor === 'top';

/**
 * The movement of the finger towards the edge of the drawer: positive closes it
 */
const getClosingDelta = (anchor: AnchorVariant, dx: number, dy: number) => {
  switch (anchor) {
    case 'top':
      return -dy;
    case 'left':
      return -dx;
    case 'right':
      return dx;
    case 'bottom':
    default:
      return dy;
  }
};

const getTransform = (anchor: AnchorVariant, offset: number) => {
  switch (anchor) {
    case 'top':
      return `translateY(${-offset}px)`;
    case 'left':
      return `translateX(${-offset}px)`;
    case 'right':
      return `translateX(${offset}px)`;
    case 'bottom':
    default:
      return `translateY(${offset}px)`;
  }
};

/**
 * Whether an element between the target and the drawer can scroll the way the finger moves.
 * Then the finger scrolls the content: the drawer is dragged only when the content is at its edge
 */
const canScrollWithGesture = (
  target: EventTarget | null,
  root: HTMLElement,
  anchor: AnchorVariant,
) => {
  let element = target instanceof Element ? target : null;

  while (element && element !== root) {
    if (element instanceof HTMLElement) {
      const style = window.getComputedStyle(element);
      const overflow = isVertical(anchor) ? style.overflowY : style.overflowX;
      const scrollable = overflow === 'auto' || overflow === 'scroll';

      if (scrollable) {
        const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } =
          element;

        switch (anchor) {
          case 'bottom':
            if (scrollTop > 0) {
              return true;
            }
            break;
          case 'top':
            if (scrollTop + clientHeight < scrollHeight - 1) {
              return true;
            }
            break;
          case 'left':
            if (scrollLeft + clientWidth < scrollWidth - 1) {
              return true;
            }
            break;
          case 'right':
            if (scrollLeft > 0) {
              return true;
            }
            break;
          default:
            break;
        }
      }
    }

    element = element.parentElement;
  }

  return false;
};

/**
 * Closes the drawer by a swipe towards its edge.
 *
 * The pointer events move the drawer. A touch would be taken by the browser for the scroll
 * (and the pointer cancelled), so the native `touchmove` is prevented while the drawer is dragged
 */
const useSwipeToClose = (options: UseSwipeToCloseOptions) => {
  const { elementRef, enabled, isOpen, anchor, onClose } = options;
  const stateRef = React.useRef<GestureState>({ ...initialState });

  const setOffset = React.useCallback(
    (offset: number, transition: string) => {
      const element = elementRef.current;
      if (element) {
        element.style.transition = transition;
        element.style.transform = offset > 0 ? getTransform(anchor, offset) : '';
      }
    },
    [anchor, elementRef],
  );

  const restore = React.useCallback(() => {
    const element = elementRef.current;
    if (element) {
      element.style.transition = '';
      element.style.transform = '';
    }
  }, [elementRef]);

  // A drawer closed by a swipe keeps its offset while it slides out: reset it for the next opening
  React.useEffect(() => {
    if (isOpen) {
      stateRef.current = { ...initialState };
      restore();
    }
  }, [isOpen, restore]);

  /**
   * Decides on the first noticeable movement whether it drags the drawer or scrolls the content
   */
  const update = React.useCallback(
    (clientX: number, clientY: number, target: EventTarget | null) => {
      const state = stateRef.current;
      const element = elementRef.current;
      if (!element || (state.mode !== 'pending' && state.mode !== 'drag')) {
        return;
      }

      const dx = clientX - state.startX;
      const dy = clientY - state.startY;
      const closing = getClosingDelta(anchor, dx, dy);

      if (state.mode === 'pending') {
        const main = isVertical(anchor) ? Math.abs(dy) : Math.abs(dx);
        const cross = isVertical(anchor) ? Math.abs(dx) : Math.abs(dy);

        if (main < SLOP && cross < SLOP) {
          return;
        }

        const isDrag =
          closing > 0 && main >= cross && !canScrollWithGesture(target, element, anchor);
        state.mode = isDrag ? 'drag' : 'scroll';

        if (!isDrag) {
          return;
        }

        // The drag starts from here, without a jump by the slop
        state.startX = clientX;
        state.startY = clientY;
        state.lastTime = performance.now();
      }

      const offset = Math.max(
        0,
        getClosingDelta(anchor, clientX - state.startX, clientY - state.startY),
      );
      const now = performance.now();
      const elapsed = now - state.lastTime;

      if (elapsed > 0) {
        state.velocity = (offset - state.lastOffset) / elapsed;
      }

      state.lastOffset = offset;
      state.lastTime = now;
      state.offset = offset;
      setOffset(offset, 'none');
    },
    [anchor, elementRef, setOffset],
  );

  // A non-passive listener: only it may stop the browser from scrolling under the drag
  React.useEffect(() => {
    const element = elementRef.current;
    if (!enabled || !element) {
      return undefined;
    }

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) {
        update(touch.clientX, touch.clientY, event.target);
      }

      if (stateRef.current.mode === 'drag' && event.cancelable) {
        event.preventDefault();
      }
    };

    element.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      element.removeEventListener('touchmove', handleTouchMove);
    };
  }, [enabled, elementRef, update]);

  const onPointerDown = React.useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) {
      return;
    }

    // A mouse drags only by the handle: everywhere else it selects the text
    const target = event.target instanceof Element ? event.target : null;
    if (event.pointerType === 'mouse') {
      if (!target?.closest('[data-drawer-handle]')) {
        return;
      }

      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    stateRef.current = {
      ...initialState,
      mode: 'pending',
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastTime: performance.now(),
    };
  }, []);

  const onPointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerId === stateRef.current.pointerId) {
        update(event.clientX, event.clientY, event.target);
      }
    },
    [update],
  );

  const finish = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>, cancelled: boolean) => {
      const state = stateRef.current;
      if (event.pointerId !== state.pointerId) {
        return;
      }

      const wasDragged = state.mode === 'drag';
      const element = elementRef.current;
      const size = element ? (isVertical(anchor) ? element.offsetHeight : element.offsetWidth) : 0;
      const shouldClose =
        wasDragged &&
        !cancelled &&
        (state.offset > size * CLOSE_RATIO || state.velocity > CLOSE_VELOCITY);

      stateRef.current = { ...initialState };

      if (!wasDragged) {
        return;
      }

      if (shouldClose) {
        // The offset is kept: the drawer slides out from where the finger left it.
        // The own transitions of the drawer are back, the drag turned them off
        if (element) {
          element.style.transition = '';
        }
        onClose(event);

        return;
      }

      setOffset(0, RETURN_TRANSITION);
    },
    [anchor, elementRef, onClose, setOffset],
  );

  const onPointerUp = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => finish(event, false),
    [finish],
  );

  const onPointerCancel = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => finish(event, true),
    [finish],
  );

  if (!enabled) {
    return {};
  }

  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel };
};

export default useSwipeToClose;
