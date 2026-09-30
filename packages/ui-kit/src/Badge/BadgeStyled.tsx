import React from 'react';
import styled from '@emotion/styled';
import { useTheme, css, Theme } from '@emotion/react';

import Color from '../Color';
import BadgeBase, { BadgeBaseProps } from './BadgeBase';

export type BadgeStyledProps = BadgeBaseProps;

type Variant = NonNullable<BadgeBaseProps['variant']>;

type StyledProps = {
  readonly $variant: Variant;
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

const getStandardColors = (color: BadgeBaseProps['color'], theme: Theme) => {
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

const getOutlinedColors = (color: BadgeBaseProps['color'], theme: Theme) => {
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
 * Both variants are one styled component: switching the variant (e.g. a toggling filter badge)
 * must not remount the element, otherwise the focused badge loses the focus
 */
const StyledBadge = styled(BadgeBase)<StyledProps>`
  border-style: solid;
  border-width: 0.14em;
  border-color: ${({ $background }) => $background.toString()};

  ${({ $variant, $color, $background, theme }) =>
    $variant === 'outlined'
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

  ${({ $clickable, $variant, $background }) =>
    $clickable &&
    css`
      cursor: pointer;

      &:hover {
        ${$variant === 'outlined'
          ? css`
              background-color: ${$background.darken(20).alpha(0.1).toString()};
            `
          : css`
              background-color: ${$background.darken(30).toString()};
              border-color: ${$background.darken(30).toString()};
            `}
      }
    `}
`;

const BadgeStyled: React.ForwardRefRenderFunction<HTMLSpanElement, BadgeStyledProps> = (
  props,
  ref,
) => {
  const { children, color, variant = 'standard', onClick, ...restProps } = props;
  const theme = useTheme();
  const { $background, $color } = React.useMemo(
    () =>
      variant === 'outlined' ? getOutlinedColors(color, theme) : getStandardColors(color, theme),
    [color, variant, theme],
  );

  return (
    <StyledBadge
      $variant={variant}
      $clickable={typeof onClick === 'function'}
      $color={$color}
      $background={$background}
      color={color}
      variant={variant}
      onClick={onClick}
      {...restProps}
      ref={ref}
    >
      {children}
    </StyledBadge>
  );
};

export default React.forwardRef(BadgeStyled);
