import React from 'react';
import styled from '@emotion/styled';
import { useTheme, css } from '@emotion/react';
import type { ButtonOutlinedProps } from '@via-profit/ui-kit/Button/ButtonOutlined';
import type { ColorInterface } from '@via-profit/ui-kit/Color';

import Color from '../Color';
import ButtonBase from './ButtonBase';

type StyledProps = {
  readonly $color: ColorInterface;
};

const StyledOutlinedButton = styled(ButtonBase)<StyledProps>`
  color: ${({ theme, disabled, $color }) => {
    switch (true) {
      case disabled:
        return theme.colors.textPrimary.alpha(0.4).toString();
      default:
        return $color.darken(30).toString();
    }
  }};
  border-color: ${({ theme, disabled, $color }) => {
    switch (true) {
      case disabled:
        return theme.colors.surface.darken(80).alpha(0.4).toString();
      default:
        return $color.toString();
    }
  }};
  background-color: transparent;
  border-style: solid;
  border-width: 0.14em;
  ${({ disabled, $color, theme }) =>
    !disabled &&
    css`
      &:hover {
        background-color: ${$color.darken(20).alpha(0.1).toString()};
      }
      &:active {
        background-color: ${$color.darken(50).alpha(0.3).toString()};
      }
      &:focus-visible {
        outline-color: ${$color.rgbString() === theme.colors.accentPrimary.rgbString()
          ? theme.colors.textPrimary.toString()
          : theme.colors.accentPrimary.toString()};
      }
    `};
`;

const ButtonOutlined: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonOutlinedProps> = (
  props,
  ref,
) => {
  const { children, disabled, color, ...restProps } = props;
  const theme = useTheme();
  const $color = React.useMemo(() => {
    switch (true) {
      case color === 'primary':
        return theme.colors.accentPrimary;
      case color === 'secondary':
        return theme.colors.accentSecondary;
      case typeof color === 'undefined':
      case color === 'default':
        return theme.colors.textPrimary;
      case typeof color === 'string': {
        let c = theme.colors.textPrimary;

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
        return theme.colors.textPrimary;
    }
  }, [color, theme.colors]);

  return (
    <StyledOutlinedButton disabled={disabled} $color={$color} {...restProps} ref={ref}>
      {children}
    </StyledOutlinedButton>
  );
};

export default React.forwardRef(ButtonOutlined);
