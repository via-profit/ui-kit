import React from 'react';
import styled from '@emotion/styled';

export type DrawerContentProps = React.HTMLAttributes<HTMLDivElement>;

const Content = styled.div`
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0.5em 1em;
`;

const DrawerContent: React.ForwardRefRenderFunction<HTMLDivElement, DrawerContentProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <Content {...nativeProps} ref={ref}>
      {children}
    </Content>
  );
};

export default React.forwardRef(DrawerContent);
