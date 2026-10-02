import React, { useImperativeHandle } from 'react';

import Body, { CalendarBodyProps } from './CalendarBody';
import Cell, { CalendarCellProps } from './CalendarCell';
import WeekDayCell, { CalendarWeekCellProps } from './CalendarWeekDayCell';
import EmptyCell, { CalendarEmptyCellProps } from './CalendarEmptyCell';
import WeekRowButton, { CalendarWeekRowButtonProps } from './CalendarWeekRowButton';
import WeekDayWeekNumber, { CalendarWeekDayWeekNumberProps } from './CalendarWeekDayWeekNumber';
import Paper, { CalendarPaperProps } from './CalendarPaper';
import Header, { CalendarHeaderProps } from './CalendarHeader';
import WeekRow, { CalendarWeekRowProps } from './CalendarWeekRow';
import DateContainer, { CalendarDateContainerProps } from './CalendarDateContainer';
import Toolbar, { CalendarToolbarProps } from './CalendarToolbar';
import YearsSelector, { CalendarYearsSelectorProps } from './CalendarYearsSelector';
import MonthsSelector, { CalendarMonthsSelectorProps } from './CalendarMonthsSelector';
import MonthCell, { CalendarMonthCellProps } from './CalendarMonthCell';
import DayBadge, { CalendarDayBadgeProps } from './CalendarDayBadge';
import Footer, { CalendarFooterProps } from './CalendarFooter';
import ControlButton, { CalendarControlButtonProps } from './CalendarControlButton';
import Heading, { CalendarHeadingProps } from './CalendarHeading';
import Subheading, { CalendarSubheadingProps } from './CalendarSubheading';
import IconPrev, { CalendarIconPrevProps } from './CalendarIconPrev';
import IconNext, { CalendarIconNextProps } from './CalendarIconNext';
import WeekDaysBar, { CalendarWeekDaysBarProps, WeekNameLabelFormat } from './CalendarWeekDaysBar';
import { CalendarValue, useCalendar, Week, WeekDayName } from './use-calendar';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import useThemeProps from '../ThemeProvider/useThemeProps';

export * from './use-calendar';
export * from './CalendarWeekDaysBar';

export type CalendarView = 'days' | 'months' | 'years' | 'weeks';
export type CalendarOnChange<IsRangeValue extends boolean | undefined = undefined> = (
  dates: CalendarValue<IsRangeValue>,
) => void;

export type CalendarProps<IsRangeValue extends boolean | undefined = undefined> = {
  readonly range?: IsRangeValue;
  /**
   * Selected date
   */
  readonly value?: CalendarValue<IsRangeValue>;

  /**
   * selected value if your component should not be controlled
   */
  readonly defaultValue?: CalendarValue<IsRangeValue>;

  /**
   * It will be called at the moment of selecting the given
   */
  readonly onChange: CalendarOnChange<IsRangeValue>;

  /**
   * calendar locale\
   * **Default:** `ru-RU`
   */
  readonly locale?: string;

  /**
   * array of badges
   */
  readonly badges?: readonly CalendarBadge[];

  /**
   * Minimum date limit\
   * **Default:** -100 year

   */
  readonly minDate?: Date;

  /**
   * Maximum date limit\
   * **Default:** +100 year
   */
  readonly maxDate?: Date;

  /**
   * The day the week starts from\
   * **Default:** `monday`
   */
  readonly weekStartDay?: WeekDayName;

  /**
   * Int weekday format\
   * **Default:** `short`
   */
  readonly weekDayLabelFormat?: WeekNameLabelFormat;

  /**
   * Display days with leading zero
   * **Default:** `false`
   */
  readonly displayLeadingZero?: boolean;

  /**
   * Mark current day cell\
   * **Default:** `true`
   */
  readonly markToday?: boolean;

  /**
   * Cell accent color\
   * **Default:** `primary`
   */
  readonly accentColor?: 'primary' | 'secondary' | string;

  /**
   * Label for the Reset button. If label passed, then button will be rendered
   */
  readonly resetButtonLabel?: string;

  /**
   * Label for the Today button. If label passed, then button will be rendered
   */
  readonly todayButtonLabel?: string;

  /**
   * The label of the «previous» button for screen readers and the tooltip.
   * The button switches the month in the days view and the year in the months view\
   * **Default:** `Previous`
   */
  readonly prevButtonLabel?: string;

  /**
   * The label of the «next» button for screen readers and the tooltip\
   * **Default:** `Next`
   */
  readonly nextButtonLabel?: string;

  /**
   * Heading
   */
  readonly heading?: React.ReactNode;

  /**
   * Subheading
   */
  readonly subheading?: React.ReactNode;

  /**
   * Initial name of the view\
   * **Default:** `days`
   */
  readonly initialView?: CalendarView;

  readonly view?: CalendarView;

  /**
   * Posibility calendar views list
   */
  readonly views?: readonly CalendarView[];

  /**
   * Custom footer elements
   */
  readonly footer?: React.ReactNode;

  /**
   * Overridable components map
   */
  readonly overrides?: CalendarOverrides;
};

