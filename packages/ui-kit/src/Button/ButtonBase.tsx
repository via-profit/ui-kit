import React from 'react';

import IconWrapper, { ButtonIconWrapperProps } from './ButtonIconWrapper';
import TextWrapper, { ButtonTextWrapperProps } from './ButtonTextWrapper';
import Container, { ButtonContainerProps } from './ButtonContainer';

type ButtonNativeProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export interface ButtonBaseProps extends Omit<ButtonNativeProps, 'color'> {
  /**
   * Icon or another JSX element placed before button label\
   * Example:
   * ```tsx
   * <Button startIcon={<MyIconElement />}>
   *   Label
   * </Button>
   * ```
   */
  readonly startIcon?: JSX.Element;

  /**
   * Icon or another JSX element placed after button label
   * Example:
   * ```tsx
   * <Button endIcon={<MyIconElement />}>
   *   Label
   * </Button>
   * ```
   */
  readonly endIcon?: JSX.Element;

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
  readonly iconOnly?: ButtonContainerProps['iconOnly'];

  /**
   * You can pass the primary, default, secondary name of the colors or your specified color value
   */
  readonly color?: ButtonContainerProps['color'];

  /**
   * Overridable components map
   */
  readonly overrides?: ButtonBaseOverrides;
}

export interface ButtonBaseOverrides {
  /**
   * Element container
   */
  readonly Container?: React.ForwardRefExoticComponent<
    ButtonContainerProps & React.RefAttributes<HTMLButtonElement>
  >;
  /**
   * icon wrapper
   */
  readonly IconWrapper?: React.ForwardRefExoticComponent<
    ButtonIconWrapperProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * text wrapper
   */
  readonly TextWrapper?: React.ForwardRefExoticComponent<
    ButtonTextWrapperProps & React.RefAttributes<HTMLSpanElement>
  >;
}

const ButtonBase: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonBaseProps> = (
  props,
  ref,
) => {
  const { children, startIcon, endIcon, color, overrides, iconOnly, type, ...nativeProps } = props;
  const overridesMap = React.useMemo(
    () => ({
      TextWrapper: overrides?.TextWrapper || TextWrapper,
      IconWrapper: overrides?.IconWrapper || IconWrapper,
      Container: overrides?.Container || Container,
    }),
    [overrides],
  );

  if (
    iconOnly &&
    ((typeof startIcon !== 'undefined' && startIcon !== null) ||
      (typeof endIcon !== 'undefined' && endIcon !== null))
  ) {
    console.warn(
      'The «iconOnly» property should not be used simultaneously with «startIcon» and/or «endIcon»',
    );
  }

  return (
    <overridesMap.Container
      type={typeof type === 'undefined' ? 'button' : type}
      {...nativeProps}
      color={color}
      iconOnly={iconOnly}
      ref={ref}
    >
      {typeof startIcon !== 'undefined' && startIcon !== null && (
        <overridesMap.IconWrapper position="start">{startIcon}</overridesMap.IconWrapper>
      )}

      <overridesMap.TextWrapper iconOnly={iconOnly}>{children}</overridesMap.TextWrapper>
      {typeof endIcon !== 'undefined' && endIcon !== null && (
        <overridesMap.IconWrapper position="end">{endIcon}</overridesMap.IconWrapper>
      )}
    </overridesMap.Container>
  );
};

export default React.forwardRef(ButtonBase);
