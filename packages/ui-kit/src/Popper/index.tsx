import React from 'react';
import ReactDOM from 'react-dom';

import Container, { PopperContainerProps, PositionStrategy } from './PopperContainer';

/**
 * Base directions for popper positioning.
 * These are the primary axes around which the popper can be placed.
 *
 * @default 'bottom' (when used as anchorPos)
 * @example
 * ```tsx
 * type Direction = 'top' | 'bottom' | 'left' | 'right';
 * ```
 */
export type Direction = 'top' | 'left' | 'right' | 'bottom';

/**
 * Auto placement modifiers that enable intelligent positioning.
 * The popper will automatically choose the best placement that fits in the viewport.
 * - `auto`: Dynamically selects the optimal direction
 * - `auto-top`, `auto-bottom`, `auto-left`, `auto-right`: Auto placement with priority given to the specified direction
 *
 * @example
 * ```tsx
 * // Will try to place on top first, but will flip if needed
 * <Popper anchorPos="auto-top">...</Popper>
 *
 * // Will try all directions equally
 * <Popper anchorPos="auto">...</Popper>
 * ```
 */
export type AutoModifier = 'auto' | 'auto-top' | 'auto-bottom' | 'auto-left' | 'auto-right';

/**
 * Precise placement modifiers for fine-tuned positioning.
 * These combine a base direction with specific alignment options:
 * - `start`/`end`: Aligns to the beginning or end of the anchor (useful for RTL layouts)
 * - `left`/`right`: Horizontal alignment for vertical placements
 * - `top`/`bottom`: Vertical alignment for horizontal placements
 *
 * @example
 * ```tsx
 * // Corner placements
 * <Popper anchorPos="top-left">Aligns to top-left corner</Popper>
 *
 * // Logical placements (RTL-friendly)
 * <Popper anchorPos="bottom-start">Aligns to bottom edge, start side</Popper>
 *
 * // Side alignments
 * <Popper anchorPos="left-top">Aligns to left side, top edge</Popper>
 * ```
 */
export type Modifier =
  | 'top-start' // Top edge, start side (left in LTR, right in RTL)
  | 'top-end' // Top edge, end side (right in LTR, left in RTL)
  | 'top-left' // Top edge, left side (absolute)
  | 'top-right' // Top edge, right side (absolute)
  | 'bottom-end' // Bottom edge, end side (right in LTR, left in RTL)
  | 'bottom-start' // Bottom edge, start side (left in LTR, right in RTL)
  | 'bottom-right' // Bottom edge, right side (absolute)
  | 'bottom-left' // Bottom edge, left side (absolute)
  | 'left-top' // Left edge, top side
  | 'left-bottom' // Left edge, bottom side
  | 'right-top' // Right edge, top side
  | 'right-bottom'; // Right edge, bottom side

/**
 * Available placement options for the popper.
 * Combines basic directions, precise modifiers, and auto-placement options
 * to provide full control over popper positioning.
 *
 * Categories:
 * - **Basic directions**: `top`, `bottom`, `left`, `right` - Centered placement
 * - **Corner placements**: `top-left`, `top-right`, `bottom-left`, `bottom-right` - Aligned to corners
 * - **Logical placements**: `top-start`, `top-end`, `bottom-start`, `bottom-end` - RTL-aware alignment
 * - **Side alignments**: `left-top`, `left-bottom`, `right-top`, `right-bottom` - Edge-aligned
 * - **Auto placements**: `auto`, `auto-top`, `auto-bottom`, `auto-left`, `auto-right` - Intelligent positioning
 *
 * @default 'bottom'
 * @example
 * ```tsx
 * // Basic centered placement
 * <Popper anchorPos="bottom">Centered below anchor</Popper>
 *
 * // Corner placement
 * <Popper anchorPos="top-right">Attached to top-right corner</Popper>
 *
 * // Auto placement with priority
 * <Popper anchorPos="auto-left">Try left first, then find best fit</Popper>
 *
 * // RTL-aware placement
 * <Popper anchorPos="top-start">Respects text direction</Popper>
 * ```
 */
export type AnchorPos = Direction | Modifier | AutoModifier;

