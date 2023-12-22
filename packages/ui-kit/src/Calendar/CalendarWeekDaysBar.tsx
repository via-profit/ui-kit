import React from 'react';
import styled from '@emotion/styled';

import CalendarWeekDayLabel from './CalendarWeekDayLabel';
import type { Week } from './use-calendar';

export type WeekNameLabelFormat = 'short' | 'long' | 'narrow';

export interface CalendarWeekDaysBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Data of the weak
   */
  readonly week: Week;

  /**
   * Int weekday format\
   * **Default:** `short`
   */
  readonly format: WeekNameLabelFormat;

  /**
   * Intl locale
   */
  readonly locale?: string;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CalendarWeekDaysBar: React.ForwardRefRenderFunction<
  HTMLDivElement,
  CalendarWeekDaysBarProps
> = (props, ref) => {
  const { locale, week, format, ...restProps } = props;

  const weekDayLabels = React.useMemo(
    () =>
      week.days.map(
        day =>
          typeof Intl !== 'undefined'
            ? new Intl.DateTimeFormat(locale, {
                weekday: format,
              }).format(day.date)
            : '\u{0020}', // space,
      ),
    [format, locale, week],
  );

  return (
    <Container {...restProps} ref={ref}>
      {weekDayLabels.map(label => (
        <CalendarWeekDayLabel key={label}>{label}</CalendarWeekDayLabel>
      ))}
    </Container>
  );
};

export default React.forwardRef(CalendarWeekDaysBar);
