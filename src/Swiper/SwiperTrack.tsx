import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

type TrackStyleProps = {
  readonly $index: number;
  readonly $offset: number;
  readonly $dragging: boolean;
  readonly $disableAnimation?: boolean;
  readonly $momentum?: boolean;
  readonly $slidesPerView: number;
  readonly $vertical: boolean;
  readonly $fade: boolean;
  readonly $speed: number;
};

export type SwiperTrackProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly children: React.ReactNode;

  /**
   * The position of the track in slides. It is fractional with a fractional `slidesPerView`
   * and with the centered slides
   */
  readonly index: number;
  readonly offset: number;
  readonly dragging: boolean;
  readonly disableAnimation?: boolean;

  /**
   * The long decelerating transition after a free swipe (snap=false)
   */
  readonly momentum?: boolean;
  readonly slidesPerView: number;
  readonly vertical?: boolean;
  readonly effect?: 'slide' | 'fade';

  /**
   * The duration of the slide change in milliseconds
   */
  readonly speed?: number;
};

const StyledTrack = styled.div<TrackStyleProps>`
  display: flex;
  flex-direction: ${({ $vertical }) => ($vertical ? 'column' : 'row')};
  height: 100%;
  transition: ${({ $dragging, $disableAnimation, $momentum, $speed }) => {
    if ($dragging || $disableAnimation) {
      return 'none';
    }

    return $momentum
      ? 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
      : `transform ${$speed}ms ease`;
  }};
  will-change: transform;
  transform: ${({ $index, $offset, $slidesPerView, $vertical }) =>
    `${$vertical ? 'translateY' : 'translateX'}(calc(${-(($index * 100) / $slidesPerView)}% + ${$offset}px))`};

  ${({ $fade, $speed }) =>
    $fade &&
    css`
      /* The slides lie on top of each other, the current one is opaque */
      display: grid;
      transform: none;
      will-change: auto;

      & > * {
        grid-area: 1 / 1;
        opacity: 0;
        transition: opacity ${$speed}ms ease;
      }

      & > [data-active='true'] {
        opacity: 1;
        z-index: 1;
      }
    `}
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
      vertical = false,
      effect = 'slide',
      speed = 300,
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
        $vertical={vertical}
        $fade={effect === 'fade'}
        $speed={speed}
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
