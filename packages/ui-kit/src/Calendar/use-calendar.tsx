import React from 'react';

export type CalendarValue<Multiple> = Multiple extends undefined ? Date : [Date, Date];

export type WeekDayName =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';

export type Day = {
  readonly date: Date;
  readonly isToday: boolean;
  readonly isDisabled: boolean;
};

export type Week = {
  readonly weekNumber: number;
  readonly days: Day[];
};

export interface UseCalendarProps {
  /**
   * Intl locale
   */
  readonly locale: string;

  /**
   * The day the week starts from
   */
  readonly weekStartDay: WeekDayName;

  /**
   * Display days with leading zero
   */
  readonly displayLeadingZero: boolean;

  /**
   * Minimum date limit
   */
  readonly minDate: Date;

  /**
   * Maximum date limit
   */
  readonly maxDate: Date;
}

export type UseCalendarPayload = {
  /**
   * Returns `true` if the dateA and the dateB is a same day
   */
  isSameDay: (dateA: Date, dateB: Date) => boolean;

  /**
   * Returns `true` if the passed date is a current day
   */
  isToday: (date: Date) => boolean;

  /**
   * Returns array of weeks (with days in) for the passed date
   */
  getWeeks: (needleDate: Date) => Week[];

  /**
   * Returns Day label for the current locale
   */
  getDayLabel: (date: Date) => string;

  /**
   * Returns Month name for the current locale
   */
  getMonthLabel: (date: Date) => string;

  /**
   * Returns Year label for the current locale
   */
  getYearLabel: (date: Date) => string;

  /**
   * Returns range of years (array of years) between passed dates
   */
  getYearsRange: (minDate: Date, maxDate: Date) => number[];

  /**
   * Returns range of monthes (array of month indexes) between passed dates
   */
  getMonthsRange: (minDate: Date, maxDate: Date) => number[];
};

const WHITESPACE = '\u{0020}';

export const useCalendar = (props: UseCalendarProps): UseCalendarPayload => {
  const { minDate, maxDate, weekStartDay, displayLeadingZero, locale } = props;
  const isSameDay = React.useCallback(
    (a: Date, b: Date) =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate(),
    [],
  );
  const isToday = React.useCallback(
    (dateValue: Date) => isSameDay(dateValue, new Date()),
    [isSameDay],
  );

  const isDisabled = React.useCallback(
    (dateValue: Date) => {
      const min = minDate.getTime();
      const max = maxDate.getTime();
      const current = dateValue.getTime();

      return current > max || current < min;
    },
    [maxDate, minDate],
  );

  const calculateWeekNumber = React.useCallback((date: Date, weekStartDay: number) => {
    // Clone the date without time
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    // Day of week for the given date (0–6)
    const day = d.getDay();

    // Offset from the configured week start
    const diff = (day - weekStartDay + 7) % 7;

    // First day of the current week
    const weekStart = new Date(d);
    weekStart.setDate(d.getDate() - diff);

    // First day of the year
    const yearStart = new Date(d.getFullYear(), 0, 1);

    // Week number = number of full weeks since the beginning of the year
    return Math.floor((weekStart.getTime() - yearStart.getTime()) / 604800000) + 1;
  }, []);

  const weekDaysMap: Record<WeekDayName, number> = React.useMemo(
    () => ({
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    }),
    [],
  );

  const getDayLabel = React.useCallback(
    (day: Date) => {
      const dateNum = day.getDate();
      if (!displayLeadingZero) {
        return dateNum.toString();
      }

      return dateNum.toString().padStart(2, '0');
    },
    [displayLeadingZero],
  );

  const getMonthLabel = React.useCallback(
    (dateValue: Date) => {
      const title =
        typeof Intl !== 'undefined'
          ? new Intl.DateTimeFormat(locale, {
              month: 'long',
            }).format(dateValue)
          : WHITESPACE;

      return title.charAt(0).toUpperCase() + title.slice(1);
    },
    [locale],
  );

  const getYearLabel = React.useCallback(
    (dateValue: Date) =>
      typeof Intl !== 'undefined'
        ? new Intl.DateTimeFormat(locale, {
            year: 'numeric',
          }).format(dateValue)
        : WHITESPACE,
    [locale],
  );

  const getYearsRange = React.useCallback((minDate: Date, maxDate: Date) => {
    const y: number[] = [];

    for (
      let year = minDate.getFullYear();
      year >= minDate.getFullYear() && year <= maxDate.getFullYear();
      year++
    ) {
      y.push(year);
    }

    return y;
  }, []);

  const getMonthsRange = React.useCallback((minDate: Date, maxDate: Date) => {
    const m: number[] = [];
    const y = new Date().getFullYear();
    for (let index = 0; index < 12; index++) {
      const d = new Date(y, index, 1, 0, 0, 0);
      if (d.getTime() > minDate.getTime() && d.getTime() < maxDate.getTime()) {
        m.push(index);
      }
    }

    return m;
  }, []);

  const getWeeks = React.useCallback(
    (needleDate: Date) => {
      const year = needleDate.getFullYear();
      const month = needleDate.getMonth();

      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);

      const startOffset = (firstDay.getDay() - weekDaysMap[weekStartDay] + 7) % 7;

      const startDate = new Date(year, month, 1 - startOffset);

      const endOffset = (weekDaysMap[weekStartDay] + 6 - lastDay.getDay() + 7) % 7;

      const endDate = new Date(year, month, lastDay.getDate() + endOffset);

      const weeks: Week[] = [];
      const current = new Date(startDate);

      while (current <= endDate) {
        const days: Day[] = [];

        for (let i = 0; i < 7; i++) {
          const d = new Date(current);
          days.push({
            date: d,
            isToday: isToday(d),
            isDisabled: isDisabled(d),
          });
          current.setDate(current.getDate() + 1);
        }

        weeks.push({
          weekNumber: calculateWeekNumber(days[0].date, weekDaysMap[weekStartDay]),
          days,
        });
      }

      return weeks;
    },
    [weekDaysMap, weekStartDay, isToday, isDisabled, calculateWeekNumber],
  );

  return {
    isSameDay,
    isToday,
    getWeeks,
    getDayLabel,
    getMonthLabel,
    getYearLabel,
    getYearsRange,
    getMonthsRange,
  };
};

export default useCalendar;
