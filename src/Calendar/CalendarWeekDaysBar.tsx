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
    // Hidden from screen readers: every day cell has the full date label with the weekday
    <Container aria-hidden {...restProps} ref={ref}>
      {weekDayLabels.map((label, index) => (
        // The narrow labels repeat (e.g. «С» for Wednesday and Saturday), so the key is the index
        // eslint-disable-next-line react/no-array-index-key
        <CalendarWeekDayLabel key={index}>{label}</CalendarWeekDayLabel>
      ))}
    </Container>
  );
};

export default React.forwardRef(CalendarWeekDaysBar);
