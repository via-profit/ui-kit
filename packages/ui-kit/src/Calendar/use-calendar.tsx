import React from 'react';

export type CalendarValue<Range> = Range extends undefined
  ? Date | null
  : [Date, Date] | [Date, Date | null] | null;

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
   * Returns range of monthes (array of month indexes) of the passed year (current year by default)
   * which are intersected with the range between passed dates
   */
  getMonthsRange: (minDate: Date, maxDate: Date, year?: number) => number[];
};

const WHITESPACE = '\u{0020}';
const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000

// Константа для маппинга дней недели
const WEEK_DAYS_MAP: Record<WeekDayName, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
} as const;

export const useCalendar = (props: UseCalendarProps): UseCalendarPayload => {
  const { minDate, maxDate, weekStartDay, displayLeadingZero, locale } = props;

  // Мемоизируем timestamp граничных дат для оптимизации проверок isDisabled.
  // Границы расширяются до целых дней, иначе при minDate={new Date()} сегодняшний день недоступен
  const minTime = React.useMemo(
    () => new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()).getTime(),
    [minDate],
  );
  const maxTime = React.useMemo(
    () =>
      new Date(
        maxDate.getFullYear(),
        maxDate.getMonth(),
        maxDate.getDate(),
        23,
        59,
        59,
        999,
      ).getTime(),
    [maxDate],
  );

  // Мемоизируем номер дня начала недели
  const weekStartDayNumber = React.useMemo(() => WEEK_DAYS_MAP[weekStartDay], [weekStartDay]);

  // Оптимизированная функция isSameDay
  const isSameDay = React.useCallback(
    (a: Date, b: Date): boolean =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate(),
    [],
  );

  // Мемоизируем сегодняшнюю дату для isToday
  const today = React.useMemo(() => {
    const now = new Date();

    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const isToday = React.useCallback(
    (dateValue: Date): boolean => isSameDay(dateValue, today),
    [isSameDay, today],
  );

  const isDisabled = React.useCallback(
    (dateValue: Date): boolean => {
      const currentTime = dateValue.getTime();

      return currentTime > maxTime || currentTime < minTime;
    },
    [maxTime, minTime],
  );

  const calculateWeekNumber = React.useCallback(
    (date: Date): number => {
      // Используем UTC методы для избежания проблем с часовыми поясами (DST)
      const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

      // Неделя с понедельника - ISO 8601: первая неделя года содержит первый четверг
      if (weekStartDayNumber === WEEK_DAYS_MAP.monday) {
        const isoDay = d.getUTCDay() || 7;
        const thursday = new Date(d.getTime() + (4 - isoDay) * DAY_IN_MS);
        const yearStart = Date.UTC(thursday.getUTCFullYear(), 0, 1);

        return Math.ceil(((thursday.getTime() - yearStart) / DAY_IN_MS + 1) / 7);
      }

      // Остальные системы: первая неделя года содержит 1 января
      const diff = (d.getUTCDay() - weekStartDayNumber + 7) % 7;
      const weekStart = d.getTime() - diff * DAY_IN_MS;
      const weekEnd = new Date(weekStart + 6 * DAY_IN_MS);

      // Неделя содержит 1 января следующего года
      if (weekEnd.getUTCFullYear() !== new Date(weekStart).getUTCFullYear()) {
        return 1;
      }

      const yearStart = new Date(Date.UTC(new Date(weekStart).getUTCFullYear(), 0, 1));
      const firstWeekStart =
        yearStart.getTime() - ((yearStart.getUTCDay() - weekStartDayNumber + 7) % 7) * DAY_IN_MS;

      return Math.round((weekStart - firstWeekStart) / (7 * DAY_IN_MS)) + 1;
    },
    [weekStartDayNumber],
  );

  const getDayLabel = React.useCallback(
    (day: Date): string => {
      const dateNum = day.getDate();

      return displayLeadingZero ? dateNum.toString().padStart(2, '0') : dateNum.toString();
    },
    [displayLeadingZero],
  );

  // Мемоизируем Intl форматеры для производительности
  const monthFormatter = React.useMemo(
    () => (typeof Intl !== 'undefined' ? new Intl.DateTimeFormat(locale, { month: 'long' }) : null),
    [locale],
  );

  const yearFormatter = React.useMemo(
    () =>
      typeof Intl !== 'undefined' ? new Intl.DateTimeFormat(locale, { year: 'numeric' }) : null,
    [locale],
  );

  const getMonthLabel = React.useCallback(
    (dateValue: Date): string => {
      if (!monthFormatter) return WHITESPACE;

      const title = monthFormatter.format(dateValue);

      return title.charAt(0).toUpperCase() + title.slice(1);
    },
    [monthFormatter],
  );

  const getYearLabel = React.useCallback(
    (dateValue: Date): string => yearFormatter?.format(dateValue) ?? WHITESPACE,
    [yearFormatter],
  );

  const getYearsRange = React.useCallback((minDate: Date, maxDate: Date): number[] => {
    const years: number[] = [];
    const startYear = minDate.getFullYear();
    const endYear = maxDate.getFullYear();

    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }

    return years;
  }, []);

  const getMonthsRange = React.useCallback((minDate: Date, maxDate: Date, year?: number) => {
    const m: number[] = [];
    const y = typeof year === 'number' ? year : new Date().getFullYear();
    for (let index = 0; index < 12; index++) {
      const monthStart = new Date(y, index, 1, 0, 0, 0, 0);
      const monthEnd = new Date(y, index + 1, 0, 23, 59, 59, 999);

      // Месяц подходит, если хотя бы частично попадает в диапазон
      if (monthStart.getTime() <= maxDate.getTime() && monthEnd.getTime() >= minDate.getTime()) {
        m.push(index);
      }
    }

    return m;
  }, []);

  const weeksCache = React.useRef<Map<string, Week[]>>(new Map());

  const getWeeks = React.useCallback(
    (needleDate: Date): Week[] => {
      const year = needleDate.getFullYear();
      const month = needleDate.getMonth();

      const cacheKey = `${year}-${month}-${weekStartDay}-${minTime}-${maxTime}`;

      const cached = weeksCache.current.get(cacheKey);
      if (cached) {
        return cached;
      }

      // Первый и последний день месяца
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);

      // Вычисляем начало календарной сетки
      const startOffset = (firstDay.getDay() - weekStartDayNumber + 7) % 7;
      const startDate = new Date(year, month, 1 - startOffset);

      // Вычисляем конец календарной сетки
      const endOffset = (weekStartDayNumber + 6 - lastDay.getDay() + 7) % 7;
      const endDate = new Date(year, month, lastDay.getDate() + endOffset);

      const weeks: Week[] = [];
      const currentDate = new Date(startDate);

      // Предаллоцируем массив для дней недели
      const weekDays = new Array(7);

      while (currentDate <= endDate) {
        // Заполняем дни недели
        for (let i = 0; i < 7; i++) {
          const date = new Date(currentDate);
          weekDays[i] = {
            date,
            isToday: isToday(date),
            isDisabled: isDisabled(date),
          };
          currentDate.setDate(currentDate.getDate() + 1);
        }

        // Создаем копию массива дней для недели
        weeks.push({
          weekNumber: calculateWeekNumber(weekDays[0].date),
          days: [...weekDays],
        });
      }

      // Сохраняем в кэш
      weeksCache.current.set(cacheKey, weeks);

      // Очищаем старые записи кэша (если больше 10)
      if (weeksCache.current.size > 10) {
        const keys = Array.from(weeksCache.current.keys());
        for (let i = 0; i < keys.length - 10; i++) {
          weeksCache.current.delete(keys[i]);
        }
      }

      return weeks;
    },
    [weekStartDay, minTime, maxTime, weekStartDayNumber, calculateWeekNumber, isToday, isDisabled],
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
