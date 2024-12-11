import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export interface ModalInnerContainerProps extends React.HTMLAttributes<HTMLDivElement> {
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

const StyledModalInnerContainer = styled.div<StyledProps>`
  opacity: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  position: fixed;
  inset: 0;
  outline: none;
  transition: opacity 100ms ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      opacity: 1;
      transition: opacity 100ms ease-out;
    `}
`;

const ModalInnerContainer: React.ForwardRefRenderFunction<
  HTMLDivElement,
  ModalInnerContainerProps
> = (props, ref) => {
  const { children, isOpen, onRequestClose, ...restProps } = props;

  return (
    <StyledModalInnerContainer {...restProps} $isOpen={isOpen} ref={ref}>
      {children}
    </StyledModalInnerContainer>
  );
};

export default React.forwardRef(ModalInnerContainer);
