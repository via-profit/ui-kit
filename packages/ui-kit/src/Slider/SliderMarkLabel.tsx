import React from 'react';
import styled from '@emotion/styled';

import type { SliderOrientation } from './SliderContainer';

export type SliderMarkLabelProps = React.HTMLAttributes<HTMLSpanElement> & {
  readonly orientation: SliderOrientation;

  /**
   * The position of the label, from 0 to 100 percent of the rail
   */
  readonly position: number;

  /**
   * True if the mark lies on the filled part of the rail
   */
  readonly inTrack: boolean;
};

const MarkLabel = styled.span<{ $inTrack: boolean }>`
  position: absolute;
  font-size: 0.8em;
  line-height: 1;
  white-space: nowrap;
  color: ${({ theme, $inTrack }) =>
    $inTrack ? theme.color.textPrimary.toString() : theme.color.textSecondary.toString()};
`;

const SliderMarkLabel: React.ForwardRefRenderFunction<HTMLSpanElement, SliderMarkLabelProps> = (
  props,
  ref,
) => {
  const { children, orientation, position, inTrack, style, ...nativeProps } = props;

  // Below the rail for the horizontal slider, to the right of it for the vertical one
  const placement: React.CSSProperties =
    orientation === 'vertical'
      ? { left: '2.4em', bottom: `${position}%`, transform: 'translateY(50%)' }
      : { top: '2.2em', left: `${position}%`, transform: 'translateX(-50%)' };

  return (
    <MarkLabel
      aria-hidden
      {...nativeProps}
      style={{ ...placement, ...style }}
      $inTrack={inTrack}
      ref={ref}
    >
      {children}
    </MarkLabel>
  );
};

export default React.forwardRef(SliderMarkLabel);