export interface CalendarOverrides {
  /**
   * Element container
   */
  readonly Body?: React.ComponentType<CalendarBodyProps & React.RefAttributes<HTMLDivElement>>;

  /**
   * Day element
   */
  readonly Cell?: React.ComponentType<CalendarCellProps & React.RefAttributes<HTMLButtonElement>>;

  /**
   * Day element
   */
  readonly WeekDayCell?: React.ComponentType<
    CalendarWeekCellProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * Number of the week in weeks selector
   */
  readonly WeekDayWeekNumber?: React.ComponentType<
    CalendarWeekDayWeekNumberProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * The button to select the week in the `weeks` view
   */
  readonly WeekRowButton?: React.ComponentType<
    CalendarWeekRowButtonProps & React.RefAttributes<HTMLButtonElement>
  >;
  /**
   * Empty cell element
   */
  readonly EmptyCell?: React.ComponentType<
    CalendarEmptyCellProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * Common container element
   */
  readonly Paper?: React.ComponentType<CalendarPaperProps & React.RefAttributes<HTMLDivElement>>;

  /**
   * Header wrapper element
   */
  readonly Header?: React.ComponentType<CalendarHeaderProps & React.RefAttributes<HTMLDivElement>>;

  /**
   * Week row container element
   */
  readonly WeekRow?: React.ComponentType<
    CalendarWeekRowProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * Days wrapper element
   */
  readonly DateContainer?: React.ComponentType<
    CalendarDateContainerProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Toolbar wrapper element
   */
  readonly Toolbar?: React.ComponentType<
    CalendarToolbarProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Years list element (year view)
   */
  readonly YearsSelector?: React.ComponentType<
    CalendarYearsSelectorProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Monthes list element (month view)
   */
  readonly MonthsSelector?: React.ComponentType<
    CalendarMonthsSelectorProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Month cell element in monthes list
   */
  readonly MonthCell?: React.ComponentType<
    CalendarMonthCellProps & React.RefAttributes<HTMLButtonElement>
  >;

  /**
   * Badge of the day cell element
   */
  readonly DayBadge?: React.ComponentType<
    CalendarDayBadgeProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * Footer container element
   */
  readonly Footer?: React.ComponentType<CalendarFooterProps & React.RefAttributes<HTMLDivElement>>;

  /**
   * Common button element
   */
  readonly ControlButton?: React.ComponentType<
    CalendarControlButtonProps & React.RefAttributes<HTMLButtonElement>
  >;

  /**
   * Heading element
   */
  readonly Heading?: React.ComponentType<
    CalendarHeadingProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Subheading element
   */
  readonly Subheading?: React.ComponentType<
    CalendarSubheadingProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Prev icon element in prev month button
   */
  readonly IconPrev?: React.ComponentType<
    CalendarIconPrevProps & React.RefAttributes<SVGSVGElement>
  >;

  /**
   * Next icon element in next month button
   */
  readonly IconNext?: React.ComponentType<
    CalendarIconNextProps & React.RefAttributes<SVGSVGElement>
  >;

  /**
   * Weeks bar  element
   */
  readonly WeekDaysBar?: React.ComponentType<
    CalendarWeekDaysBarProps & React.RefAttributes<HTMLDivElement>
  >;
}

export type CalendarBadge = {
  readonly date: Date;
  readonly badgeContent: React.ReactNode;
  readonly accentColor?: 'primary' | 'secondary' | string;
};

const viewAppear = keyframes`
  from {
    opacity: 0;
    transform: scale(0.97);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

/**
 * Only the active view is rendered: the hidden views are not focusable and not announced
 */
const ViewContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  animation: ${viewAppear} 0.2s ease-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const dateKey = (date: Date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

export type CalendarRef<IsRangeValue extends boolean | undefined = undefined> = {
  readonly setView: (view: CalendarView) => void;
  readonly setViews: (views: readonly CalendarView[]) => void;
  readonly getActiveView: () => CalendarView;
  readonly setValue: (value: CalendarValue<IsRangeValue>) => void;
  readonly setCalendarDate: (date: Date) => void;
  readonly getCalendarDate: () => Date;
  readonly reset: () => void;
};

const isRangeValue = (value: unknown): value is CalendarValue<true> => {
  if (value instanceof Array) {
    return value.every(v => v instanceof Date || v === null);
  }

  return false;
};

const isNotRangeValue = (value: unknown): value is CalendarValue<undefined> => !isRangeValue(value);

const computeViews = (
  inputViews?: readonly CalendarView[],
  range?: boolean,
): readonly CalendarView[] => {
  if (inputViews) {
    return inputViews;
  }

  if (range) {
    return ['days', 'months', 'years', 'weeks'];
  }

  return ['days', 'months', 'years'];
};

const computeView = (inputParams: {
  inputView: CalendarView | undefined;
  inputInitialView: CalendarView | undefined;
  inputViews: readonly CalendarView[] | undefined;
}): CalendarView => {
  const { inputView, inputViews, inputInitialView } = inputParams;
  const requested = inputView ?? inputInitialView;

  if (requested && inputViews && !inputViews.includes(requested)) {
    throw new Error(
      `The view «${requested}» must be one of the \`views\`: ${inputViews.join(', ')}`,
    );
  }

  // The requested view wins over the first of the views
  return requested ?? inputViews?.[0] ?? 'days';
};

