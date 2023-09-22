import React from 'react';
import styled from '@emotion/styled';

export type DrawerContainerProps = React.HTMLAttributes<HTMLDivElement>;

const Container = styled.div`
  min-height: 2rem;
  height: 100%;
  display: flex;
  flex-flow: column;
`;

const DrawerContainer: React.ForwardRefRenderFunction<HTMLDivElement, DrawerContainerProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <Container {...nativeProps} ref={ref}>
      {children}
    </Container>
  );
};

export default React.forwardRef(DrawerContainer);
