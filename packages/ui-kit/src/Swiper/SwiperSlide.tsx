import styled from '@emotion/styled';
import * as React from 'react';

const StyledSlide = styled.div`
  flex: 0 0 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

export type SwiperSlideProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly children: React.ReactNode;
  readonly isVisible?: boolean;
};

export const SwiperSlide = React.forwardRef(
  (props: SwiperSlideProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { children, isVisible, ...restProps } = props;

    return (
      <StyledSlide {...restProps} ref={ref}>
        {isVisible ? children : null}
      </StyledSlide>
    );
  },
);

SwiperSlide.displayName = 'SwiperSlide';

export default SwiperSlide;
