import React from 'react';
import styled from '@emotion/styled';

export interface MenuListPopperProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly isOpen: boolean;
  readonly style?: React.CSSProperties;
}

type StyleProps = {
  readonly $isOpen: boolean;
};

const StyledMenuListPopper = styled.div<StyleProps>`
  visibility: ${props => (props.$isOpen ? 'visible' : 'hidden')};
  max-height: 18em;
  max-width: 18em;
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
