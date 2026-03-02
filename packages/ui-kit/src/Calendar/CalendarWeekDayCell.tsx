import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import CalendarEmptyCell from './CalendarEmptyCell';

export interface CalendarWeekCellProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * if cell day is today, then property will be true
   */
  readonly isToday?: boolean;

  readonly inCurrentMonth?: boolean;
}

const Cell = styled(CalendarEmptyCell)<{
  $isToday?: boolean;
  $inCurrentMonth?: boolean;
}>`
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  ${({ $inCurrentMonth }) =>
    !$inCurrentMonth &&
    css`
      opacity: 0.5;
    `}
`;

const CalendarWeekDayCell: React.ForwardRefRenderFunction<
  HTMLSpanElement,
  CalendarWeekCellProps
> = (props, ref) => {
  const { isToday, children, inCurrentMonth, ...restProps } = props;

  return (
    <Cell {...restProps} $isToday={isToday} $inCurrentMonth={inCurrentMonth} ref={ref}>
      {children}
    </Cell>
  );
};

export default React.forwardRef(CalendarWeekDayCell);
