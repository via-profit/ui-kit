import React from 'react';

import { TextFieldProps } from '../TextField';
import MaskedField, { FormatParsedPayload, ParseInput } from '../MaskedField';
import { dropExtraPluses, templateToMask, usePhoneUtils } from './usePhoneUtils';
import CountryFlagComponent from './CountryFlagComponent';
import type { CountryFlag, PhoneTemplate } from './templates';

export interface PhoneFieldProps extends Omit<TextFieldProps, 'value' | 'onChange'> {
  /**
   * Phone string format 79876543210 or +7 (987) 654-32-10
   */
  readonly value: string;

  /**
   * On input change event
   */
  readonly onChange: (event: React.ChangeEvent<HTMLInputElement>, payload: PhonePayload) => void;

  /**
   * Supported RegExp templates
   */
  readonly templates: readonly PhoneTemplate[];

  /**
   * If truethen CountryFalg component will be hidden
   */
  readonly withoutCountryFlag?: boolean;
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
  const { value, templates, inputRef, withoutCountryFlag, onChange, ...textFieldProps } = props;
  const { parseInput, parseAndFormat, getTemplateInfo } = usePhoneUtils({ templates });
  const textInputRef = React.useRef<HTMLInputElement | null>(null);

  // The current text of the field: the flag and the placeholder follow it
  const [currentValue, setCurrentValue] = React.useState(() => parseAndFormat(String(value)).text);
  const lastValue = React.useRef(value);

  React.useEffect(() => {
    if (lastValue.current !== value) {
      lastValue.current = value;
      setCurrentValue(parseAndFormat(String(value)).text);
    }
  }, [parseAndFormat, value]);

  const { CountryFlag, placeholder } = React.useMemo(
    () => parseAndFormat(currentValue),
    [parseAndFormat, currentValue],
  );

  // <MaskedField> gets the phone-specific parsing and the mask of the detected template
  const parsePhone: ParseInput = React.useCallback(
    (input, _mask, caret) => dropExtraPluses(parseInput(input, caret)),
    [parseInput],
  );

  const getMask = React.useCallback(
    (input: string) => templateToMask(getTemplateInfo(parsePhone(input, []).text).template),
    [getTemplateInfo, parsePhone],
  );

  const handleChange = React.useCallback(
    (payload: FormatParsedPayload, event: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = parseAndFormat(payload.text);

      setCurrentValue(payload.text);
      onChange(event, {
        value: payload.text,
        placeholder: formatted.placeholder,
        CountryFlag: formatted.CountryFlag,
        template: formatted.template,
        countryCode: formatted.countryCode,
        callingCode: formatted.callingCode,
        number: formatted.number,
        isValid: formatted.isValid,
        combined: `${formatted.callingCode ?? ''}${formatted.number}`,
      });
    },
    [onChange, parseAndFormat],
  );

  const setInputRef = React.useCallback(
    (input: HTMLInputElement | null) => {
      textInputRef.current = input;

      if (typeof inputRef === 'function') {
        inputRef(input);
      }
      if (inputRef && typeof inputRef === 'object') {
        inputRef.current = input;
      }
    },
    [inputRef],
  );

  const startIcon = React.useMemo(
    () =>
      withoutCountryFlag ? undefined : (
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
    [CountryFlag, withoutCountryFlag],
  );

  return (
    <MaskedField
      ref={ref}
      {...textFieldProps}
      // An explicit `startIcon={undefined}` (e.g. from <Autocomplete>) must not hide the flag
      startIcon={textFieldProps.startIcon ?? startIcon}
      value={value}
      mask={getMask}
      parseInput={parsePhone}
      placeholder={textFieldProps.placeholder ?? placeholder}
      onChange={handleChange}
      inputRef={setInputRef}
    />
  );
};

export default React.forwardRef(PhoneField);
export * from './usePhoneUtils';
export * from './templates';
