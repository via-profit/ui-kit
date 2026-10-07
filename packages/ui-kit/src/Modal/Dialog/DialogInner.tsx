import React from 'react';
import styled from '@emotion/styled';

import BaseModalInner, { ModalInnerProps } from '../BaseModal/ModalInner';
import { themePadding } from '../../ThemeProvider/tokens';

export type DialogInnerProps = ModalInnerProps &
  React.RefAttributes<HTMLDivElement> & {
    /**
     * Dialog unique ID
     */
    readonly dialogID: string;
  };

const StyledDialogInner = styled(BaseModalInner)`
  padding: ${({ theme }) => {
    const { y, x } = themePadding(theme, 'container');

    return `${y} ${x}`;
  }};
`;

const DialogInner: React.ForwardRefRenderFunction<HTMLDivElement, DialogInnerProps> = (
  props,
  ref,
) => {
  const { children, dialogID, ...restProps } = props;

  return (
    <StyledDialogInner
      role="dialog"
      aria-modal="true"
      id={`${dialogID}-description`}
      {...restProps}
      ref={ref}
    >
      {children}
    </StyledDialogInner>
  );
};

export default React.forwardRef(DialogInner);
