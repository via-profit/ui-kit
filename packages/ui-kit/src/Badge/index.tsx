import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import Color from '../Color';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  readonly color?: 'default' | 'primary' | 'secondary' | string;
}

const Badge: React.ForwardRefRenderFunction<HTMLSpanElement, BadgeProps> = (props, ref) => {
  const { color, children } = props;
  const theme = useTheme();

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
          $background: theme.color.surface,
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
            $background.contrast(theme.color.textPrimary.rgbString()) > 5
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
    <span {...props} ref={ref}>
      {children}
    </span>
  );
};

export default React.forwardRef(Badge);
