import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Color from '../Color';
import useCheckboxColor from './useCheckboxColor';

export type CheckboxBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  /**
   * Shows the dash instead of the check mark (e.g. «select all» when only some items are selected)
   */
  readonly indeterminate?: boolean;

  /**
   * Paints the border with the error color
   */
  readonly error?: boolean;
};

type SquareProps = {
  readonly $color: Color;
  readonly $active: boolean;
  readonly $error: boolean;
  readonly $disabled: boolean;
};

const Root = styled.span`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  width: 1.15em;
  height: 1.15em;
`;

const StyledInput = styled.input`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
  z-index: 1;

  /* Data attributes, not class names: emotion labels are absent in the published package */
  &:focus-visible + [data-checkbox-square] {
    outline: 0.14em solid ${({ theme }) => theme.color.accentPrimary.toString()};
    outline-offset: 0.14em;
  }
`;

const Square = styled.span<SquareProps>`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 100%;
  border-width: 0.1em;
  border-style: solid;
  /* Scaled down: the square is small, the full radius would turn it into a circle */
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 0.6}em;
  background-color: ${({ theme }) => theme.color.surface.toString()};
  color: ${({ $color }) => $color.toString()};
  transition: border-color 150ms ease-out;
  border-color: ${({ theme, $color, $active, $error }) => {
    switch (true) {
      case $error:
        return theme.color.error.toString();
      case $active:
        return $color.toString();
      default:
        return theme.color.textPrimary.alpha(0.4).toString();
    }
  }};

  ${({ $disabled, $error, $color }) =>
    !$disabled &&
    !$error &&
    css`
      label:hover & {
        border-color: ${$color.toString()};
      }
    `}
`;

/**
 * The square with the native input over it.
 * The ref and the input attributes go to the input: it is the element that holds the value and the focus.
 * `className` and `style` go to the root element, so `styled(CheckboxBox)` styles the square
 */
const CheckboxBox: React.ForwardRefRenderFunction<HTMLInputElement, CheckboxBoxProps> = (
  props,
  ref,
) => {
  const {
    children,
    indeterminate,
    error,
    color,
    checked,
    disabled,
    className,
    style,
    ...nativeProps
  } = props;
  const $color = useCheckboxColor(color);

  return (
    <Root className={className} style={style}>
      <StyledInput
        {...nativeProps}
        checked={checked}
        disabled={disabled}
        type="checkbox"
        ref={ref}
      />
      <Square
        data-checkbox-square=""
        $color={$color}
        $active={Boolean(checked || indeterminate)}
        $error={Boolean(error)}
        $disabled={Boolean(disabled)}
      >
        {children}
      </Square>
    </Root>
  );
};

export default React.forwardRef(CheckboxBox);
