import React from 'react';
import styled from '@emotion/styled';
import { themePadding } from '../../ThemeProvider/tokens';

export type MessageBoxContentProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Dialog unique ID
   */
  readonly dialogID: string;
};

const Content = styled.div`
  flex: 1;
  padding: ${({ theme }) => {
    const { y, x } = themePadding(theme, 'container');

    return `${y} ${x}`;
  }};
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
