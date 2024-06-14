import React from 'react';

import IconWrapper, { AvatarIconWrapperProps } from './AvatarIconWrapper';
import TextWrapper, { AvatarTextWrapperProps } from './AvatarTextWrapper';
import Container, { AvatarContainerProps } from './AvatarContainer';
import Picture, { AvatarPictureProps } from './AvatarPicture';
import AvatarOnlineBadge from './AvatarOnlineBadge';

type AvatarNativeProps = React.HTMLAttributes<HTMLSpanElement>;

export interface AvatarBaseProps extends Omit<AvatarNativeProps, 'color'> {
  /**
   * image object of Avatar component
   * Example:
   * ```tsx
   * <Avatar src={[{
   *  srcSet: 'https://google.com/images/img.png',
   *  type: 'image/png',
   *  isDefault: true,
   * }]}>
   *   Label
   * </Avatar>
   * ```
   */
  readonly src?: AvatarPictureProps['src'];

  /**
   * Avatar style variant\
   * Allowed variants: `circular`,`rounded` or `square`\
   * \
   * **Default**: `circular`
   */
  readonly variant?: 'circular' | 'rounded' | 'square';

  /**
   * Avatar size variant\
   * \
   * **Default**: `2.5em`
   */
  readonly size?: string;

  /**
   * Show avatar online badge\
   * \
   * **Default**: `undefined`
   */
  readonly isOnline?: boolean;

  /**
   * You can pass the primary, default, secondary name of the colors or your specified color value
   */
  readonly color?: AvatarContainerProps['color'];

  /**
   * Overridable components map
   */
  readonly overrides?: AvatarBaseOverrides;

  /**
   * HTML image alt attribute
   */
  readonly alt?: string;
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
  /**
   * picture tag
   */
  readonly Picture?: React.ForwardRefExoticComponent<
    AvatarPictureProps & React.RefAttributes<HTMLPictureElement>
  >;
}

const AvatarBase: React.ForwardRefRenderFunction<HTMLSpanElement, AvatarBaseProps> = (
  props,
  ref,
) => {
  const { children, src, color, alt, variant, overrides, isOnline, ...nativeProps } = props;
  const overridesMap = React.useMemo(
    () => ({
      TextWrapper,
      IconWrapper,
      Container,
      Picture,
      ...overrides,
    }),
    [overrides],
  );

  return (
    <overridesMap.Container {...nativeProps} color={color} ref={ref}>
      {typeof src !== 'undefined' && src !== null && src?.length !== 0 && (
        <overridesMap.IconWrapper>
          <overridesMap.Picture src={src} variant={variant} />
        </overridesMap.IconWrapper>
      )}

      {(!src || src === null || src?.length === 0) && (
        <overridesMap.TextWrapper>{children}</overridesMap.TextWrapper>
      )}

      {isOnline && <AvatarOnlineBadge />}
    </overridesMap.Container>
  );
};

export default React.forwardRef(AvatarBase);
