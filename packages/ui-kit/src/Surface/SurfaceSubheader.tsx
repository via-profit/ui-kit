import React from 'react';
import styled from '@emotion/styled';

export type SurfaceSubheaderProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly noPadding?: boolean;
  readonly rounded?: boolean;
};

type StyleProps = {
  readonly $noPadding?: boolean;
};

const StyledHeader = styled.div<StyleProps>`
  padding: ${({ $noPadding }) => ($noPadding ? '0' : '0.5em 1rem 0 1rem')};
  font-size: 0.9rem;
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
