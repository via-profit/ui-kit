import React from 'react';

export type CalendarValue<Range> = Range extends undefined ? Date | null : [Date | null, Date | null];

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
const WEEK_IN_MS = 604800000; // 7 * 24 * 60 * 60 * 1000

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

  // Мемоизируем timestamp граничных дат для оптимизации проверок isDisabled
  const minTime = React.useMemo(() => minDate.getTime(), [minDate]);
  const maxTime = React.useMemo(() => maxDate.getTime(), [maxDate]);

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
      // Используем UTC методы для избежания проблем с часовыми поясами
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();

      // Создаем дату без времени
      const d = new Date(Date.UTC(year, month, day));

      // День недели (0-6)
      const dayOfWeek = d.getUTCDay();

      // Смещение от начала недели
      const diff = (dayOfWeek - weekStartDayNumber + 7) % 7;

      // Первый день недели
      const weekStart = new Date(Date.UTC(year, month, day - diff));

      // Первый день года
      const yearStart = new Date(Date.UTC(year, 0, 1));

      // Вычисляем номер недели
      return Math.floor((weekStart.getTime() - yearStart.getTime()) / WEEK_IN_MS) + 1;
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
