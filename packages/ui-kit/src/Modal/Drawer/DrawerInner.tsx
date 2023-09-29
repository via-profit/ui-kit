import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { ModalInnerProps } from '../BaseModal/ModalInner';

export type AnchorVariant = 'bottom' | 'right' | 'left' | 'top';

export type DrawerInnerProps = ModalInnerProps &
  React.RefAttributes<HTMLDivElement> & {
    /**
     * Dialog unique ID
     */
    readonly dialogID: string;

    /**
     * Drawer position\
     * \
     * **Varians:** `bottom` `right` `left` `top`\
     * **Default:** `bottom`
     */
    readonly anchor: AnchorVariant;
  };

type StyleProps = {
  readonly $isOpen: boolean;
};

const StyledDrawerBottomInner = styled.div<StyleProps>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  max-height: 90%;
  display: flex;
  flex-direction: column;
  transform: translate(0, 100%);
  z-index: ${({ theme }) => theme.zIndex.modal};
  background-color: ${({ theme }) => theme.color.surface.toString()};
  border-top-left-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  border-top-right-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  transition:
    transform 600ms ease-out,
    opacity 120ms ease-out;
  ${({ $isOpen }) =>
    $isOpen &&
    css`
      opacity: 1;
      transform: translate(0, 0);
      transition:
        transform 240ms ease-out,
        opacity 100ms ease-out;
    `}
`;

const StyledDrawerTopInner = styled.div<StyleProps>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  opacity: 0;
  max-height: 90%;
  display: flex;
  flex-direction: column;
  transform: translate(0, -100%);
  z-index: ${({ theme }) => theme.zIndex.modal};
  background-color: ${({ theme }) => theme.color.surface.toString()};
  border-bottom-left-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  border-bottom-right-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  transition:
    transform 600ms ease-out,
    opacity 120ms ease-out;
  ${({ $isOpen }) =>
    $isOpen &&
    css`
      opacity: 1;
      transform: translate(0, 0);
      transition:
        transform 240ms ease-out,
        opacity 100ms ease-out;
    `}
`;

const StyledDrawerRightInner = styled.div<StyleProps>`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  transform: translate(100%, 0);
  z-index: ${({ theme }) => theme.zIndex.modal};
  background-color: ${({ theme }) => theme.color.surface.toString()};
  border-top-left-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  border-bottom-left-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  transition:
    transform 600ms ease-out,
    opacity 120ms ease-out;
  ${({ $isOpen }) =>
    $isOpen &&
    css`
      opacity: 1;
      transform: translate(0, 0);
      transition:
        transform 240ms ease-out,
        opacity 100ms ease-out;
    `}
`;

const StyledDrawerLeftInner = styled.div<StyleProps>`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  transform: translate(-100%, 0);
  z-index: ${({ theme }) => theme.zIndex.modal};
  background-color: ${({ theme }) => theme.color.surface.toString()};
  border-top-right-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  border-bottom-right-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  transition:
    transform 600ms ease-out,
    opacity 120ms ease-out;
  ${({ $isOpen }) =>
    $isOpen &&
    css`
      opacity: 1;
      transform: translate(0, 0);
      transition:
        transform 240ms ease-out,
        opacity 100ms ease-out;
    `}
`;

const DrawerInner: React.ForwardRefRenderFunction<HTMLDivElement, DrawerInnerProps> = (
  props,
  ref,
) => {
  const { children, isOpen, anchor, onRequestClose, dialogID, ...nativeProps } = props;

  const Element = React.useMemo(() => {
    switch (anchor) {
      case 'top':
        return StyledDrawerTopInner;
      case 'left':
        return StyledDrawerLeftInner;
      case 'right':
        return StyledDrawerRightInner;
      case 'bottom':
      default:
        return StyledDrawerBottomInner;
    }
  }, [anchor]);

  return (
    <Element $isOpen={isOpen} id={`${dialogID}-description`} {...nativeProps} ref={ref}>
      {children}
    </Element>
  );
};

export default React.forwardRef(DrawerInner);
