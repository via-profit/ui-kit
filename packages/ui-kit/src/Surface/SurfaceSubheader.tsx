import React from 'react';
import styled from '@emotion/styled';

export type SurfaceSubheaderProps = React.HTMLAttributes<HTMLDivElement>;

const StyledHeader = styled.div`
  padding: 1rem 1rem 0 1rem;
  font-size: 0.9rem;
  font-weight: 200;
  color: ${({ theme }) => theme.colors.textSecondary.toString()};
`;

const SurfaceSubheader: React.ForwardRefRenderFunction<HTMLDivElement, SurfaceSubheaderProps> = (
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

export default React.forwardRef(SurfaceSubheader);