export interface PopperProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Controls the visibility of the popper.
   * When `true`, the popper is rendered and positioned.
   *
   * @required
   * @example
   * ```tsx
   * <Popper isOpen={true}>...</Popper>
   * ```
   */
  readonly isOpen: boolean;

  /**
   * The HTML element to which the popper will be attached and positioned relative to.
   * If `null` or undefined, the popper will not be positioned.
   *
   * @default undefined
   * @example
   * ```tsx
   * const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
   * <Popper anchorElement={anchor}>...</Popper>
   * ```
   */
  readonly anchorElement?: HTMLElement | null;

  /**
   * Determines the preferred placement of the popper relative to the anchor element.
   * The actual placement may change if `autoFlip` is enabled and there's not enough space.
   *
   * @default 'auto'
   * @example
   * ```tsx
   * <Popper anchorPos="top-start">...</Popper>
   * <Popper anchorPos="bottom-end">...</Popper>
   * ```
   */
  readonly anchorPos?: AnchorPos;

  /**
   * The z-index value for the popper container.
   * Used to control the stacking order of the popper relative to other elements.
   *
   * @default theme.zIndex.modal
   * @example
   * ```tsx
   * <Popper zIndex={9999}>...</Popper>
   * ```
   */
  readonly zIndex?: number;

  /**
   * When enabled, the popper will automatically try to find the best placement
   * if the preferred placement doesn't fit in the viewport.
   * The component will iterate through possible placements until it finds one that fits.
   *
   * @default true
   * @example
   * ```tsx
   * <Popper autoFlip={true}>...</Popper> // Will flip if needed
   * <Popper autoFlip={false}>...</Popper> // Will always use preferred placement
   * ```
   */
  readonly autoFlip?: boolean;

  /**
   * Additional offset (in pixels) from the anchor element.
   * Positive values move the popper away from the anchor, negative values move it closer.
   *
   * @default 0
   * @example
   * ```tsx
   * <Popper offset={8}>...</Popper> // 8px gap between anchor and popper
   * <Popper offset={-4}>...</Popper> // Overlap the anchor by 4px
   * ```
   */
  readonly offset?: number;

  /**
   * The positioning strategy to use.
   * - `'fixed'`: Positions relative to the viewport. Works reliably in all cases.
   * - `'absolute'`: Positions relative to the nearest positioned ancestor.
   *                 When using 'absolute', make sure a parent element has `position: relative`.
   *
   * @default 'absolute'
   * @example
   * ```tsx
   * <Popper positionStrategy="absolute">...</Popper> // Relative to positioned parent  (recommended)
   * <Popper positionStrategy="fixed">...</Popper> // Relative to viewport
   * ```
   */
  readonly positionStrategy?: PositionStrategy;

  /**
   * Minimum distance (in pixels) that the popper must maintain from the viewport edges.
   * Used to prevent the popper from being positioned too close to the screen boundaries.
   * The popper will try to flip to another placement if it cannot maintain this margin.
   *
   * @default 8
   * @example
   * ```tsx
   * // Larger margin for better visibility
   * <Popper viewportMargin={16}>...</Popper>
   *
   * // No margin (allow touching edges)
   * <Popper viewportMargin={0}>...</Popper>
   *
   * // Different margins for different devices
   * <Popper viewportMargin={isMobile ? 8 : 16}>...</Popper>
   * ```
   */
  readonly viewportMargin?: number;

  /**
   * Overridable components map for customizing the popper's internal structure.
   * Allows replacing default components with custom implementations while maintaining functionality.
   *
   * @default undefined
   * @example
   * ```tsx
   * <Popper
   *   overrides={{
   *     Container: CustomContainerComponent,
   *   }}
   * >
   *   ...
   * </Popper>
   * ```
   */
  readonly overrides?: PopperOverrides;
}

export interface PopperOverrides {
  /**
   * Custom container component for the popper content.
   * This component wraps the popper's children and handles positioning styles.
   *
   * @default PopperContainer
   * @example
   * ```tsx
   * const CustomContainer = React.forwardRef((props, ref) => (
   *   <div ref={ref} {...props} className="custom-popper" />
   * ));
   *
   * <Popper overrides={{ Container: CustomContainer }} />
   * ```
   */
  readonly Container?: React.ComponentType<
    PopperContainerProps & React.RefAttributes<HTMLDivElement>
  >;
}

export const PORTAL_ID = 'ui-kit-portal';

