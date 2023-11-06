import React from 'react';

import IconWrapper, { BadgeIconWrapperProps } from './BadgeIconWrapper';
import TextWrapper, { BadgeTextWrapperProps } from './BadgeTextWrapper';
import Container, { BadgeContainerProps } from './BadgeContainer';
import ButtonDelete, { BadgeDeleteButtonProps } from './BadgeDeleteButton';

type BadgeNativeProps = React.HTMLAttributes<HTMLSpanElement>;

export interface BadgeBaseProps extends Omit<BadgeNativeProps, 'color'> {
  /**
   * Icon or another JSX element placed before Badge label\
   * Example:
   * ```tsx
   * <Badge startIcon={<MyIconElement />}>
   *   Label
   * </Badge>
   * ```
   */
  readonly startIcon?: JSX.Element;

  /**
   * You can pass the primary, default, secondary name of the colors or your specified color value
   */
  readonly color?: BadgeContainerProps['color'];

  readonly onDelete?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Overridable components map
   */
  readonly overrides?: BadgeBaseOverrides;
}

export interface BadgeBaseOverrides {
  /**
   * Element container
   */
  readonly Container?: React.ForwardRefExoticComponent<
    BadgeContainerProps & React.RefAttributes<HTMLSpanElement>
  >;
  /**
   * icon wrapper
   */
  readonly IconWrapper?: React.ForwardRefExoticComponent<
    BadgeIconWrapperProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * text wrapper
   */
  readonly TextWrapper?: React.ForwardRefExoticComponent<
    BadgeTextWrapperProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * Icon delete
   */
  readonly ButtonDelete?: React.ForwardRefExoticComponent<
    BadgeDeleteButtonProps & React.RefAttributes<HTMLButtonElement>
  >;
}

const BadgeBase: React.ForwardRefRenderFunction<HTMLSpanElement, BadgeBaseProps> = (props, ref) => {
  const { children, startIcon, color, onDelete, overrides, ...nativeProps } = props;
  const overridesMap = React.useMemo(
    () => ({
      TextWrapper,
      IconWrapper,
      Container,
      ButtonDelete,
      ...overrides,
    }),
    [overrides],
  );

  return (
    <overridesMap.Container {...nativeProps} color={color} ref={ref}>
      {typeof startIcon !== 'undefined' && startIcon !== null && (
        <overridesMap.IconWrapper position="start">{startIcon}</overridesMap.IconWrapper>
      )}

      <overridesMap.TextWrapper>{children}</overridesMap.TextWrapper>

      {typeof onDelete === 'function' && <overridesMap.ButtonDelete onClick={onDelete} />}
    </overridesMap.Container>
  );
};

export default React.forwardRef(BadgeBase);
