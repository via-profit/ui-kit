import React from 'react';
import styled from '@emotion/styled';

export type ConfirmBoxContentProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Dialog unique ID
   */
  readonly dialogID: string;
};

const Content = styled.div`
  flex: 1;
  padding: 1em 1em;
`;

const ConfirmBoxContent: React.ForwardRefRenderFunction<HTMLDivElement, ConfirmBoxContentProps> = (
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

export default React.forwardRef(ConfirmBoxContent);
