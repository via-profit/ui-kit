import React from 'react';
import styled from '@emotion/styled';

export type DrawerFooterProps = React.HTMLAttributes<HTMLDivElement>;

const StyledDrawerFooter = styled.div`
  padding: 0.5em 1em;
`;

const DrawerFooter: React.ForwardRefRenderFunction<HTMLDivElement, DrawerFooterProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <StyledDrawerFooter {...nativeProps} ref={ref}>
      {children}
    </StyledDrawerFooter>
  );
};

export default React.forwardRef(DrawerFooter);
