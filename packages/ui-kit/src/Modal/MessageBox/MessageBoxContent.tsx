import React from 'react';
import styled from '@emotion/styled';

export type MessageBoxContentProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Dialog unique ID
   */
  readonly dialogID: string;
};

const Content = styled.div`
  flex: 1;
  padding: 1em 1em;
`;

const MessageBoxContent: React.ForwardRefRenderFunction<HTMLDivElement, MessageBoxContentProps> = (
  props,
  ref,
) => {
  const { children, dialogID, ...nativeProps } = props;

  return (
    <Content id={`${dialogID}-description`} {...nativeProps} ref={ref}>
      {children}
    </Content>
  );
};

export default React.forwardRef(MessageBoxContent);
