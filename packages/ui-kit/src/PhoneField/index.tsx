import React from 'react';

import TextField, { TextFieldProps } from '../TextField';
import { usePhoneUtils } from './usePhoneUtils';
import CountryFlagComponent from './CountryFlagComponent';
import type { CountryCode, CountryFlag, PhoneTemplate } from './templates';

export interface PhoneFieldProps extends Omit<TextFieldProps, 'value' | 'onChange'> {
  /**
   * Phone string format 79876543210 or +7 (987) 654-32-10
   */
  readonly value: string;
  readonly defaultCountry?: CountryCode | null;
  readonly onChange: (event: React.ChangeEvent<HTMLInputElement>, payload: PhonePayload) => void;
  readonly templates: readonly PhoneTemplate[];
}

export interface PhonePayload {
  /**
   * Phone formatted string, e.g.: +7 (987) 654-32-10
   */
  readonly value: string;
  /**
   * Country code (ISO 3166-1 alpha-2), e.g.: RU
   */
  readonly countryCode: string | null;
  /**
   * JSX Element of Country Flag
   */
  readonly CountryFlag: CountryFlag | null;
  /**
   * Phone template, e.g.: +7 (xxx) xxx-xx-xx. The symbol «x» - is a digit
   */
  readonly template: string;
  /**
   * Phone placeholder, e.g.: +7 (999) 999-99-99
   */
  readonly placeholder: string;
  /**
   * Country calling code, e.g.: 7
   */
  readonly callingCode: string | null;
  /**
   * Phone number without calling code and formatters
   */
  readonly number: string;
  /**
   * Phone number with calling code
   */
  readonly combined: string;
  /**
   * Phone validation status
   */
  readonly isValid: boolean;
}

const PhoneField: React.ForwardRefRenderFunction<HTMLDivElement, PhoneFieldProps> = (
  props,
  ref,
) => {
  const { value, defaultCountry, templates, inputRef, onChange, ...textFieldProps } = props;
  const { formatParsedInput, parseInput, parseAndFormat } = usePhoneUtils({ templates });
  const textInputRef = React.useRef<HTMLInputElement | null>(null);
  const initialValue = React.useRef(value);

  const [state, setState] = React.useState(() => {
    const { text, countryCode, placeholder, number, CountryFlag } = parseAndFormat(
      String(initialValue.current),
    );

    return {
      currentValue: text,
      number,
      countryCode,
      placeholder,
      CountryFlag,
    };
  });
  const { countryCode, currentValue, placeholder, CountryFlag } = state;

  React.useEffect(() => {
    if (initialValue.current !== value) {
      initialValue.current = value;

      const formatted = parseAndFormat(String(value));

      if (formatted.text !== currentValue) {
        setState(prev => ({
          ...prev,
          currentValue: formatted.text,
          countryCode: formatted.countryCode,
          placeholder: formatted.placeholder,
          CountryFlag: formatted.CountryFlag,
        }));
      }
    }
  }, [countryCode, currentValue, parseAndFormat, placeholder, value]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const parsed = parseInput(
      String(event.currentTarget.value),
      textInputRef.current?.selectionStart || 0,
    );

    const {
      caret,
      text,
      template,
      placeholder,
      countryCode,
      callingCode,
      CountryFlag,
      number,
      isValid,
    } = formatParsedInput(parsed.text, parsed.caret);

    onChange(
      {
        ...event,
        currentTarget: {
          ...event.currentTarget,
          value: text,
        },
      },
      {
        value: text,
        placeholder,
        CountryFlag,
        template,
        countryCode,
        callingCode,
        number,
        isValid,
        combined: `${callingCode ?? ''}${number}`,
      },
    );

    setState(prev => ({
      ...prev,
      currentValue: text,
      countryCode,
      placeholder,
      CountryFlag,
    }));
    setTimeout(() => {
      textInputRef.current?.setSelectionRange(caret, caret);
    }, 15);
  };

  return (
    <TextField
      ref={ref}
      {...textFieldProps}
      startIcon={React.useMemo(
        () => (
          <CountryFlagComponent
            flag={CountryFlag}
            onClick={() => {
              if (textInputRef.current) {
                textInputRef.current.select();
                textInputRef.current.focus();
              }
            }}
          />
        ),
        [CountryFlag],
      )}
      value={currentValue}
      placeholder={placeholder}
      onChange={handleChange}
      inputRef={input => {
        textInputRef.current = input;

        if (typeof inputRef === 'function') {
          inputRef(input);
        }
        if (inputRef && typeof inputRef === 'object') {
          inputRef.current = input;
        }
      }}
    />
  );
};

export default React.forwardRef(PhoneField);
export * from './usePhoneUtils';
export * from './templates';
