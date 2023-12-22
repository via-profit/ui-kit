import React from 'react';
import styled from '@emotion/styled';

import Button, { ButtonProps } from '../Button';

export type CalendarControlButtonProps = ButtonProps & {
  readonly isActive?: boolean;
};

type StyledCalendarControlButtonProps = {
  readonly $isActive?: boolean;
};

const StyledCalendarControlButton = styled(Button)<StyledCalendarControlButtonProps>`
  color: ${({ theme }) => theme.color.accentSecondaryContrast.toString()};
  background-color: ${({ theme }) => theme.color.accentSecondaryContrast.alpha(0).toString()};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.accentSecondaryContrast.toString()};
    background-color: ${({ theme }) => theme.color.accentSecondaryContrast.alpha(0.2).toString()};
  }
  &:active {
    color: ${({ theme }) => theme.color.accentSecondaryContrast.toString()};
    background-color: ${({ theme }) => theme.color.accentSecondaryContrast.alpha(0.5).toString()};
  }
`;

const CalendarControlButton: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  CalendarControlButtonProps
> = (props, ref) => {
  const { children, isActive, ...restProps } = props;

  return (
    <StyledCalendarControlButton
      type="button"
      variant="plain"
      $isActive={isActive}
      {...restProps}
      ref={ref}
    >
      {children}
    </StyledCalendarControlButton>
  );
};

export default React.forwardRef(CalendarControlButton);
