import React from 'react';
import ReactDOM from 'react-dom';

import Container, { PopperContainerProps } from './PopperContainer';

export type AnchorPos = 'top' | 'bottom' | 'left' | 'right';

export interface PopperProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly isOpen: boolean;
  readonly anchorElement?: HTMLElement | null;
  readonly anchorPos?: AnchorPos;
  readonly zIndex?: number;
  readonly autoFlip?: boolean;
  readonly offset?: number;
  /**
   * Overridable components map
   */
  readonly overrides?: PopperOverrides;
}

export interface PopperOverrides {
  /**
   * Popper Container
   */
  readonly Container?: React.ForwardRefExoticComponent<
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
    anchorPos = 'bottom',
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
    (place: string, anchorRect: DOMRect, popperRect: DOMRect) => {
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
        case 'bottom':
          return {
            left: anchorRect.left + anchorRect.width / 2 - popperRect.width / 2,
            top: anchorRect.bottom + offset,
          };
        case 'left':
          return {
            left: anchorRect.left - popperRect.width - offset,
            top: anchorRect.top + anchorRect.height / 2 - popperRect.height / 2,
          };
        case 'right':
          return {
            left: anchorRect.right + offset,
            top: anchorRect.top + anchorRect.height / 2 - popperRect.height / 2,
          };
        default:
          return baseStyle;
      }
    },
    [],
  );

  const checkIfViewportFits = React.useCallback(
    (style: { left: number; top: number }, popperRect: DOMRect, viewport: any) => {
      const left = style.left;
      const top = style.top;
      const right = left + popperRect.width;
      const bottom = top + popperRect.height;

      return left >= 0 && top >= 0 && right <= viewport.width && bottom <= viewport.height;
    },
    [],
  );

  const getPreferredPlacements = React.useCallback(
    (preferredPlacement: AnchorPos, anchorRect: DOMRect, popperRect: DOMRect, viewport: any) => {
      const placementsOrder: Record<AnchorPos, string[]> = {
        top: ['top', 'bottom', 'left', 'right'],
        bottom: ['bottom', 'top', 'left', 'right'],
        left: ['left', 'right', 'top', 'bottom'],
        right: ['right', 'left', 'top', 'bottom'],
      };

      if(!autoFlip) {
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
    [checkIfViewportFits, getPositionStyle],
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
    const placements = getPreferredPlacements(actualPlacement, anchorRect, popperRect, viewport);

    if (placements.found) {
      setActualPlacement(placements.placement);
      setStyle(placements.style);
    } else {
      setStyle(placements.style);
    }
  }, [actualPlacement, anchorElement, getPreferredPlacements]);

  React.useEffect(() => {
    window.addEventListener('resize', calculatePosition);
    window.addEventListener('scroll', calculatePosition);

    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition);
    };
  }, [calculatePosition]);

  React.useEffect(() => {
    if (anchorElement && isOpen && popperRef.current) {
      calculatePosition();
    }
  }, [isOpen, calculatePosition, anchorElement]);

  const renderNode = React.useCallback(
    () => (
      <overridesMap.Container
        {...nativeProps}
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
        {style && children}
      </overridesMap.Container>
    ),
    [children, nativeProps, overridesMap, ref, style, zIndex],
  );

  if (!isOpen) {
    return null;
  }

  return domLoaded && portalEl ? ReactDOM.createPortal(renderNode(), portalEl, PORTAL_ID) : null;
};

export default React.forwardRef(Popper);
