import { css, Theme } from '@emotion/react';

import Color from '../Color';
import type { ButtonGroupOrientation } from '../ButtonGroup/ButtonGroupContext';
import { CONTROL_BORDER } from '../ThemeProvider/tokens';

export type ButtonVariant = 'standard' | 'outlined' | 'plain';

type ButtonColor = 'default' | 'primary' | 'secondary' | string | undefined;

type StyledProps = {
  readonly $variant: ButtonVariant;
  readonly $color: Color;
  readonly $background: Color;
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
const getStandardColors = (color: ButtonColor, theme: Theme) => {
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
const getAccentColor = (color: ButtonColor, theme: Theme) => {
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
  border-width: ${CONTROL_BORDER};

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
    border-width: ${CONTROL_BORDER};
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
 * The styles of the variant. They are applied inside the Container part,
 * so the theme styles and the `styled(ButtonContainer)` of the user go after them and win
 */
export const buttonVariantStyles = (params: {
  readonly variant: ButtonVariant;
  readonly color: ButtonColor;
  readonly disabled?: boolean;
  readonly group?: ButtonGroupOrientation;
  readonly theme: Theme;
}) => {
  const { variant, color, disabled, group, theme } = params;
  const colors =
    variant === 'standard'
      ? getStandardColors(color, theme)
      : { $color: getAccentColor(color, theme), $background: getAccentColor(color, theme) };
  const props = { ...colors, $variant: variant, $group: group, disabled, theme };

  return css`
    ${variant === 'outlined'
      ? outlinedStyles(props)
      : variant === 'plain'
        ? plainStyles(props)
        : standardStyles(props)}
    ${groupStyles(props)}
  `;
};
