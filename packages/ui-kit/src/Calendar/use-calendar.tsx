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
      const min = minDate.getTime() || 0;
      const max = maxDate.getTime() || Number.MAX_VALUE;
      const current = dateValue.getTime();

      return current > max || current < min;
    },
    [maxDate, minDate],
  );

  const calculateWeekNumber = React.useCallback((dt: Date) => {
    const tdt = new Date(dt.valueOf());
    const dayn = (dt.getDay() + 6) % 7;
    tdt.setDate(tdt.getDate() - dayn + 3);

    const firstThursday = tdt.valueOf();
    tdt.setMonth(0, 1);
    if (tdt.getDay() !== 4) {
      tdt.setMonth(0, 1 + ((4 - tdt.getDay() + 7) % 7));
    }

    return 1 + Math.ceil((firstThursday - tdt.getTime()) / 604800000);
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

      const numStr = `0${dateNum}`;

      return numStr.substring(numStr.length - 2);
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
      const list: Week[] = [];
      const startOfDate = new Date(needleDate.getFullYear(), needleDate.getMonth(), 1, 0, 0, 0, 0);
      const lastOfDate = new Date(needleDate.getFullYear(), needleDate.getMonth() + 1, 0, 0, 0, 0);
      const startDayNum = weekDaysMap[weekStartDay as WeekDayName];

      const week = new Set<Date>();
      const d = new Date(needleDate);

      for (let dateNum = 1; dateNum < lastOfDate.getDate() + 1; dateNum++) {
        d.setDate(dateNum);

        // if is start of the week then set a new week
        if (d.getDay() === startDayNum) {
          const days: Day[] = [...week].map(day => ({
            date: day,
            isToday: isToday(day),
            isDisabled: isDisabled(day),
          }));
          if (days.length) {
            list.push({
              weekNumber: calculateWeekNumber(days[0].date),
              days,
            });
          }
          week.clear();
        }

        week.add(new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0));

        // if is last of iteration
        if (dateNum === lastOfDate.getDate()) {
          const days: Day[] = [...week].map(day => ({
            date: day,
            isToday: isToday(day),
            isDisabled: isDisabled(day),
          }));

          if (days.length) {
            list.push({
              weekNumber: calculateWeekNumber(days[0].date),
              days,
            });
          }

          week.clear();
        }
      }

      // Fill the prev days
      if (list[0].days.length < 7) {
        const fillDays = 7 - list[0].days.length;
        const days = list[0].days;
        for (let fillIndex = 0; fillIndex < fillDays; fillIndex++) {
          const day = new Date(
            startOfDate.getFullYear(),
            startOfDate.getMonth(),
            -fillIndex,
            0,
            0,
            0,
            0,
          );
          days.unshift({
            date: day,
            isDisabled: isDisabled(day),
            isToday: isToday(day),
          });
        }
        list[0] = {
          days,
          weekNumber: calculateWeekNumber(days[0].date),
        };
      }

      // fill the next days
      if (list[list.length - 1].days.length < 7) {
        const fillDays = 7 - list[list.length - 1].days.length;
        const days = list[list.length - 1].days;
        for (let fillIndex = 0; fillIndex < fillDays; fillIndex++) {
          const day = new Date(
            lastOfDate.getFullYear(),
            lastOfDate.getMonth() + 1,
            fillIndex + 1,
            0,
            0,
            0,
            0,
          );
          days.push({
            date: day,
            isDisabled: isDisabled(day),
            isToday: isToday(day),
          });
        }
        list[list.length - 1] = {
          days,
          weekNumber: calculateWeekNumber(days[0].date),
        };
      }

      // if weeks length is 4 only
      // then prepend week
      if (list.length === 4) {
        const fillDays = 7;
        const days: Day[] = [];
        const firstWeek = list[0];
        const firstDate = firstWeek.days[0].date;

        for (let fillIndex = 0; fillIndex < fillDays; fillIndex++) {
          const day = new Date(
            firstDate.getFullYear(),
            firstDate.getMonth(),
            firstDate.getDate() - fillIndex,
            0,
            0,
            0,
            0,
          );
          days.unshift({
            date: day,
            isDisabled: isDisabled(day),
            isToday: isToday(day),
          });
        }
        list.unshift({
          days,
          weekNumber: calculateWeekNumber(days[0].date),
        });
      }

      // if weeks length is 5 only
      // then append week
      if (list.length === 5) {
        const lastWeek = list[list.length - 1];
        const lastDate = lastWeek.days[lastWeek.days.length - 1].date;
        const days: Day[] = [];
        for (let fillIndex = 0; fillIndex < 7; fillIndex++) {
          const day = new Date(
            lastDate.getFullYear(),
            lastDate.getMonth(),
            lastDate.getDate() + fillIndex + 1,
            0,
            0,
            0,
            0,
          );
          days.push({
            date: day,
            isDisabled: isDisabled(day),
            isToday: isToday(day),
          });
        }
        list.push({
          days,
          weekNumber: calculateWeekNumber(days[0].date),
        });
      }

      return list;
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
