import React from 'react';
import styled from '@emotion/styled';

export interface MenuListPopperProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly isOpen: boolean;
  readonly style: React.CSSProperties;
}

const StyledMenuListPopper = styled.div<{ $isOpen: boolean }>`
  visibility: ${props => (props.$isOpen ? 'visible' : 'hidden')};
  max-height: 300px;
  max-width: 300px;
  display: flex;
  position: static;
`;

const MenuListPopper: React.ForwardRefRenderFunction<HTMLDivElement, MenuListPopperProps> = (
  props,
  ref,
) => {
  const { isOpen, children, ...nativeProps } = props;

  return (
    <StyledMenuListPopper {...nativeProps} ref={ref} $isOpen={isOpen}>
      {children}
    </StyledMenuListPopper>
  );
};

export default React.forwardRef(MenuListPopper);
