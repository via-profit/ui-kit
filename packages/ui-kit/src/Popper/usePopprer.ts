import React from 'react';
import { AnchorPos } from './Popper';
import { PositionStrategy } from './PopperContainer';

// import usePopperPosition from './usePopperPosition'

export interface UsePopperProps {
  readonly anchorElement?: HTMLElement | null;
  readonly anchorPos?: AnchorPos;
  readonly positionStrategy?: PositionStrategy;
  readonly autoFlip?: boolean;
  readonly offset?: number;
  readonly viewportMargin?: number;
  readonly isOpen?: boolean;
}

export interface UsePopperResult {
  readonly actualPlacement: AnchorPos;
  readonly style: React.CSSProperties | null;
  readonly popperRef: React.MutableRefObject<HTMLDivElement | null>;
  // readonly isVisible: boolean;
  readonly calculatePosition: () => void;
  readonly scrollableAncestor: HTMLElement | Window | null;
  readonly setActualPlacement: React.Dispatch<React.SetStateAction<AnchorPos>>;
  readonly setStyle: React.Dispatch<React.SetStateAction<React.CSSProperties | null>>;
  // readonly setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Finds the closest scrollable ancestor of an element.
 * A scrollable element is one that has overflow set to auto, scroll, or overlay
 * and has content that overflows, allowing scrolling.
 *
 * @param element - The element to start searching from
 * @param includeHidden - Whether to consider elements with overflow: hidden
 * @returns The closest scrollable ancestor or window if none found
 */
export const findScrollableAncestor = (
  element: HTMLElement | null,
  includeHidden: boolean = false,
): HTMLElement | Window | null => {
  if (!element) {
    return null;
  }

  // Helper to check if an element is scrollable
  const isScrollable = (el: HTMLElement): boolean => {
    const style = window.getComputedStyle(el);
    const overflow = style.overflow + style.overflowY + style.overflowX;

    // Check if element has overflow that enables scrolling
    const hasOverflow =
      overflow.includes('auto') ||
      overflow.includes('scroll') ||
      (includeHidden && overflow.includes('hidden'));

    if (!hasOverflow) {
      return false;
    }

    // Check if element actually has scrollable content
    return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
  };

  // Start from parent (skip the element itself)
  let parent = element.parentElement;

  while (parent) {
    if (isScrollable(parent)) {
      return parent;
    }
    parent = parent.parentElement;
  }

  // If no scrollable ancestor found, return window (which is scrollable)
  return window;
};

export const usePopper = ({
  anchorElement,
  anchorPos = 'auto',
  positionStrategy = 'fixed',
  autoFlip = true,
  offset = 0,
  viewportMargin = 30,
  isOpen = false,
}: UsePopperProps): UsePopperResult => {
  const [actualPlacement, setActualPlacement] = React.useState<AnchorPos>(anchorPos);
  const [style, setStyle] = React.useState<React.CSSProperties | null>(null);
  // const [isVisible, setIsVisible] = React.useState(false);
  const popperRef = React.useRef<HTMLDivElement | null>(null);

  // Finding the nearest scrollable ancestor
  const scrollableAncestor = React.useMemo(() => {
    if (!anchorElement || typeof window === 'undefined') {
      return null;
    }

    return findScrollableAncestor(anchorElement);
  }, [anchorElement]);

  // Synchronizing actualPlacement with anchorPos
  React.useEffect(() => {
    if (actualPlacement !== anchorPos) {
      setActualPlacement(anchorPos);
    }
  }, [actualPlacement, anchorPos]);

  const getPositionStyle = React.useCallback(
    (props: {
      readonly place: AnchorPos;
      readonly anchorRect: DOMRect;
      readonly popperRect: DOMRect;
      readonly forViewportCheck?: boolean;
    }) => {
      const { place, anchorRect, popperRect, forViewportCheck = false } = props;
      const [direction, modifier = ''] = place.split('-');

      let left = anchorRect.left;
      let top = anchorRect.top;
      let width = undefined;

      // Calculating the position relative to the viewport
      switch (direction) {
        case 'top':
          top = anchorRect.top - popperRect.height - offset;
          if (modifier === 'fill') {
            left = anchorRect.left;
            width = anchorRect.width;
          } else if (modifier === 'left' || modifier === 'start') {
            left = anchorRect.left;
          } else if (modifier === 'right' || modifier === 'end') {
            left = anchorRect.right - popperRect.width;
          } else {
            left = anchorRect.left + (anchorRect.width - popperRect.width) / 2;
          }
          break;

        case 'bottom':
          top = anchorRect.bottom + offset;

          if (modifier === 'fill') {
            left = anchorRect.left;
            width = anchorRect.width;
          } else if (modifier === 'left' || modifier === 'start') {
            left = anchorRect.left;
          } else if (modifier === 'right' || modifier === 'end') {
            left = anchorRect.right - popperRect.width;
          } else {
            left = anchorRect.left + (anchorRect.width - popperRect.width) / 2;
          }
          break;

        case 'left':
          left = anchorRect.left - popperRect.width - offset;

          if (modifier === 'top' || modifier === 'start') {
            top = anchorRect.top;
          } else if (modifier === 'bottom' || modifier === 'end') {
            top = anchorRect.bottom - popperRect.height;
          } else {
            top = anchorRect.top + (anchorRect.height - popperRect.height) / 2;
          }
          break;

        case 'right':
          left = anchorRect.right + offset;

          if (modifier === 'top' || modifier === 'start') {
            top = anchorRect.top;
          } else if (modifier === 'bottom' || modifier === 'end') {
            top = anchorRect.bottom - popperRect.height;
          } else {
            top = anchorRect.top + (anchorRect.height - popperRect.height) / 2;
          }
          break;

        default:
          left = anchorRect.left + (anchorRect.width - popperRect.width) / 2;
          top = anchorRect.bottom + offset;
      }

      // Returning the viewport coordinates for verification or the final coordinates
      if (forViewportCheck) {
        return { left, top, width };
      }

      // For the final positioning, we take into account the strategy
      if (positionStrategy === 'absolute') {
        return {
          left: left + window.scrollX,
          top: top + window.scrollY,
          width,
        };
      }

      return { left, top, width };
    },
    [offset, positionStrategy],
  );

  // const clampPopperToContainer = React.useCallback(
  //   (style: { left: number; top: number; width?: number }, _popperRect: DOMRect) => style,
  //   [],
  // );
  const clampPopperToContainer = React.useCallback(
    (style: { left: number; top: number; width?: number }, popperRect: DOMRect) => {
      // Если нет scrollableAncestor, используем document.documentElement как fallback
      const container =
        scrollableAncestor instanceof HTMLElement ? scrollableAncestor : document.documentElement;

      const containerRect = container.getBoundingClientRect();

      // Базовые границы контейнера с учетом отступа
      let minLeft = containerRect.left + viewportMargin;
      let maxLeft = containerRect.right - popperRect.width - viewportMargin;
      let minTop = containerRect.top + viewportMargin;
      let maxTop = containerRect.bottom - popperRect.height - viewportMargin;

      // Для fixed позиционирования добавляем ограничения viewport
      if (positionStrategy === 'fixed') {
        // Границы viewport с учетом отступа
        const viewportMinLeft = viewportMargin;
        const viewportMaxLeft = window.innerWidth - popperRect.width - viewportMargin;
        const viewportMinTop = viewportMargin;
        const viewportMaxTop = window.innerHeight - popperRect.height - viewportMargin;

        // Берем пересечение границ контейнера и viewport
        minLeft = Math.max(minLeft, viewportMinLeft);
        maxLeft = Math.min(maxLeft, viewportMaxLeft);
        minTop = Math.max(minTop, viewportMinTop);
        maxTop = Math.min(maxTop, viewportMaxTop);
      }

      // Убеждаемся, что границы валидны (min не больше max)
      const validMinLeft = Math.min(minLeft, maxLeft);
      const validMaxLeft = Math.max(minLeft, maxLeft);
      const validMinTop = Math.min(minTop, maxTop);
      const validMaxTop = Math.max(minTop, maxTop);

      // Ограничиваем позицию
      const clampedLeft = Math.max(validMinLeft, Math.min(style.left, validMaxLeft));
      const clampedTop = Math.max(validMinTop, Math.min(style.top, validMaxTop));

      return {
        left: clampedLeft,
        top: clampedTop,
        width: style.width,
      };
    },
    [positionStrategy, scrollableAncestor, viewportMargin],
  );

  const checkIfViewportFits = React.useCallback(
    (style: { left: number; top: number; width?: number }, popperRect: DOMRect) => {
      const left = style.left;
      const top = style.top;
      const right = left + popperRect.width;
      const bottom = top + popperRect.height;

      if (positionStrategy === 'absolute' && scrollableAncestor instanceof HTMLElement) {
        const containerRect = scrollableAncestor.getBoundingClientRect();

        const relativeLeft = left - containerRect.left;
        const relativeTop = top - containerRect.top;

        const relativeRight = relativeLeft + popperRect.width;
        const relativeBottom = relativeTop + popperRect.height;

        const isWithinHorizontal =
          relativeLeft >= viewportMargin && relativeRight <= containerRect.width - viewportMargin;

        const isWithinVertical =
          relativeTop >= viewportMargin && relativeBottom <= containerRect.height - viewportMargin;

        return isWithinHorizontal && isWithinVertical;
      }

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const isWithinHorizontal = left >= viewportMargin && right <= viewportWidth - viewportMargin;
      const isWithinVertical = top >= viewportMargin && bottom <= viewportHeight - viewportMargin;
      const hasValidPosition = left >= 0 && top >= 0;

      return hasValidPosition && isWithinHorizontal && isWithinVertical;
    },
    [viewportMargin, scrollableAncestor, positionStrategy],
  );

  const placementsOrder = React.useMemo(() => {
    const basePlacements: Record<string, readonly AnchorPos[]> = {
      top: ['top', 'top-left', 'top-right', 'top-start', 'top-end'],
      bottom: ['bottom', 'bottom-left', 'bottom-right', 'bottom-start', 'bottom-end'],
      left: ['left', 'left-top', 'left-bottom'],
      right: ['right', 'right-top', 'right-bottom'],
    };

    const allPlacements = [
      ...basePlacements.top,
      ...basePlacements.bottom,
      ...basePlacements.left,
      ...basePlacements.right,
    ] as AnchorPos[];

    const order: Record<string, AnchorPos[]> = {};

    allPlacements.forEach(placement => {
      const [direction] = placement.split('-') as [string];

      // Priority: same direction > opposite > the rest
      const opposite =
        direction === 'top'
          ? 'bottom'
          : direction === 'bottom'
            ? 'top'
            : direction === 'left'
              ? 'right'
              : 'left';

      order[placement] = [
        placement,
        ...basePlacements[direction].filter(p => p !== placement),
        ...(basePlacements[opposite] || []),
        ...(direction !== 'left' && direction !== 'right' ? basePlacements.left : []),
        ...(direction !== 'left' && direction !== 'right' ? basePlacements.right : []),
      ] as AnchorPos[];
    });
    // console.log(order);

    return order;
  }, []);

  const getPreferredPlacements = React.useCallback(
    (preferredPlacement: AnchorPos, anchorRect: DOMRect, popperRect: DOMRect) => {
      // Check the auto placements
      if (preferredPlacement.startsWith('auto')) {
        const [, preferredDirection = 'bottom'] = preferredPlacement.split('-');

        const allPlacements: AnchorPos[] = [
          'bottom',
          'bottom-start',
          'bottom-end',
          'bottom-left',
          'bottom-right',
          'top',
          'top-left',
          'top-right',
          'top-start',
          'top-end',
          'left',
          'left-top',
          'left-bottom',
          'right',
          'right-top',
          'right-bottom',
        ];

        // Sorting placements
        const sortedPlacements = [...allPlacements].sort((a, b) => {
          const aDir = a.split('-')[0];
          const bDir = b.split('-')[0];

          if (aDir === preferredDirection && bDir !== preferredDirection) return -1;
          if (aDir !== preferredDirection && bDir === preferredDirection) return 1;

          return 0;
        });

        for (const place of sortedPlacements) {
          const viewportStyle = getPositionStyle({
            place,
            anchorRect,
            popperRect,
            forViewportCheck: true,
          });
          const fits = checkIfViewportFits(viewportStyle, popperRect);

          if (fits) {
            const finalStyle = getPositionStyle({
              place,
              anchorRect,
              popperRect,
              forViewportCheck: false,
            });

            return {
              found: true,
              placement: place,
              style: clampPopperToContainer(finalStyle, popperRect),
            };
          }
        }
      }

      if (!autoFlip) {
        const finalStyle = getPositionStyle({
          place: preferredPlacement,
          anchorRect,
          popperRect,
          forViewportCheck: false,
        });

        return {
          found: false,
          placement: preferredPlacement,
          style: clampPopperToContainer(finalStyle, popperRect),
        };
      }

      /**
       * bottom-fill, top-fill
       */
      if (preferredPlacement.endsWith('fill')) {
        const [preferredDirection = 'bottom'] = preferredPlacement.split('-');
        const allPlacements: AnchorPos[] = ['top-fill', 'bottom-fill'];
        const sortedPlacements = [...allPlacements].sort((a, b) => {
          const aDir = a.split('-')[0];
          const bDir = b.split('-')[0];

          if (aDir === preferredDirection && bDir !== preferredDirection) return -1;
          if (aDir !== preferredDirection && bDir === preferredDirection) return 1;

          return 0;
        });

        for (const place of sortedPlacements) {
          const viewportStyle = getPositionStyle({
            place,
            anchorRect,
            popperRect,
            forViewportCheck: true,
          });
          const fits = checkIfViewportFits(viewportStyle, popperRect);

          if (fits) {
            const finalStyle = getPositionStyle({
              place,
              anchorRect,
              popperRect,
              forViewportCheck: false,
            });

            return {
              found: true,
              placement: place,
              style: clampPopperToContainer(finalStyle, popperRect),
            };
          }
        }
      }

      /**
       * Other
       */
      const order = placementsOrder[preferredPlacement] || placementsOrder.bottom;

      for (const place of order) {
        const viewportStyle = getPositionStyle({
          place,
          anchorRect,
          popperRect,
          forViewportCheck: true,
        });
        const fits = checkIfViewportFits(viewportStyle, popperRect);

        if (fits) {
          const finalStyle = getPositionStyle({
            place,
            anchorRect,
            popperRect,
            forViewportCheck: false,
          });

          return {
            found: true,
            placement: place,
            style: clampPopperToContainer(finalStyle, popperRect),
          };
        }
      }

      const finalStyle = getPositionStyle({
        place: preferredPlacement,
        anchorRect,
        popperRect,
        forViewportCheck: false,
      });

      return {
        found: false,
        placement: preferredPlacement,
        style: clampPopperToContainer(finalStyle, popperRect),
      };
    },
    [autoFlip, getPositionStyle, checkIfViewportFits, clampPopperToContainer, placementsOrder],
  );

  const calculatePosition = React.useCallback(() => {
    if (!anchorElement || !popperRef.current) {
      return;
    }
    const anchorRect = anchorElement.getBoundingClientRect();
    const popperRect = popperRef.current.getBoundingClientRect();

    const { style, placement, found } = getPreferredPlacements(anchorPos, anchorRect, popperRect);

    if (found) {
      setActualPlacement(placement);
    }
    setStyle(style);
  }, [anchorElement, anchorPos, getPreferredPlacements]);

  // const getTransformOrigin = React.useCallback((placement: AnchorPos): string => {
  //   if (placement.startsWith('top')) return 'bottom center';
  //   if (placement.startsWith('bottom')) return 'top center';
  //   if (placement.startsWith('left')) return 'right center';
  //   if (placement.startsWith('right')) return 'left center';
  //
  //   return 'top center';
  // }, []);

  /**
   * Open / Close popper logic
   */
  React.useEffect(() => {
    if (!isOpen) {
      setStyle(null);
    } else if (anchorElement && isOpen && popperRef.current) {
      calculatePosition();
    }
  }, [actualPlacement, anchorElement, getPreferredPlacements, isOpen, calculatePosition]);

  /**
   * The anchor element changes
   */
  React.useEffect(() => {
    if (!isOpen || !anchorElement) {
      return;
    }

    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(() => {
        // console.log('The anchor element was change');
        calculatePosition();
      });
    });

    observer.observe(anchorElement, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    // eslint-disable-next-line consistent-return
    return () => {
      observer.disconnect();
    };
  }, [isOpen, anchorElement, calculatePosition]);

  /**
   * On scroll - recalculate position
   */
  React.useEffect(() => {
    if (!isOpen || !scrollableAncestor) {
      return;
    }

    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        calculatePosition();
      });
    };

    // parent scroll listener
    if (scrollableAncestor instanceof HTMLElement) {
      scrollableAncestor.addEventListener('scroll', handleScroll, { passive: true });
    } else if (scrollableAncestor === window) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (scrollableAncestor instanceof HTMLElement) {
        scrollableAncestor.removeEventListener('scroll', handleScroll);
      } else if (scrollableAncestor === window) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isOpen, scrollableAncestor, calculatePosition]);

  /**
   * On window resize - recalculate position
   */
  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleResize = () => {
      window.requestAnimationFrame(() => {
        calculatePosition();
      });
    };

    // parent scroll listener
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [calculatePosition, isOpen]);

  return {
    actualPlacement,
    style,
    popperRef,
    // isVisible,
    scrollableAncestor,
    calculatePosition,
    // getTransformOrigin,
    setActualPlacement,
    setStyle,
    // setIsVisible,
  };
};

export default usePopper;
