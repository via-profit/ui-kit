// import React from 'react';

// import useCalendar, { WeekDayName } from './use-calendar';
// import CalendarCell from './CalendarCell';
// import CalendarEmptyCell from './CalendarEmptyCell';
// import CalendarPaper from './CalendarPaper';
// import CalendarWeekRow from './CalendarWeekRow';
// import CalendarDateContainer from './CalendarDateContainer';
// import CalendarTopBar from './CalendarTopBar';
// import CalendarMonthControl from './CalendarMonthControl';
// import CalendarWeekDaysBar, { WeekNameLabelFormat } from './CalendarWeekDaysBar';
// import Menu from '../Menu';
// import MenuItem from '../Menu/MenuItem';
// import Button from '../Button';

// export interface CalendarProps {
//   readonly date: Date;
//   readonly locale?: string;
//   readonly selected?: Date[];
//   readonly onSelectDate?: (date: Date) => void;
//   readonly onDateChange?: (date: Date) => void;
//   readonly maxDate?: Date;
//   readonly minDate?: Date;
//   readonly weekStartDay?: WeekDayName;
//   readonly weekDayLabelFormat?: WeekNameLabelFormat;
//   readonly displayLeadingZero?: boolean;
// }

// export * from './use-calendar';

// const Calendar: React.FC<CalendarProps> = props => {
//   const {
//     date,
//     locale,
//     selected,
//     minDate = new Date(new Date().getFullYear() - 100, 0, 1, 0, 0, 0),
//     maxDate = new Date(new Date().getFullYear() + 100, 0, 1, 0, 0, 0),
//     weekStartDay,
//     weekDayLabelFormat,
//     displayLeadingZero,
//     onDateChange,
//     onSelectDate,
//   } = props;

//   const [calendarDate, setCalendarDate] = React.useState<Date>(
//     new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0),
//   );
//   const [yearsMenuEl, setYearsMenuEl] = React.useState<HTMLButtonElement | null>(null);
//   const [monthMenuEl, setMonthMenuEl] = React.useState<HTMLButtonElement | null>(null);
//   const [selectedDates, setSelectedDates] = React.useState<Date[]>([...(selected || [])]);
//   const calendar = useCalendar({
//     // weekStartDay,
//     date,
//     minDate,
//     maxDate,
//   });

//   const currentMonthLabel = React.useMemo(() => {
//     const intl = new Intl.DateTimeFormat(locale, {
//       month: 'long',
//     });

//     const title = intl.format(calendarDate);

//     return title.charAt(0).toUpperCase() + title.slice(1);
//   }, [calendarDate, locale]);

//   // If selected props has been changed
//   React.useEffect(() => {
//     const prev = selectedDates;
//     const next = [...(selected || [])];
//     const has1 = prev.every(prevDate =>
//       next.find(nextDate => calendar.isSameDay(prevDate, nextDate)),
//     );
//     const has2 = next.every(nextDate =>
//       prev.find(prevDate => calendar.isSameDay(nextDate, prevDate)),
//     );

//     const isEqual = has1 && has2;

//     if (!isEqual) {
//       setSelectedDates([...(selected || [])]);
//     }
//   }, [calendar, calendar.isSameDay, selected, selectedDates]);

//   const handlePrevClick = React.useCallback(() => {
//     const d = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1);

//     if (!calendar.isSameDay(d, calendarDate)) {
//       setCalendarDate(new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0));

//       if (typeof onDateChange === 'function') {
//         onDateChange(new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0));
//       }
//     }
//   }, [calendar, calendarDate, onDateChange]);

//   const handleNextClick = React.useCallback(() => {
//     const d = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1);

//     if (!calendar.isSameDay(d, calendarDate)) {
//       setCalendarDate(new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0));

//       if (typeof onDateChange === 'function') {
//         onDateChange(d);
//       }
//     }
//   }, [calendar, calendarDate, onDateChange]);

//   const handleDayClick = React.useCallback(
//     (day: Date) => () => {
//       if (typeof onSelectDate === 'function') {
//         onSelectDate(day);
//       }
//     },
//     [onSelectDate],
//   );

//   const getDayLabel = React.useCallback(
//     (day: Date) => {
//       const dateNum = day.getDate();
//       if (!displayLeadingZero) {
//         return dateNum.toString();
//       }

//       const numStr = `0${dateNum}`;

//       return numStr.substring(numStr.length - 2);
//     },
//     [displayLeadingZero],
//   );

//   const years = React.useMemo(() => {
//     const y: number[] = [];

//     for (
//       let year = minDate.getFullYear();
//       year >= minDate.getFullYear() && year <= maxDate.getFullYear();
//       year++
//     ) {
//       y.push(year);
//     }

//     return y;
//   }, [maxDate, minDate]);

