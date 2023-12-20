import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Button from '../Button';
import IconPrev from './IconChevronLeft';
import IconNext from './IconChevronRight';

export interface CalendarMonthControlProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly displayIcon: 'prev' | 'next';
}

const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.color.accentSecondaryContrast.toString()};
  &:hover {
    color: ${({ theme }) => theme.color.accentSecondaryContrast.alpha(0.5).toString()};
    background-color: ${({ theme }) => theme.color.accentSecondary.lighten(10).toString()};
  }
  &:active {
    color: ${({ theme }) => theme.color.accentSecondaryContrast.alpha(0.9).toString()};
  }
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
    `};
`;

const CalendarMonthControl: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  CalendarMonthControlProps
> = (props, ref) => {
  const { displayIcon, ...restProps } = props;

  return (
    <StyledButton variant="plain" iconOnly type="button" {...restProps} ref={ref}>
      {displayIcon === 'next' ? <IconNext /> : <IconPrev />}
    </StyledButton>
  );
};

export default React.forwardRef(CalendarMonthControl);
