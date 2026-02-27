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
import YearCell, { CalendarYearCellProps } from './CalendarYearCell';
import DayBadge, { CalendarDayBadgeProps } from './CalendarDayBadge';
import Footer, { CalendarFooterProps } from './CalendarFooter';
import ControlButton, { CalendarControlButtonProps } from './CalendarControlButton';
import Heading, { CalendarHeadingProps } from './CalendarHeading';
import Subheading, { CalendarSubheadingProps } from './CalendarSubheading';
import IconPrev, { CalendarIconPrevProps } from './CalendarIconPrev';
import IconNext, { CalendarIconNextProps } from './CalendarIconNext';
import WeekDaysBar, { CalendarWeekDaysBarProps, WeekNameLabelFormat } from './CalendarWeekDaysBar';
import { CalendarValue, useCalendar, Week, WeekDayName } from './use-calendar';

export * from './use-calendar';
export * from './CalendarWeekDaysBar';
export type CalendarView = 'days' | 'months' | 'years' | 'weeks';
export type CalendarProps<IsRangeValue extends boolean | undefined = undefined> = {
  readonly range?: IsRangeValue;
  /**
   * Selected date
   */
  readonly value?: CalendarValue<IsRangeValue> | null;

  /**
   * selected value if your component should not be controlled
   */
  readonly defaultValue?: CalendarValue<IsRangeValue> | null;

  /**
   * It will be called at the moment of selecting the given
   */
  readonly onChange: (dates: NonNullable<CalendarValue<IsRangeValue>>) => void;

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
   * Tooltip for the Prev month button
   */
  readonly prevMonthButtonTooltip?: string;

  /**
   * Tooltip for the Next month button
   */
  readonly nextMonthButtonTooltip?: string;

  /**
   * Tooltip for tne month selector button
   */
  readonly changeMonthButtonTooltip?: string;

  /**
   * Tooltip for the year selector button
   */
  readonly changeYearButtonTooltip?: string;

  /**
   * Label for the Reset button. If label passed, then button will be rendered
   */
  readonly resetButtonLabel?: string;

  /**
   * Label for the Today button. If label passed, then button will be rendered
   */
  readonly todayButtonLabel?: string;

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
  readonly footer?: JSX.Element;

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
    CalendarEmptyCellProps & React.RefAttributes<HTMLButtonElement>
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
    CalendarWeekRowProps & React.RefAttributes<HTMLDivElement>
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
   * Year cell element in years list
   */
  readonly YearCell?: React.ComponentType<
    CalendarYearCellProps & React.RefAttributes<HTMLButtonElement>
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
  readonly IconPrev?: React.ComponentType<CalendarIconPrevProps & React.RefAttributes<SVGElement>>;

  /**
   * Next icon element in next month button
   */
  readonly IconNext?: React.ComponentType<CalendarIconNextProps & React.RefAttributes<SVGElement>>;

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

export type CalendarRef<IsRangeValue extends boolean | undefined = undefined> = {
  readonly setView: (view: CalendarView) => void;
  readonly setValue: (value: CalendarValue<IsRangeValue> | null) => void;
  readonly setCalendarDate: (date: Date) => void;
};

const isRangeValue = (value: unknown): value is CalendarValue<true> => {
  if (value instanceof Array) {
    return value.every(v => v instanceof Date || v === null);
  }

  return false;
};

const isNotRangeValue = (value: unknown): value is Date => !isRangeValue(value);

const computeViews = (inputViews?: readonly CalendarView[]): readonly CalendarView[] =>
  inputViews || ['days', 'months', 'years', 'weeks'];

const computeView = (inputParams: {
  inputView: CalendarView | undefined;
  inputInitialView: CalendarView | undefined;
  inputViews: readonly CalendarView[] | undefined;
}): CalendarView => {
  const { inputView, inputViews, inputInitialView } = inputParams;
  if (typeof inputView === 'undefined' && inputViews) {
    return inputViews[0];
  }

  if (inputViews && typeof inputView === 'string') {
    if (!inputViews.includes(inputView)) {
      throw new Error('Property views must be contained property initialView');
    }
  }

  if (typeof inputView === 'string') {
    return inputView;
  }

  return inputInitialView ?? inputView ?? 'days';
};

const computeCalendarDate = (params: {
  readonly inputValue?: Date | CalendarValue<true> | null;
  readonly defaultValue?: Date | CalendarValue<true> | null;
}): Date => {
  const { inputValue, defaultValue } = params;
  const today = new Date();
  if (inputValue) {
    if (isRangeValue(inputValue) && inputValue[0]) {
      return inputValue[0];
    }
  }

  if (isRangeValue(defaultValue) && defaultValue[0]) {
    return defaultValue[0];
  }

  return today;
};

const Calendar = React.forwardRef(
  <IsRangeValue extends boolean | undefined = undefined>(
    props: CalendarProps<IsRangeValue>,
    ref: React.Ref<CalendarRef<IsRangeValue>>,
  ): React.ReactNode => {
    const {
      minDate = new Date(new Date().getFullYear() - 100, 0, 1, 0, 0, 0),
      maxDate = new Date(new Date().getFullYear() + 100, 0, 1, 0, 0, 0),
      weekStartDay = 'monday',
      locale = 'ru-RU',
      displayLeadingZero = false,
      onChange,
      badges = [],
      markToday,
      weekDayLabelFormat = 'short',
      accentColor = 'primary',
      prevMonthButtonTooltip,
      nextMonthButtonTooltip,
      changeMonthButtonTooltip,
      changeYearButtonTooltip,
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
    } = props;

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

    if (!inputValue && typeof onChange === 'undefined') {
      throw new Error(
        'You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange`.',
      );
    }

    if (inputView && inputInitialView) {
      throw new Error('You can not use view and initialView at the same time.');
    }

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
        YearCell: overrides?.YearCell || YearCell,
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
    const [value, setValue] = React.useState<[Date | null, Date | null] | Date | null>(
      inputValue ?? defaultValue ?? null,
    );

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
    const [views] = React.useState<readonly CalendarView[]>(() => computeViews(inputViews));

    const resetVariablesRef = React.useRef({
      calendarDate,
      value,
      view,
    });

    /**
     * API
     */
    useImperativeHandle(
      ref,
      () => ({
        setView,
        // setViews,
        setValue,
        setCalendarDate,
      }),
      [],
    );

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

    /**
     * value was changed
     */
    React.useEffect(() => {
      if (inputValue && JSON.stringify(inputValue) !== JSON.stringify(value)) {
        setValue(inputValue);

        if (isRangeValue(inputValue) && inputValue[0] instanceof Date) {
          setCalendarDate(inputValue[0]);
        } else {
          setCalendarDate(inputValue as Date);
        }
      }
    }, [value, inputValue]);

    /**
     * Prev and next month buttons
     */
    const handleChangeMonthClick = React.useCallback(
      (type: 'prev' | 'next') => () => {
        const newDate =
          type === 'prev'
            ? new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1)
            : new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1);

        setCalendarDate(newDate);
      },
      [calendarDate],
    );

    /**
     * Handles click on a day cell.
     * Range selection follows a simple two‑click model:
     * 1) First click sets the start date.
     * 2) Second click sets the end date.
     * If a full range is already selected, a new click starts a new range.
     */
    const handleCellDateClick = React.useCallback(
      (selectedDate: Date) => () => {
        if (!onChange) {
          return;
        }

        // Single-date mode
        if (!range) {
          onChange(selectedDate as any);
          if (!inputValue) {
            setValue(selectedDate);
          }

          return;
        }

        // Range-date mode
        const [from, to] = (value as CalendarValue<true> | null) ?? [];

        // No range selected yet → first click
        if (!from && !to) {
          setValue([selectedDate, null]);

          return;
        }

        // Only start date selected → second click
        if (from && (!to || from.getTime() === to.getTime())) {
          if (selectedDate < from) {
            // User clicked before the start → swap
            // onChange([selectedDate, from] as any);
            if (!inputValue) {
              setValue([selectedDate, from]);
            }
          } else {
            // Normal forward range
            onChange([from, selectedDate] as any);
            if (!inputValue) {
              setValue([from, selectedDate]);
            }
          }

          return;
        }

        // Full range already selected → start a new range
        onChange([selectedDate, selectedDate] as any);
        if (!inputValue) {
          setValue([selectedDate, selectedDate]);
        }
      },
      [onChange, range, value, inputValue],
    );

    /**
     * Handle of click on year item
     */
    const handleYearSelected = React.useCallback(
      (selectedYear: number) => () => {
        const newDate = new Date(calendarDate);
        newDate.setFullYear(selectedYear);
        newDate.setMonth(calendarDate.getMonth());
        newDate.setDate(1);
        newDate.setHours(0);
        newDate.setMinutes(0);
        newDate.setMilliseconds(0);

        let nextView: CalendarView | undefined = undefined;

        if (views.includes('days')) {
          nextView = 'days';
        }
        if (views.includes('months')) {
          nextView = 'months';
        }

        setCalendarDate(newDate);
        if (nextView) {
          setView(nextView);
        }

        if (!nextView && typeof onChange === 'function') {
          handleCellDateClick(newDate)();
        }
      },
      [calendarDate, views, handleCellDateClick, onChange],
    );

    /**
     * Handle of click on month item
     */
    const handleMonthSelected = React.useCallback(
      (monthIndex: number) => () => {
        const newDate = new Date(calendarDate);
        newDate.setMonth(monthIndex);
        newDate.setDate(1);
        newDate.setHours(0);
        newDate.setMinutes(0);
        newDate.setMilliseconds(0);

        const nextView = views.includes('days') ? 'days' : undefined;

        setCalendarDate(newDate);
        if (nextView) {
          setView(nextView);
        }

        if (!nextView && typeof onChange === 'function') {
          handleCellDateClick(newDate)();
        }
      },
      [calendarDate, views, handleCellDateClick, onChange],
    );

    /**
     * Manual view changing
     */
    const handleChangeView = React.useCallback(
      (selectedView: CalendarView) => () => {
        if (!views.includes(selectedView)) {
          return;
        }

        setView(selectedView);
      },
      [views],
    );

    /**
     * Handle click on «Reset» button
     */
    const handleReset = React.useCallback(() => {
      setCalendarDate(resetVariablesRef.current.calendarDate);
      setValue(resetVariablesRef.current.value);
      setView(resetVariablesRef.current.view);

      if (typeof onChange === 'function') {
        onChange(resetVariablesRef.current.value as CalendarValue<IsRangeValue>);
      }
    }, [onChange]);

    /**
     * Handle click on «Today» button
     */
    const handleToday = React.useCallback(() => {
      const today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      today.setMilliseconds(0);

      setCalendarDate(today);

      setValue(range ? [today, today] : today);

      handleCellDateClick(today)();
    }, [handleCellDateClick, range]);

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
          setView(nextView);
        }

        /// set value
        if (range) {
          setValue(dates as CalendarValue<IsRangeValue>);

          if (typeof onChange === 'function') {
            onChange(dates as NonNullable<CalendarValue<IsRangeValue>>);
          }
        } else {
          setValue(dates[0]);

          if (typeof onChange === 'function') {
            onChange(dates[0] as any);
          }
        }
      },
      [views, onChange, range],
    );

    const weeks = React.useMemo(() => getWeeks(calendarDate), [calendarDate, getWeeks]);

    const yearsRange = React.useMemo(
      () => (view === 'years' ? getYearsRange(minDate, maxDate) : []),
      [view, minDate, maxDate, getYearsRange],
    );

    const monthsRange = React.useMemo(
      () => (view === 'months' ? getMonthsRange(minDate, maxDate) : []),
      [view, minDate, maxDate, getMonthsRange],
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
              onClick={handleChangeMonthClick('prev')}
              title={prevMonthButtonTooltip}
              disabled={!['days', 'weeks'].includes(view)}
            >
              <overridesMap.IconPrev />
            </overridesMap.ControlButton>
            <overridesMap.ControlButton
              title={changeMonthButtonTooltip}
              isActive={view === 'months'}
              disabled={!views.includes('months')}
              onClick={handleChangeView(view === 'months' ? 'days' : 'months')}
            >
              {getMonthLabel(calendarDate)}
            </overridesMap.ControlButton>
            <overridesMap.ControlButton
              isActive={view === 'years'}
              disabled={!views.includes('years')}
              title={changeYearButtonTooltip}
              onClick={handleChangeView(view === 'years' ? 'days' : 'years')}
            >
              {getYearLabel(calendarDate)}
            </overridesMap.ControlButton>
            <overridesMap.ControlButton
              iconOnly
              onClick={handleChangeMonthClick('next')}
              title={nextMonthButtonTooltip}
              disabled={!['days', 'weeks'].includes(view)}
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
          {view === 'years' && (
            <overridesMap.YearsSelector>
              {yearsRange.map(year => {
                const isSelected = calendarDate.getFullYear() === year;

                return (
                  <overridesMap.YearCell
                    key={year}
                    accentColor={accentColor}
                    isSelected={isSelected}
                    onClick={handleYearSelected(year)}
                  >
                    {getYearLabel(
                      new Date(year, calendarDate.getMonth(), calendarDate.getDate(), 0, 0, 0, 0),
                    )}
                  </overridesMap.YearCell>
                );
              })}
            </overridesMap.YearsSelector>
          )}

          {view === 'months' && (
            <overridesMap.MonthsSelector>
              {monthsRange.map(monthIndex => {
                const isSelected = calendarDate.getMonth() === monthIndex;

                return (
                  <overridesMap.MonthCell
                    key={monthIndex + monthsRange[monthIndex]}
                    accentColor={accentColor}
                    isSelected={isSelected}
                    onClick={handleMonthSelected(monthIndex)}
                  >
                    {getMonthLabel(new Date(calendarDate.getFullYear(), monthIndex, 1, 0, 0, 0, 0))}
                  </overridesMap.MonthCell>
                );
              })}
            </overridesMap.MonthsSelector>
          )}
          {view === 'weeks' && (
            <overridesMap.DateContainer>
              {getWeeks(calendarDate).map(week => {
                let isSelected = false;
                if (isRangeValue(value)) {
                  const [from, to] = value;

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
          )}
          {view === 'days' && (
            <overridesMap.DateContainer>
              {getWeeks(calendarDate).map(week => (
                <overridesMap.WeekRow key={week.weekNumber}>
                  {week.days.map(day => {
                    if (day.date.getMonth() === calendarDate.getMonth()) {
                      const badge = badges.find(b => isSameDay(b.date, day.date));
                      let fill = false;
                      let isSelected: boolean = false;

                      if (isRangeValue(value)) {
                        const [from, to] = value;

                        if (from && to) {
                          fill =
                            day.date.getTime() >= from.getTime() &&
                            day.date.getTime() <= to.getTime();
                        }
                        isSelected = Boolean(
                          (from && isSameDay(from, day.date)) || (to && isSameDay(to, day.date)),
                        );
                      } else if (isNotRangeValue(value)) {
                        isSelected = Boolean(value && isSameDay(value, day.date));
                      }

                      return (
                        <overridesMap.Cell
                          key={day.date.getTime()}
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
                      <overridesMap.EmptyCell key={day.date.getTime()}>
                        {getDayLabel(day.date)}
                      </overridesMap.EmptyCell>
                    );
                  })}
                </overridesMap.WeekRow>
              ))}
            </overridesMap.DateContainer>
          )}
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

Calendar.displayName = 'Calendar';

export default Calendar as <IsRangeValue extends boolean | undefined = undefined>(
  props: CalendarProps<IsRangeValue> & { ref?: React.Ref<CalendarRef<IsRangeValue>> },
) => JSX.Element;
