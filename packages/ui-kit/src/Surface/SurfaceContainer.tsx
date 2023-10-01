import React from 'react';
import styled from '@emotion/styled';

export type SurfaceContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly inline?: boolean;
};

type StyledProps = {
  readonly $inline?: boolean;
};

const StyledSurfaceContainer = styled.div<StyledProps>`
  display: ${({ $inline }) => ($inline ? 'inline-flex' : 'flex')};
  box-sizing: border-box;
  flex-direction: column;
  background: ${({ theme }) => theme.color.surface.toString()};
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  box-shadow: ${({ theme }) =>
    `0 0.5em 2em -0.8em ${theme.color.surface.darken(100).alpha(0.4).toString()}`};
  border-radius: ${({ theme }) => theme.shape.radiusFactor}em;
  font-size: 1em;
`;

const SurfaceContainer: React.ForwardRefRenderFunction<HTMLDivElement, SurfaceContainerProps> = (
  props,
  ref,
) => {
  const { inline, children, ...nativeProps } = props;

  return (
    <StyledSurfaceContainer $inline={inline} {...nativeProps} ref={ref}>
      {children}
    </StyledSurfaceContainer>
  );
};

export default React.forwardRef(SurfaceContainer);
