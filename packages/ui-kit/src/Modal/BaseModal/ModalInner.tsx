import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export interface ModalInnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The dialog will remain open as long as the value is true
   */
  readonly isOpen: boolean;

  /**
   * The function that will be called to close the dialog
   */
  readonly onRequestClose: (event: React.MouseEvent<HTMLElement> | KeyboardEvent) => void;
}

type StyledProps = {
  readonly $isOpen: boolean;
};

const StyledModalInner = styled.div<StyledProps>`
  opacity: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  outline: none;
  position: relative;
  background-color: ${({ theme }) => theme.color.surface.toString()};
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  margin-top: 2em;
  transition:
    opacity 100ms ease-out,
    margin-top 240ms ease-out;
  ${({ $isOpen }) =>
    $isOpen &&
    css`
      margin-top: 0;
      opacity: 1;
      transition:
        opacity 100ms ease-out,
        margin-top 240ms ease-out;
    `}
`;

const ModalInner: React.ForwardRefRenderFunction<HTMLDivElement, ModalInnerProps> = (
  props,
  ref,
) => {
  const { children, isOpen, onRequestClose, ...restProps } = props;

  return (
    <StyledModalInner {...restProps} $isOpen={isOpen} ref={ref}>
      {children}
    </StyledModalInner>
  );
};

export default React.forwardRef(ModalInner);
