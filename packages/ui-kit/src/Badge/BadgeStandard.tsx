import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import Color from '../Color';
import BadgeBase, { BadgeBaseProps } from './BadgeBase';

export type BadgeStandardProps = BadgeBaseProps;

type StyledProps = {
  readonly $background: Color;
  readonly $color: Color;
};

const StyledStandardBadge = styled(BadgeBase)<StyledProps>`
  color: ${({ $color }) => $color.toString()};
  background-color: ${({ $background }) => $background.toString()};
  ${({ $background }) => {
    switch (true) {
      case $background.luminance() > 0.49:
        return $background.darken(40).alpha(0.8).toString();
      default:
        return $background.darken(20).alpha(0.5).toString();
    }
  }};
  &:hover {
    background-color: ${({ $background }) => $background.darken(30).toString()};
  }
  &:focus-visible {
    outline-color: ${({ theme, $background }) =>
      $background.rgbString() === theme.color.accentPrimary.rgbString()
        ? theme.color.textPrimary.toString()
        : theme.color.accentPrimary.toString()};
  }
`;

const BadgeStandard: React.ForwardRefRenderFunction<HTMLSpanElement, BadgeStandardProps> = (
  props,
  ref,
) => {
  const { children, color, ...restProps } = props;
  const theme = useTheme();
  const { $background, $color } = React.useMemo(() => {
    switch (true) {
      case color === 'primary':
        return {
          $color: theme.color.accentPrimaryContrast,
          $background: theme.color.accentPrimary,
        };
      case color === 'secondary':
        return {
          $color: theme.color.accentSecondaryContrast,
          $background: theme.color.accentSecondary,
        };
      case typeof color === 'undefined':
      case color === 'default':
        return {
          $background: theme.color.surface.darken(10),
          $color: theme.color.textPrimary,
        };

      case typeof color === 'string': {
        let $background = theme.color.surface;
        try {
          if (color) {
            $background = new Color(color);
          }
        } catch (err) {
          console.error(`invalid color value «${color}»`);
        }

        return {
          $background,
          $color:
            $background.contrast(theme.color.textPrimary) > 5
              ? theme.color.textPrimary
              : theme.color.surface,
        };
      }

      default:
        return {
          $background: theme.color.surface,
          $color: theme.color.textPrimary,
        };
    }
  }, [color, theme.color]);

  return (
    <StyledStandardBadge
      variant="standard"
      $color={$color}
      $background={$background}
      color={color}
      {...restProps}
      ref={ref}
    >
      {children}
    </StyledStandardBadge>
  );
};

export default React.forwardRef(BadgeStandard);
