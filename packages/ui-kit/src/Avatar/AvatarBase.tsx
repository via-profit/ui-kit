import React from 'react';

import IconWrapper, { AvatarIconWrapperProps } from './AvatarIconWrapper';
import TextWrapper, { AvatarTextWrapperProps } from './AvatarTextWrapper';
import Container, { AvatarContainerProps } from './AvatarContainer';

type AvatarNativeProps = React.HTMLAttributes<HTMLSpanElement>;

export interface AvatarBaseProps extends Omit<AvatarNativeProps, 'color'> {
  /**
   * Icon or another JSX element placed before Avatar label\
   * Example:
   * ```tsx
   * <Avatar startIcon={<MyIconElement />}>
   *   Label
   * </Avatar>
   * ```
   */
  readonly src?: JSX.Element | string;

  /**
   * Avatar style variant\
   * Allowed variants: `circular`,`rounded` or `square`\
   * \
   * **Default**: `circular`
   */
  readonly variant?: 'circular' | 'rounded' | 'square';

  /**
   * You can pass the primary, default, secondary name of the colors or your specified color value
   */
  readonly color?: AvatarContainerProps['color'];

  /**
   * Overridable components map
   */
  readonly overrides?: AvatarBaseOverrides;
}

export interface AvatarBaseOverrides {
  /**
   * Element container
   */
  readonly Container?: React.ForwardRefExoticComponent<
    AvatarContainerProps & React.RefAttributes<HTMLSpanElement>
  >;
  /**
   * icon wrapper
   */
  readonly IconWrapper?: React.ForwardRefExoticComponent<
    AvatarIconWrapperProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * text wrapper
   */
  readonly TextWrapper?: React.ForwardRefExoticComponent<
    AvatarTextWrapperProps & React.RefAttributes<HTMLSpanElement>
  >;
}

const AvatarBase: React.ForwardRefRenderFunction<HTMLSpanElement, AvatarBaseProps> = (
  props,
  ref,
) => {
  const { children, src, color, variant, overrides, ...nativeProps } = props;
  const overridesMap = React.useMemo(
    () => ({
      TextWrapper,
      IconWrapper,
      Container,
      ...overrides,
    }),
    [overrides],
  );

  return (
    <overridesMap.Container {...nativeProps} color={color} ref={ref}>
      {typeof src !== 'undefined' && src !== null && typeof src !== 'string' && (
        <overridesMap.IconWrapper>{src}</overridesMap.IconWrapper>
      )}

      {typeof src !== 'undefined' && src !== null && typeof src === 'string' && (
        <overridesMap.IconWrapper>{<img src={src} />}</overridesMap.IconWrapper>
      )}

      {(!src || src === null) && <overridesMap.TextWrapper>{children}</overridesMap.TextWrapper>}
    </overridesMap.Container>
  );
};

export default React.forwardRef(AvatarBase);
