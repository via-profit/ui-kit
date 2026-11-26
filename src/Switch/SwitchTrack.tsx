import React from 'react';
import styled from '@emotion/styled';

import { SwitchProps } from './index';
import Color from '../Color';
import useSwitchColor from './useSwitchColor';

export type SwitchTrackProps = React.HTMLAttributes<HTMLSpanElement> & {
  /**
   * This prop allows you to provide switch state and control it. This property overrides internal component state
   */
  readonly checked: boolean;

  readonly color?: SwitchProps['color'];
};

type StyleProps = {
  readonly $color?: Color;
  readonly $checked: boolean;
};

const Track = styled.span<StyleProps>`
  height: 100%;
  width: 100%;
  border-radius: 7px;
  transition:
    opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: ${({ $color, $checked, theme }) => {
    switch (true) {
      case $checked:
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
  const $color = useSwitchColor(color);

  return (
    <Track {...nativeProps} ref={ref} $color={$color} $checked={checked}>
      {children}
    </Track>
  );
};

export default React.forwardRef(SwitchTrack);
