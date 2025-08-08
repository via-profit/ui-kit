import React from 'react';

import Body, { CalendarBodyProps } from './CalendarBody';
import Cell, { CalendarCellProps } from './CalendarCell';
import EmptyCell, { CalendarEmptyCellProps } from './CalendarEmptyCell';
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
import IconNext, { CalendarIconNextProps } from './IconChevronRight';
import WeekDaysBar, { CalendarWeekDaysBarProps, WeekNameLabelFormat } from './CalendarWeekDaysBar';
import { CalendarValue, useCalendar, WeekDayName } from './use-calendar';
import { CalendarView as CalendarViewName, createDefaultState, reducer, State } from './reducer';

export * from './use-calendar';
export * from './CalendarWeekDaysBar';
export type CalendarView = CalendarViewName;

export type CalendarProps<Range extends boolean | undefined = undefined> = {
  readonly range?: Range;
  /**
   * Selected date
   */
  readonly value?: CalendarValue<Range>;

  /**
   * selected value if your component should not be controlled
   */
  readonly defaultValue?: CalendarValue<Range>;

  /**
   * It will be called at the moment of selecting the given
   */
  readonly onChange: (dates: CalendarValue<Range>) => void;

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
  readonly toodayButtonLabel?: string;

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
  readonly Body?: React.ForwardRefExoticComponent<
    CalendarBodyProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Day element
   */
  readonly Cell?: React.ForwardRefExoticComponent<
    CalendarCellProps & React.RefAttributes<HTMLButtonElement>
  >;

  /**
   * Empty cell element
   */
  readonly EmptyCell?: React.ForwardRefExoticComponent<
    CalendarEmptyCellProps & React.RefAttributes<HTMLButtonElement>
  >;

  /**
   * Common container element
   */
  readonly Paper?: React.ForwardRefExoticComponent<
    CalendarPaperProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Header wrapper element
   */
  readonly Header?: React.ForwardRefExoticComponent<
    CalendarHeaderProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Week row container element
   */
  readonly WeekRow?: React.ForwardRefExoticComponent<
    CalendarWeekRowProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Days wrapper element
   */
  readonly DateContainer?: React.ForwardRefExoticComponent<
    CalendarDateContainerProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Toolbar wrapper element
   */
  readonly Toolbar?: React.ForwardRefExoticComponent<
    CalendarToolbarProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Years list element (year view)
   */
  readonly YearsSelector?: React.ForwardRefExoticComponent<
    CalendarYearsSelectorProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Monthes list element (month view)
   */
  readonly MonthsSelector?: React.ForwardRefExoticComponent<
    CalendarMonthsSelectorProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Month cell element in monthes list
   */
  readonly MonthCell?: React.ForwardRefExoticComponent<
    CalendarMonthCellProps & React.RefAttributes<HTMLButtonElement>
  >;

  /**
   * Year cell element in years list
   */
  readonly YearCell?: React.ForwardRefExoticComponent<
    CalendarYearCellProps & React.RefAttributes<HTMLButtonElement>
  >;

  /**
   * Badge of the day cell element
   */
  readonly DayBadge?: React.ForwardRefExoticComponent<
    CalendarDayBadgeProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * Footer container element
   */
  readonly Footer?: React.ForwardRefExoticComponent<
    CalendarFooterProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Common button element
   */
  readonly ControlButton?: React.ForwardRefExoticComponent<
    CalendarControlButtonProps & React.RefAttributes<HTMLButtonElement>
  >;

  /**
   * Heading element
   */
  readonly Heading?: React.ForwardRefExoticComponent<
    CalendarHeadingProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Subheading element
   */
  readonly Subheading?: React.ForwardRefExoticComponent<
    CalendarSubheadingProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Prev icon element in prev month button
   */
  readonly IconPrev?: React.ForwardRefExoticComponent<
    CalendarIconPrevProps & React.RefAttributes<SVGElement>
  >;

  /**
   * Next icon element in next month button
   */
  readonly IconNext?: React.ForwardRefExoticComponent<
    CalendarIconNextProps & React.RefAttributes<SVGElement>
  >;

  /**
   * Weeks bar  element
   */
  readonly WeekDaysBar?: React.ForwardRefExoticComponent<
    CalendarWeekDaysBarProps & React.RefAttributes<HTMLDivElement>
  >;
}

export type CalendarBadge = {
  readonly date: Date;
  readonly badgeContent: React.ReactNode;
  readonly accentColor?: 'primary' | 'secondary' | string;
};

