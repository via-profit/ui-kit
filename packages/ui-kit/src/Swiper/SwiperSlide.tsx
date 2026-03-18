import styled from '@emotion/styled';
import * as React from 'react';

type StyleProps = {
  $slidesPerView: number;
};

const StyledSlide = styled.div<StyleProps>`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: calc(100% / ${({ $slidesPerView }) => $slidesPerView});
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

export type SwiperSlideBaseProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly children: React.ReactNode;
};

export type SwiperSlideProps = SwiperSlideBaseProps & {
  readonly isVisible: boolean;
  readonly isNearby: boolean;
  readonly slidesPerView: number;
  readonly key: string;
};

export const SwiperSlide = React.forwardRef(
  (props: SwiperSlideBaseProps | SwiperSlideProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const {
      children,
      isVisible = true,
      slidesPerView = 1,
      isNearby = true,
      ...restProps
    } = props as SwiperSlideProps;

    return (
      <StyledSlide data-is-visible={isVisible} data-is-nearby={isNearby} {...restProps} $slidesPerView={slidesPerView} ref={ref}>
        {isVisible || isNearby ? children : null}
      </StyledSlide>
    );
  },
);

SwiperSlide.displayName = 'SwiperSlide';

export default SwiperSlide;