//   const monthes = React.useMemo(() => {
//     const m: number[] = [];
//     const y = calendarDate.getFullYear();
//     for (let index = 0; index < 12; index++) {
//       const d = new Date(y, index, 1, 0, 0, 0);
//       if (d.getTime() > minDate.getTime() && d.getTime() < maxDate.getTime()) {
//         m.push(index);
//       }
//     }

//     return m;
//   }, [calendarDate, maxDate, minDate]);

//   return (
//     <CalendarPaper>
//       {JSON.stringify(calendarDate)}
//       <CalendarTopBar>
//         {React.useMemo(
//           () => (
//             <CalendarMonthControl displayIcon="prev" onClick={handlePrevClick} />
//           ),
//           [handlePrevClick],
//         )}
//         <span>
//           {React.useMemo(
//             () => (
//               <Button
//                 variant="plain"
//                 type="button"
//                 onClick={event => setMonthMenuEl(event.currentTarget)}
//               >
//                 {currentMonthLabel}
//               </Button>
//             ),
//             [currentMonthLabel],
//           )}
//           {React.useMemo(
//             () => (
//               <Button
//                 variant="plain"
//                 type="button"
//                 onClick={event => setYearsMenuEl(event.currentTarget)}
//               >
//                 {calendarDate.getFullYear()}
//               </Button>
//             ),
//             [calendarDate],
//           )}
//           <Menu
//             value={calendarDate.getFullYear()}
//             isOpen={Boolean(yearsMenuEl)}
//             anchorElement={yearsMenuEl}
//             onRequestClose={() => setYearsMenuEl(null)}
//             onSelectItem={item => {
//               const newDate = new Date(calendarDate);
//               newDate.setFullYear(item);
//               newDate.setMonth(11 - 1);
//               setYearsMenuEl(null);

//               if (calendarDate.getFullYear() !== newDate.getFullYear()) {
//                 setCalendarDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1, 0, 0, 0, 0));
//                 if (typeof onDateChange === 'function') {
//                   onDateChange(newDate);
//                 }
//               }
//             }}
//             items={years}
//           >
//             {({ item }, itemProps) => <MenuItem {...itemProps}>{item}</MenuItem>}
//           </Menu>

//           <Menu
//             value={{ value: calendarDate.getMonth(), label: 'month' }}
//             isOpen={Boolean(monthMenuEl)}
//             anchorElement={monthMenuEl}
//             onRequestClose={() => setMonthMenuEl(null)}
//             onSelectItem={item => {
//               const newDate = new Date(calendarDate);
//               newDate.setMonth(item.value);
//               setMonthMenuEl(null);

//               if (calendarDate.getMonth() !== newDate.getMonth()) {
//                 setCalendarDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1, 0, 0, 0, 0));
//                 if (typeof onDateChange === 'function') {
//                   onDateChange(newDate);
//                 }
//               }
//             }}
//             items={monthes.map(monthIndex => {
//               const intl = new Intl.DateTimeFormat(locale, {
//                 month: 'long',
//               });

//               return {
//                 value: monthIndex,
//                 label: intl.format(new Date(calendarDate.getFullYear(), monthIndex, 1, 0, 0, 0, 0)),
//               };
//             })}
//           >
//             {({ item }, itemProps) => <MenuItem {...itemProps}>{item.label}</MenuItem>}
//           </Menu>
//         </span>
//         {React.useMemo(
//           () => (
//             <CalendarMonthControl displayIcon="next" onClick={handleNextClick} />
//           ),
//           [handleNextClick],
//         )}
//       </CalendarTopBar>
//       {React.useMemo(
//         () => (
//           <CalendarWeekDaysBar
//             locale={locale}
//             week={calendar.getWeeks(calendarDate)[0]}
//             format={weekDayLabelFormat || 'short'}
//           />
//         ),
//         [calendar, calendarDate, locale, weekDayLabelFormat],
//       )}
//       <CalendarDateContainer>
//         {calendar.getWeeks(calendarDate).map(week => (
//           <CalendarWeekRow key={week.weekNumber.toString()}>
//             {week.days.map(day => {
//               if (day.date.getMonth() === calendarDate.getMonth()) {
//                 return (
//                   <CalendarCell
//                     key={day.date.getTime()}
//                     isToday={day.isToday}
//                     isDisabled={day.isDisabled}
//                     isSelected={
//                       selectedDates.find(s => calendar.isSameDay(s, day.date)) !== undefined
//                     }
//                     onClick={handleDayClick(day.date)}
//                   >
//                     {getDayLabel(day.date)}
//                   </CalendarCell>
//                 );
//               }

//               return <CalendarEmptyCell key={day.date.getTime()} />;
//             })}
//           </CalendarWeekRow>
//         ))}
//       </CalendarDateContainer>
//     </CalendarPaper>
//   );
// };

// export default React.memo(Calendar);
