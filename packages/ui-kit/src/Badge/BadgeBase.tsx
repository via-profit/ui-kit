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
   * Badge style variant\
   * Allowed variants: `standard` or `outlined`\
   * \
   * **Default**: `standard`
   */
  readonly variant?: 'standard' | 'outlined';

  /**
   * You can pass the primary, default, secondary name of the colors or your specified color value
   */
  readonly color?: BadgeContainerProps['color'];

  /**
   * If passed, the delete button is shown. Its click does not reach `onClick` of the badge
   */
  readonly onDelete?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Accessible label of the delete button (it contains only an icon)\
   * \
   * **Default**: `'Delete'`
   */
  readonly deleteButtonLabel?: string;

  /**
   * Overridable components map
   */
  readonly overrides?: BadgeBaseOverrides;
}

export interface BadgeBaseOverrides {
  /**
   * Element container
   */
  readonly Container?: React.ComponentType<
    BadgeContainerProps & React.RefAttributes<HTMLSpanElement>
  >;
  /**
   * icon wrapper
   */
  readonly IconWrapper?: React.ComponentType<
    BadgeIconWrapperProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * text wrapper
   */
  readonly TextWrapper?: React.ComponentType<
    BadgeTextWrapperProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * Icon delete
   */
  readonly ButtonDelete?: React.ComponentType<
    BadgeDeleteButtonProps & React.RefAttributes<HTMLButtonElement>
  >;
}

const BadgeBase: React.ForwardRefRenderFunction<HTMLSpanElement, BadgeBaseProps> = (props, ref) => {
  const {
    children,
    startIcon,
    color,
    variant,
    overrides,
    onDelete,
    deleteButtonLabel = 'Delete',
    onClick,
    onKeyDown,
    ...nativeProps
  } = props;
  const clickable = typeof onClick === 'function';
  const overridesMap = React.useMemo(
    () => ({
      TextWrapper: overrides?.TextWrapper || TextWrapper,
      IconWrapper: overrides?.IconWrapper || IconWrapper,
      Container: overrides?.Container || Container,
      ButtonDelete: overrides?.ButtonDelete || ButtonDelete,
    }),
    [overrides],
  );

  // A clickable badge acts as a button, so it is activated by Enter and Space too
  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLSpanElement>) => {
      onKeyDown?.(event);

      // The keys of the focused delete button must not activate the badge
      if (
        clickable &&
        !event.defaultPrevented &&
        event.target === event.currentTarget &&
        (event.key === 'Enter' || event.key === ' ')
      ) {
        event.preventDefault();
        event.currentTarget.click();
      }
    },
    [clickable, onKeyDown],
  );

  const handleDelete = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      // Deleting is not a click on the badge
      event.stopPropagation();
      onDelete?.(event);
    },
    [onDelete],
  );

  return (
    <overridesMap.Container
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      {...nativeProps}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      color={color}
      ref={ref}
    >
      {typeof startIcon !== 'undefined' && startIcon !== null && (
        <overridesMap.IconWrapper>{startIcon}</overridesMap.IconWrapper>
      )}

      <overridesMap.TextWrapper>{children}</overridesMap.TextWrapper>

      {typeof onDelete === 'function' && (
        <overridesMap.ButtonDelete
          variant={variant}
          onClick={handleDelete}
          color={color}
          aria-label={deleteButtonLabel}
        />
      )}
    </overridesMap.Container>
  );
};

export default React.forwardRef(BadgeBase);
