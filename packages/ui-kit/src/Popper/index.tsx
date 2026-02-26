import React from 'react';
import ReactDOM from 'react-dom';

import Container, { PopperContainerProps } from './PopperContainer';

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
   * - `'fixed'`: Positions relative to the viewport, useful for cases where the popper should stay in place during scroll (default)
   * - `'absolute'`: Positions relative to the document
   *
   * @default 'fixed'
   * @example
   * ```tsx
   * <Popper positionStrategy="fixed">...</Popper>
   * <Popper positionStrategy="absolute">...</Popper>
   * ```
   */
  readonly positionStrategy?: 'absolute' | 'fixed';

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
    positionStrategy = 'fixed',
    autoFlip = true,
    offset = 0,
    ...nativeProps
  } = props;
  const [actualPlacement, setActualPlacement] = React.useState<AnchorPos>(anchorPos);
  const [style, setStyle] = React.useState<React.CSSProperties | null>(null);
  const [domLoaded, setDomLoaded] = React.useState(false);
  const popperRef = React.useRef<HTMLDivElement | null>(null);

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

    window.document.body.appendChild(newNode);

    return newNode;
  }, []);

  const getPositionStyle = React.useCallback(
    (place: AnchorPos, anchorRect: DOMRect, popperRect: DOMRect) => {
      const baseStyle = {
        left: anchorRect.left,
        top: anchorRect.top,
      };

      switch (place) {
        case 'top':
          return {
            left: anchorRect.left + anchorRect.width / 2 - popperRect.width / 2,
            top: anchorRect.top - popperRect.height - offset,
          };
        case 'top-start':
          return {
            left: anchorRect.left,
            top: anchorRect.top - popperRect.height - offset,
          };
        case 'top-end':
          return {
            left: anchorRect.right - popperRect.width,
            top: anchorRect.top - popperRect.height - offset,
          };
        case 'top-left':
          return {
            left: anchorRect.left - popperRect.width - offset,
            top: anchorRect.top - popperRect.height - offset,
          };
        case 'top-right':
          return {
            left: anchorRect.right + offset,
            top: anchorRect.top - popperRect.height - offset,
          };
        case 'bottom':
          return {
            left: anchorRect.left + anchorRect.width / 2 - popperRect.width / 2,
            top: anchorRect.bottom + offset,
          };
        case 'bottom-start':
          return {
            left: anchorRect.left,
            top: anchorRect.bottom + offset,
          };
        case 'bottom-end':
          return {
            left: anchorRect.right - popperRect.width + offset,
            top: anchorRect.bottom + offset,
          };
        case 'bottom-left':
          return {
            left: anchorRect.left - popperRect.width - offset,
            top: anchorRect.bottom + offset,
          };
        case 'bottom-right':
          return {
            left: anchorRect.right + offset,
            top: anchorRect.bottom + offset,
          };
        case 'left':
          return {
            left: anchorRect.left - popperRect.width - offset,
            top: anchorRect.top + anchorRect.height / 2 - popperRect.height / 2,
          };
        case 'left-bottom':
          return {
            left: anchorRect.left - popperRect.width - offset,
            top: anchorRect.bottom - popperRect.height,
          };
        case 'left-top':
          return {
            left: anchorRect.left - popperRect.width - offset,
            top: anchorRect.top - offset,
          };
        case 'right':
          return {
            left: anchorRect.right + offset,
            top: anchorRect.top + anchorRect.height / 2 - popperRect.height / 2,
          };
        case 'right-top':
          return {
            left: anchorRect.right + offset,
            top: anchorRect.top - offset,
          };
        case 'right-bottom':
          return {
            left: anchorRect.right + offset,
            top: anchorRect.bottom - popperRect.height,
          };
        default:
          return baseStyle;
      }
    },
    [offset],
  );

  const checkIfViewportFits = React.useCallback(
    (style: { left: number; top: number }, popperRect: DOMRect, viewport: any) => {
      const left = style.left;
      const top = style.top;
      const right = left + popperRect.width;
      const bottom = top + popperRect.height;

      const MARGIN = 8;

      return (
        left >= MARGIN &&
        top >= MARGIN &&
        right <= viewport.width - MARGIN &&
        bottom <= viewport.height - MARGIN
      );
    },
    [],
  );

  const placementsOrder = React.useMemo(() => {
    const basePlacements: Record<Direction, readonly (Modifier | Direction)[]> = {
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
      const [direction] = placement.split('-') as [Direction];

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
        ...basePlacements[opposite],
        ...(direction !== 'left' && direction !== 'right' ? basePlacements.left : []),
        ...(direction !== 'left' && direction !== 'right' ? basePlacements.right : []),
      ];
    });

    return order;
  }, []);

  const getPreferredPlacements = React.useCallback(
    (preferredPlacement: AnchorPos, anchorRect: DOMRect, popperRect: DOMRect, viewport: any) => {
      // Обработка auto placement
      if (preferredPlacement.startsWith('auto')) {
        const [, preferredDirection = 'bottom'] = preferredPlacement.split('-');

        // Все возможные placements
        const allPlacements: AnchorPos[] = [
          'bottom',
          'bottom-start',
          'bottom-end',
          'bottom-left',
          'bottom-right',
          'top',
          'top-left',
          'top-right',
          'left',
          'left-top',
          'left-bottom',
          'right',
          'right-top',
          'right-bottom',
        ];

        // Сортируем: сначала указанное направление, потом остальные
        const sortedPlacements = allPlacements.sort((a, b) => {
          const aDir = a.split('-')[0];
          const bDir = b.split('-')[0];

          if (aDir === preferredDirection && bDir !== preferredDirection) return -1;
          if (aDir !== preferredDirection && bDir === preferredDirection) return 1;

          return 0;
        });

        for (const place of sortedPlacements) {
          const style = getPositionStyle(place, anchorRect, popperRect);
          const fits = checkIfViewportFits(style, popperRect, viewport);

          if (fits) {
            return { found: true, placement: place, style };
          }
        }
      }

      if (!autoFlip) {
        return {
          found: false,
          placement: preferredPlacement,
          style: getPositionStyle(preferredPlacement, anchorRect, popperRect),
        };
      }

      const order = placementsOrder[preferredPlacement] || placementsOrder.bottom;

      for (const place of order) {
        const style = getPositionStyle(place, anchorRect, popperRect);
        const fits = checkIfViewportFits(style, popperRect, viewport);

        if (fits) {
          return { found: true, placement: place as AnchorPos, style };
        }
      }

      return {
        found: false,
        placement: preferredPlacement,
        style: getPositionStyle(preferredPlacement, anchorRect, popperRect),
      };
    },
    [autoFlip, checkIfViewportFits, getPositionStyle, placementsOrder],
  );

  const calculatePosition = React.useCallback(() => {
    if (!anchorElement || !popperRef.current) {
      return;
    }

    const anchorRect = anchorElement.getBoundingClientRect();
    const popperRect = popperRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const placements = getPreferredPlacements(anchorPos, anchorRect, popperRect, viewport);

    if (placements.found) {
      setActualPlacement(placements.placement);
      setStyle(placements.style);
    } else {
      setStyle(placements.style);
    }
  }, [anchorElement, getPreferredPlacements, anchorPos]);

  React.useEffect(() => {
    const event = () => {
      if (isOpen) {
        calculatePosition();
      }
    };

    window.addEventListener('resize', event);
    window.addEventListener('scroll', event);

    return () => {
      window.removeEventListener('resize', event);
      window.removeEventListener('scroll', event);
    };
  }, [calculatePosition, isOpen]);

  React.useEffect(() => {
    if (anchorElement && isOpen && popperRef.current) {
      calculatePosition();
    }
  }, [isOpen, calculatePosition, anchorElement]);

  // Используйте ResizeObserver для отслеживания изменений размера содержимого
  React.useEffect(() => {
    if (!popperRef.current || !isOpen) return;

    const resizeObserver = new ResizeObserver(() => {
      calculatePosition();
    });

    resizeObserver.observe(popperRef.current);

    // eslint-disable-next-line consistent-return
    return () => {
      resizeObserver.disconnect();
    };
  }, [isOpen, calculatePosition]);

  const renderNode = React.useCallback(
    () => (
      <overridesMap.Container
        {...nativeProps}
        positionStrategy={positionStrategy}
        style={{ ...style, ...nativeProps.style }}
        zIndex={zIndex}
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
    [children, nativeProps, overridesMap, positionStrategy, ref, style, zIndex],
  );

  if (!isOpen) {
    return null;
  }

  return domLoaded && portalEl ? ReactDOM.createPortal(renderNode(), portalEl, PORTAL_ID) : null;
};

export default React.forwardRef(Popper);
