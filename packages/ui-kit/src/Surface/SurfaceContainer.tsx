import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type SurfaceContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly noMargin?: boolean;
};

type StyledProps = {
  readonly $noMargin?: boolean;
};

const StyledSurfaceContainer = styled.div<StyledProps>`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surface.toString()};
  color: ${({ theme }) => theme.colors.textPrimary.toString()};
  box-shadow: ${({ theme }) =>
    `0 0.5em 2em -0.8em ${theme.colors.surface.darken(100).alpha(0.4).toString()}`};
  border-radius: ${({ theme }) => theme.shape.radiusFactor}em;
  font-size: 1em;
  ${({ $noMargin }) =>
    typeof $noMargin === 'undefined' &&
    $noMargin === false &&
    css`
      margin-bottom: 1em;
    `}
`;

const SurfaceContainer: React.ForwardRefRenderFunction<HTMLDivElement, SurfaceContainerProps> = (
  props,
  ref,
) => {
  const { noMargin, children, ...nativeProps } = props;

  return (
    <StyledSurfaceContainer $noMargin={noMargin} {...nativeProps} ref={ref}>
      {children}
    </StyledSurfaceContainer>
  );
};

export default React.forwardRef(SurfaceContainer);
