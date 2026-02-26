import React from 'react';
import styled from '@emotion/styled';
import CalendarEmptyCell from './CalendarEmptyCell';
import { Week } from './use-calendar';

export interface CalendarWeekDayWeekNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
  readonly week: Week;
}

const Cell = styled(CalendarEmptyCell)`
  font-weight: 800;
  position: relative;

  &:before {
    position: absolute;
    content: '';
    width: 1px;
    right: 0;
    top: 30%;
    bottom: 30%;
    background-color: currentColor;
  }
`;

const CalendarWeekDayWeekNumber: React.ForwardRefRenderFunction<
  HTMLSpanElement,
  CalendarWeekDayWeekNumberProps
> = (props, ref) => {
  const { week, children, ...restProps } = props;

  return (
    <Cell {...restProps} ref={ref}>
      {children}
    </Cell>
  );
};

export default React.forwardRef(CalendarWeekDayWeekNumber);
