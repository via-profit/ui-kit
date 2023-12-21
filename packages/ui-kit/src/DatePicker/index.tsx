import React from 'react';

import Calendar from '../Calendar';
import Button from '../Button';
import Popper from '../Popper';
import ClickOutside from '../ClickOutside';
import MaskedField from '../MaskedField';
import type { TextFieldProps } from '../TextField';
import DatePickerIcon from './DatePickerIcon';

export interface DatePickerProps extends Omit<TextFieldProps, 'value' | 'onChange'> {
  readonly value: Date | null;
  readonly onChange: (date: Date) => void;
  /**
   * Date template like one of format: \
   * `dd.mm.yyyy` `yyyy/mm/dd`
   */
  readonly template: string;
}

const DatePicker: React.FC<DatePickerProps> = props => {
  const { value, template, onChange, ...restProps } = props;
  const [currentValue, setCurrentValue] = React.useState(value);
  const valueRef = React.useRef(value);

  const [textFieldRef, setTextFieldRef] = React.useState<HTMLDivElement | null>(null);
  const [isOpen, setOpenSate] = React.useState(false);

  const getMaskByTemplate = React.useCallback(
    (template: string) =>
      template.split('').map(char => {
        if (['m', 'M', 'd', 'D', 'y', 'Y'].includes(char)) {
          return /\d/;
        }

        return char;
      }),
    [],
  );

  /**
   * Parse input string ny template
   * @returns Date
   */
  const parseInputByTemplate = React.useCallback((input: string, template: string) => {
    if (input.length !== template.length) {
      return null;
    }

    const data: { days: string[]; monthes: string[]; years: string[] } = {
      days: [],
      monthes: [],
      years: [],
    };
    template.split('').forEach((char, charIndex) => {
      switch (char) {
        case 'y':
          data.years.push(input[charIndex]);
          break;
        case 'm':
          data.monthes.push(input[charIndex]);
          break;
        case 'd':
          data.days.push(input[charIndex]);
          break;

        default:
          // do nothing
          break;
      }
    });

    return new Date(
      parseInt(data.years.join(''), 10),
      parseInt(data.monthes.join(''), 10) - 1, // Fucking month indexes
      parseInt(data.days.join(''), 10),
    );
  }, []);

  /**
   * Format date to string by template
   */
  const formatInputByTemplate = React.useCallback(
    (date: Date, template: string) =>
      template
        .replace(/(d{1,2}|D{1,2})/, entries => {
          const day = `${date.getDate()}`;

          if (['DD', 'D', 'dd'].includes(entries)) {
            const str = `0${day}`;

            return str.substring(str.length - entries.length);
          }

          return day;
        })
        // mm or M - month with leading zero
        // m - month without leading zero
        .replace(/(m{1,2}|M{1,2})/, entries => {
          const month = `${date.getMonth() + 1}`;

          if (['MM', 'M', 'mm'].includes(entries)) {
            const str = `0${month}`;

            return str.substring(str.length - entries.length);
          }

          return month;
        })
        // yyyy or Y - full year
        // yy or y - last two digits
        .replace(/(y{4}|y{1,2}|Y{1,2})/, entries => {
          const str = `${date.getFullYear()}`;
          if (['YY', 'Y'].includes(entries)) {
            return str;
          }

          return str.substring(str.length - entries.length);
        }),
    [],
  );

  React.useEffect(() => {
    const a = value || new Date();
    const b = valueRef.current || new Date();

    if (
      a.getFullYear() !== b.getFullYear() ||
      a.getMonth() !== b.getMonth() ||
      a.getDate() !== b.getDate()
    ) {
      valueRef.current = value;
      setCurrentValue(value);
    }
  }, [value]);

  return (
    <>
      <MaskedField
        mask={getMaskByTemplate(template)}
        ref={setTextFieldRef}
        endIcon={
          <Button iconOnly type="button" onClick={() => setOpenSate(true)}>
            <DatePickerIcon />
          </Button>
        }
        {...restProps}
        value={currentValue ? formatInputByTemplate(currentValue, template) : ''}
        onChange={({ isValid, text }) => {
          if (isValid) {
            const parsedDate = parseInputByTemplate(text, template);

            if (parsedDate instanceof Date && !isNaN(parsedDate.getTime())) {
              onChange(parsedDate);
            }
          }
        }}
      />

      <ClickOutside onOutsideClick={() => setOpenSate(false)} mouseEvent="onMouseDown">
        <Popper isOpen={isOpen} anchorElement={textFieldRef}>
          <Calendar
            value={currentValue || new Date()}
            toodayButtonLabel="Today"
            heading="Calendar"
            subheading="Select date"
            markToday
            onChange={date => {
              onChange(date);
              setOpenSate(false);
            }}
            badges={[
              { date: new Date(2023, 11, 31), badgeContent: '1' },
              { date: new Date(2023, 11, 7), badgeContent: '88+' },
              { date: new Date(2023, 11, 12), badgeContent: '396+', accentColor: 'primary' },
            ]}
          />
        </Popper>
      </ClickOutside>
    </>
  );
};

export default DatePicker;
