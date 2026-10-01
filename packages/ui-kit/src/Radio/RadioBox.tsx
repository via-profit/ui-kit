import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Color from '../Color';
import useRadioColor from './useRadioColor';

export type RadioBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  /**
   * Paints the border with the error color
   */
  readonly error?: boolean;
};

type CircleProps = {
  readonly $color: Color;
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

/**
 * The checked look comes from the `:checked` state of the input, not from the props:
 * the browser unchecks the other radio buttons of the same `name` itself
 * (data attributes, not class names: emotion labels are absent in the published package)
 */
const StyledInput = styled.input<{ $color: Color; $error: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
  z-index: 1;

  &:checked + [data-radio-circle] {
    border-color: ${({ theme, $color, $error }) =>
      $error ? theme.color.error.toString() : $color.toString()};
  }

  &:checked + [data-radio-circle] [data-radio-dot] {
    transform: scale(1);
  }

  &:focus-visible + [data-radio-circle] {
    outline: 0.14em solid ${({ theme }) => theme.color.accentPrimary.toString()};
    outline-offset: 0.14em;
  }
`;

const Circle = styled.span<CircleProps>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border-width: 0.1em;
  border-style: solid;
  background-color: ${({ theme }) => theme.color.surface.toString()};
  transition: border-color 150ms ease-out;
  border-color: ${({ theme, $error }) =>
    $error ? theme.color.error.toString() : theme.color.textPrimary.alpha(0.4).toString()};

  ${({ $disabled, $error, $color }) =>
    !$disabled &&
    !$error &&
    css`
      label:hover & {
        border-color: ${$color.toString()};
      }
    `}
`;

const Dot = styled.span<{ $color: Color }>`
  width: 50%;
  height: 50%;
  border-radius: 50%;
  background-color: ${({ $color }) => $color.toString()};
  transform: scale(0);
  transition: transform 150ms ease-out;
`;

/**
 * The circle with the native input over it.
 * The ref and the input attributes go to the input: it is the element that holds the value and the focus.
 * `className` and `style` go to the root element, so `styled(RadioBox)` styles the circle
 */
const RadioBox: React.ForwardRefRenderFunction<HTMLInputElement, RadioBoxProps> = (props, ref) => {
  const { error, color, disabled, className, style, ...nativeProps } = props;
  const $color = useRadioColor(color);

  return (
    <Root className={className} style={style}>
      <StyledInput
        {...nativeProps}
        type="radio"
        disabled={disabled}
        $color={$color}
        $error={Boolean(error)}
        ref={ref}
      />
      <Circle
        data-radio-circle=""
        $color={$color}
        $error={Boolean(error)}
        $disabled={Boolean(disabled)}
      >
        <Dot data-radio-dot="" $color={$color} />
      </Circle>
    </Root>
  );
};

export default React.forwardRef(RadioBox);
