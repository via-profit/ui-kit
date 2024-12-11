import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import ModalInner, { ModalInnerProps } from '../BaseModal/ModalInner';

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

const StyledDrawerBottomInner = styled(ModalInner)`
  position: fixed;
  margin: 0;
  left: 0;
  right: 0;
  bottom: -100%;
  max-height: 90%;
  opacity: 0;
  display: flex;
  flex-direction: column;
  z-index: ${({ theme }) => theme.zIndex.modal};
  background-color: ${({ theme }) => theme.color.surface.toString()};
  border-top-left-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  border-top-right-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  transition:
    opacity 120ms ease-out,
    bottom 600ms ease-out;
  ${({ isOpen }) =>
    isOpen &&
    css`
      opacity: 1;
      bottom: 0;
      transition:
        opacity 100ms ease-out,
        bottom 240ms ease-out;
    `}
`;

const StyledDrawerTopInner = styled(ModalInner)`
  position: fixed;
  margin: 0;
  left: 0;
  right: 0;
  top: -100%;
  opacity: 0;
  max-height: 90%;
  display: flex;
  flex-direction: column;
  z-index: ${({ theme }) => theme.zIndex.modal};
  background-color: ${({ theme }) => theme.color.surface.toString()};
  border-bottom-left-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  border-bottom-right-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  transition:
    top 600ms ease-out,
    opacity 120ms ease-out;
  ${({ isOpen }) =>
    isOpen &&
    css`
      opacity: 1;
      top: 0;
      transition:
        top 240ms ease-out,
        opacity 100ms ease-out;
    `}
`;

const StyledDrawerRightInner = styled(ModalInner)`
  position: fixed;
  margin: 0;
  right: -100%;
  top: 0;
  bottom: 0;
  opacity: 0;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  z-index: ${({ theme }) => theme.zIndex.modal};
  background-color: ${({ theme }) => theme.color.surface.toString()};
  border-top-left-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  border-bottom-left-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  transition:
    right 600ms ease-out,
    opacity 120ms ease-out;
  ${({ isOpen }) =>
    isOpen &&
    css`
      opacity: 1;
      right: 0;
      transition:
        right 240ms ease-out,
        opacity 100ms ease-out;
    `}
`;

const StyledDrawerLeftInner = styled(ModalInner)`
  position: fixed;
  margin: 0;
  left: -100%;
  top: 0;
  bottom: 0;
  opacity: 0;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  z-index: ${({ theme }) => theme.zIndex.modal};
  background-color: ${({ theme }) => theme.color.surface.toString()};
  border-top-right-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  border-bottom-right-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  transition:
    left 600ms ease-out,
    opacity 120ms ease-out;
  ${({ isOpen }) =>
    isOpen &&
    css`
      opacity: 1;
      left: 0;
      transition:
        left 240ms ease-out,
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
    <Element
      isOpen={isOpen}
      id={`${dialogID}-description`}
      onRequestClose={onRequestClose}
      {...nativeProps}
      ref={ref}
    >
      {children}
    </Element>
  );
};

export default React.forwardRef(DrawerInner);
