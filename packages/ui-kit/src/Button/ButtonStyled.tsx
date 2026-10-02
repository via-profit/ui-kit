import React from 'react';

import ButtonBase, { ButtonBaseProps } from './ButtonBase';
import ButtonGroupContext from '../ButtonGroup/ButtonGroupContext';
import type { ButtonVariant } from './buttonVariants';

export type { ButtonVariant };

export type ButtonStyledProps = ButtonBaseProps & {
  readonly variant?: ButtonVariant;
};

/**
 * Resolves the variant and the color inside the ButtonGroup. The styles of the variant are in the Container part.
 * All the variants are one component: switching the variant (e.g. a toggle button)
 * must not remount the element, otherwise the focused button loses the focus
 */
const ButtonStyled: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonStyledProps> = (
  props,
  ref,
) => {
  const group = React.useContext(ButtonGroupContext);
  const { children, onClick, ...buttonProps } = props;
  const buttonValue =
    typeof buttonProps.value !== 'undefined' ? String(buttonProps.value) : undefined;
  const isSelectable = Boolean(group?.selectable && typeof buttonValue !== 'undefined');
  const isSelected = isSelectable && Boolean(group?.isSelected(String(buttonValue)));

  // Inside the ButtonGroup the own props of the button win over the props of the group
  const {
    disabled = group?.disabled,
    color = isSelected ? group?.selectedColor : group?.color,
    variant = group ? (isSelected ? 'standard' : group.variant) : 'standard',
    ...restProps
  } = buttonProps;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = event => {
    onClick?.(event);

    if (isSelectable && !event.defaultPrevented && group) {
      group.toggle(String(buttonValue));
    }
  };

  return (
    <ButtonBase
      variant={variant}
      color={color}
      groupOrientation={group?.orientation}
      data-group-variant={group ? variant : undefined}
      disabled={disabled}
      aria-pressed={isSelectable ? isSelected : undefined}
      {...restProps}
      onClick={handleClick}
      ref={ref}
    >
      {children}
    </ButtonBase>
  );
};

export default React.forwardRef(ButtonStyled);
