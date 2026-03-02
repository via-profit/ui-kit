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
  readonly isVisible: boolean;
  readonly calculatePosition: () => void;
  readonly scrollableAncestor: HTMLElement | Window | null;
  readonly getTransformOrigin: (placement: AnchorPos) => string;
  readonly setActualPlacement: React.Dispatch<React.SetStateAction<AnchorPos>>;
  readonly setStyle: React.Dispatch<React.SetStateAction<React.CSSProperties | null>>;
  readonly setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [isVisible, setIsVisible] = React.useState(false);
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

      // Calculating the position relative to the viewport
      switch (direction) {
        case 'top':
          top = anchorRect.top - popperRect.height - offset;

          if (modifier === 'left' || modifier === 'start') {
            left = anchorRect.left;
          } else if (modifier === 'right' || modifier === 'end') {
            left = anchorRect.right - popperRect.width;
          } else {
            left = anchorRect.left + (anchorRect.width - popperRect.width) / 2;
          }
          break;

        case 'bottom':
          top = anchorRect.bottom + offset;

          if (modifier === 'left' || modifier === 'start') {
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
        return { left, top };
      }

      // For the final positioning, we take into account the strategy
      if (positionStrategy === 'absolute') {
        return {
          left: left + window.scrollX,
          top: top + window.scrollY,
        };
      }

      return { left, top };
    },
    [offset, positionStrategy],
  );

  const clampPopperToContainer = React.useCallback(
    (style: { left: number; top: number }, _popperRect: DOMRect) => style,
    [],
  );

  const checkIfViewportFits = React.useCallback(
    (style: { left: number; top: number }, popperRect: DOMRect) => {
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

    const placements = getPreferredPlacements(actualPlacement, anchorRect, popperRect);

    if (placements.found) {
      setActualPlacement(placements.placement);
      setStyle(placements.style);
    } else {
      setStyle(placements.style);
    }
  }, [actualPlacement, anchorElement, getPreferredPlacements]);

  const getTransformOrigin = React.useCallback((placement: AnchorPos): string => {
    if (placement.startsWith('top')) return 'bottom center';
    if (placement.startsWith('bottom')) return 'top center';
    if (placement.startsWith('left')) return 'right center';
    if (placement.startsWith('right')) return 'left center';

    return 'top center';
  }, []);

  // Open / Close popper logic
  React.useEffect(() => {
    if (!isOpen) {
      setIsVisible(false);
      setStyle(null);
    } else if (anchorElement && isOpen && popperRef.current) {
      const anchorRect = anchorElement.getBoundingClientRect();
      const popperRect = popperRef.current.getBoundingClientRect();

      const placements = getPreferredPlacements(actualPlacement, anchorRect, popperRect);

      if (placements.found) {
        setActualPlacement(placements.placement);
        setStyle(placements.style);
      } else {
        setStyle(placements.style);
      }
      setIsVisible(true);
    }
  }, [actualPlacement, anchorElement, getPreferredPlacements, isOpen]);

  // The anchor element changes
  React.useEffect(() => {
    if (!isOpen || !anchorElement) return;

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

  return {
    actualPlacement,
    style,
    popperRef,
    isVisible,
    scrollableAncestor,
    calculatePosition,
    getTransformOrigin,
    setActualPlacement,
    setStyle,
    setIsVisible,
  };
};

export default usePopper;
