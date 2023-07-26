import React from 'react';
import styled from '@emotion/styled';
import { useTheme, css } from '@emotion/react';

import Color from '../Color';
import ButtonBase, { ButtonBaseProps } from './ButtonBase';

export type ButtonOutlinedProps = ButtonBaseProps;

type StyledProps = {
  readonly $color: Color;
};

const StyledOutlinedButton = styled(ButtonBase)<StyledProps>`
  color: ${({ theme, disabled, $color }) => {
    switch (true) {
      case disabled:
        return theme.color.textPrimary.alpha(0.4).toString();
      default:
        return $color.darken(30).toString();
    }
  }};
  border-color: ${({ theme, disabled, $color }) => {
    switch (true) {
      case disabled:
        return theme.color.surface.darken(80).alpha(0.4).toString();
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
        outline-color: ${$color.rgbString() === theme.color.accentPrimary.rgbString()
          ? theme.color.textPrimary.toString()
          : theme.color.accentPrimary.toString()};
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
        return theme.color.accentPrimary;
      case color === 'secondary':
        return theme.color.accentSecondary;
      case typeof color === 'undefined':
      case color === 'default':
        return theme.color.textPrimary;
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
    <StyledOutlinedButton disabled={disabled} $color={$color} {...restProps} ref={ref}>
      {children}
    </StyledOutlinedButton>
  );
};

export default React.forwardRef(ButtonOutlined);
