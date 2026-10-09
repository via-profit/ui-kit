import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { themeFocusRing } from '../ThemeProvider/tokens';

export type SwiperWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly draggable: boolean;
  readonly slidesPerView: number;
  readonly vertical?: boolean;
};

export const StyledWrapper = styled.div<{ $draggable: boolean; $vertical: boolean }>`
  width: 100%;
  height: 100%;
  overflow: hidden;
  user-select: none;

  /* The page still scrolls across the swiper on the touch screens */
  ${({ $draggable, $vertical }) =>
    $draggable &&
    css`
      touch-action: ${$vertical ? 'pan-x' : 'pan-y'};
    `};

  /* Inside: the container clips the outer outline */
  &:focus-visible {
    outline: 0.14em solid ${({ theme }) => theme.color.accentPrimary.toString()};
    outline-offset: -0.14em;
  }
  ${({ theme }) => themeFocusRing(theme)}
`;

const SwiperWrapper = React.forwardRef(
  (props: SwiperWrapperProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    // slidesPerView is for the overrides only, it is not a DOM attribute
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { children, draggable, slidesPerView, vertical = false, ...restProps } = props;

    return (
      <StyledWrapper {...restProps} ref={ref} $draggable={draggable} $vertical={vertical}>
        {children}
      </StyledWrapper>
    );
  },
);

SwiperWrapper.displayName = 'SwiperWrapper';

export default SwiperWrapper;
