import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import Color from '../Color';
import BadgeBase, { BadgeBaseProps } from './BadgeBase';

export type BadgeOutlinedProps = BadgeBaseProps;

type StyledProps = {
  readonly $color: Color;
};

const StyledOutlinedBadge = styled(BadgeBase)<StyledProps>`
  color: ${({ $color }) => $color.darken(30).toString()};
  border-color: ${({ $color }) => $color.toString()};
  background-color: transparent;
  border-style: solid;
  border-width: 0.14em;
  &:hover {
    background-color: ${({ $color }) => $color.darken(20).alpha(0.1).toString()};
  }
  &:focus-visible {
    outline-color: ${({ $color, theme }) =>
      $color.rgbString() === theme.color.accentPrimary.rgbString()
        ? theme.color.textPrimary.toString()
        : theme.color.accentPrimary.toString()};
  }
`;

const BadgeOutlined: React.ForwardRefRenderFunction<HTMLSpanElement, BadgeOutlinedProps> = (
  props,
  ref,
) => {
  const { children, color, ...restProps } = props;
  const theme = useTheme();
  const $color = React.useMemo(() => {
    switch (true) {
      case color === 'primary':
        return theme.color.accentPrimary;
      case color === 'secondary':
        return theme.color.accentSecondary;
      case typeof color === 'undefined':
      case color === 'default':
        return theme.color.textPrimary.lighten(30);
      case typeof color === 'string': {
        let c = theme.color.textPrimary;

        try {
          if (color) {
            c = new Color(color);
          }
        } catch (err) {
          console.error(`invalid color value «${color}»`);
        }

        return c;
      }
      default:
        return theme.color.textPrimary;
    }
  }, [color, theme.color]);

  return (
    <StyledOutlinedBadge $color={$color} color={color} variant="outlined" {...restProps} ref={ref}>
      {children}
    </StyledOutlinedBadge>
  );
};

export default React.forwardRef(BadgeOutlined);
