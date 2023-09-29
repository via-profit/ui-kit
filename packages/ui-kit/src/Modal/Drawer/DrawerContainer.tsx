import React from 'react';
import styled from '@emotion/styled';

export type DrawerContainerProps = React.HTMLAttributes<HTMLDivElement>;

const StyledDrawerContainer = styled.div`
  min-height: 2rem;
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  border-radius: inherit;
`;

const DrawerContainer: React.ForwardRefRenderFunction<HTMLDivElement, DrawerContainerProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <StyledDrawerContainer {...nativeProps} ref={ref}>
      {children}
    </StyledDrawerContainer>
  );
};

export default React.forwardRef(DrawerContainer);