const Popper: React.ForwardRefRenderFunction<HTMLDivElement, PopperProps> = (props, ref) => {
  const {
    isOpen,
    children,
    anchorElement,
    zIndex,
    overrides,
    anchorPos = 'auto',
    positionStrategy = 'absolute',
    viewportMargin = 30,
    autoFlip = true,
    offset = 0,
    ...nativeProps
  } = props;
  const [actualPlacement, setActualPlacement] = React.useState<AnchorPos>(anchorPos);
  const [style, setStyle] = React.useState<React.CSSProperties | null>(null);
  const [domLoaded, setDomLoaded] = React.useState(false);
  const popperRef = React.useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  const overridesMap = React.useMemo(
    () => ({
      Container: overrides?.Container || Container,
    }),
    [overrides],
  );

  React.useEffect(() => {
    if (actualPlacement !== anchorPos) {
      setActualPlacement(anchorPos);
    }
  }, [actualPlacement, anchorPos]);

  /**
   * Client render detection
   */
  React.useEffect(() => {
    setDomLoaded(true);
  }, []);

  const portalEl = React.useMemo(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const node = window.document.body.querySelector(`#${PORTAL_ID}`);
    if (node) {
      return node;
    }

    const newNode = window.document.createElement('div');
    newNode.setAttribute('id', PORTAL_ID);

    // Важно для absolute позиционирования
    if (positionStrategy === 'absolute') {
      newNode.style.position = 'relative';
    }

    window.document.body.appendChild(newNode);

    return newNode;
  }, [positionStrategy]);

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

      // Вычисляем позицию относительно viewport
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

      // Возвращаем viewport координаты для проверки или финальные координаты
      if (forViewportCheck) {
        return { left, top };
      }

      // Для финального позиционирования учитываем стратегию
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

  const checkIfViewportFits = React.useCallback(
    (style: { left: number; top: number }, popperRect: DOMRect) => {
      const left = style.left;
      const top = style.top;
      const right = left + popperRect.width;
      const bottom = top + popperRect.height;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const isWithinHorizontal = left >= viewportMargin && right <= viewportWidth - viewportMargin;
      const isWithinVertical = top >= viewportMargin && bottom <= viewportHeight - viewportMargin;
      const hasValidPosition = left >= 0 && top >= 0;

      return hasValidPosition && isWithinHorizontal && isWithinVertical;
    },
    [viewportMargin],
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

      // Приоритет: то же направление > противоположное > остальные
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
      // Обработка auto placement
      if (preferredPlacement.startsWith('auto')) {
        const [, preferredDirection = 'bottom'] = preferredPlacement.split('-');

        const allPlacements: AnchorPos[] = [
          /* eslint-disable prettier/prettier */
          'bottom', 'bottom-start', 'bottom-end', 'bottom-left', 'bottom-right',
          'top', 'top-left', 'top-right', 'top-start', 'top-end',
          'left', 'left-top', 'left-bottom',
          'right', 'right-top', 'right-bottom',
          /* eslint-enable prettier/prettier */
        ];

        // Сортируем: сначала указанное направление
        const sortedPlacements = [...allPlacements].sort((a, b) => {
          const aDir = a.split('-')[0];
          const bDir = b.split('-')[0];

          if (aDir === preferredDirection && bDir !== preferredDirection) return -1;
          if (aDir !== preferredDirection && bDir === preferredDirection) return 1;

          return 0;
        });

        for (const place of sortedPlacements) {
          // Используем forViewportCheck=true для получения viewport координат
          const viewportStyle = getPositionStyle({
            place,
            anchorRect,
            popperRect,
            forViewportCheck: true,
          });
          const fits = checkIfViewportFits(viewportStyle, popperRect);

          if (fits) {
            // Когда нашли подходящее место, получаем финальные координаты
            const finalStyle = getPositionStyle({
              place,
              anchorRect,
              popperRect,
              forViewportCheck: false,
            });

            return {
              ///
              found: true,
              placement: place,
              style: finalStyle,
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
          style: finalStyle,
        };
      }

      const order = placementsOrder[preferredPlacement] || placementsOrder.bottom;

      for (const place of order) {
        // Используем forViewportCheck=true для проверки
        const viewportStyle = getPositionStyle({
          place,
          anchorRect,
          popperRect,
          forViewportCheck: true,
        });
        const fits = checkIfViewportFits(viewportStyle, popperRect);

        if (fits) {
          // Когда нашли подходящее место, получаем финальные координаты
          const finalStyle = getPositionStyle({
            place,
            anchorRect,
            popperRect,
            forViewportCheck: false,
          });

          return {
            ///
            found: true,
            placement: place,
            style: finalStyle,
          };
        }
      }

      // Если ничего не подошло, возвращаем оригинальный placement с финальными координатами
      const finalStyle = getPositionStyle({
        place: preferredPlacement,
        anchorRect,
        popperRect,
        forViewportCheck: false,
      });

      return {
        found: false,
        placement: preferredPlacement,
        style: finalStyle,
      };
    },
    [autoFlip, getPositionStyle, checkIfViewportFits, placementsOrder],
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

    // setIsPositionCalculated(true);
  }, [actualPlacement, anchorElement, getPreferredPlacements]);

  React.useEffect(() => {
    const handleEvent = () => {
      if (isOpen) {
        calculatePosition();
      }
    };

    // window.addEventListener('resize', handleEvent);
    window.addEventListener('scroll', handleEvent);

    return () => {
      // window.removeEventListener('resize', handleEvent);
      window.removeEventListener('scroll', handleEvent);
    };
  }, [calculatePosition, isOpen]);

  React.useEffect(() => {
    if (anchorElement && isOpen && popperRef.current) {
      calculatePosition();
    }
  }, [isOpen, calculatePosition, anchorElement]);

  // Используйте ResizeObserver для отслеживания изменений размера содержимого
  // React.useEffect(() => {
  //   if (!popperRef.current || !isOpen) {
  //     return;
  //   }
  //
  //   const resizeObserver = new ResizeObserver(() => {
  //     console.log('resize observer');
  //     // window.requestAnimationFrame(() => {
  //     //   calculatePosition();
  //     // });
  //   });
  //
  //   resizeObserver.observe(popperRef.current);
  //
  //   return () => {
  //     resizeObserver.disconnect();
  //   };
  // }, [isOpen, calculatePosition, children]);

  // Очистка при закрытии
  React.useEffect(() => {
    if (!isOpen) {
      setIsVisible(false);
      // setIsPositionCalculated(false);
      setStyle(null);
    }
  }, [isOpen]);

  // Отслеживаем изменения в DOM, которые могут повлиять на позицию
  React.useEffect(() => {
    if (!isOpen || !anchorElement) return;

    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(() => {
        calculatePosition();
      });
    });

    observer.observe(anchorElement, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [isOpen, anchorElement, calculatePosition]);

  const getTransformOrigin = React.useCallback((placement: AnchorPos): string => {
    if (placement.startsWith('top')) {
      return 'bottom center';
    }
    if (placement.startsWith('bottom')) {
      return 'top center';
    }
    if (placement.startsWith('left')) {
      return 'right center';
    }
    if (placement.startsWith('right')) {
      return 'left center';
    }

    return 'top center';
  }, []);

  const renderNode = React.useCallback(
    () => (
      <overridesMap.Container
        {...nativeProps}
        style={{
          ...style,
          ...nativeProps.style,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.95)',
          transition: 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out',
          transformOrigin: getTransformOrigin(actualPlacement),
          pointerEvents: isVisible ? 'auto' : 'none',
          // Для fixed стратегии добавляем будет ли виден скролл
          ...(positionStrategy === 'fixed' && {
            zIndex: zIndex,
          }),
        }}
        zIndex={zIndex}
        data-placement={actualPlacement}
        data-popper-strategy={positionStrategy}
        ref={el => {
          popperRef.current = el;

          if (ref) {
            if (typeof ref === 'function') {
              ref(el);
            }
            if (typeof ref === 'object') {
              ref.current = el;
            }
          }
        }}
      >
        {children}
      </overridesMap.Container>
    ),
    [
      overridesMap,
      nativeProps,
      style,
      isVisible,
      getTransformOrigin,
      actualPlacement,
      positionStrategy,
      zIndex,
      children,
      ref,
    ],
  );

  // Удалите дублирующийся useEffect с calculatePosition
  // Оставьте только useLayoutEffect для первоначального расчета
  React.useLayoutEffect(() => {
    if (anchorElement && isOpen && popperRef.current) {
      // Сбрасываем видимость
      setIsVisible(false);
      // setIsPositionCalculated(false);

      // Синхронно рассчитываем позицию
      const anchorRect = anchorElement.getBoundingClientRect();
      const popperRect = popperRef.current.getBoundingClientRect();

      const placements = getPreferredPlacements(actualPlacement, anchorRect, popperRect);

      if (placements.found) {
        setActualPlacement(placements.placement);
        setStyle(placements.style);
      } else {
        setStyle(placements.style);
      }

      // setIsPositionCalculated(true);

      // Небольшая задержка для плавного появления
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }
  }, [isOpen, anchorElement, actualPlacement, getPreferredPlacements]);

  if (!isOpen) {
    return null;
  }

  if (positionStrategy === 'fixed') {
    return domLoaded && portalEl ? ReactDOM.createPortal(renderNode(), portalEl, PORTAL_ID) : null;
  }

  // Для absolute стратегии - рендерим рядом с anchor (in-place)
  return renderNode();
};

export default React.forwardRef(Popper);
