import React from 'react';
import styled from '@emotion/styled';
import { themePadding } from '../ThemeProvider/tokens';

export type SurfaceHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly noPadding?: boolean;
  readonly rounded?: boolean;
};

type StyledProps = {
  readonly $noPadding?: boolean;
};

const StyledHeader = styled.div<StyledProps>`
  padding: ${({ $noPadding, theme }) => {
    const { y, x } = themePadding(theme, 'container', 1.3);

    return $noPadding ? '0' : `${y} ${x} 0 ${x}`;
  }};
  font-size: 1.3em;
  font-weight: 600;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
`;

const SurfaceHeader: React.ForwardRefRenderFunction<HTMLDivElement, SurfaceHeaderProps> = (
  props,
  ref,
) => {
  const { children, noPadding, rounded, ...nativeProps } = props;

  return (
    <StyledHeader $noPadding={noPadding} {...nativeProps} ref={ref}>
      {children}
    </StyledHeader>
  );
};

export default React.forwardRef(SurfaceHeader);
