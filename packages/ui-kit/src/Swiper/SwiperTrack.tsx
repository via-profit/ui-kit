import * as React from 'react';
import styled from '@emotion/styled';

type TrackStyleProps = {
  readonly $index: number;
  readonly $offset: number;
  readonly $dragging: boolean;
  readonly $disableAnimation?: boolean;
};

export type SwiperTrackProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly children: React.ReactNode;
  readonly index: number;
  readonly offset: number;
  readonly dragging: boolean;
  readonly disableAnimation?: boolean;
};

const StyledTrack = styled.div<TrackStyleProps>`
  display: flex;
  height: 100%;
  transition: ${({ $dragging, $disableAnimation }) =>
    $dragging || $disableAnimation ? 'none' : 'transform 0.3s ease'};
  will-change: transform;
  transform: ${({ $index, $offset }) => `translateX(calc(${-($index * 100)}% + ${$offset}px))`};
`;

export const SwiperTrack = React.forwardRef(
  (props: SwiperTrackProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { children, index, offset, dragging, disableAnimation, ...restProps } = props;

    return (
      <StyledTrack
        $dragging={dragging}
        $index={index}
        $offset={offset}
        $disableAnimation={disableAnimation}
        {...restProps}
        ref={ref}
      >
        {children}
      </StyledTrack>
    );
  },
);

SwiperTrack.displayName = 'SwiperTrack';

export default SwiperTrack;
