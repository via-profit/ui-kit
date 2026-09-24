import React, { MouseEventHandler } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Calendar, {
  CalendarOverrides,
  WeekDayName,
  WeekNameLabelFormat,
  CalendarBadge,
  CalendarView,
  CalendarProps,
} from '../Calendar';
import Button from '../Button';
import Popper from '../Popper';
import ClickOutside from '../ClickOutside';
import MaskedField, { MaskedFieldProps } from '../MaskedField';
import type { TextFieldProps, TextFieldOverrides } from '../TextField';
import DatePickerIcon from './DatePickerIcon';
import useDatePickerFormat from './useDatePickerFormat';

export * from './useDatePickerFormat';

export type DatePickerProps = Omit<TextFieldProps, 'value' | 'onChange' | 'overrides'> & {
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

  /**
   * Label for the Reset button. If label passed, then button will be rendered
   */
  readonly resetButtonLabel?: string;

  /**
   * Label for the Today button. If label passed, then button will be rendered
   */
  readonly todayButtonLabel?: string;

  /**
   * @deprecated Use `todayButtonLabel` instead
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
  readonly view?: CalendarView;

  readonly views?: readonly CalendarView[];

  /**
   * Custom footer elements
   */
  readonly footer?: JSX.Element;

  /**
   * Overridable components map
   */
  readonly overrides?: CalendarOverrides & TextFieldOverrides;
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
    resetButtonLabel,
    todayButtonLabel: todayButtonLabelProp,
    toodayButtonLabel,
    markToday,
    weekDayLabelFormat,
    heading,
    subheading,
    view,
    views,
    footer,
    overrides,
    ...restInputProps
  } = props;

  const todayButtonLabel = todayButtonLabelProp ?? toodayButtonLabel;

  const calendarOverrides = React.useMemo(() => {
    if (!overrides) {
      return undefined;
    }

    const {
      Input: _Input,
      ErrorText: _ErrorText,
      IconWrapper: _IconWrapper,
      InputWrapper: _InputWrapper,
      Label: _Label,
      Asterisk: _Asterisk,
      Container: _Container,
      ...rest
    } = overrides;

    return rest as CalendarOverrides;
  }, [overrides]);

  const textFieldOverrides = React.useMemo((): TextFieldOverrides | undefined => {
    if (!overrides) {
      return undefined;
    }

    const { Input, ErrorText, IconWrapper, InputWrapper, Label, Asterisk, Container } = overrides;

    return { Input, ErrorText, IconWrapper, InputWrapper, Label, Asterisk, Container };
  }, [overrides]);

  const [currentValue, setCurrentValue] = React.useState(value);
  const valueRef = React.useRef(value);
  const [textFieldRef, setTextFieldRef] = React.useState<HTMLDivElement | null>(null);
  const [isOpen, setOpenSate] = React.useState(false);
  const { getMaskByTemplate, formatInputByTemplate, parseInputByTemplate } = useDatePickerFormat();

  React.useEffect(() => {
    const a = value;
    const b = valueRef.current;

    // null <-> date transitions must be detected too
    const isSameDay =
      a === b ||
      (a !== null &&
        b !== null &&
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate());

    if (!isSameDay) {
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

  const handleClick: MouseEventHandler<HTMLInputElement> = React.useCallback(() => {
    if (readOnly) {
      setOpenSate(!isOpen);
    }
  }, [isOpen, readOnly]);

  const endIcon = React.useMemo(
    () => (
      <Button
        disabled={disabled}
        iconOnly
        variant="plain"
        type="button"
        onClick={() => setOpenSate(true)}
        title={calendarButtonTooltip}
      >
        <DatePickerIcon />
      </Button>
    ),
    [calendarButtonTooltip, disabled],
  );

  const handleChange: MaskedFieldProps['onChange'] = React.useCallback(
    ({ isValid, text }) => {
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
    },
    [
      isGreatherThenMinDate,
      isLessThenMaxDate,
      maxDate,
      minDate,
      onChange,
      parseInputByTemplate,
      template,
    ],
  );

  const calendarChange: CalendarProps['onChange'] = React.useCallback(
    date => {
      if (date) {
        onChange(date);
      }
      setOpenSate(false);
    },
    [onChange],
  );

  return (
    <>
      <StyledMaskedField
        onClick={handleClick}
        disabled={disabled}
        mask={getMaskByTemplate(template)}
        ref={setTextFieldRef}
        readOnly={readOnly}
        endIcon={endIcon}
        {...restInputProps}
        value={currentValue ? formatInputByTemplate(currentValue, template) : ''}
        onChange={handleChange}
        overrides={textFieldOverrides}
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
            resetButtonLabel={resetButtonLabel}
            todayButtonLabel={todayButtonLabel}
            markToday={markToday}
            weekDayLabelFormat={weekDayLabelFormat}
            heading={heading}
            subheading={subheading}
            view={view}
            views={views}
            footer={footer}
            value={currentValue}
            onChange={calendarChange}
            overrides={calendarOverrides}
          />
        </Popper>
      </ClickOutside>
    </>
  );
};

export default DatePicker;
