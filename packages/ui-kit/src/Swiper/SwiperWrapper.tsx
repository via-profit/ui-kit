import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type SwiperWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly draggable: boolean;
  readonly slidesPerView: number;
};

export const StyledWrapper = styled.div<{ $draggable: boolean }>`
  width: 100%;
  height: 100%;
  overflow: hidden;
  user-select: none;

  ${({ $draggable }) =>
    $draggable &&
    css`
      touch-action: pan-y;
    `};
`;

const SwiperWrapper = React.forwardRef(
  (props: SwiperWrapperProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { children, draggable, ...restProps } = props;

    return (
      <StyledWrapper {...restProps} ref={ref} $draggable={draggable}>
        {children}
      </StyledWrapper>
    );
  },
);

SwiperWrapper.displayName = 'SwiperWrapper';

export default SwiperWrapper;
