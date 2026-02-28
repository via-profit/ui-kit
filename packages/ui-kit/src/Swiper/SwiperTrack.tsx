import * as React from 'react';
import styled from '@emotion/styled';

type TrackStyleProps = {
  readonly $index: number;
  readonly $offset: number;
  readonly $dragging: boolean;
};

export type SwiperTrackProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly children: React.ReactNode;
  readonly index: number;
  readonly offset: number;
  readonly dragging: boolean;
};

const StyledTrack = styled.div<TrackStyleProps>`
  display: flex;
  height: 100%;
  transition: ${p => (p.$dragging ? 'none' : 'transform 0.3s ease')};
  will-change: transform;
  transform: ${({ $index, $offset }) => {
    const trackX = `translateX(calc(${-($index * 100)}% + ${$offset}px))`;

    return trackX;
  }};
`;

export const SwiperTrack = React.forwardRef(
  (props: SwiperTrackProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { children, index, offset, dragging, ...restProps } = props;

    return (
      <StyledTrack $dragging={dragging} $index={index} $offset={offset} {...restProps} ref={ref}>
        {children}
      </StyledTrack>
    );
  },
);

SwiperTrack.displayName = 'SwiperTrack';

export default SwiperTrack;
