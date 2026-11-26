import React from 'react';
import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';

import Color from '../Color';
import useSliderColor from './useSliderColor';
import type { SliderOrientation } from './SliderContainer';

export type SliderRailProps = React.HTMLAttributes<HTMLSpanElement> & {
  readonly color?: 'default' | 'primary' | 'secondary' | string;
  readonly orientation: SliderOrientation;
  readonly disabled: boolean;
};

const Rail = styled.span<{ $color: Color; $orientation: SliderOrientation }>`
  position: absolute;
  display: block;
  ${({ $orientation }) =>
    $orientation === 'vertical'
      ? css`
          top: 0;
          bottom: 0;
          left: 50%;
          width: 0.25em;
          margin-left: -0.125em;
        `
      : css`
          left: 0;
          right: 0;
          top: 50%;
          height: 0.25em;
          margin-top: -0.125em;
        `}
  border-radius: 1em;
  background-color: ${({ $color }) => $color.toString()};
  opacity: 0.3;
`;

const SliderRail: React.ForwardRefRenderFunction<HTMLSpanElement, SliderRailProps> = (
  props,
  ref,
) => {
  const { children, color, orientation, disabled, ...nativeProps } = props;
  const theme = useTheme();
  const $color = useSliderColor(color);

  return (
    <Rail
      {...nativeProps}
      $color={disabled ? theme.color.textPrimary.alpha(0.5) : $color}
      $orientation={orientation}
      ref={ref}
    >
      {children}
    </Rail>
  );
};

export default React.forwardRef(SliderRail);
