import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import { SwitchProps } from './index';
import Color from '../Color';

export type SwitchTrackProps = React.HTMLAttributes<HTMLSpanElement> & {
  /**
   * This prop allows you to provide switch state and control it. This property overrides internal component state
   */
  readonly checked: boolean;

  readonly color?: SwitchProps['color'];
};

type StyleProps = {
  readonly $color?: Color;
  readonly checked: boolean;
};

const Track = styled.span<StyleProps>`
  height: 100%;
  width: 100%;
  border-radius: 7px;
  transition:
    opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: ${({ $color, checked, theme }) => {
    switch (true) {
      case checked:
        return $color ? $color.toString() : theme.color.accentPrimary.toString();
      default:
        return theme.isDark
          ? theme.color.textPrimary.darken(10).toString()
          : theme.color.surface.darken(200).toString();
    }
  }};
  opacity: 0.5;
`;

const SwitchTrack: React.ForwardRefRenderFunction<HTMLSpanElement, SwitchTrackProps> = (
  props,
  ref,
) => {
  const { color, checked, children, ...nativeProps } = props;
  const theme = useTheme();

  const { $color } = React.useMemo(() => {
    switch (true) {
      case color === 'primary':
        return {
          $color: theme.color.accentPrimary,
        };
      case color === 'secondary':
        return {
          $color: theme.color.accentSecondary,
        };
      case typeof color === 'undefined':
      case color === 'default':
        return {
          $color: theme.color.accentPrimary,
        };

      case typeof color === 'string': {
        let $color = theme.color.surface;
        try {
          if (color) {
            $color = new Color(color);
          }
        } catch (err) {
          console.error(`invalid color value «${color}»`);
        }

        return {
          $color,
        };
      }

      default:
        return {
          $color: theme.color.surface,
        };
    }
  }, [color, theme.color]);

  return (
    <Track {...nativeProps} ref={ref} $color={$color} checked={checked}>
      {children}
    </Track>
  );
};

export default React.forwardRef(SwitchTrack);
