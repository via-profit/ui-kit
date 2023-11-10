import React from 'react';
import styled from '@emotion/styled';
import { useTheme, css } from '@emotion/react';

import Color from '../Color';
import BadgeBase, { BadgeBaseProps } from './BadgeBase';

export type BadgeOutlinedProps = BadgeBaseProps;

type StyledProps = {
  readonly $color: Color;
  readonly $background: Color;
  readonly $clickable: boolean;
};

const StyledOutlinedBadge = styled(BadgeBase)<StyledProps>`
  color: ${({ $color }) => $color.darken(30).toString()};
  border-color: ${({ $background }) => $background.toString()};
  border-style: solid;
  border-width: 0.14em;
  background-color: transparent;
  &:hover {
    background-color: ${({ $background }) => $background.darken(20).alpha(0.1).toString()};
  }
  &:focus-visible {
    outline-style: solid;
    outline-width: 0.14em;
    outline-color: ${({ $background }) => $background.rgbString()};
  }
  ${({ $clickable }) =>
    $clickable &&
    css`
      cursor: pointer;
    `}
`;

const BadgeOutlined: React.ForwardRefRenderFunction<HTMLSpanElement, BadgeOutlinedProps> = (
  props,
  ref,
) => {
  const { children, color, onClick, ...restProps } = props;
  const theme = useTheme();
  const clickable = React.useMemo(() => typeof onClick === 'function', [onClick]);
  const { $background, $color } = React.useMemo(() => {
    switch (true) {
      case color === 'primary':
        return {
          $color: theme.color.accentPrimary,
          $background: theme.color.accentPrimary,
        };
      case color === 'secondary':
        return {
          $color: theme.color.accentSecondary,
          $background: theme.color.accentSecondary,
        };
      case typeof color === 'undefined':
      case color === 'default':
        return {
          $color: new Color(theme.color.textPrimary),
          $background: theme.color.textPrimary.lighten(100),
        };
      case typeof color === 'string': {
        let c = theme.color.textPrimary;

        try {
          if (color) {
            c = new Color(color);
          }
        } catch (err) {
          console.error(`invalid color value «${color}»`);
        }

        return {
          $color: c,
          $background: c,
        };
      }
      default:
        return {
          $color: theme.color.textPrimary,
          $background: theme.color.textPrimary,
        };
    }
  }, [color, theme.color]);

  return (
    <StyledOutlinedBadge
      $color={$color}
      $background={$background}
      $clickable={clickable}
      onClick={onClick}
      color={color}
      variant="outlined"
      {...restProps}
      tabIndex={clickable ? 0 : -1}
      ref={ref}
    >
      {children}
    </StyledOutlinedBadge>
  );
};

export default React.forwardRef(BadgeOutlined);
