import React from 'react';
import styled from '@emotion/styled';
import { themePadding } from '../ThemeProvider/tokens';

export type SurfaceSubheaderProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly noPadding?: boolean;
  readonly rounded?: boolean;
};

type StyleProps = {
  readonly $noPadding?: boolean;
};

const StyledHeader = styled.div<StyleProps>`
  padding: ${({ $noPadding, theme }) => {
    const { y, x } = themePadding(theme, 'container', 0.9);

    return $noPadding ? '0' : `calc(${y} / 2) ${x} 0 ${x}`;
  }};
  font-size: 0.9em;
  font-weight: 200;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const SurfaceSubheader: React.ForwardRefRenderFunction<HTMLDivElement, SurfaceSubheaderProps> = (
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

export default React.forwardRef(SurfaceSubheader);
