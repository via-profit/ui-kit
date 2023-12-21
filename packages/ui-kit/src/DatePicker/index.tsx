import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Calendar, { CalendarProps } from '../Calendar';
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
     * Calendar properties
     */
    readonly calendarProps?: Omit<CalendarProps, 'value' | 'defaultValue' | 'onChange'>;
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
    calendarProps,
    calendarButtonTooltip,
    readOnly,
    disabled,
    ...restProps
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
            {...calendarProps}
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
