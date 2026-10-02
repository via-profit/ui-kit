import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { themeFocusRing } from '../ThemeProvider/tokens';
import { buttonVariantStyles, ButtonVariant } from './buttonVariants';
import type { ButtonGroupOrientation } from '../ButtonGroup/ButtonGroupContext';

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

  /**
   * The variant of the `<Button>`. Without it the button has no variant styles (the bare `ButtonBase`)
   */
  readonly variant?: ButtonVariant;

  /**
   * The orientation of the ButtonGroup the button is in
   */
  readonly groupOrientation?: ButtonGroupOrientation;
};

type StyledProps = {
  readonly color?: ButtonContainerProps['color'];
  readonly iconOnly?: ButtonContainerProps['iconOnly'];
  readonly $variant?: ButtonVariant;
  readonly $group?: ButtonGroupOrientation;
};

const StyledButton = styled.button<StyledProps>`
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  padding: 0.8em 1em;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  font-size: 1em;
  /* Buttons do not inherit the font by default */
  font-family: inherit;
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
  ${({ $variant, $group, color, disabled, theme }) =>
    $variant && buttonVariantStyles({ variant: $variant, color, disabled, group: $group, theme })}
  ${({ theme }) => themeFocusRing(theme)}
`;

const ButtonContainer: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonContainerProps> = (
  props,
  ref,
) => {
  const { children, iconOnly, variant, groupOrientation, ...nativeProps } = props;

  return (
    <StyledButton
      iconOnly={iconOnly}
      $variant={variant}
      $group={groupOrientation}
      {...nativeProps}
      ref={ref}
    >
      {children}
    </StyledButton>
  );
};

export default React.forwardRef(ButtonContainer);
