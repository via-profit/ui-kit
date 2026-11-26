import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import ButtonBase from '../Button/ButtonBase';
import Color from '../Color';
import DeleteIcon from './BadgeDeleteIcon';

export type BadgeDeleteButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  readonly color?: 'primary' | 'secondary' | 'default' | string;
  readonly variant?: 'standard' | 'outlined' | 'soft';
};

type StyledProps = {
  readonly $color: Color;
  readonly $background: Color;
};

const StyledButton = styled(ButtonBase)<StyledProps>`
  display: flex;
  padding: 0.3em;
  font-size: 1em;
  align-items: center;
  justify-content: center;
  margin-left: 0.1em;
  margin-right: 0.14em;
  background-color: ${({ $background }) => $background.toString()};
  color: ${({ $color }) => $color.toString()};
  position: relative;
`;

const BadgeDeleteButton: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  BadgeDeleteButtonProps
> = (props, ref) => {
  const { children, color = 'default', variant: badgeVariant = 'standard', ...nativeProps } = props;
  // The pale soft badge has the colored icon, as the outlined one
  const variant = badgeVariant === 'soft' ? 'outlined' : badgeVariant;
  const theme = useTheme();

  const { $color, $background } = React.useMemo(() => {
    switch (true) {
      case variant === 'standard' && color === 'default':
        return {
          $color: theme.color.textPrimary,
          $background: theme.color.surface.darken(20),
        };

      case variant === 'standard' && color === 'primary':
        return {
          $color: theme.color.accentPrimaryContrast,
          $background: theme.color.accentPrimary,
        };

      case variant === 'standard' && color === 'secondary':
        return {
          $color: theme.color.accentSecondaryContrast,
          $background: theme.color.accentSecondary,
        };

      case variant === 'outlined' && color === 'default':
        return {
          $color: theme.color.textPrimary,
          $background: theme.color.surface,
        };

      case variant === 'outlined' && color === 'primary':
        return {
          $color: theme.color.accentPrimary.darken(10),
          $background: Color.fromString('rgba(0,0,0,0)'),
        };

      case variant === 'outlined' && color === 'secondary':
        return {
          $color: theme.color.accentSecondary.darken(10),
          $background: Color.fromString('rgba(0,0,0,0)'),
        };

      case variant === 'outlined' && typeof color === 'string':
        return {
          $color: Color.fromString(color),
          $background: Color.fromString(color).alpha(0),
        };

      case variant === 'standard' && typeof color === 'string':
        return {
          $color:
            Color.fromString(color).getContrast(theme.color.textPrimary) > 5
              ? theme.color.textPrimary
              : theme.color.surface,
          $background: Color.fromString(color),
        };
      default:
        return {
          $color: theme.color.textPrimary,
          $background: theme.color.textPrimary,
        };
    }
  }, [color, variant, theme.color]);

  return (
    <StyledButton {...nativeProps} $color={$color} $background={$background} ref={ref}>
      {typeof children === 'undefined' ? <DeleteIcon /> : children}
    </StyledButton>
  );
};

export default React.forwardRef(BadgeDeleteButton);
