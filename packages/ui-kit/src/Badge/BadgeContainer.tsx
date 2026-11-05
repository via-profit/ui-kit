import React from 'react';
import styled from '@emotion/styled';
import { useTheme, css, Theme } from '@emotion/react';

import Color from '../Color';
import { themeFocusRing, BORDER_WIDTH } from '../ThemeProvider/tokens';

export type BadgeContainerProps = React.HTMLAttributes<HTMLSpanElement> & {
  /**
   * You can pass the primary, default, secondary name of the colors or your specified color value
   */
  readonly color?: 'default' | 'primary' | 'secondary' | string;

  /**
   * Without a variant the container has only the base styles (the bare `BadgeBase`)
   */
  readonly variant?: 'standard' | 'outlined' | 'soft';
};

type StyledProps = {
  readonly $variant?: BadgeContainerProps['variant'];
  readonly $color: Color;
  readonly $background: Color;
  readonly $clickable: boolean;
};

const parseColor = (color: string, fallback: Color) => {
  try {
    return Color.fromString(color);
  } catch (err) {
    console.error(`invalid color value «${color}»`);

    return fallback;
  }
};

const getStandardColors = (color: BadgeContainerProps['color'], theme: Theme) => {
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
      return { $background: theme.color.surface.darken(10), $color: theme.color.textPrimary };
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

const getOutlinedColors = (color: BadgeContainerProps['color'], theme: Theme) => {
  switch (true) {
    case color === 'primary':
      return { $color: theme.color.accentPrimary, $background: theme.color.accentPrimary };
    case color === 'secondary':
      return { $color: theme.color.accentSecondary, $background: theme.color.accentSecondary };
    case typeof color === 'undefined':
    case color === 'default':
      return {
        $color: Color.fromString(theme.color.textPrimary.toString()),
        $background: theme.color.textPrimary.lighten(100),
      };
    default: {
      const c = parseColor(String(color), theme.color.textPrimary);

      return { $color: c, $background: c };
    }
  }
};

/**
 * The pale background of the color and the text of the same hue: dark on the light theme,
 * light on the dark one. `$background` is the color itself
 */
const getSoftColors = (color: BadgeContainerProps['color'], theme: Theme) => {
  const base =
    color === 'primary'
      ? theme.color.accentPrimary
      : color === 'secondary'
        ? theme.color.accentSecondary
        : typeof color === 'undefined' || color === 'default'
          ? theme.color.textPrimary
          : parseColor(String(color), theme.color.textPrimary);

  return {
    $background: base,
    $color: theme.isDark ? base.lighten(60) : base.darken(60),
  };
};

const StyledBadge = styled.span<StyledProps>`
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  font-size: 1em;
  border-width: 0;
  outline-style: solid;
  outline-color: transparent;
  outline-width: 0.14em;
  transition: all 180ms ease-out 0s;
  background: none;
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.color.textPrimary.toString()};

  /* One styled element for all variants: switching them must not lose focus */
  ${({ $variant, $color, $background, $clickable, theme }) =>
    $variant &&
    css`
      border-style: solid;
      border-width: ${BORDER_WIDTH};
      border-color: ${$background.toString()};
      --badge-dot-color: ${($variant === 'standard' ? $color : $background).toString()};

      ${$variant === 'soft' &&
      css`
        color: ${$color.toString()};
        background-color: ${$background.alpha(0.18).toString()};
        border-color: transparent;

        &:focus-visible {
          outline-style: solid;
          outline-width: 0.14em;
          outline-color: ${$background.alpha(0.6).toString()};
        }
      `}

      ${$variant === 'soft'
        ? ''
        : $variant === 'outlined'
          ? css`
              color: ${$color.darken(30).toString()};
              background-color: transparent;

              &:focus-visible {
                outline-style: solid;
                outline-width: 0.14em;
                outline-color: ${$background.rgbString()};
              }
            `
          : css`
              color: ${$color.toString()};
              background-color: ${$background.toString()};

              &:focus-visible {
                outline-color: ${$background.rgbString() === theme.color.accentPrimary.rgbString()
                  ? theme.color.textPrimary.toString()
                  : theme.color.accentPrimary.toString()};
              }
            `}

      ${$clickable &&
      css`
        cursor: pointer;

        &:hover {
          ${$variant === 'soft'
            ? css`
                background-color: ${$background.alpha(0.3).toString()};
              `
            : $variant === 'outlined'
              ? css`
                  background-color: ${$background.darken(20).alpha(0.1).toString()};
                `
              : css`
                  background-color: ${$background.darken(30).toString()};
                  border-color: ${$background.darken(30).toString()};
                `}
        }
      `}
      ${themeFocusRing(theme)}
    `}
`;

const BadgeContainer: React.ForwardRefRenderFunction<HTMLSpanElement, BadgeContainerProps> = (
  props,
  ref,
) => {
  const { children, color, variant, onClick, ...nativeProps } = props;
  const theme = useTheme();
  const { $background, $color } = React.useMemo(
    () =>
      !variant
        ? { $background: theme.color.surface, $color: theme.color.textPrimary }
        : variant === 'soft'
          ? getSoftColors(color, theme)
          : variant === 'outlined'
            ? getOutlinedColors(color, theme)
            : getStandardColors(color, theme),
    [color, variant, theme],
  );

  return (
    <StyledBadge
      {...nativeProps}
      $variant={variant}
      $clickable={typeof onClick === 'function'}
      $color={$color}
      $background={$background}
      onClick={onClick}
      ref={ref}
    >
      {children}
    </StyledBadge>
  );
};

export default React.forwardRef(BadgeContainer);
