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
import MonthesSelector, { CalendarMonthesSelectorProps } from './CalendarMonthesSelector';
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
import { useCalendar, WeekDayName } from './use-calendar';
import { CalendarView, reducer, defaultState } from './reducer';

export type CalendarProps = {
  /**
   * Selected date
   */
  readonly value?: Date;

  /**
   * selected value if your conponent should not be controlled
   */
  readonly defaultValue?: Date;

  /**
   * It will be called at the moment of selecting the given
   */
  readonly onChange: (dates: Date) => void;

  /**
   * calendar locale\
   * **Default:** `ru-RU`
   */
  readonly locale?: string;

  /**
   * array of badges
   */
  readonly badges?: readonly CalendarBadge[];
  readonly maxDate?: Date;
  readonly minDate?: Date;

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
   */
  readonly displayLeadingZero?: boolean;

  /**
   * Mark current day cell
   */
  readonly markToday?: boolean;

  /**
   * Cell accent color
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
   * Initial name of the view
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
  readonly MonthesSelector?: React.ForwardRefExoticComponent<
    CalendarMonthesSelectorProps & React.RefAttributes<HTMLDivElement>
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

const Calendar: React.FC<CalendarProps> = props => {
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
    initialView = defaultState.calendarCurrentView,
    resetButtonLabel,
    toodayButtonLabel,
    heading,
    subheading,
    footer,
    overrides,
  } = props;

  if (typeof value !== 'undefined' && typeof onChange === 'undefined') {
    throw new Error(
      'You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange`.',
    );
  }

  const overridesMap = React.useMemo(
    () => ({
      Body,
      Cell,
      EmptyCell,
      Paper,
      Header,
      WeekRow,
      DateContainer,
      Toolbar,
      YearsSelector,
      MonthesSelector,
      MonthCell,
      YearCell,
      DayBadge,
      Footer,
      ControlButton,
      Heading,
      Subheading,
      IconPrev,
      IconNext,
      WeekDaysBar,
      ...overrides,
    }),
    [overrides],
  );

  const realValue = React.useMemo(
    () =>
      typeof value !== 'undefined'
        ? value
        : typeof defaultValue !== 'undefined'
        ? defaultValue
        : new Date(),
    [value, defaultValue],
  );

  const initialProps = React.useRef({
    value: realValue,
    badges,
    initialView,
  });

  const [state, dispatch] = React.useReducer(reducer, {
    ...defaultState,
    calendarValue: realValue,
    calendarDate: realValue,
    calendarCurrentView: initialView,
  });
  const {
    isSameDay,
    getWeeks,
    getDayLabel,
    getMonthLabel,
    getYearLabel,
    getYearsRange,
    getMonthesRange,
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
    if (typeof value !== 'undefined' && !isSameDay(value, calendarValue)) {
      dispatch({
        type: 'setPartial',
        payload: {
          calendarValue: value,
          calendarDate: value,
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
        onChange(selectedDate);
      }

      if (!value) {
        dispatch({
          type: 'setPartial',
          payload: {
            calendarValue: selectedDate,
          },
        });
      }
    },
    [onChange, value],
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
        calendarDate: initialProps.current.value,
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
            isActive={calendarCurrentView === 'monthes'}
            disabled={!calendarViewVariants.includes('monthes')}
            onClick={handleChangeView(calendarCurrentView === 'monthes' ? 'days' : 'monthes')}
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
            {getYearsRange(minDate, maxDate).map(year => (
              <overridesMap.YearCell
                key={year}
                accentColor={accentColor}
                isSelected={year === calendarValue.getFullYear()}
                onClick={handleYearSelected(year)}
              >
                {getYearLabel(
                  new Date(year, calendarDate.getMonth(), calendarDate.getDate(), 0, 0, 0, 0),
                )}
              </overridesMap.YearCell>
            ))}
          </overridesMap.YearsSelector>
        )}

        {calendarCurrentView === 'monthes' && (
          <overridesMap.MonthesSelector>
            {getMonthesRange(minDate, maxDate).map(monthIndex => (
              <overridesMap.MonthCell
                key={monthIndex}
                accentColor={accentColor}
                isSelected={monthIndex === calendarValue.getMonth()}
                onClick={handleMonthSelected(monthIndex)}
              >
                {getMonthLabel(new Date(calendarDate.getFullYear(), monthIndex, 1, 0, 0, 0, 0))}
              </overridesMap.MonthCell>
            ))}
          </overridesMap.MonthesSelector>
        )}
        {calendarCurrentView === 'days' && (
          <overridesMap.DateContainer>
            {getWeeks(calendarDate).map(week => (
              <overridesMap.WeekRow key={week.weekNumber.toString()}>
                {week.days.map(day => {
                  if (day.date.getMonth() === calendarDate.getMonth()) {
                    const badge = badges.find(b => isSameDay(b.date, day.date));

                    return (
                      <overridesMap.Cell
                        key={day.date.getTime()}
                        isToday={markToday && day.isToday}
                        isDisabled={day.isDisabled}
                        accentColor={accentColor}
                        isSelected={isSameDay(calendarValue, day.date)}
                        onClick={handleCellDateClick(day.date)}
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
