import React from 'react';

import CalendarCell from './CalendarCell';
import CalendarEmptyCell from './CalendarEmptyCell';
import CalendarPaper from './CalendarPaper';
import CalendarHeader from './CalendarHeader';
import CalendarWeekRow from './CalendarWeekRow';
import CalendarDateContainer from './CalendarDateContainer';
import CalendarToolbar from './CalendarToolbar';
import CalendarMonthControl from './CalendarMonthControl';
import CalendarWeekDaysBar, { WeekNameLabelFormat } from './CalendarWeekDaysBar';
import CalendarYearsSelector from './CalendarYearsSelector';
import CalendarMonthesSelector from './CalendarMonthesSelector';
import CalendarMonthCell from './CalendarMonthCell';
import CalendarYearCell from './CalendarYearCell';
import CalendarDayBadge from './CalendarDayBadge';
import CalendarBody from './CalendarBody';
import CalendarFooter from './CalendarFooter';
import { useCalendar, WeekDayName } from './use-calendar';
import CalendarControlButton from './CalendarControlButton';
import CalendarHeading from './CalendarHeading';
import CalendarSubheading from './CalendarSubheading';

export type CalendarProps = {
  readonly value?: Date;
  readonly defaultValue?: Date;
  readonly onChange: (dates: Date) => void;
  readonly locale?: string;
  readonly badges?: readonly CalendarDadge[];
  readonly maxDate?: Date;
  readonly minDate?: Date;
  readonly weekStartDay?: WeekDayName;
  readonly weekDayLabelFormat?: WeekNameLabelFormat;
  readonly displayLeadingZero?: boolean;
  readonly markToday?: boolean;
  readonly accentColor?: 'primary' | 'secondary' | string;
  readonly prevMonthButtonTooltip?: string;
  readonly nextMonthButtonTooltip?: string;
  readonly changeMonthButtonTooltip?: string;
  readonly changeYearButtonTooltip?: string;
  readonly resetButtonLabel?: string;
  readonly toodayButtonLabel?: string;
  readonly heading?: React.ReactNode;
  readonly subheading?: React.ReactNode;
  readonly views?: readonly CalendarView[];
  readonly initialView?: CalendarView;
  readonly footer?: JSX.Element;
};

export type CalendarDadge = {
  readonly date: Date;
  readonly badgeContent: React.ReactNode;
  readonly accentColor?: 'primary' | 'secondary' | string;
};

export type CalendarView = 'days' | 'monthes' | 'years';

type State = {
  readonly calendarValue: Date;
  readonly calendarDate: Date;
  readonly calendarCurrentView: CalendarView;
  readonly calendarViewVariants: readonly CalendarView[];
};

const defaultState: State = {
  calendarValue: new Date(),
  calendarDate: new Date(),
  calendarCurrentView: 'days',
  calendarViewVariants: ['years', 'monthes', 'days'],
};

type Action = {
  readonly type: 'setPartial';
  readonly payload: Partial<State>;
};

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'setPartial':
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

