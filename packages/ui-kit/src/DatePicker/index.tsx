import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Calendar, {
  CalendarProps,
  WeekDayName,
  WeekNameLabelFormat,
  CalendarBadge,
} from '../Calendar';
import Button from '../Button';
import Popper from '../Popper';
import ClickOutside from '../ClickOutside';
import MaskedField from '../MaskedField';
import type { TextFieldProps } from '../TextField';
import DatePickerIcon from './DatePickerIcon';
import useDatePickerFormat from './useDatePickerFormat';

export type DatePickerProps = Omit<TextFieldProps, 'value' | 'onChange'> &
  Omit<CalendarProps, 'defaultValue' | 'value' | 'onChange'> & {
    /**
     * Current date
     */
    readonly value: Date | null;

    /**
     * Will be invoked when date would be changed
     */
    readonly onChange: (date: Date) => void;
    /**
     * Date template like one of format: \
     * `dd.mm.yyyy` or `yyyy/mm/dd`, etc.\
     * Posibility chars: `y`, `Y`, `yy`, `yyyy`, `d`, `dd`, `D`, `m`, `mm`, `M`
     */
    readonly template: string;

    /**
     * Tooltip text for a calendar button
     */
    readonly calendarButtonTooltip?: string;

    /**
     * Minimum date limit
     */
    readonly minDate?: Date;

    /**
     * Maximum date limit
     */
    readonly maxDate?: Date;

    /**
     * calendar locale\
     * **Default:** `ru-RU`
     */
    readonly locale?: string;

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
     * array of badges
     */
    readonly badges?: readonly CalendarBadge[];
  };

const StyledMaskedField = styled(MaskedField)`
  ${({ readOnly, disabled }) =>
    readOnly &&
    !disabled &&
    css`
      & input {
        cursor: pointer;
      }
    `}
`;

const DatePicker: React.FC<DatePickerProps> = props => {
  const {
    value,
    template,
    onChange,
    calendarButtonTooltip,
    readOnly,
    disabled,
    minDate = new Date(new Date().getFullYear() - 100, 0, 1, 0, 0, 0),
    maxDate = new Date(new Date().getFullYear() + 100, 0, 1, 0, 0, 0),
    weekStartDay = 'monday',
    locale = 'ru-RU',
    badges = [],
    displayLeadingZero = false,
    ...restInputProps
  } = props;
  const [currentValue, setCurrentValue] = React.useState(value);
  const valueRef = React.useRef(value);
  const [textFieldRef, setTextFieldRef] = React.useState<HTMLDivElement | null>(null);
  const [isOpen, setOpenSate] = React.useState(false);
  const { getMaskByTemplate, formatInputByTemplate, parseInputByTemplate } = useDatePickerFormat();

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

  const isGreatherThenMinDate = React.useCallback(
    (date: Date): boolean => {
      const a = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate(), 0, 0, 0, 0);
      const b = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);

      return b.getTime() >= a.getTime();
    },
    [minDate],
  );

  const isLessThenMaxDate = React.useCallback(
    (date: Date): boolean => {
      const a = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(), 0, 0, 0, 0);
      const b = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);

      return b.getTime() <= a.getTime();
    },
    [maxDate],
  );

  return (
    <>
      <StyledMaskedField
        onClick={() => {
          if (readOnly) {
            setOpenSate(!isOpen);
          }
        }}
        disabled={disabled}
        mask={getMaskByTemplate(template)}
        ref={setTextFieldRef}
        readOnly={readOnly}
        endIcon={
          <Button
            disabled={disabled}
            iconOnly
            type="button"
            onClick={() => setOpenSate(true)}
            title={calendarButtonTooltip}
          >
            <DatePickerIcon />
          </Button>
        }
        {...restInputProps}
        value={currentValue ? formatInputByTemplate(currentValue, template) : ''}
        onChange={({ isValid, text }) => {
          if (isValid) {
            const parsedDate = parseInputByTemplate(text, template);

            // Trying to parse the input date value
            if (parsedDate instanceof Date && !isNaN(parsedDate.getTime())) {
              // if the date satisfies the restrictions
              if (isGreatherThenMinDate(parsedDate) && isLessThenMaxDate(parsedDate)) {
                onChange(parsedDate);

                // if the date violates the restrictions
              } else {
                // set as minDate if parsed date less then minDate value constraint
                if (!isGreatherThenMinDate(parsedDate)) {
                  onChange(minDate);
                }

                // set as maxDate if parsed date greather then maxDate value constraint
                if (!isLessThenMaxDate(parsedDate)) {
                  onChange(maxDate);
                }
              }
            }
          }
        }}
      />

      <ClickOutside onOutsideClick={() => setOpenSate(false)} mouseEvent="onMouseDown">
        <Popper isOpen={isOpen} anchorElement={textFieldRef}>
          <Calendar
            minDate={minDate}
            maxDate={maxDate}
            weekStartDay={weekStartDay}
            locale={locale}
            badges={badges}
            displayLeadingZero={displayLeadingZero}
            value={currentValue || new Date()}
            onChange={date => {
              onChange(date);
              setOpenSate(false);
            }}
          />
        </Popper>
      </ClickOutside>
    </>
  );
};

export default DatePicker;
