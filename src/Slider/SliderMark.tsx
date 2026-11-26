import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import type { SliderOrientation } from './SliderContainer';

export type SliderMarkProps = React.HTMLAttributes<HTMLSpanElement> & {
  readonly orientation: SliderOrientation;

  /**
   * The position of the mark, from 0 to 100 percent of the rail
   */
  readonly position: number;

  /**
   * True if the mark lies on the filled part of the rail
   */
  readonly inTrack: boolean;
};

const Mark = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0.25em;
  height: 0.25em;
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;

const SliderMark: React.ForwardRefRenderFunction<HTMLSpanElement, SliderMarkProps> = (
  props,
  ref,
) => {
  const { children, orientation, position, inTrack, style, ...nativeProps } = props;
  const theme = useTheme();

  // On the track the mark is light, on the rail it repeats the rail color, so it stays visible on both
  const backgroundColor = inTrack
    ? theme.color.surface.alpha(0.8).toString()
    : theme.color.textPrimary.alpha(0.3).toString();

  return (
    <Mark
      aria-hidden
      {...nativeProps}
      style={{
        backgroundColor,
        ...(orientation === 'vertical'
          ? { top: 'auto', bottom: `${position}%`, transform: 'translate(-50%, 50%)' }
          : { left: `${position}%` }),
        ...style,
      }}
      ref={ref}
    >
      {children}
    </Mark>
  );
};

export default React.forwardRef(SliderMark);
