import React from 'react';
import styled from '@emotion/styled';

export type MessageBoxContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Dialog unique ID
   */
  readonly dialogID: string;
};

const Container = styled.div`
  display: flex;
  flex-flow: column;
  min-width: 20em;
`;

const MessageBoxContainer: React.ForwardRefRenderFunction<
  HTMLDivElement,
  MessageBoxContainerProps
> = (props, ref) => {
  const { children, dialogID, ...nativeProps } = props;

  return (
    <Container
      role="modal-MessageBox"
      aria-labelledby={`${dialogID}-title`}
      aria-describedby={`${dialogID}-description`}
      {...nativeProps}
      ref={ref}
    >
      {children}
    </Container>
  );
};

export default React.forwardRef(MessageBoxContainer);
