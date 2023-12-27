import React from 'react';
import styled from '@emotion/styled';

export interface ModalOverlayProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * The dialog will remain open as long as the value is true
   */
  readonly isOpen: boolean;

  /**
   * The function that will be called to close the dialog
   */
  readonly onRequestClose: (event: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * Should the dialog close when overlay mouse click
   */
  readonly closeOnOverlayClick: boolean;
}

type StyledProps = {
  readonly $isOpen: boolean;
};

const StyledModalOverlay = styled.div<StyledProps>`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  background-color: ${({ theme }) =>
    theme.isDark
      ? theme.color.backgroundPrimary.darken(30).alpha(0.8).rgbString()
      : theme.color.textPrimary.darken(30).alpha(0.8).rgbString()};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: opacity 120ms ease-out;
`;

const ModalOverlay: React.ForwardRefRenderFunction<HTMLDivElement, ModalOverlayProps> = (
  props,
  ref,
) => {
  const { isOpen, onRequestClose, closeOnOverlayClick, ...restProps } = props;

  return (
    <StyledModalOverlay
      {...restProps}
      ref={ref}
      $isOpen={isOpen}
      onClick={closeOnOverlayClick ? onRequestClose : undefined}
    />
  );
};

export default React.forwardRef(ModalOverlay);
