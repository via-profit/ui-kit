import React from 'react';
import styled from '@emotion/styled';

export type PaginationSize = 'medium' | 'small';

export type PaginationContainerProps = React.HTMLAttributes<HTMLElement> & {
  readonly size?: PaginationSize;
};

type StyledProps = {
  readonly $size: PaginationSize;
};

/**
 * The sizes of the buttons are in `em`, so the small variant only changes the font size.
 * The height of the buttons is the height of the controls: `theme.padding.control`
 */
const StyledNav = styled.nav<StyledProps>`
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5em;
  font-size: ${({ $size }) => ($size === 'small' ? '0.8em' : '1em')};
`;

const PaginationContainer: React.ForwardRefRenderFunction<HTMLElement, PaginationContainerProps> = (
  props,
  ref,
) => {
  const { size = 'medium', children, ...nativeProps } = props;

  return (
    <StyledNav $size={size} {...nativeProps} ref={ref}>
      {children}
    </StyledNav>
  );
};

export default React.forwardRef(PaginationContainer);
