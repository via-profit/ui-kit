import React from 'react';
import ReactDOM from 'react-dom';

import Container, { PopperContainerProps } from './PopperContainer';

export type AnchorPos =
  | 'auto'
  | 'auto-start-end'
  | 'top-start'
  | 'top-end'
  | 'top'
  | 'bottom'
  | 'top-start-end'
  | 'bottom-start-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'static';

export interface PopperProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly isOpen: boolean;
  readonly anchorElement?: HTMLElement | null;
  readonly anchorPos?: AnchorPos;
  readonly zindex?: number;
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
    zindex,
    overrides,
    anchorPos = 'auto',
    ...nativeProps
  } = props;
  const [style, setStyle] = React.useState<React.CSSProperties | null>(null);
  const [domLoaded, setDomLoaded] = React.useState(false);

  const disablePortal = React.useMemo(() => anchorPos === 'static', [anchorPos]);

  if (anchorPos !== 'static' && typeof anchorElement === 'undefined') {
    throw new Error(
      '[@via-profit/ui-kit] When the «anchorPos» is «satic» then «anchorElement» most be an element or null, but got undefined',
    );
  }
  // if (anchorPos === 'static' && !disablePortal) {
  //   throw new Error(
  //     '[@via-profit/ui-kit] When the «anchorPos» is «satic» then «disablePortal» most be false',
  //   );
  // }

  const overridesMap = React.useMemo(
    () => ({
      Container,
      ...overrides,
    }),
    [overrides],
  );

  /**
   * Client render detection
   */
  React.useEffect(() => {
    if (!disablePortal) {
      setDomLoaded(true);
    }
  }, [disablePortal]);

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

  const calculateStyles = React.useCallback(() => {
    // For a static placement
    if (anchorPos === 'static') {
      setStyle({
        // backgroundColor: 'rgba(123, 255, 0, 0.5)',
        position: 'static',
      });

      return;
    }

    // For a dinamic position
    if (anchorElement) {
      const anchorRect = anchorElement.getBoundingClientRect();

      switch (anchorPos) {
        case 'bottom-start':
          setStyle({
            position: 'absolute',
            left: Math.floor(anchorRect.left + window.scrollX),
            top: Math.floor(anchorRect.top + window.scrollY + anchorRect.height),
            height: Math.floor(window.innerHeight - anchorRect.top - anchorRect.height - 5),
            width: Math.floor(window.innerWidth - anchorRect.left - 15),
            // backgroundColor: 'rgba(255, 0, 0, .5)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          });
          break;
        case 'top-start':
          setStyle({
            position: 'absolute',
            left: Math.floor(anchorRect.left + window.scrollX),
            top: window.scrollY,
            height: anchorRect.top,
            width: Math.floor(window.innerWidth - anchorRect.left - 15),
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            // backgroundColor: 'rgba(0, 102, 255, 0.5)',
          });
          break;
        case 'top':
          setStyle({
            position: 'absolute',
            left: Math.floor(anchorRect.left + window.scrollX),
            top: window.scrollY,
            height: anchorRect.top,
            width: anchorRect.width,
            // backgroundColor: 'rgba(208, 255, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          });
          break;
        case 'bottom':
          setStyle({
            position: 'absolute',
            left: Math.floor(anchorRect.left + window.scrollX),
            top: Math.floor(anchorRect.top + window.scrollY + anchorRect.height),
            height: Math.floor(window.innerHeight - anchorRect.top - anchorRect.height - 5),
            width: anchorRect.width,
            // backgroundColor: 'rgba(0, 247, 255, 0.5)',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          });
          break;
        case 'top-end':
          setStyle({
            position: 'absolute',
            left: 0,
            width: Math.floor(anchorRect.left + window.scrollX + anchorRect.width),
            top: window.scrollY,
            height: anchorRect.top,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            // backgroundColor: 'rgba(174, 0, 255, 0.5)',
          });
          break;
        case 'bottom-end':
          setStyle({
            position: 'absolute',
            left: 0,
            width: Math.floor(anchorRect.left + window.scrollX + anchorRect.width),
            top: Math.floor(anchorRect.top + window.scrollY + anchorRect.height),
            height: Math.floor(window.innerHeight - anchorRect.top - anchorRect.height - 5),
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            // backgroundColor: 'rgba(174, 0, 255, 0.5)',
          });
          break;
        case 'top-start-end':
          setStyle({
            position: 'absolute',
            left: Math.floor(anchorRect.left + window.scrollX),
            top: window.scrollY,
            height: anchorRect.top,
            width: anchorRect.width,
            // backgroundColor: 'rgba(0, 102, 255, 0.5)',
            display: 'flex',
            alignItems: 'stretch',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          });
          break;
        case 'bottom-start-end':
          setStyle({
            position: 'absolute',
            left: Math.floor(anchorRect.left + window.scrollX),
            top: Math.floor(anchorRect.top + window.scrollY + anchorRect.height),
            height: Math.floor(window.innerHeight - anchorRect.top - anchorRect.height - 5),
            width: anchorRect.width,
            // backgroundColor: 'rgba(255, 81, 0, 0.5)',
            display: 'flex',
            alignItems: 'stretch',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          });
          break;
        case 'auto-start-end':
          {
            if (
              anchorRect.top >
              Math.floor(window.innerHeight - anchorRect.top - anchorRect.height - 5)
            ) {
              setStyle({
                position: 'absolute',
                left: Math.floor(anchorRect.left + window.scrollX),
                top: window.scrollY,
                height: anchorRect.top,
                width: anchorRect.width,
                display: 'flex',
                alignItems: 'stretch',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                // backgroundColor: 'rgba(0, 102, 255, 0.5)',
              });
            } else {
              setStyle({
                position: 'absolute',
                left: Math.floor(anchorRect.left + window.scrollX),
                top: Math.floor(anchorRect.top + window.scrollY + anchorRect.height),
                height: Math.floor(window.innerHeight - anchorRect.top - anchorRect.height - 5),
                width: anchorRect.width,
                display: 'flex',
                alignItems: 'stretch',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                // backgroundColor: 'rgba(255, 187, 0, 0.5)',
              });
            }
          }
          break;
        case 'auto':
        default:
          {
            if (
              anchorRect.top >
              Math.floor(window.innerHeight - anchorRect.top - anchorRect.height - 5)
            ) {
              setStyle({
                position: 'absolute',
                left: Math.floor(anchorRect.left + window.scrollX),
                top: window.scrollY,
                height: anchorRect.top,
                width: Math.floor(window.innerWidth - anchorRect.left - 15),
                display: 'flex',
                alignItems: 'flex-end',
                // backgroundColor: 'rgba(0, 102, 255, 0.5)',
              });
            } else {
              setStyle({
                position: 'absolute',
                left: Math.floor(anchorRect.left + window.scrollX),
                top: Math.floor(anchorRect.top + window.scrollY + anchorRect.height),
                height: Math.floor(window.innerHeight - anchorRect.top - anchorRect.height - 5),
                width: Math.floor(window.innerWidth - anchorRect.left - 15),
                // backgroundColor: 'rgba(255, 0, 0, .5)',
                display: 'flex',
                alignItems: 'flex-start',
              });
            }
          }

          break;
      }

      return;
    }

    setStyle(null);
  }, [anchorElement, anchorPos]);

  React.useEffect(() => {
    window.addEventListener('resize', calculateStyles);
    window.addEventListener('scroll', calculateStyles);

    return () => {
      window.removeEventListener('resize', calculateStyles);
      window.removeEventListener('scroll', calculateStyles);
    };
  }, [calculateStyles]);

  React.useEffect(() => {
    if (isOpen && (anchorElement || anchorPos === 'static')) {
      calculateStyles();
    }
  }, [isOpen, anchorElement, anchorPos, calculateStyles]);

  const renderNode = React.useCallback(
    () => (
      <overridesMap.Container
        {...nativeProps}
        style={{ ...style, ...nativeProps.style }}
        zIndex={zindex}
        disablePortal={disablePortal}
        ref={ref}
      >
        {style && children}
      </overridesMap.Container>
    ),
    [children, disablePortal, nativeProps, overridesMap, ref, style, zindex],
  );

  if (!isOpen || !style) {
    return null;
  }

  if (disablePortal) {
    return renderNode();
  }

  return domLoaded && portalEl ? ReactDOM.createPortal(renderNode(), portalEl, PORTAL_ID) : null;
};

export default React.forwardRef(Popper);