const computeCalendarDate = (params: {
  readonly inputValue?: Date | CalendarValue<true> | null;
  readonly defaultValue?: Date | CalendarValue<true> | null;
}): Date => {
  const { inputValue, defaultValue } = params;
  const today = new Date();

  // Проверяем inputValue
  if (inputValue !== null && inputValue !== undefined) {
    if (Array.isArray(inputValue) && inputValue.length > 0) {
      // Для range режима - берем первый элемент, если он есть
      if (inputValue[0] instanceof Date) {
        return inputValue[0];
      }
      // Если первый элемент null, пробуем второй
      if (inputValue[1] instanceof Date) {
        return inputValue[1];
      }
    } else if (inputValue instanceof Date) {
      // Для non-range режима
      return inputValue;
    }
  }

  // Проверяем defaultValue
  if (defaultValue !== null && defaultValue !== undefined) {
    if (Array.isArray(defaultValue) && defaultValue.length > 0) {
      if (defaultValue[0] instanceof Date) {
        return defaultValue[0];
      }
      if (defaultValue[1] instanceof Date) {
        return defaultValue[1];
      }
    } else if (defaultValue instanceof Date) {
      return defaultValue;
    }
  }

  // Возвращаем сегодняшнюю дату, если ничего не подошло
  return today;
};

