import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type ButtonContainerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * You can pass the primary, default, secondary name of the colors or your specified color value
   */
  readonly color?: 'default' | 'primary' | 'secondary' | string;

  /**
   * If true, then expect SVG icon as children. The button will be rendered as icon button
   * Example:
   * ```tsx
   * <Button iconOnly>
   *   <MyIconSVG />
   * </Button>
   * ```
   `
   */
  readonly iconOnly?: boolean;
};

type StyledProps = {
  readonly color?: ButtonContainerProps['color'];
  readonly iconOnly?: ButtonContainerProps['iconOnly'];
};

const StyledButton = styled.button<StyledProps>`
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  padding: 0.8em 1em;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  font-size: 1em;
  border-width: 0;
  outline-style: solid;
  outline-color: transparent;
  outline-width: 0.14em;
  transition: all 180ms ease-out 0s;
  background: none;
  display: inline-flex;
  align-items: center;
  color: ${({ color, disabled, theme }) => {
    switch (true) {
      case disabled:
        return theme.color.textSecondary.alpha(0.8).toString();
      case !disabled && typeof color === 'undefined':
      default:
        return theme.color.textPrimary.toString();
    }
  }};
  ${({ iconOnly, theme }) =>
    iconOnly &&
    css`
      padding: 1em;
      justify-content: center;
      width: 2.6em;
      height: 2.6em;
      border-radius: ${theme.shape.radiusFactor * 3}em;
    `}
`;

const ButtonContainer: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonContainerProps> = (
  props,
  ref,
) => {
  const { children, iconOnly, ...nativeProps } = props;

  return (
    <StyledButton iconOnly={iconOnly} {...nativeProps} ref={ref}>
      {children}
    </StyledButton>
  );
};

export default React.forwardRef(ButtonContainer);
