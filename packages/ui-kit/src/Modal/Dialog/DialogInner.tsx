import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { ModalInnerProps } from '../BaseModal/ModalInner';

export type DialogInnerProps = ModalInnerProps &
  React.RefAttributes<HTMLDivElement> & {
    /**
     * Dialog unique ID
     */
    readonly dialogID: string;
  };

const StyledDialogInner = styled.div<{ $isOpen: boolean }>`
  flex: 1;
  padding: 1em 1em;
  opacity: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  position: fixed;
  left: 50%;
  top: 50%;
  outline: none;
  background-color: ${({ theme }) => theme.color.surface.toString()};
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  transform: translate(-50%, -30%);
  transition:
    transform 240ms ease-out,
    opacity 100ms ease-out;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      opacity: 1;
      transform: translate(-50%, -50%);
      ransition:
        transform 240ms ease-out,
        opacity 100ms ease-out;
    `}
`;

const DialogInner: React.ForwardRefRenderFunction<HTMLDivElement, DialogInnerProps> = (
  props,
  ref,
) => {
  const { children, isOpen, onRequestClose, dialogID, ...nativeProps } = props;

  return (
    <StyledDialogInner $isOpen={isOpen} id={`${dialogID}-description`} {...nativeProps} ref={ref}>
      {children}
    </StyledDialogInner>
  );
};

export default React.forwardRef(DialogInner);
