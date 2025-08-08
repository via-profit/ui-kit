import React from 'react';
import styled from '@emotion/styled';

export type SurfaceHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly noPadding?: boolean;
  readonly rounded?: boolean;
};

type StyledProps = {
  readonly $noPadding?: boolean;
};

const StyledHeader = styled.div<StyledProps>`
  padding: ${({ $noPadding }) => ($noPadding ? '0' : '1rem 1rem 0 1rem')};
  font-size: 1.3rem;
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
