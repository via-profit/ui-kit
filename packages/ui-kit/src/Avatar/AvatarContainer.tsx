import React from 'react';
import styled from '@emotion/styled';

export type AvatarContainerProps = React.HTMLAttributes<HTMLSpanElement> & {
  /**
   * You can pass the primary, default, secondary name of the colors or your specified color value
   */
  readonly color?: 'default' | 'primary' | 'secondary' | string;
  /**
   * Avatar size variant\
   * \
   * **Default**: `2.5em`
   */
  readonly size?: string;
};

type StyledProps = {
  readonly color?: AvatarContainerProps['color'];
  readonly size?: string;
};

const StyledAvatar = styled.span<StyledProps>`
  font-size: 1em;
  border-width: 0;
  outline-style: solid;
  outline-color: transparent;
  outline-width: 0.14em;
  transition: all 180ms ease-out 0s;
  background: none;
  position: relative;
  width: ${({ size }) => size || '2.5em'};
  height: ${({ size }) => size || '2.5em'};
  display: inline-flex;
  overflow: hidden;
  align-items: center;
  color: ${({ color, theme }) => {
    switch (true) {
      case typeof color === 'undefined':
      default:
        return theme.color.textPrimary.toString();
    }
  }};
`;

const AvatarContainer: React.ForwardRefRenderFunction<HTMLSpanElement, AvatarContainerProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <StyledAvatar {...nativeProps} ref={ref}>
      {children}
    </StyledAvatar>
  );
};

export default React.forwardRef(AvatarContainer);
