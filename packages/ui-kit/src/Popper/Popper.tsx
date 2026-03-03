import React from 'react';
import ReactDOM from 'react-dom';
import Container, { PopperContainerProps, PositionStrategy } from './PopperContainer';
import { AnchorPos, usePopper } from './usePopprer';

export * from './usePopprer';
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
  readonly anchorElement: HTMLElement | null;

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

  readonly onAnchorPosChanged?: (anchorPos: AnchorPos) => void;

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
    onAnchorPosChanged,
    ...nativeProps
  } = props;

  const [domLoaded, setDomLoaded] = React.useState(false);

  const { actualPlacement, style, popperRef, isVisible } = usePopper({
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
    if (anchorPos !== actualPlacement && typeof onAnchorPosChanged === 'function') {
      onAnchorPosChanged(actualPlacement);
    }
  }, [anchorPos, actualPlacement, onAnchorPosChanged]);

  const renderNode = React.useCallback(
    () => (
      <overridesMap.Container
        {...nativeProps}
        style={{
          ...style,
          ...nativeProps.style,
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? 'auto' : 'none',
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
      isVisible,
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