const Calendar = <Range extends boolean | undefined = undefined>(
  props: CalendarProps<Range>,
): React.ReactNode => {
  const {
    minDate = new Date(new Date().getFullYear() - 100, 0, 1, 0, 0, 0),
    maxDate = new Date(new Date().getFullYear() + 100, 0, 1, 0, 0, 0),
    weekStartDay = 'monday',
    locale = 'ru-RU',
    displayLeadingZero = false,
    onChange,
    badges = [],
    value,
    defaultValue,
    markToday,
    weekDayLabelFormat = 'short',
    accentColor = 'primary',
    prevMonthButtonTooltip,
    nextMonthButtonTooltip,
    changeMonthButtonTooltip,
    changeYearButtonTooltip,
    initialView = createDefaultState(false).calendarCurrentView,
    resetButtonLabel,
    toodayButtonLabel,
    heading,
    subheading,
    footer,
    overrides,
    range = false,
  } = props;

  if (typeof value !== 'undefined' && typeof onChange === 'undefined') {
    throw new Error(
      'You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange`.',
    );
  }

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
    }),
    [overrides],
  );

  const realValue: CalendarValue<Range> = React.useMemo(
    () =>
      typeof value !== 'undefined'
        ? value
        : typeof defaultValue !== 'undefined'
          ? defaultValue
          : (new Date() as CalendarValue<Range>),
    [value, defaultValue],
  );

  const initialProps = React.useRef({
    value: realValue,
    badges,
    initialView,
  });
  const initialState: State<Range> = {
    ...createDefaultState(range),
    calendarValue: realValue,
    calendarDate: Array.isArray(realValue) ? realValue[0] : realValue,
    calendarCurrentView: initialView,
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

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

  const { calendarCurrentView, calendarViewVariants, calendarValue, calendarDate } = state;

  /**
   * Prev and next month buttons
   */
  const handleChangeMonthClick = React.useCallback(
    (type: 'prev' | 'next') => () => {
      const newDate =
        type === 'prev'
          ? new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1)
          : new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1);

      dispatch({ type: 'setPartial', payload: { calendarDate: newDate } });
    },
    [calendarDate],
  );

  /**
   * Date props was changed
   */
  React.useEffect(() => {
    if (typeof value !== 'undefined') {
      dispatch({
        type: 'setPartial',
        payload: {
          calendarValue: value,
          // calendarDate: Array.isArray(value) ? value[0] : value,
        },
      });
    }
  }, [value, calendarValue, isSameDay, dispatch]);

  /**
   * Handle click on Day button
   */
  const handleCellDateClick = React.useCallback(
    (selectedDate: Date) => () => {
      if (typeof onChange === 'function') {
        if (range) {
          const [fromDate, toDate] = calendarValue as CalendarValue<true>;

          dispatch({
            type: 'setPartial',
            payload: { calendarDate: selectedDate },
          });

          if (selectedDate.getTime() >= toDate.getTime()) {
            onChange([fromDate, selectedDate] as any);

            return;
          }

          if (selectedDate.getTime() < fromDate.getTime()) {
            onChange([selectedDate, toDate] as any);

            return;
          }

          if (
            selectedDate.getTime() > fromDate.getTime() &&
            selectedDate.getTime() < toDate.getTime()
          ) {
            const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            const daysBetweenFromDate = Math.round(
              Math.abs((fromDate.getTime() - selectedDate.getTime()) / oneDay),
            );
            const daysBetweenToDate = Math.round(
              Math.abs((toDate.getTime() - selectedDate.getTime()) / oneDay),
            );

            if (daysBetweenToDate <= daysBetweenFromDate) {
              onChange([fromDate, selectedDate] as any);

              return;
            }

            if (daysBetweenToDate > daysBetweenFromDate) {
              onChange([selectedDate, toDate] as any);

              return;
            }
          }

          throw new Error('Oooops. I don`t know whats is it');
        } else {
          onChange(selectedDate as any);
        }
      }

      if (!calendarValue) {
        dispatch({
          type: 'setPartial',
          payload: {
            calendarValue: selectedDate,
          },
        });
      }
    },
    [onChange, calendarValue, range],
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

      if (calendarDate.getFullYear() !== newDate.getFullYear()) {
        dispatch({
          type: 'setPartial',
          payload: {
            calendarDate: newDate,
            calendarCurrentView: 'days',
          },
        });
      }
    },
    [calendarDate],
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

      if (calendarDate.getMonth() !== newDate.getMonth()) {
        dispatch({
          type: 'setPartial',
          payload: {
            calendarDate: newDate,
            calendarCurrentView: 'days',
          },
        });
      }
    },
    [calendarDate],
  );

  /**
   * Manual view changing
   */
  const handleChangeView = React.useCallback(
    (selectedView: CalendarView) => () => {
      dispatch({
        type: 'setPartial',
        payload: {
          calendarCurrentView: selectedView,
        },
      });
    },
    [],
  );

  /**
   * Handle click on «Reset» button
   */
  const handleReset = React.useCallback(() => {
    dispatch({
      type: 'setPartial',
      payload: {
        calendarCurrentView: initialProps.current.initialView,
        calendarDate: initialProps.current.value as any,
        calendarValue: initialProps.current.value,
      },
    });

    if (typeof onChange === 'function') {
      onChange(initialProps.current.value);
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

    dispatch({
      type: 'setPartial',
      payload: {
        calendarDate: today,
      },
    });
  }, []);

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
            disabled={calendarCurrentView !== 'days'}
          >
            <overridesMap.IconPrev />
          </overridesMap.ControlButton>
          <overridesMap.ControlButton
            title={changeMonthButtonTooltip}
            isActive={calendarCurrentView === 'months'}
            disabled={!calendarViewVariants.includes('months')}
            onClick={handleChangeView(calendarCurrentView === 'months' ? 'days' : 'months')}
          >
            {getMonthLabel(calendarDate)}
          </overridesMap.ControlButton>
          <overridesMap.ControlButton
            isActive={calendarCurrentView === 'years'}
            disabled={!calendarViewVariants.includes('years')}
            title={changeYearButtonTooltip}
            onClick={handleChangeView(calendarCurrentView === 'years' ? 'days' : 'years')}
          >
            {getYearLabel(calendarDate)}
          </overridesMap.ControlButton>
          <overridesMap.ControlButton
            iconOnly
            onClick={handleChangeMonthClick('next')}
            title={nextMonthButtonTooltip}
            disabled={calendarCurrentView !== 'days'}
          >
            <overridesMap.IconNext />
          </overridesMap.ControlButton>
        </overridesMap.Toolbar>
      </overridesMap.Header>

      <overridesMap.WeekDaysBar
        locale={locale}
        week={getWeeks(calendarDate)[0]}
        format={weekDayLabelFormat || 'short'}
      />

      <overridesMap.Body>
        {calendarCurrentView === 'years' && (
          <overridesMap.YearsSelector>
            {getYearsRange(minDate, maxDate).map(year => {
              const a = Array.isArray(calendarValue) ? calendarValue : [calendarValue];
              const isSelected = a.find(d => d.getFullYear() === year) !== undefined;

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

        {calendarCurrentView === 'months' && (
          <overridesMap.MonthsSelector>
            {getMonthsRange(minDate, maxDate).map(monthIndex => {
              const a = Array.isArray(calendarValue) ? calendarValue : [calendarValue];
              const isSelected = a.find(d => d.getMonth() === monthIndex) !== undefined;

              return (
                <overridesMap.MonthCell
                  key={monthIndex}
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
        {calendarCurrentView === 'days' && (
          <overridesMap.DateContainer>
            {getWeeks(calendarDate).map(week => (
              <overridesMap.WeekRow key={week.weekNumber.toString()}>
                {week.days.map(day => {
                  if (day.date.getMonth() === calendarDate.getMonth()) {
                    const badge = badges.find(b => isSameDay(b.date, day.date));
                    const a = Array.isArray(calendarValue)
                      ? calendarValue
                      : [calendarValue, calendarValue];
                    const isSelected = isSameDay(a[0], day.date) || isSameDay(a[1], day.date);

                    const fill = Array.isArray(calendarValue)
                      ? day.date.getTime() > calendarValue[0].getTime() &&
                        day.date.getTime() < calendarValue[1].getTime()
                      : false;

                    return (
                      <overridesMap.Cell
                        key={day.date.getTime()}
                        isToday={markToday && day.isToday}
                        isDisabled={day.isDisabled}
                        accentColor={accentColor}
                        isSelected={isSelected}
                        onClick={handleCellDateClick(day.date)}
                        fill={fill}
                      >
                        {getDayLabel(day.date)}
                        {typeof badge !== 'undefined' && (
                          <overridesMap.DayBadge
                            badgeContent={badge.badgeContent}
                            isToday={day.isToday}
                            accentColor={badge.accentColor}
                          />
                        )}
                      </overridesMap.Cell>
                    );
                  }

                  return <overridesMap.EmptyCell key={day.date.getTime()} />;
                })}
              </overridesMap.WeekRow>
            ))}
          </overridesMap.DateContainer>
        )}
      </overridesMap.Body>
      {(typeof resetButtonLabel !== 'undefined' ||
        typeof toodayButtonLabel !== 'undefined' ||
        typeof footer !== 'undefined') && (
        <overridesMap.Footer>
          {typeof footer !== 'undefined' && <>{footer}</>}
          {typeof toodayButtonLabel !== 'undefined' && (
            <overridesMap.ControlButton onClick={handleToday}>
              {toodayButtonLabel}
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
};

export default Calendar;
