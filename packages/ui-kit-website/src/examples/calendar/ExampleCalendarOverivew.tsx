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
  const [selected, setSelected] = React.useState<readonly Date[]>([]);
  const [isOpen, setOpenSate] = React.useState(false);
  const [markToday, setmarkToday] = React.useState(true);

  // const onSelectDate = React.useCallback(
  //   (d: Date) => setSelected([d.getFullYear(), d.getMonth(), d.getDate()]),
  //   [],
  // );

  return (
    <>
      <p>Current dat: {date.toISOString()}</p>
      Selected dat:{' '}
      {selected.map(sel => (
        <div key={sel.getTime()}>{sel.toISOString()}</div>
      ))}
      <Calendar
        value={date}
        onChange={d => setDate(d)}
        // views={['days', 'years']}
        // initialView="years"
        // views={['years']}
        markToday={markToday}
        badges={[
          { date: new Date(2023, 11, 31), badgeContent: '1', accentColor: 'primary' },
          { date: new Date(2023, 11, 7), badgeContent: '88+' },
          { date: new Date(2023, 11, 12), badgeContent: '396+' },
        ]}
        onDateSelect={d => {
          const dAsString = d.toISOString();
          const set = new Set(selected.map(s => s.toISOString()));

          if (set.has(dAsString)) {
            set.delete(dAsString);
          } else {
            set.add(dAsString);
          }

          setSelected([...set].map(s => new Date(s)));
        }}
        selected={selected}
      />
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
