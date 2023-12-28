import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type SurfaceContentProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly noPadding?: boolean;
};

type StyleProps = {
  readonly $noPadding?: boolean;
};

const StyledContent = styled.div<StyleProps>`
  flex: 1;
  overflow: auto;
  ${({ $noPadding }) =>
    (typeof $noPadding === 'undefined' || $noPadding === false) &&
    css`
      padding: 1.4rem 1rem 1rem 1rem;
    `}
`;

const SurfaceContent: React.ForwardRefRenderFunction<HTMLDivElement, SurfaceContentProps> = (
  props,
  ref,
) => {
  const { children, noPadding, ...nativeProps } = props;

  return (
    <StyledContent $noPadding={noPadding} {...nativeProps} ref={ref}>
      {children}
    </StyledContent>
  );
};

export default React.forwardRef(SurfaceContent);
