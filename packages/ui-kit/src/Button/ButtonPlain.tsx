import React from 'react';
import styled from '@emotion/styled';
import { useTheme, css } from '@emotion/react';

import Color from '../Color';
import ButtonBase, { ButtonBaseProps } from './ButtonBase';

export type ButtonPlainProps = ButtonBaseProps;

type StyledProps = {
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
  background: none;
  ${({ disabled, theme, $color }) =>
    !disabled &&
    css`
      &:hover {
        color: ${$color.darken(30).toString()};
        background-color: ${$color.alpha(0.1).toString()};
      }
      &:active {
        color: ${$color.darken(80).toString()};
        background-color: ${$color.alpha(0.3).toString()};
      }
      &:focus-visible {
        outline-color: ${$color.rgbString() === theme.color.accentPrimary.rgbString()
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
  const { $color } = React.useMemo(() => {
    switch (true) {
      case color === 'primary':
        return {
          $color: theme.color.accentPrimary,
        };
      case color === 'secondary':
        return {
          $color: theme.color.accentSecondary,
        };
      case typeof color === 'undefined':
      case color === 'default':
        return {
          $color: theme.color.textPrimary,
        };

      case typeof color === 'string': {
        let $color = theme.color.textPrimary;
        try {
          if (color) {
            $color = new Color(color);
          }
        } catch (err) {
          console.error(`invalid color value «${color}»`);
        }

        return {
          $color,
        };
      }

      default:
        return {
          $color: theme.color.textPrimary,
        };
    }
  }, [color, theme.color]);

  return (
    <StyledPlainButton $color={$color} disabled={disabled} {...restProps} ref={ref}>
      {children}
    </StyledPlainButton>
  );
};

export default React.forwardRef(ButtonPlain);
