import React from 'react';
import ReactDOM from 'react-dom';
import Container, { PopperContainerProps, PositionStrategy } from './PopperContainer';
import { usePopper, UsePopperProps } from './usePopprer';

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
// export type AutoModifier = 'auto' | 'auto-top' | 'auto-bottom' | 'auto-left' | 'auto-right';

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
  | 'right-bottom' // Right edge, bottom side
  | 'bottom-fill'
  | 'top-fill';

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

// export type AnchorPos = Di | `${Di}-${Mod}` | Au | `${Au}-${Di}`;

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
   * @default 'fixed'
   * @example
   * ```tsx
   * <Popper positionStrategy="absolute">...</Popper> // Relative to positioned parent
   * <Popper positionStrategy="fixed">...</Popper> // Relative to viewport  (recommended)
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
    positionStrategy = 'fixed',
    viewportMargin = 30,
    autoFlip = true,
    offset = 0,
    ...nativeProps
  } = props;

  const [domLoaded, setDomLoaded] = React.useState(false);

  const { actualPlacement, style, popperRef } = usePopper({
    anchorElement,
    anchorPos,
    positionStrategy,
    autoFlip,
    offset,
    viewportMargin,
    isOpen,
  });

  const overridesMap = React.useMemo(
    () => ({
      Container: overrides?.Container || Container,
    }),
    [overrides],
  );

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

    if (positionStrategy === 'absolute') {
      newNode.style.position = 'relative';
    }

    window.document.body.appendChild(newNode);

    return newNode;
  }, [positionStrategy]);

  React.useEffect(() => {
    if (anchorElement && isOpen) {
      anchorElement.dataset.popperPositionStrategy = positionStrategy;
      anchorElement.dataset.popperPlacement = actualPlacement;
      anchorElement.dataset.popperIsOpen = isOpen.toString();
    } else if (anchorElement && !isOpen) {
      anchorElement.dataset.popperPositionStrategy = '';
      anchorElement.dataset.popperPlacement = '';
      anchorElement.dataset.popperIsOpen = '';
    }
  }, [anchorElement, positionStrategy, isOpen, actualPlacement]);

  const renderNode = React.useCallback(
    () => (
      <overridesMap.Container
        {...nativeProps}
        style={{
          ...style,
          ...nativeProps.style,
          // opacity: isVisible ? 1 : 0,
          // pointerEvents: isVisible ? 'auto' : 'none',
          // transformOrigin: getTransformOrigin(actualPlacement),
          ...(positionStrategy === 'fixed' && {
            zIndex: zIndex,
          }),
        }}
        zIndex={zIndex}
        positionStrategy={positionStrategy}
        data-popper-placement={actualPlacement}
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
      // isVisible,
      // getTransformOrigin,
      actualPlacement,
      positionStrategy,
      zIndex,
      children,
      popperRef,
      ref,
    ],
  );

  if (!isOpen) {
    return null;
  }

  if (positionStrategy === 'fixed') {
    return domLoaded && portalEl ? ReactDOM.createPortal(renderNode(), portalEl, PORTAL_ID) : null;
  }

  return renderNode();
};

export default React.forwardRef(Popper);
