import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { themePadding } from '../ThemeProvider/tokens';

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
  ${({ $noPadding, theme }) => {
    const { y, x } = themePadding(theme, 'container');

    return (
      !$noPadding &&
      css`
        padding: calc(${y} * 1.4) ${x} ${y} ${x};
      `
    );
  }}

  ${({ $rounded, $noPadding, theme }) => {
    const { y, x } = themePadding(theme, 'container');

    return (
      $rounded &&
      css`
        display: flex;
        align-items: center;
        justify-content: center;
        padding: ${$noPadding ? '0' : `${y} ${x}`};
      `
    );
  }}
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
