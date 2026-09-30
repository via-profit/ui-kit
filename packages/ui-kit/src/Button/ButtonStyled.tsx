import React from 'react';
import styled from '@emotion/styled';
import { useTheme, css, Theme } from '@emotion/react';

import Color from '../Color';
import ButtonBase, { ButtonBaseProps } from './ButtonBase';
import ButtonGroupContext, { ButtonGroupOrientation } from '../ButtonGroup/ButtonGroupContext';

export type ButtonVariant = 'standard' | 'outlined' | 'plain';

export type ButtonStyledProps = ButtonBaseProps & {
  readonly variant?: ButtonVariant;
};

type StyledProps = {
  readonly $variant: ButtonVariant;
  readonly $color: Color;
  readonly $background: Color;

  /**
   * The orientation of the ButtonGroup, if the button is inside it
   */
  readonly $group?: ButtonGroupOrientation;
};

const parseColor = (color: string, fallback: Color) => {
  try {
    return Color.fromString(color);
  } catch (err) {
    console.error(`invalid color value «${color}»`);

    return fallback;
  }
};

/**
 * Text and background colors of the standard variant
 */
const getStandardColors = (color: ButtonBaseProps['color'], theme: Theme) => {
  switch (true) {
    case color === 'primary':
      return { $color: theme.color.accentPrimaryContrast, $background: theme.color.accentPrimary };
    case color === 'secondary':
      return {
        $color: theme.color.accentSecondaryContrast,
        $background: theme.color.accentSecondary,
      };
    case typeof color === 'undefined':
    case color === 'default':
      return { $background: theme.color.surface, $color: theme.color.textPrimary };
    default: {
      const $background = parseColor(String(color), theme.color.surface);

      return {
        $background,
        $color:
          $background.getContrast(theme.color.textPrimary) > 5
            ? theme.color.textPrimary
            : theme.color.surface,
      };
    }
  }
};

/**
 * The main color of the outlined and plain variants (text and border)
 */
const getAccentColor = (color: ButtonBaseProps['color'], theme: Theme) => {
  switch (true) {
    case color === 'primary':
      return theme.color.accentPrimary;
    case color === 'secondary':
      return theme.color.accentSecondary;
    case typeof color === 'undefined':
    case color === 'default':
      return theme.color.textPrimary;
    default:
      return parseColor(String(color), theme.color.textPrimary);
  }
};

const focusOutlineColor = (color: Color, theme: Theme) =>
  color.rgbString() === theme.color.accentPrimary.rgbString()
    ? theme.color.textPrimary.toString()
    : theme.color.accentPrimary.toString();

const standardStyles = ({ $color, $background, disabled, theme }: StyledProps & ThemeProps) => css`
  color: ${disabled ? $color.alpha(0.4).toString() : $color.toString()};
  background-color: ${disabled
    ? $background.darken(40).toString()
    : $background.darken(10).toString()};

  ${!disabled &&
  css`
    &:hover {
      background-color: ${$background.darken(30).toString()};
    }
    &:active {
      background-color: ${$background.darken(80).toString()};
    }
    &:focus-visible {
      outline-style: solid;
      outline-width: 0.14em;
      outline-color: ${focusOutlineColor($background, theme)};
    }
  `}
`;

const outlinedStyles = ({ $color, disabled, theme }: StyledProps & ThemeProps) => css`
  color: ${disabled ? theme.color.textPrimary.alpha(0.4).toString() : $color.darken(30).toString()};
  border-color: ${disabled
    ? theme.color.surface.darken(80).alpha(0.4).toString()
    : $color.toString()};
  background-color: transparent;
  border-style: solid;
  border-width: 0.14em;

  ${!disabled &&
  css`
    &:hover {
      background-color: ${$color.darken(20).alpha(0.1).toString()};
    }
    &:active {
      background-color: ${$color.darken(50).alpha(0.3).toString()};
    }
    &:focus-visible {
      outline-color: ${focusOutlineColor($color, theme)};
    }
  `}
`;

const plainStyles = ({ $color, disabled, theme }: StyledProps & ThemeProps) => css`
  box-shadow: none;
  color: ${disabled ? $color.alpha(0.4).toString() : $color.toString()};
  background: none;

  ${!disabled &&
  css`
    &:hover {
      color: ${$color.darken(30).toString()};
      background-color: ${$color.alpha(0.1).toString()};
    }
    &:active {
      color: ${$color.darken(80).toString()};
      background-color: ${$color.alpha(0.3).toString()};
    }
    &:focus-visible {
      outline-style: solid;
      outline-width: 0.14em;
      outline-color: ${focusOutlineColor($color, theme)};
    }
  `}
`;

type ThemeProps = { readonly theme: Theme; readonly disabled?: boolean };

/**
 * Inside the ButtonGroup all the variants have the same border width, so the buttons have the same size
 * and the selected (standard) button does not shrink. Two adjacent standard buttons are separated by a thin line
 */
const groupStyles = ({ $group, $variant, $color }: StyledProps) =>
  $group &&
  css`
    border-style: solid;
    border-width: 0.14em;
    ${$variant !== 'outlined' &&
    css`
      border-color: transparent;
    `}
    ${$variant === 'standard' &&
    css`
      [data-group-variant='standard'] + & {
        ${$group === 'vertical' ? 'border-top-color' : 'border-left-color'}: ${$color
          .alpha(0.25)
          .toString()};
      }
    `}
  `;

/**
 * All the variants are one styled component: switching the variant (e.g. a toggle button)
 * must not remount the element, otherwise the focused button loses the focus
 */
const StyledButton = styled(ButtonBase)<StyledProps>`
  ${props => {
    switch (props.$variant) {
      case 'outlined':
        return outlinedStyles(props);
      case 'plain':
        return plainStyles(props);
      case 'standard':
      default:
        return standardStyles(props);
    }
  }}
  ${groupStyles}
`;

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
  const theme = useTheme();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = event => {
    onClick?.(event);

    if (isSelectable && !event.defaultPrevented && group) {
      group.toggle(String(buttonValue));
    }
  };

  const { $color, $background } = React.useMemo(() => {
    if (variant === 'standard') {
      return getStandardColors(color, theme);
    }

    const accent = getAccentColor(color, theme);

    return { $color: accent, $background: accent };
  }, [color, variant, theme]);

  return (
    <StyledButton
      $variant={variant}
      $color={$color}
      $background={$background}
      $group={group?.orientation}
      data-group-variant={group ? variant : undefined}
      disabled={disabled}
      aria-pressed={isSelectable ? isSelected : undefined}
      {...restProps}
      onClick={handleClick}
      ref={ref}
    >
      {children}
    </StyledButton>
  );
};

export default React.forwardRef(ButtonStyled);
