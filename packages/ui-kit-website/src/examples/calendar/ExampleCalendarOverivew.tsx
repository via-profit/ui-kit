import React from 'react';
import Calendar from '@via-profit/ui-kit/src/Calendar';

import TextField from '@via-profit/ui-kit/src/TextField';
import Button from '@via-profit/ui-kit/src/Button';
import Popper from '@via-profit/ui-kit/src/Popper';
import ClickOutside from '@via-profit/ui-kit/src/ClickOutside';
import MaskedField from '@via-profit/ui-kit/src/MaskedField';

const ExampleCalendarOverivew: React.FC = () => {
  const [date, setDate] = React.useState(new Date());
  const [textFieldRef, setTextFieldRef] = React.useState<HTMLDivElement | null>(null);
  const [selected, setSelected] = React.useState<readonly Date[]>([new Date(2023, 11, 31)]);
  const [isOpen, setOpenSate] = React.useState(false);
  const [markToday, setmarkToday] = React.useState(true);
  const [dateConstraint, setDateConstraint] = React.useState([
    new Date(2023, 10, 5),
    new Date(2024, 0, 25),
  ]);

  // const onSelectDate = React.useCallback(
  //   (d: Date) => setSelected([d.getFullYear(), d.getMonth(), d.getDate()]),
  //   [],
  // );

  return (
    <>
      <div>
        <Calendar
          value={date}
          onChange={d => setDate(d)}
          // views={['days', 'years']}
          // initialView="years"
          // footer={<>The footer</>}
          toodayButtonLabel="Today"
          // resetButtonLabel="Reset"
          // views={['days']}
          heading="Calendar"
          subheading="Lorem ipsum dolor set amet"
          minDate={dateConstraint[0]}
          maxDate={dateConstraint[1]}
          markToday={markToday}
          badges={[
            { date: new Date(2023, 11, 31), badgeContent: '1' },
            { date: new Date(2023, 11, 7), badgeContent: '88+' },
            { date: new Date(2023, 11, 12), badgeContent: '396+', accentColor: 'primary' },
          ]}
          onDateSelect={setSelected}
          selected={selected}
        />
      </div>
      <p>Current dat: {date.toISOString()}</p>
      Selected dat:{' '}
      {selected.map(sel => (
        <div key={sel.getTime()}>{sel.toISOString()}</div>
      ))}
      <button
        type="button"
        onClick={() => setDateConstraint([new Date(2023, 10, 10), new Date(2023, 11, 31)])}
      >
        Set constraint as 2023 november 10 - 2023 december 31
      </button>
      <button
        type="button"
        onClick={() => setDateConstraint([new Date(2023, 11, 4), new Date(2023, 11, 24)])}
      >
        Set constraint as 2023 december 4 - 2023 december 24
      </button>
      <button
        type="button"
        onClick={() => setDateConstraint([new Date(1920, 0, 1), new Date(2190, 11, 31)])}
      >
        Set constraint as 1920 January 1 - 2190 december 31
      </button>
      <button type="button" onClick={() => setmarkToday(!markToday)}>
        Toggle mark today
      </button>
      <button type="button" onClick={() => setDate(new Date(2023, 10, 30))}>
        Set November 2023 30 (only if controlled)
      </button>
      <button type="button" onClick={() => setDate(new Date(2023, 11, 1))}>
        Set December 2023 1 (only if controlled)
      </button>
      <button type="button" onClick={() => setDate(new Date(2024, 0, 7))}>
        Set January 2024 7 (only if controlled)
      </button>
      {/* <MaskedField
        mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
        onChange={({ isValid, text }) => {
          if (isValid) {
            console.log(text);
            const d = new Date(text);
            if (d instanceof Date && !isNaN(d.getTime())) {
              setDate(d);
            } else {
              console.log(`invalid date ${d}`);
            }
            // setValue(text);
          }

          // if (validState !== isValid) {
          //   setValid(isValid);
          // }
        }}
        ref={setTextFieldRef}
        startIcon={<Button iconOnly type="button" onClick={() => setOpenSate(true)} />}
        value={new Intl.DateTimeFormat('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }).format(date)}
      />

      <ClickOutside onOutsideClick={() => setOpenSate(false)} mouseEvent="onMouseDown">
        <Popper isOpen={isOpen} anchorElement={textFieldRef}>
          <Calendar date={date} locale="ru-RU" onSelectDate={d => setDate(d)} />
        </Popper>
      </ClickOutside> */}
    </>
  );
};

export default ExampleCalendarOverivew;
