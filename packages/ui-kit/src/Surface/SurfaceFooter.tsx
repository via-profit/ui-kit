import React from 'react';
import styled from '@emotion/styled';

export type SurfaceFooterProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly noPadding?: boolean;
  readonly rounded?: boolean;
};

type StyleProps = {
  readonly $noPadding?: boolean;
};

const StyledFooter = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: ${({ $noPadding }) => ($noPadding ? '0' : '1rem')};
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
`;

const SurfaceFooter: React.ForwardRefRenderFunction<HTMLDivElement, SurfaceFooterProps> = (
  props,
  ref,
) => {
  const { children, noPadding, rounded, ...nativeProps } = props;

  return (
    <StyledFooter $noPadding={noPadding} {...nativeProps} ref={ref}>
      {children}
    </StyledFooter>
  );
};

export default React.forwardRef(SurfaceFooter);
