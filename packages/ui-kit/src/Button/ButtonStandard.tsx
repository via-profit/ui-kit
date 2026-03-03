import React from 'react';
import styled from '@emotion/styled';
import { useTheme, css } from '@emotion/react';

import Color from '../Color';
import ButtonBase, { ButtonBaseProps } from './ButtonBase';

export type ButtonStandardProps = ButtonBaseProps;

type StyledProps = {
  readonly $background: Color;
  readonly $color: Color;
};

const StyledStandardButton = styled(ButtonBase)<StyledProps>`
  color: ${({ $color, disabled }) => {
    switch (true) {
      case disabled:
        return $color.alpha(0.4).toString();
      default:
        return $color.toString();
    }
  }};
  background-color: ${({ $background, disabled }) => {
    switch (true) {
      case disabled:
        return $background.darken(10).toString();
      default:
        return $background.luminance(0.5).toString().toString();
    }
  }};
  ${({ $background }) => {
    switch (true) {
      case $background.getLuminance() > 0.49:
        return $background.darken(40).alpha(0.8).toString();
      default:
        return $background.darken(20).alpha(0.5).toString();
    }
  }};
  box-shadow: ${({ $background }) => {
    const color1 = $background.luminance(-0.5).alpha(0.4).toString();
    const color2 = $background.luminance(-0.83).alpha(0.3).toString();
    const color3 = $background.luminance(-0.1).toString();

    return `${color1} 0 0.1em 0.1em, ${color2} 0 0.25em 0.81em -0.187em, ${color3} 0 -0.1em 0 inset`;
  }};
  background-image: ${({ $background, theme }) => {
    if (theme.isDark) {
      return `radial-gradient(
        100% 100% at 100% 0,
        ${$background.luminance(0.5).toString()} 0,
        ${$background.luminance(-0.1).toString()} 100%
      )`;
    }

    return `radial-gradient(
      100% 100% at 100% 0,
      ${$background.luminance(0.8).toString()} 0,
      ${$background.toString()} 100%
    )`;
  }};
  ${({ disabled, $background, theme }) =>
    !disabled &&
    css`
      &:hover {
        background-color: ${$background.darken(30).toString()};
      }
      &:active {
        background-color: ${$background.darken(80).toString()};
      }
      &:focus-visible {
        outline-style: solid;
        outline-width: 0.14em;
        outline-color: ${$background.rgbString() === theme.color.accentPrimary.rgbString()
          ? theme.color.textPrimary.toString()
          : theme.color.accentPrimary.toString()};
      }
    `}

  &:hover {
    box-shadow: ${({ $background, disabled }) => {
      const color1 = $background.luminance(-0.6).alpha(0.4).toString();
      const color2 = $background.luminance(-0.9).alpha(0.4).toString();
      const color3 = $background.luminance(-0.3).alpha(0.3).toString();

      if (disabled) {
        return `${$background.luminance(-0.5).alpha(0.3).toString()} 0 0.187em 0.437em inset`;
      }

      return `${color1} 0 0.25em 0.5em, ${color2} 0 0.25em 0.6em -0.187em, ${color3} 0 -0.187em 0 inset`;
    }};
  }
  &:active {
    box-shadow: ${({ $background, theme }) => {
      if (theme.isDark) {
        const color = $background.luminance(-0.9).alpha(0.8).toString();

        return `${color} 0 0.387em 0.537em inset`;
      }

      const color = $background.luminance(-0.5).alpha(0.3).toString();

      return `${color} 0 0.187em 0.437em inset`;
    }};
  }
`;

const ButtonStandard: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonStandardProps> = (
  props,
  ref,
) => {
  const { children, disabled, color, ...restProps } = props;
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
          $background: theme.color.surface,
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
            $background?.getContrast(theme.color.textPrimary.rgbString()) > 5
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
    <StyledStandardButton
      $color={$color}
      $background={$background}
      disabled={disabled}
      {...restProps}
      ref={ref}
    >
      {children}
    </StyledStandardButton>
  );
};

export default React.forwardRef(ButtonStandard);
