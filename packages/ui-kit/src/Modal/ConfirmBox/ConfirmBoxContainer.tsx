import React from 'react';
import styled from '@emotion/styled';

export type ConfirmBoxContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Dialog unique ID
   */
  readonly dialogID: string;
};

const StyledConfirmBoxContainer = styled.div`
  display: flex;
  flex-flow: column;
  min-width: 20em;
`;

const ConfirmBoxContainer: React.ForwardRefRenderFunction<
  HTMLDivElement,
  ConfirmBoxContainerProps
> = (props, ref) => {
  const { children, dialogID, ...nativeProps } = props;

  return (
    <StyledConfirmBoxContainer
      role="modal-confirmbox"
      aria-labelledby={`${dialogID}-title`}
      aria-describedby={`${dialogID}-description`}
      {...nativeProps}
      ref={ref}
    >
      {children}
    </StyledConfirmBoxContainer>
  );
};

export default React.forwardRef(ConfirmBoxContainer);
