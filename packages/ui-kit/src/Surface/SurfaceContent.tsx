import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type SurfaceContentProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly noPadding?: boolean;
  readonly rounded?: boolean;
};

type StyleProps = {
  readonly $noPadding?: boolean;
  readonly $rounded?: boolean;
};

const StyledContent = styled.div<StyleProps>`
  flex: 1;
  ${({ $noPadding }) =>
    (typeof $noPadding === 'undefined' || $noPadding === false) &&
    css`
      padding: 1.4rem 1rem 1rem 1rem;
    `}

  ${({ $rounded, $noPadding }) =>
    $rounded &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      padding: ${$noPadding ? '0' : '1rem'};
    `}
`;

const SurfaceContent: React.ForwardRefRenderFunction<HTMLDivElement, SurfaceContentProps> = (
  props,
  ref,
) => {
  const { children, noPadding, rounded, ...nativeProps } = props;

  return (
    <StyledContent $noPadding={noPadding} $rounded={rounded} {...nativeProps} ref={ref}>
      {children}
    </StyledContent>
  );
};

export default React.forwardRef(SurfaceContent);
