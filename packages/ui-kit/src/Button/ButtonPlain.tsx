import React from 'react';
import styled from '@emotion/styled';
import { useTheme, css } from '@emotion/react';

import Color from '../Color';
import ButtonBase, { ButtonBaseProps } from './ButtonBase';

export type ButtonPlainProps = ButtonBaseProps;

type StyledProps = {
  readonly $background: Color;
  readonly $color: Color;
};

const StyledPlainButton = styled(ButtonBase)<StyledProps>`
  box-shadow: none;
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

const ButtonPlain: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonPlainProps> = (
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
    <StyledPlainButton
      $color={$color}
      $background={$background}
      disabled={disabled}
      {...restProps}
      ref={ref}
    >
      {children}
    </StyledPlainButton>
  );
};

export default React.forwardRef(ButtonPlain);
