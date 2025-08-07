import React from 'react';
import styled from '@emotion/styled';
import { AnchorVariant } from './DrawerInner';

export type DrawerContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Drawer position\
   * \
   * **Varians:** `bottom` `right` `left` `top`\
   * **Default:** `bottom`
   */
  readonly anchor: AnchorVariant;
};

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
