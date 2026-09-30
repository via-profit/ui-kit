import * as React from 'react';
import styled from '@emotion/styled';

type TrackStyleProps = {
  readonly $index: number;
  readonly $offset: number;
  readonly $dragging: boolean;
  readonly $disableAnimation?: boolean;
  readonly $momentum?: boolean;
  readonly $slidesPerView: number;
};

export type SwiperTrackProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly children: React.ReactNode;
  readonly index: number;
  readonly offset: number;
  readonly dragging: boolean;
  readonly disableAnimation?: boolean;

  /**
   * The long decelerating transition after a free swipe (snap=false)
   */
  readonly momentum?: boolean;
  readonly slidesPerView: number;
};

const StyledTrack = styled.div<TrackStyleProps>`
  display: flex;
  height: 100%;
  transition: ${({ $dragging, $disableAnimation, $momentum }) => {
    if ($dragging || $disableAnimation) {
      return 'none';
    }

    return $momentum ? 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' : 'transform 0.3s ease';
  }};
  will-change: transform;
  transform: ${({ $index, $offset, $slidesPerView }) =>
    `translateX(calc(${-(($index * 100) / $slidesPerView)}% + ${$offset}px))`};
`;

export const SwiperTrack = React.forwardRef(
  (props: SwiperTrackProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const {
      children,
      index,
      offset,
      dragging,
      disableAnimation,
      momentum,
      slidesPerView,
      ...restProps
    } = props;

    return (
      <StyledTrack
        $dragging={dragging}
        $index={index}
        $offset={offset}
        $disableAnimation={disableAnimation}
        $momentum={momentum}
        $slidesPerView={slidesPerView}
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
