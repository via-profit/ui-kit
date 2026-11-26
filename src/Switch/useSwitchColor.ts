import React from 'react';
import { useTheme } from '@emotion/react';

import Color from '../Color';
import type { SwitchProps } from './index';

/**
 * Resolves the `color` property of the Switch to the Color instance
 */
const useSwitchColor = (color: SwitchProps['color']): Color => {
  const theme = useTheme();

  return React.useMemo(() => {
    switch (true) {
      case color === 'secondary':
        return theme.color.accentSecondary;
      case typeof color === 'undefined':
      case color === 'default':
      case color === 'primary':
        return theme.color.accentPrimary;
      default:
        try {
          return Color.fromString(String(color));
        } catch (err) {
          console.error(`invalid color value «${color}»`);

          return theme.color.accentPrimary;
        }
    }
  }, [color, theme.color]);
};

export default useSwitchColor;
