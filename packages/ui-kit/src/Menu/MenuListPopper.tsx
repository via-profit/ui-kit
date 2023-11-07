import React from 'react';
import styled from '@emotion/styled';

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

export interface MenuListPopperProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly isOpen: boolean;
  readonly anchorElement?: HTMLElement | null;
  readonly anchorPos?: AnchorPos;
  readonly zindex?: number;
}

type StyleProps = {
  readonly $zIndex?: number;
};

const StyledMenuListPopper = styled.div<StyleProps>`
  position: absolute;
  z-index: ${({ theme, $zIndex }) =>
    typeof $zIndex !== 'undefined' ? $zIndex : theme.zIndex.dropdown};
  display: flex;
  pointer-events: none;
  & > * {
    pointer-events: all;
  }
`;

const MenuListPopper: React.ForwardRefRenderFunction<HTMLDivElement, MenuListPopperProps> = (
  props,
  ref,
) => {
  const { isOpen, children, anchorElement, zindex, anchorPos = 'auto', ...nativeProps } = props;
  const [style, setStyle] = React.useState<React.CSSProperties | null>(null);

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

  if (!isOpen || !style) {
    return null;
  }

  return (
    <StyledMenuListPopper
      {...nativeProps}
      style={{ ...style, ...nativeProps.style }}
      $zIndex={zindex}
      ref={ref}
    >
      {style && children}
    </StyledMenuListPopper>
  );
};

export default React.forwardRef(MenuListPopper);
