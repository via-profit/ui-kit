import React from 'react';
import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';

import Color from '../Color';
import useSliderColor from './useSliderColor';
import type { SliderOrientation } from './SliderContainer';

export type SliderTrackProps = React.HTMLAttributes<HTMLSpanElement> & {
  readonly color?: 'default' | 'primary' | 'secondary' | string;
  readonly orientation: SliderOrientation;
  readonly disabled: boolean;

  /**
   * Where the filled part begins, from 0 to 100 percent of the rail
   */
  readonly start: number;

  /**
   * Where the filled part ends, from 0 to 100 percent of the rail
   */
  readonly end: number;
};

type StyledProps = {
  readonly $color: Color;
  readonly $orientation: SliderOrientation;
};

const Track = styled.span<StyledProps>`
  position: absolute;
  display: block;
  border-radius: 1em;
  background-color: ${({ $color }) => $color.toString()};
  ${({ $orientation }) =>
    $orientation === 'vertical'
      ? css`
          left: 50%;
          width: 0.25em;
          margin-left: -0.125em;
        `
      : css`
          top: 50%;
          height: 0.25em;
          margin-top: -0.125em;
        `}
`;

const SliderTrack: React.ForwardRefRenderFunction<HTMLSpanElement, SliderTrackProps> = (
  props,
  ref,
) => {
  const { children, color, orientation, disabled, start, end, style, ...nativeProps } = props;
  const theme = useTheme();
  const $color = useSliderColor(color);

  // The position changes on every pointer move: an inline style, not a new emotion class per value
  const position: React.CSSProperties =
    orientation === 'vertical'
      ? { bottom: `${start}%`, height: `${end - start}%` }
      : { left: `${start}%`, width: `${end - start}%` };

  return (
    <Track
      {...nativeProps}
      style={{ ...position, ...style }}
      $color={disabled ? theme.color.textPrimary.mix(theme.color.surface, 0.55) : $color}
      $orientation={orientation}
      ref={ref}
    >
      {children}
    </Track>
  );
};

export default React.forwardRef(SliderTrack);
