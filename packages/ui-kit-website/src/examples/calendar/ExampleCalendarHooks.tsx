import React from 'react';
import styled from '@emotion/styled';
import { useCalendar } from '@via-profit/ui-kit/src/Calendar';

const Week = styled.div`
  display: flex;
  align-items: center;
`;

const DayOfCurrentMonth = styled.span`
  width: 3em;
  height: 3em;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  display: inline-flex;
  border-radius: ${({ theme }) => theme.shape.radiusFactor}em;
`;

const DayOfAnotherMonth = styled(DayOfCurrentMonth)`
  opacity: 0.4;
`;

const CurrentDay = styled(DayOfCurrentMonth)`
  background-color: ${({ theme }) => theme.color.accentPrimary.toString()};
  color: ${({ theme }) => theme.color.accentPrimaryContrast.toString()};
`;

const ExampleCalendarHooks: React.FC = () => {
  const currenrtDate = new Date();
  const { getWeeks, getDayLabel } = useCalendar({
    locale: 'ru-RU',
    weekStartDay: 'monday',
    displayLeadingZero: false,
    minDate: new Date(new Date().getFullYear() - 100, 0, 1),
    maxDate: new Date(new Date().getFullYear() + 100, 0, 1),
  });

  return (
    <div>
      {getWeeks(currenrtDate).map(week => {
        const { days, weekNumber } = week;

        return (
          <Week key={weekNumber}>
            {days.map(day => {
              const { date, isToday } = day;
              const dayLabel = getDayLabel(date);
              const key = date.getTime();
              const isDayOfCurrentMonth = date.getMonth() === currenrtDate.getMonth();

              if (isToday) {
                return <CurrentDay key={key}>{dayLabel}</CurrentDay>;
              }

              if (isDayOfCurrentMonth) {
                return <DayOfCurrentMonth key={key}>{dayLabel}</DayOfCurrentMonth>;
              }

              return <DayOfAnotherMonth key={key}>{dayLabel}</DayOfAnotherMonth>;
            })}
          </Week>
        );
      })}
    </div>
  );
};

export default ExampleCalendarHooks;
