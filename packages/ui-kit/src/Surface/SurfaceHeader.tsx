import React from 'react';
import styled from '@emotion/styled';

export type SurfaceHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const StyledHeader = styled.div`
  padding: 1rem 1rem 0 1rem;
  font-size: 1.3rem;
  font-weight: 600;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
`;

const SurfaceHeader: React.ForwardRefRenderFunction<HTMLDivElement, SurfaceHeaderProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <StyledHeader {...nativeProps} ref={ref}>
      {children}
    </StyledHeader>
  );
};

export default React.forwardRef(SurfaceHeader);
