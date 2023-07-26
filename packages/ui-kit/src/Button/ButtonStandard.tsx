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
        return $background.toString();
    }
  }};
  box-shadow: 0 0.125em 0.75em
    ${({ $background }) => {
      switch (true) {
        case $background.luminance() > 0.49:
          return $background.darken(40).alpha(0.8).toString();
        default:
          return $background.darken(20).alpha(0.5).toString();
      }
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
        outline-color: ${$background.rgbString() === theme.color.accentPrimary.rgbString()
          ? theme.color.textPrimary.toString()
          : theme.color.accentPrimary.toString()};
      }
    `}
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
            $background.contrast(theme.color.textPrimary.rgbString()) > 5
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
