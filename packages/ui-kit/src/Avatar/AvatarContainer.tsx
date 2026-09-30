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
  readonly $size?: string;
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
  width: ${({ $size }) => $size || '2.5em'};
  height: ${({ $size }) => $size || '2.5em'};
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.color.textPrimary.toString()};
`;

const AvatarContainer: React.ForwardRefRenderFunction<HTMLSpanElement, AvatarContainerProps> = (
  props,
  ref,
) => {
  // The color is applied by <Avatar>, it must not reach the DOM as an attribute
  const { children, size, color, ...nativeProps } = props;

  return (
    <StyledAvatar {...nativeProps} $size={size} ref={ref}>
      {children}
    </StyledAvatar>
  );
};

export default React.forwardRef(AvatarContainer);
