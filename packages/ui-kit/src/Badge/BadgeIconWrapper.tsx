import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type BadgeIconWrapperProps = React.HTMLAttributes<HTMLSpanElement> & {
  /**
   * Icon position
   */
  readonly position: 'start' | 'end';
};

type StyleProps = {
  readonly $position: BadgeIconWrapperProps['position'];
};

const Wrapper = styled.span<StyleProps>`
  display: flex;
  padding: 0.3em;
  align-items: center;
  justify-content: center;
  ${({ $position }) =>
    $position === 'start' &&
    css`
      margin-right: 0.1em;
    `};
  ${({ $position }) =>
    $position === 'end' &&
    css`
      margin-left: 0.1em;
    `};
`;

const BadgeIconWrapper: React.ForwardRefRenderFunction<HTMLSpanElement, BadgeIconWrapperProps> = (
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

export default React.forwardRef(BadgeIconWrapper);
