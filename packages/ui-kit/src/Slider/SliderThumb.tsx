import React from 'react';
import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';

import Color from '../Color';
import useSliderColor from './useSliderColor';
import type { SliderOrientation } from './SliderContainer';
import { themeFocusRing } from '../ThemeProvider/tokens';

export type SliderThumbProps = React.HTMLAttributes<HTMLSpanElement> & {
  readonly color?: 'default' | 'primary' | 'secondary' | string;
  readonly orientation: SliderOrientation;
  readonly disabled: boolean;

  /**
   * The position of the thumb, from 0 to 100 percent of the rail
   */
  readonly position: number;

  /**
   * True while the thumb is dragged
   */
  readonly active: boolean;

  /**
   * The index of the thumb: 0 for a single slider, 0 or 1 for a range
   */
  readonly index: number;
};

type StyledProps = {
  readonly $color: Color;
  readonly $orientation: SliderOrientation;
  readonly $active: boolean;
  readonly $disabled: boolean;
};

const Thumb = styled.span<StyledProps>`
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 1.15em;
  height: 1.15em;
  border-radius: 50%;
  background-color: ${({ $color }) => $color.toString()};
  outline: 0;
  transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
  ${({ $orientation }) =>
    $orientation === 'vertical'
      ? css`
          left: 50%;
          transform: translate(-50%, 50%);
        `
      : css`
          top: 50%;
          transform: translate(-50%, -50%);
        `}
  ${({ $color, $active, $disabled }) =>
    !$disabled &&
    css`
      &:hover {
        box-shadow: 0 0 0 0.45em ${$color.alpha(0.16).toString()};
      }
      &:focus-visible {
        box-shadow: 0 0 0 0.6em ${$color.alpha(0.24).toString()};
        /* The halo is invisible in the forced colors mode, the outline is shown instead */
        outline: 2px solid transparent;
      }
      ${$active &&
      css`
        &,
        &:hover,
        &:focus-visible {
          box-shadow: 0 0 0 0.7em ${$color.alpha(0.16).toString()};
        }
      `}
    `}
  ${({ theme }) => themeFocusRing(theme)}
`;

const SliderThumb: React.ForwardRefRenderFunction<HTMLSpanElement, SliderThumbProps> = (
  props,
  ref,
) => {
  const { children, color, orientation, disabled, position, active, index, style, ...nativeProps } =
    props;
  const theme = useTheme();
  const $color = useSliderColor(color);

  return (
    <Thumb
      data-slider-thumb={index}
      {...nativeProps}
      style={{ [orientation === 'vertical' ? 'bottom' : 'left']: `${position}%`, ...style }}
      // Solid, not transparent: the rail must not show through the thumb
      $color={disabled ? theme.color.textPrimary.mix(theme.color.surface, 0.55) : $color}
      $orientation={orientation}
      $active={active}
      $disabled={disabled}
      ref={ref}
    >
      {children}
    </Thumb>
  );
};

export default React.forwardRef(SliderThumb);
