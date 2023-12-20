import React from 'react';

import CalendarCell from './CalendarCell';
import CalendarEmptyCell from './CalendarEmptyCell';
import CalendarPaper from './CalendarPaper';
import CalendarHeader from './CalendarHeader';
import CalendarWeekRow from './CalendarWeekRow';
import CalendarDateContainer from './CalendarDateContainer';
import CalendarToolbar from './CalendarToolbar';
import CalendarMonthControl from './CalendarMonthControl';
import CalendarMonthButton from './CalendarMonthButton';
import CalendarYearButton from './CalendarYearButton';
import CalendarWeekDaysBar, { WeekNameLabelFormat } from './CalendarWeekDaysBar';
import CalendarYearsSelector from './CalendarYearsSelector';
import CalendarMonthesSelector from './CalendarMonthesSelector';
import CalendarMonthCell from './CalendarMonthCell';
import CalendarYearCell from './CalendarYearCell';
import CalendarDayBadge from './CalendarDayBadge';
import CalendarBody from './CalendarBody';
import { useCalendar, WeekDayName } from './use-calendar';

export type CalendarProps = {
  readonly value?: Date;
  readonly onChange?: (date: Date) => void;
  readonly onDateSelect?: (date: Date) => void;
  readonly locale?: string;
  readonly selected?: readonly Date[];
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
  readonly views?: readonly CalendarView[];
  readonly initialView?: CalendarView;
};

export type CalendarDadge = {
  readonly date: Date;
  readonly badgeContent: React.ReactNode;
  readonly accentColor?: 'primary' | 'secondary' | string;
};

export type CalendarView = 'days' | 'monthes' | 'years';

type State = {
  readonly calendarDate: Date;
  readonly calendarCurrentView: CalendarView;
  readonly calendarViewVariants: readonly CalendarView[];
};

const defaultState: State = {
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
    onDateSelect,
    onChange,
    selected = [],
    badges = [],
    value,
    markToday,
    weekDayLabelFormat = 'short',
    accentColor = 'primary',
    prevMonthButtonTooltip,
    nextMonthButtonTooltip,
    changeMonthButtonTooltip,
    changeYearButtonTooltip,
    views = defaultState.calendarViewVariants,
    initialView = defaultState.calendarCurrentView,
  } = props;

  const [state, dispatch] = React.useReducer(reducer, {
    ...defaultState,
    calendarDate: typeof value === 'undefined' ? new Date() : value,
    calendarViewVariants: views,
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

  const { calendarCurrentView, calendarViewVariants, calendarDate } = state;
  const handleChangeMonthClick = React.useCallback(
    (type: 'prev' | 'next') => () => {
      const newDate =
        type === 'prev'
          ? new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1)
          : new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1);

      if (!isSameDay(newDate, calendarDate)) {
        dispatch({ type: 'setPartial', payload: { calendarDate: newDate } });
        if (typeof onChange === 'function') {
          onChange(newDate);
        }
      }
    },
    [calendarDate, isSameDay, onChange],
  );

  // Date props was changed
  React.useEffect(() => {
    if (typeof value !== 'undefined' && !isSameDay(value, calendarDate)) {
      dispatch({ type: 'setPartial', payload: { calendarDate: value } });
    }
  }, [value, calendarDate, isSameDay, dispatch]);

  const handleCellDateClick = React.useCallback(
    (selectedDate: Date) => () => {
      if (typeof onDateSelect === 'function') {
        onDateSelect(selectedDate);
      }
    },
    [onDateSelect],
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

        if (typeof onChange === 'function') {
          onChange(newDate);
        }
      }
    },
    [calendarDate, getNextPossibleView, onChange],
  );
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

        if (typeof onChange === 'function') {
          onChange(newDate);
        }
      }
    },
    [calendarDate, getNextPossibleView, onChange],
  );

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

  return (
    <CalendarPaper>
      <CalendarHeader>
        <CalendarToolbar>
          <CalendarMonthControl
            displayIcon="prev"
            onClick={handleChangeMonthClick('prev')}
            title={prevMonthButtonTooltip}
            disabled={!calendarViewVariants.includes('monthes') || calendarCurrentView !== 'days'}
          />
          <CalendarMonthButton
            title={changeMonthButtonTooltip}
            disabled={!calendarViewVariants.includes('monthes')}
            onClick={handleChangeView(
              calendarCurrentView === 'monthes' ? getPrevPossibleView() : 'monthes',
            )}
          >
            {getMonthLabel(calendarDate)}
          </CalendarMonthButton>
          <CalendarYearButton
            disabled={!calendarViewVariants.includes('years')}
            title={changeYearButtonTooltip}
            onClick={handleChangeView(
              calendarCurrentView === 'years' ? getPrevPossibleView() : 'years',
            )}
          >
            {getYearLabel(calendarDate)}
          </CalendarYearButton>
          <CalendarMonthControl
            displayIcon="next"
            onClick={handleChangeMonthClick('next')}
            title={nextMonthButtonTooltip}
            disabled={!calendarViewVariants.includes('monthes') || calendarCurrentView !== 'days'}
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
                isSelected={year === calendarDate.getFullYear()}
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
                isSelected={monthIndex === calendarDate.getMonth()}
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
                        isSelected={selected.find(s => isSameDay(s, day.date)) !== undefined}
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
    </CalendarPaper>
  );
};

export default Calendar;
