import React from 'react';
import styled from '@emotion/styled';

export type MessageBoxHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Dialog unique ID
   */
  readonly dialogID: string;
};

const Header = styled.div`
  padding: 1em 1em 0 1em;
`;

const HeaderTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
`;

const MessageBoxHeader: React.ForwardRefRenderFunction<HTMLDivElement, MessageBoxHeaderProps> = (
  props,
  ref,
) => {
  const { children, dialogID, ...nativeProps } = props;

  return (
    <Header {...nativeProps} ref={ref}>
      <HeaderTitle id={`${dialogID}-title`}>{children}</HeaderTitle>
    </Header>
  );
};

export default React.forwardRef(MessageBoxHeader);
