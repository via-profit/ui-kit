import React from 'react';
import styled from '@emotion/styled';
import { useTheme, css } from '@emotion/react';

import Color from '../Color';
import AvatarBase, { AvatarBaseProps } from './AvatarBase';

export type AvatarProps = AvatarBaseProps;

type StyledProps = {
  readonly $color: Color;
  readonly $background: Color;
  readonly $clickable: boolean;
};

const StyledAvatarBase = styled(AvatarBase)<StyledProps>`
  position: relative;
  color: ${({ $color }) => $color.toString()};
  background-color: ${({ $background }) => $background.toString()};
  ${({ $background }) => {
    switch (true) {
      case $background.getLuminance() > 0.49:
        return $background.darken(40).alpha(0.8).toString();
      default:
        return $background.darken(20).alpha(0.5).toString();
    }
  }};
  &:hover {
    background-color: ${({ $background, $clickable }) =>
      $clickable && $background.darken(30).toString()};
  }
  &:focus-visible {
    outline-color: ${({ theme, $background }) =>
      $background.rgbString() === theme.color.accentPrimary.rgbString()
        ? theme.color.textPrimary.toString()
        : theme.color.accentPrimary.toString()};
  }
  ${({ $clickable }) =>
    $clickable &&
    css`
      cursor: pointer;
    `}

  ${({ variant, theme }) => {
    switch (variant) {
      case 'rounded':
        return css`
          border-radius: ${theme.shape.radiusFactor * 0.8}em;
        `;

      case 'square':
        return css`
          border-radius: inherit;
        `;

      default:
        return css`
          border-radius: 100%;
        `;
    }
  }}
`;

const Avatar: React.ForwardRefRenderFunction<HTMLSpanElement, AvatarProps> = (props, ref) => {
  const {
    children,
    color,
    onClick,
    isOnline,
    size,
    src,
    variant = 'circular',
    alt,
    overrides,
    ...restProps
  } = props;
  const theme = useTheme();
  const clickable = React.useMemo(() => typeof onClick === 'function', [onClick]);

  const { $background, $color } = React.useMemo(() => {
    switch (true) {
      case color === 'primary':
        return {
          $color: theme.color.accentPrimaryContrast,
          $background: theme.color.accentPrimary,
        };
      case color === 'secondary':
        return {
          $color: theme.color.accentSecondaryContrast,
          $background: theme.color.accentSecondary,
        };
      case typeof color === 'undefined':
      case color === 'default':
        return {
          $background: theme.color.surface.darken(10),
          $color: theme.color.textPrimary,
        };

      case typeof color === 'string': {
        let $background = theme.color.surface;
        try {
          if (color) {
            $background = new Color(color);
          }
        } catch (err) {
          console.error(`invalid color value «${color}»`);
        }

        return {
          $background,
          $color:
            $background.getContrast(theme.color.textPrimary) > 5
              ? theme.color.textPrimary
              : theme.color.surface,
        };
      }

      default:
        return {
          $background: theme.color.surface,
          $color: theme.color.textPrimary,
        };
    }
  }, [color, theme.color]);

  return (
    <StyledAvatarBase
      $clickable={clickable}
      $color={$color}
      $background={$background}
      color={color}
      onClick={onClick}
      size={size}
      src={src}
      variant={variant}
      alt={alt}
      tabIndex={clickable ? 0 : -1}
      ref={ref}
      overrides={overrides}
      isOnline={isOnline}
      {...restProps}
    >
      {children}
    </StyledAvatarBase>
  );
};

export default React.forwardRef(Avatar);