const CalendarComponent = React.forwardRef(
  <IsRangeValue extends boolean | undefined = undefined>(
    props: CalendarProps<IsRangeValue>,
    ref: React.Ref<CalendarRef<IsRangeValue>>,
  ): React.ReactNode => {
    const {
      minDate: inputMinDate,
      maxDate: inputMaxDate,
      weekStartDay = 'monday',
      locale = 'ru-RU',
      displayLeadingZero = false,
      onChange,
      badges = [],
      markToday = true,
      weekDayLabelFormat = 'short',
      accentColor = 'primary',
      defaultValue,
      value: inputValue,
      initialView: inputInitialView,
      view: inputView,
      views: inputViews,
      resetButtonLabel,
      todayButtonLabel,
      heading,
      subheading,
      footer,
      overrides,
      range = false,
      prevButtonLabel = 'Previous',
      nextButtonLabel = 'Next',
    } = useThemeProps('Calendar', props);

    /**
     * Validations
     */
    if (range) {
      if (defaultValue && isNotRangeValue(defaultValue)) {
        throw new Error('The default value must be an array of dates([Date, Date])');
      }

      if (inputValue && isNotRangeValue(inputValue)) {
        throw new Error('The value must be an array of dates([Date, Date])');
      }
    } else {
      if (defaultValue && isRangeValue(defaultValue)) {
        throw new Error('The default value must be a Date instance');
      }

      if (inputValue && isRangeValue(inputValue)) {
        throw new Error('The value must be a Date instance');
      }
    }

    if (!range) {
      if (inputViews?.includes('weeks') || inputView === 'weeks') {
        throw new Error('The `weeks` view allowed only in range mode');
      }
    }

    if (typeof inputValue !== 'undefined' && typeof onChange !== 'function') {
      throw new Error(
        'You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange`.',
      );
    }

    if (inputView && inputInitialView) {
      throw new Error('You can not use view and initialView at the same time.');
    }

    // Default limits are created once, otherwise every render gets new Date instances
    // and invalidates all memoized values depending on them
    const minDate = React.useMemo(
      () => inputMinDate ?? new Date(new Date().getFullYear() - 100, 0, 1, 0, 0, 0),
      [inputMinDate],
    );
    const maxDate = React.useMemo(
      () => inputMaxDate ?? new Date(new Date().getFullYear() + 100, 0, 1, 0, 0, 0),
      [inputMaxDate],
    );

    const emitChange = React.useCallback(
      (newValue: CalendarValue<IsRangeValue>) => {
        if (typeof onChange === 'function') {
          onChange(newValue);
        }
      },
      [onChange],
    );

    /**
     * Overrides
     */
    const overridesMap = React.useMemo(
      () => ({
        Body: overrides?.Body || Body,
        Cell: overrides?.Cell || Cell,
        EmptyCell: overrides?.EmptyCell || EmptyCell,
        Paper: overrides?.Paper || Paper,
        Header: overrides?.Header || Header,
        WeekRow: overrides?.WeekRow || WeekRow,
        DateContainer: overrides?.DateContainer || DateContainer,
        Toolbar: overrides?.Toolbar || Toolbar,
        YearsSelector: overrides?.YearsSelector || YearsSelector,
        MonthsSelector: overrides?.MonthsSelector || MonthsSelector,
        MonthCell: overrides?.MonthCell || MonthCell,
        DayBadge: overrides?.DayBadge || DayBadge,
        Footer: overrides?.Footer || Footer,
        ControlButton: overrides?.ControlButton || ControlButton,
        Heading: overrides?.Heading || Heading,
        Subheading: overrides?.Subheading || Subheading,
        IconPrev: overrides?.IconPrev || IconPrev,
        IconNext: overrides?.IconNext || IconNext,
        WeekDaysBar: overrides?.WeekDaysBar || WeekDaysBar,
        WeekDayCell: overrides?.WeekDayCell || WeekDayCell,
        WeekRowButton: overrides?.WeekRowButton || WeekRowButton,
        WeekDayWeekNumber: overrides?.WeekDayWeekNumber || WeekDayWeekNumber,
      }),
      [overrides],
    );

    const dateContainerRef = React.useRef<HTMLDivElement | null>(null);

    /**
     * Inside date value
     */
    const [calendarDate, setCalendarDate] = React.useState<Date>(() =>
      computeCalendarDate({
        defaultValue,
        inputValue,
      }),
    );

    /**
     * Selected value
     */
    const inputValueRef = React.useRef(inputValue);
    const [internalValue, setValue] = React.useState<CalendarValue<IsRangeValue>>(
      inputValue ?? defaultValue ?? null,
    );
    // Controlled: the value is always the `value` property, even if the parent did not accept the change
    const value =
      typeof inputValue !== 'undefined'
        ? (inputValue as CalendarValue<IsRangeValue>)
        : internalValue;

    /**
     * The day with the keyboard focus in the days view (roving tabindex)
     */
    const [focusedDate, setFocusedDate] = React.useState<Date | null>(null);
    const shouldMoveFocus = React.useRef(false);

    /**
     * Current view mode
     */
    const [view, setView] = React.useState<CalendarView>(() =>
      computeView({
        inputViews,
        inputInitialView,
        inputView,
      }),
    );

    /**
     * List of possibility views
     */
    const [views, setComputedViews] = React.useState<readonly CalendarView[]>(() =>
      computeViews(inputViews, range),
    );

    const setViews = React.useCallback(
      (variants: readonly CalendarView[]) => setComputedViews(variants),
      [],
    );
    const selectView = React.useCallback(
      (view: CalendarView) => {
        const nextViews = views.includes(view) ? views : [...views, view];

        if (nextViews !== views) {
          setViews(nextViews);
        }
        setView(view);
      },
      [setViews, views],
    );

    /**
     * Controlled `view` property was changed
     */
    const inputViewRef = React.useRef(inputView);
    React.useEffect(() => {
      if (inputView && inputView !== inputViewRef.current) {
        inputViewRef.current = inputView;
        selectView(inputView);
      }
    }, [inputView, selectView]);

    const resetVariablesRef = React.useRef({
      calendarDate,
      value,
      view,
    });

    const {
      isSameDay,
      getWeeks,
      getDayLabel,
      getMonthLabel,
      getYearLabel,
      getYearsRange,
      getMonthsRange,
    } = useCalendar({
      minDate,
      maxDate,
      weekStartDay,
      locale,
      displayLeadingZero,
    });

    const availableViewsMap: Record<CalendarView, CalendarView[]> = React.useMemo(() => {
      const viewsMap: Record<CalendarView, readonly CalendarView[]> = {
        years: ['months', 'days'],
        months: ['days', 'weeks'],
        weeks: ['days'],
        days: [],
      };

      const availableMap = new Map<CalendarView, CalendarView[]>();
      for (const [key, value] of Object.entries(viewsMap)) {
        availableMap.set(
          key as CalendarView,
          [...value].filter(v => views.includes(v)),
        );
      }

      const obj = Object.fromEntries(availableMap);

      return {
        ...obj,
      } as Record<CalendarView, CalendarView[]>;
    }, [views]);

    const getNextAvailableView = React.useCallback(() => {
      const availableViews = availableViewsMap[view];
      if (availableViews.length === 0) {
        return null;
      }

      return availableViews[0];
    }, [view, availableViewsMap]);

    /**
     * value was changed
     */
    React.useEffect(() => {
      if (JSON.stringify(inputValue) !== JSON.stringify(inputValueRef.current)) {
        inputValueRef.current = inputValue;
        setValue(inputValue as CalendarValue<IsRangeValue>);

        if (inputValue !== null && inputValue !== undefined) {
          if (Array.isArray(inputValue) && inputValue[0] instanceof Date) {
            setCalendarDate(inputValue[0]);
          } else if (inputValue instanceof Date) {
            setCalendarDate(inputValue);
          }
        }
      }
    }, [inputValue]);

    const handlePrevNextClick = React.useCallback(
      (type: 'next' | 'prev') => () => {
        const newCalendarDate = new Date(calendarDate);

        if (view === 'years') {
          if (type === 'prev') {
            newCalendarDate.setFullYear(newCalendarDate.getFullYear() - 1);
          } else {
            newCalendarDate.setFullYear(newCalendarDate.getFullYear() + 1);
          }
        }

        if (view === 'months') {
          if (type === 'prev') {
            newCalendarDate.setFullYear(newCalendarDate.getFullYear() - 1);
          } else {
            newCalendarDate.setFullYear(newCalendarDate.getFullYear() + 1);
          }
        }

        if (view === 'days' || view === 'weeks') {
          if (type === 'prev') {
            newCalendarDate.setFullYear(
              newCalendarDate.getFullYear(),
              newCalendarDate.getMonth() - 1,
              1,
            );
          } else {
            newCalendarDate.setFullYear(
              newCalendarDate.getFullYear(),
              newCalendarDate.getMonth() + 1,
              1,
            );
          }
        }

        setCalendarDate(newCalendarDate);
      },
      [calendarDate, view],
    );

    const handleCellDateClick = React.useCallback(
      (selectedDate: Date) => () => {
        setFocusedDate(selectedDate);
        const nextView = getNextAvailableView();

        if (nextView) {
          setView(nextView);
        }

        // Single-date mode
        if (!range) {
          emitChange(selectedDate as CalendarValue<IsRangeValue>);
          setValue(selectedDate as CalendarValue<IsRangeValue>);

          return;
        }

        // Range-date mode
        const [from, to] = (value as CalendarValue<true>) ?? [];

        // выбрана только первая дата - завершение периода
        if (from && !to) {
          /// check to swap
          const newValue =
            selectedDate.getTime() < from.getTime() ? [selectedDate, from] : [from, selectedDate];

          emitChange(newValue as unknown as CalendarValue<IsRangeValue>);
          setValue(newValue as unknown as CalendarValue<IsRangeValue>);

          return;
        }

        // обе даты выбраны или ничего не выбрано ([Date, Date] | [null, null] | null) - начало нового периода
        setValue([selectedDate, null] as unknown as CalendarValue<IsRangeValue>);
        emitChange([selectedDate, null] as unknown as CalendarValue<IsRangeValue>);
      },
      [emitChange, getNextAvailableView, range, value],
    );

    /**
     * Handle of click on year item
     */
    const handleYearSelected = React.useCallback(
      (selectedYear: number) => () => {
        const newDate = new Date(selectedYear, 0, 1, 0, 0, 0, 0);

        setCalendarDate(newDate);

        const nextView = getNextAvailableView();

        if (nextView) {
          selectView(nextView);
        }

        // if the next `view` does not exist
        if (!nextView && typeof onChange === 'function') {
          const a = new Date(newDate.getFullYear(), 11, 31, 23, 59, 59, 999);

          const selectedValue = range ? [newDate, a] : newDate;
          onChange(selectedValue as NonNullable<CalendarValue<IsRangeValue>>);

          if (!inputValue) {
            setValue(selectedValue as CalendarValue<IsRangeValue>);
          }
        }
      },
      [getNextAvailableView, onChange, selectView, range, inputValue],
    );

    /**
     * Handle of click on month item
     */
    const handleMonthSelected = React.useCallback(
      (monthIndex: number) => () => {
        const newDate = new Date(calendarDate.getFullYear(), monthIndex, 1, 0, 0, 0, 0);

        setCalendarDate(newDate);
        const nextView = getNextAvailableView();

        if (nextView) {
          selectView(nextView);
        }

        // if the next `view` does not exist
        if (!nextView && typeof onChange === 'function') {
          // The end of the last day of the month, the same way as for the year range
          const a = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0, 23, 59, 59, 999);

          const selectedValue = range ? [newDate, a] : newDate;
          onChange(selectedValue as NonNullable<CalendarValue<IsRangeValue>>);

          if (!inputValue) {
            setValue(selectedValue as CalendarValue<IsRangeValue>);
          }
        }
      },
      [calendarDate, getNextAvailableView, onChange, selectView, inputValue, range],
    );

    /**
     * Handle click on «Reset» button
     */
    const handleReset = React.useCallback(() => {
      setCalendarDate(resetVariablesRef.current.calendarDate);
      setValue(resetVariablesRef.current.value);
      selectView(resetVariablesRef.current.view);

      if (typeof onChange === 'function') {
        onChange(resetVariablesRef.current.value as NonNullable<CalendarValue<IsRangeValue>>);
      }
    }, [onChange, selectView]);

    /**
     * Handle click on «Today» button
     */
    const handleToday = React.useCallback(() => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
      const newValue = (range ? [today, today] : today) as CalendarValue<IsRangeValue>;

      setCalendarDate(today);
      setValue(newValue);
      emitChange(newValue);

      if (view !== 'days' && views.includes('days')) {
        selectView('days');
      }
    }, [emitChange, range, selectView, view, views]);

    const handleClickWeek = React.useCallback(
      (week: Week) => () => {
        const days = week.days;
        const dates = [days[0].date, days[days.length - 1].date];
        setCalendarDate(dates[0]);

        /// set view
        let nextView: CalendarView | undefined = undefined;
        if (views.includes('days')) {
          nextView = 'days';
        }
        if (nextView) {
          selectView(nextView);
        }

        /// set value
        if (range) {
          setValue(dates as CalendarValue<IsRangeValue>);

          if (typeof onChange === 'function') {
            onChange(dates as NonNullable<CalendarValue<IsRangeValue>>);
          }
        } else {
          setValue(dates[0] as CalendarValue<IsRangeValue>);

          if (typeof onChange === 'function') {
            onChange(dates[0] as any);
          }
        }
      },
      [views, range, selectView, onChange],
    );

    const weeks = React.useMemo(() => getWeeks(calendarDate), [calendarDate, getWeeks]);

    const yearsRange = React.useMemo(
      () => getYearsRange(minDate, maxDate),
      [minDate, maxDate, getYearsRange],
    );

    const monthsRange = React.useMemo(
      () => getMonthsRange(minDate, maxDate, calendarDate.getFullYear()),
      [minDate, maxDate, getMonthsRange, calendarDate],
    );

    const minDay = React.useMemo(
      () => new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()),
      [minDate],
    );
    const maxDay = React.useMemo(
      () => new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()),
      [maxDate],
    );

    const dayLabelFormatter = React.useMemo(
      () =>
        typeof Intl !== 'undefined'
          ? new Intl.DateTimeFormat(locale, {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })
          : null,
      [locale],
    );

    /**
     * The only day in the tab order: the focused, the selected, today or the first available one
     */
    const tabbableDateKey = React.useMemo(() => {
      const month = calendarDate.getMonth();
      const days = weeks
        .flatMap(week => week.days)
        .filter(day => day.date.getMonth() === month && !day.isDisabled);
      const selected = isRangeValue(value) ? value?.[0] : isNotRangeValue(value) ? value : null;
      const candidates = [focusedDate, selected, new Date()];
      const found = candidates
        .map(candidate => candidate && days.find(day => isSameDay(day.date, candidate)))
        .find(Boolean);

      return found ? dateKey(found.date) : days[0] ? dateKey(days[0].date) : null;
    }, [calendarDate, weeks, value, focusedDate, isSameDay]);

    /**
     * Arrows move by a day and a week, Home/End — to the start/end of the week,
     * PageUp/PageDown — by a month. Crossing the month border switches the month
     */
    const handleDaysKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        const key = (event.target as HTMLElement).closest<HTMLElement>('[data-date]')?.dataset.date;
        if (!key) return;

        const [y, m, d] = key.split('-').map(Number);
        const current = new Date(y, m, d);
        const weekDay =
          (current.getDay() -
            ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(
              weekStartDay,
            ) +
            7) %
          7;
        let target: Date;

        switch (event.key) {
          case 'ArrowLeft':
            target = new Date(y, m, d - 1);
            break;
          case 'ArrowRight':
            target = new Date(y, m, d + 1);
            break;
          case 'ArrowUp':
            target = new Date(y, m, d - 7);
            break;
          case 'ArrowDown':
            target = new Date(y, m, d + 7);
            break;
          case 'Home':
            target = new Date(y, m, d - weekDay);
            break;
          case 'End':
            target = new Date(y, m, d + 6 - weekDay);
            break;
          case 'PageUp':
            target = new Date(y, m - 1, Math.min(d, new Date(y, m, 0).getDate()));
            break;
          case 'PageDown':
            target = new Date(y, m + 1, Math.min(d, new Date(y, m + 2, 0).getDate()));
            break;
          default:
            return;
        }

        event.preventDefault();

        // Stay inside minDate/maxDate
        if (target.getTime() < minDay.getTime()) target = minDay;
        if (target.getTime() > maxDay.getTime()) target = maxDay;

        setFocusedDate(target);
        shouldMoveFocus.current = true;

        if (
          target.getMonth() !== calendarDate.getMonth() ||
          target.getFullYear() !== calendarDate.getFullYear()
        ) {
          setCalendarDate(new Date(target.getFullYear(), target.getMonth(), 1));
        }
      },
      [weekStartDay, minDay, maxDay, calendarDate],
    );

    // Move the DOM focus after the keyboard navigation has rendered the new day
    React.useEffect(() => {
      if (shouldMoveFocus.current && focusedDate) {
        shouldMoveFocus.current = false;
        dateContainerRef.current
          ?.querySelector<HTMLElement>(`[data-date="${dateKey(focusedDate)}"]`)
          ?.focus();
      }
    }, [focusedDate, calendarDate]);

    const renderViewDays = React.useCallback(
      () => (
        <overridesMap.DateContainer ref={dateContainerRef} onKeyDown={handleDaysKeyDown}>
          {weeks.map(week => (
            <overridesMap.WeekRow key={week.weekNumber}>
              {week.days.map(day => {
                if (day.date.getMonth() === calendarDate.getMonth()) {
                  const badge = badges.find(b => isSameDay(b.date, day.date));
                  let fill = false;
                  let isSelected: boolean = false;

                  if (isRangeValue(value)) {
                    const [from, to] = value || [];

                    if (from && to) {
                      fill =
                        day.date.getTime() >= from.getTime() && day.date.getTime() <= to.getTime();
                    }
                    isSelected = Boolean(
                      (from && isSameDay(from, day.date)) || (to && isSameDay(to, day.date)),
                    );
                  } else if (isNotRangeValue(value)) {
                    isSelected = Boolean(value && isSameDay(value, day.date));
                  }

                  const key = dateKey(day.date);

                  return (
                    <overridesMap.Cell
                      key={day.date.getTime()}
                      data-date={key}
                      tabIndex={key === tabbableDateKey ? 0 : -1}
                      aria-label={dayLabelFormatter?.format(day.date)}
                      aria-pressed={isSelected || fill}
                      aria-current={day.isToday ? 'date' : undefined}
                      isToday={markToday && day.isToday}
                      isDisabled={day.isDisabled}
                      accentColor={accentColor}
                      isSelected={isSelected}
                      fill={fill}
                      onClick={handleCellDateClick(day.date)}
                    >
                      {getDayLabel(day.date)}

                      {badge && (
                        <overridesMap.DayBadge
                          badgeContent={badge.badgeContent}
                          isToday={day.isToday}
                          accentColor={badge.accentColor}
                        />
                      )}
                    </overridesMap.Cell>
                  );
                }

                return (
                  <overridesMap.EmptyCell key={day.date.getTime()} aria-hidden>
                    {getDayLabel(day.date)}
                  </overridesMap.EmptyCell>
                );
              })}
            </overridesMap.WeekRow>
          ))}
        </overridesMap.DateContainer>
      ),
      [
        accentColor,
        badges,
        calendarDate,
        dayLabelFormatter,
        getDayLabel,
        handleCellDateClick,
        handleDaysKeyDown,
        isSameDay,
        markToday,
        overridesMap,
        tabbableDateKey,
        value,
        weeks,
      ],
    );

    const renderViewMonths = React.useCallback(
      () => (
        <overridesMap.MonthsSelector>
          {monthsRange.map(monthIndex => {
            const isSelected = calendarDate.getMonth() === monthIndex;

            return (
              <overridesMap.MonthCell
                key={monthIndex}
                accentColor={accentColor}
                isSelected={isSelected}
                aria-pressed={isSelected}
                onClick={handleMonthSelected(monthIndex)}
              >
                {getMonthLabel(new Date(calendarDate.getFullYear(), monthIndex, 1, 0, 0, 0, 0))}
              </overridesMap.MonthCell>
            );
          })}
        </overridesMap.MonthsSelector>
      ),
      [accentColor, calendarDate, getMonthLabel, handleMonthSelected, monthsRange, overridesMap],
    );

    const renderViewYears = React.useCallback(
      () => (
        <overridesMap.YearsSelector
          accentColor={accentColor}
          date={calendarDate}
          onChange={y => handleYearSelected(y)()}
          years={yearsRange}
          locale={locale}
          minDate={minDate}
          maxDate={maxDate}
        />
      ),
      [
        accentColor,
        calendarDate,
        handleYearSelected,
        locale,
        maxDate,
        minDate,
        overridesMap,
        yearsRange,
      ],
    );

    const renderViewWeeks = React.useCallback(
      () => (
        <overridesMap.DateContainer>
          {getWeeks(calendarDate).map(week => {
            let isSelected = false;
            if (isRangeValue(value)) {
              const [from, to] = value || [];

              if (from && to) {
                if (
                  isSameDay(from, week.days[0].date) &&
                  isSameDay(to, week.days[week.days.length - 1].date)
                ) {
                  isSelected = true;
                }
              }
            }

            return (
              <overridesMap.WeekRowButton
                key={week.weekNumber}
                isSelected={isSelected}
                onClick={handleClickWeek(week)}
                accentColor={accentColor}
                week={week}
              >
                <overridesMap.WeekDayWeekNumber week={week}>
                  {week.weekNumber}
                </overridesMap.WeekDayWeekNumber>
                {week.days.map(day => {
                  const badge = badges.find(b => isSameDay(b.date, day.date));
                  const inCurrentMonth = day.date.getMonth() === calendarDate.getMonth();

                  return (
                    <overridesMap.WeekDayCell
                      key={day.date.getTime()}
                      isToday={markToday && day.isToday}
                      inCurrentMonth={inCurrentMonth}
                    >
                      {getDayLabel(day.date)}

                      {badge && (
                        <overridesMap.DayBadge
                          badgeContent={badge.badgeContent}
                          isToday={day.isToday}
                          accentColor={badge.accentColor}
                        />
                      )}
                    </overridesMap.WeekDayCell>
                  );
                })}
              </overridesMap.WeekRowButton>
            );
          })}
        </overridesMap.DateContainer>
      ),
      [
        accentColor,
        badges,
        calendarDate,
        getDayLabel,
        getWeeks,
        handleClickWeek,
        isSameDay,
        markToday,
        overridesMap,
        value,
      ],
    );

    const getActiveView = React.useCallback(() => view, [view]);

    const getCalendarDate = React.useCallback(() => calendarDate, [calendarDate]);

    /**
     * API
     */
    useImperativeHandle(
      ref,
      () => ({
        setView: selectView,
        reset: handleReset,
        setValue,
        getCalendarDate,
        setCalendarDate,
        getActiveView,
        setViews,
      }),
      [selectView, handleReset, getActiveView, setViews, getCalendarDate],
    );

    return (
      <overridesMap.Paper>
        <overridesMap.Header>
          {typeof heading !== 'undefined' && <overridesMap.Heading>{heading}</overridesMap.Heading>}
          {typeof subheading !== 'undefined' && (
            <overridesMap.Subheading>{subheading}</overridesMap.Subheading>
          )}
          <overridesMap.Toolbar>
            <overridesMap.ControlButton
              iconOnly
              onClick={handlePrevNextClick('prev')}
              disabled={view === 'years'}
              aria-label={prevButtonLabel}
              title={prevButtonLabel}
            >
              <overridesMap.IconPrev />
            </overridesMap.ControlButton>

            <overridesMap.ControlButton
              disabled={!views.includes('months')}
              onClick={() => {
                if (view === 'months' && views.includes('days')) {
                  selectView('days');
                }
                if (view !== 'months' && views.includes('months')) {
                  selectView('months');
                }
              }}
            >
              {getMonthLabel(calendarDate)}
            </overridesMap.ControlButton>

            <overridesMap.ControlButton
              disabled={!views.includes('years')}
              onClick={() => {
                if (view === 'years' && views.includes('days')) {
                  selectView('days');
                }
                if (view !== 'years' && views.includes('years')) {
                  selectView('years');
                }
              }}
            >
              {getYearLabel(calendarDate)}
            </overridesMap.ControlButton>

            <overridesMap.ControlButton
              iconOnly
              onClick={handlePrevNextClick('next')}
              disabled={view === 'years'}
              aria-label={nextButtonLabel}
              title={nextButtonLabel}
            >
              <overridesMap.IconNext />
            </overridesMap.ControlButton>
          </overridesMap.Toolbar>
        </overridesMap.Header>

        {view === 'days' && (
          <overridesMap.WeekDaysBar
            locale={locale}
            week={weeks[0]}
            format={weekDayLabelFormat || 'short'}
          />
        )}

        <overridesMap.Body>
          <ViewContainer key={view}>
            {view === 'days' && renderViewDays()}
            {view === 'weeks' && renderViewWeeks()}
            {view === 'months' && renderViewMonths()}
            {view === 'years' && renderViewYears()}
          </ViewContainer>
        </overridesMap.Body>
        {(typeof resetButtonLabel !== 'undefined' ||
          typeof todayButtonLabel !== 'undefined' ||
          typeof footer !== 'undefined') && (
          <overridesMap.Footer>
            {typeof footer !== 'undefined' && <>{footer}</>}
            {typeof todayButtonLabel !== 'undefined' && (
              <overridesMap.ControlButton onClick={handleToday}>
                {todayButtonLabel}
              </overridesMap.ControlButton>
            )}
            {typeof resetButtonLabel !== 'undefined' && (
              <overridesMap.ControlButton onClick={handleReset}>
                {resetButtonLabel}
              </overridesMap.ControlButton>
            )}
          </overridesMap.Footer>
        )}
      </overridesMap.Paper>
    );
  },
);

CalendarComponent.displayName = 'CalendarComponent';

export { CalendarComponent };
