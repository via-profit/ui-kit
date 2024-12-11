import React from 'react';
import styled from '@emotion/styled';

import BaseModalInner, { ModalInnerProps } from '../BaseModal/ModalInner';

export type DialogInnerProps = ModalInnerProps &
  React.RefAttributes<HTMLDivElement> & {
    /**
     * Dialog unique ID
     */
    readonly dialogID: string;
  };

const StyledDialogInner = styled(BaseModalInner)`
  padding: 1em 1em;
`;

const DialogInner: React.ForwardRefRenderFunction<HTMLDivElement, DialogInnerProps> = (
  props,
  ref,
) => {
  const { children, dialogID, ...restProps } = props;

  return (
    <StyledDialogInner id={`${dialogID}-description`} {...restProps} ref={ref}>
      {children}
    </StyledDialogInner>
  );
};

export default React.forwardRef(DialogInner);