const Calendar: React.FC<CalendarProps> = props => {
  const {
    minDate = new Date(new Date().getFullYear() - 100, 0, 1, 0, 0, 0),
    maxDate = new Date(new Date().getFullYear() + 100, 0, 1, 0, 0, 0),
    weekStartDay = 'monday',
    locale = 'ru-RU',
    displayLeadingZero = false,
    onChange,
    // selected = [],
    badges = [],
    // selectMultiple = false,
    value,
    defaultValue,
    markToday,
    weekDayLabelFormat = 'short',
    accentColor = 'primary',
    prevMonthButtonTooltip,
    nextMonthButtonTooltip,
    changeMonthButtonTooltip,
    changeYearButtonTooltip,
    views = defaultState.calendarViewVariants,
    initialView = defaultState.calendarCurrentView,
    resetButtonLabel,
    toodayButtonLabel,
    heading,
    subheading,
    footer,
  } = props;

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
    calendarViewVariants: views,
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
        // if (selectMultiple) {
        //   const selectedAsTime = selectedDate.getTime();
        //   const selectedSet = new Set(selected.map(s => s.getTime()));

        //   if (selectedSet.has(selectedAsTime)) {
        //     selectedSet.delete(selectedAsTime);
        //   } else {
        //     selectedSet.add(selectedAsTime);
        //   }

        //   onChange([...selectedSet].map(s => new Date(s)));
        // } else {
        // }
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

  const getNextPossibleView = React.useCallback(() => {
    const currentViewIndex = calendarViewVariants.findIndex(v => v === calendarCurrentView);
    if (currentViewIndex !== -1 && calendarViewVariants.length > currentViewIndex + 1) {
      return calendarViewVariants[currentViewIndex + 1];
    }

    return calendarViewVariants[0];
  }, [calendarCurrentView, calendarViewVariants]);

  const getPrevPossibleView = React.useCallback(() => {
    const currentViewIndex = calendarViewVariants.findIndex(v => v === calendarCurrentView);
    if (currentViewIndex !== -1 && currentViewIndex !== 0) {
      return calendarViewVariants[currentViewIndex - 1];
    }

    return calendarViewVariants[calendarViewVariants.length - 1];
  }, [calendarCurrentView, calendarViewVariants]);

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
        const nextView = getNextPossibleView();
        dispatch({
          type: 'setPartial',
          payload: {
            calendarDate: newDate,
            calendarCurrentView: nextView,
          },
        });
      }
    },
    [calendarDate, getNextPossibleView],
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
            calendarCurrentView: getNextPossibleView(),
          },
        });
      }
    },
    [calendarDate, getNextPossibleView],
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
    <CalendarPaper>
      <CalendarHeader>
        {typeof heading !== 'undefined' && <CalendarHeading>{heading}</CalendarHeading>}
        {typeof subheading !== 'undefined' && <CalendarSubheading>{subheading}</CalendarSubheading>}
        <CalendarToolbar>
          <CalendarMonthControl
            displayIcon="prev"
            onClick={handleChangeMonthClick('prev')}
            title={prevMonthButtonTooltip}
            disabled={calendarCurrentView !== 'days'}
          />
          <CalendarControlButton
            title={changeMonthButtonTooltip}
            disabled={!calendarViewVariants.includes('monthes')}
            onClick={handleChangeView(
              calendarCurrentView === 'monthes' ? getPrevPossibleView() : 'monthes',
            )}
          >
            {getMonthLabel(calendarDate)}
          </CalendarControlButton>
          <CalendarControlButton
            disabled={!calendarViewVariants.includes('years')}
            title={changeYearButtonTooltip}
            onClick={handleChangeView(
              calendarCurrentView === 'years' ? getPrevPossibleView() : 'years',
            )}
          >
            {getYearLabel(calendarDate)}
          </CalendarControlButton>
          <CalendarMonthControl
            displayIcon="next"
            onClick={handleChangeMonthClick('next')}
            title={nextMonthButtonTooltip}
            disabled={calendarCurrentView !== 'days'}
          />
        </CalendarToolbar>
      </CalendarHeader>

      <CalendarWeekDaysBar
        locale={locale}
        week={getWeeks(calendarDate)[0]}
        format={weekDayLabelFormat || 'short'}
      />

      <CalendarBody>
        {calendarCurrentView === 'years' && (
          <CalendarYearsSelector>
            {getYearsRange(minDate, maxDate).map(year => (
              <CalendarYearCell
                key={year}
                accentColor={accentColor}
                isSelected={year === calendarValue.getFullYear()}
                onClick={handleYearSelected(year)}
              >
                {getYearLabel(
                  new Date(year, calendarDate.getMonth(), calendarDate.getDate(), 0, 0, 0, 0),
                )}
              </CalendarYearCell>
            ))}
          </CalendarYearsSelector>
        )}

        {calendarCurrentView === 'monthes' && (
          <CalendarMonthesSelector>
            {getMonthesRange(minDate, maxDate).map(monthIndex => (
              <CalendarMonthCell
                key={monthIndex}
                accentColor={accentColor}
                isSelected={monthIndex === calendarValue.getMonth()}
                onClick={handleMonthSelected(monthIndex)}
              >
                {getMonthLabel(new Date(calendarDate.getFullYear(), monthIndex, 1, 0, 0, 0, 0))}
              </CalendarMonthCell>
            ))}
          </CalendarMonthesSelector>
        )}
        {calendarCurrentView === 'days' && (
          <CalendarDateContainer>
            {getWeeks(calendarDate).map(week => (
              <CalendarWeekRow key={week.weekNumber.toString()}>
                {week.days.map(day => {
                  if (day.date.getMonth() === calendarDate.getMonth()) {
                    const badge = badges.find(b => isSameDay(b.date, day.date));

                    return (
                      <CalendarCell
                        key={day.date.getTime()}
                        isToday={markToday && day.isToday}
                        isDisabled={day.isDisabled}
                        accentColor={accentColor}
                        isSelected={isSameDay(calendarValue, day.date)}
                        onClick={handleCellDateClick(day.date)}
                      >
                        {getDayLabel(day.date)}
                        {typeof badge !== 'undefined' && (
                          <CalendarDayBadge
                            badgeContent={badge.badgeContent}
                            isToday={day.isToday}
                            accentColor={badge.accentColor}
                          />
                        )}
                      </CalendarCell>
                    );
                  }

                  return <CalendarEmptyCell key={day.date.getTime()} />;
                })}
              </CalendarWeekRow>
            ))}
          </CalendarDateContainer>
        )}
      </CalendarBody>
      {(typeof resetButtonLabel !== 'undefined' ||
        typeof toodayButtonLabel !== 'undefined' ||
        typeof footer !== 'undefined') && (
        <CalendarFooter>
          {typeof footer !== 'undefined' && <>{footer}</>}
          {typeof toodayButtonLabel !== 'undefined' && (
            <CalendarControlButton onClick={handleToday}>{toodayButtonLabel}</CalendarControlButton>
          )}
          {typeof resetButtonLabel !== 'undefined' && (
            <CalendarControlButton onClick={handleReset}>{resetButtonLabel}</CalendarControlButton>
          )}
        </CalendarFooter>
      )}
    </CalendarPaper>
  );
};

export default Calendar;
