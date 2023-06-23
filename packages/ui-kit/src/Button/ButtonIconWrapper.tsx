import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type ButtonIconWrapperProps = React.HTMLAttributes<HTMLSpanElement> & {
  /**
   * Icon position
   */
  readonly position: 'start' | 'end';
};

type StyleProps = {
  readonly $position: ButtonIconWrapperProps['position'];
};

const Wrapper = styled.span<StyleProps>`
  ${({ $position }) =>
    $position === 'start' &&
    css`
      margin-right: 0.8em;
    `};
  ${({ $position }) =>
    $position === 'end' &&
    css`
      margin-left: 0.8em;
    `};
`;

const ButtonIconWrapper: React.ForwardRefRenderFunction<HTMLSpanElement, ButtonIconWrapperProps> = (
  props,
  ref,
) => {
  const { children, position, ...nativeProps } = props;

  return (
    <Wrapper $position={position} {...nativeProps} ref={ref}>
      {children}
    </Wrapper>
  );
};

export default React.forwardRef(ButtonIconWrapper);
