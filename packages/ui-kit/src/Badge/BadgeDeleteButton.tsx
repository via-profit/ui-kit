import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import ButtonBase from '../Button/ButtonBase';
import Color from '../Color';

export type BadgeDeleteButtonProps = Omit<React.HTMLAttributes<HTMLButtonElement>, 'children'> & {
  readonly color?: 'primary' | 'secondaary' | 'default' | string;
  readonly variant?: 'standard' | 'outlined';
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
  const { color = 'default', variant = 'standard', ...nativeProps } = props;
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
          $background: new Color('rgba(0,0,0,0)'),
        };

      case variant === 'outlined' && color === 'secondary':
        return {
          $color: theme.color.accentSecondary.darken(10),
          $background: new Color('rgba(0,0,0,0)'),
        };

      case variant === 'outlined' && typeof color === 'string':
        return {
          $color: new Color(color),
          $background: new Color(color).alpha(0),
        };

      case variant === 'standard' && typeof color === 'string':
        return {
          $color:
            new Color(color).contrast(theme.color.textPrimary) > 5
              ? theme.color.textPrimary
              : theme.color.surface,
          $background: new Color(color),
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="1em"
        height="1em"
        viewBox="0 0 512 512"
      >
        <path
          d="m256 0c-141.11 0-256 114.89-256 256s114.89 256 256 256 256-114.89 256-256-114.89-256-256-256zm0 39.385c119.81 0 216.62 96.805 216.62 216.62s-96.805 216.62-216.62 216.62-216.62-96.805-216.62-216.62 96.805-216.62 216.62-216.62zm-78.769 118.15a19.692 19.692 0 0 0-5.0961 0.67068 19.692 19.692 0 0 0-8.8293 5.0961 19.692 19.692 0 0 0 0 27.851l64.844 64.844-64.844 64.844a19.692 19.692 0 0 0 0 27.851 19.692 19.692 0 0 0 27.851 0l64.844-64.844 64.844 64.844a19.692 19.692 0 0 0 27.851 0 19.692 19.692 0 0 0 0-27.851l-64.844-64.844 64.844-64.844a19.692 19.692 0 0 0 0-27.851 19.692 19.692 0 0 0-27.851 0l-64.844 64.844-64.844-64.844a19.692 19.692 0 0 0-13.925-5.7669z"
          fill="currentColor"
        />
      </svg>
    </StyledButton>
  );
};

export default React.forwardRef(BadgeDeleteButton);
