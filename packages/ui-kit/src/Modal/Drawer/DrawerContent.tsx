import React from 'react';
import styled from '@emotion/styled';

export type DrawerContentProps = React.HTMLAttributes<HTMLDivElement>;

const StyledDrawerContent = styled.div`
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: inherit;
  background-color: ${({ theme }) => theme.color.backgroundPrimary.toString()};
`;

const DrawerContent: React.ForwardRefRenderFunction<HTMLDivElement, DrawerContentProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <StyledDrawerContent {...nativeProps} ref={ref}>
      {children}
    </StyledDrawerContent>
  );
};

export default React.forwardRef(DrawerContent);
