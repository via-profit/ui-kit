import React from 'react';

import { FormatParsedPayload, Mask, ParseInput, useMasked } from './useMasked';
import TextField, { TextFieldProps } from '../TextField';

export * from './useMasked';
export type GetMask = (input: string) => Mask;

export interface MaskedFieldProps extends Omit<TextFieldProps, 'value' | 'onChange'> {
  /**
   * Field value
   */
  readonly value: string | null;

  /**
   * An array of RegExp or a function that returns an array of RegExp
   */
  readonly mask: Mask | GetMask;

  /**
   * Function will be called when field value was changed
   */
  readonly onChange: (payload: FormatParsedPayload) => void;

  /**
   * If you are not using a simple mask, you can provide a function to analyze the input value
   */
  readonly parseInput?: ParseInput;

  /**
   * You can transform the output value before using it
   */
  readonly transform?: (value: string) => string;
}

const MaskedField: React.ForwardRefRenderFunction<HTMLDivElement, MaskedFieldProps> = (
  props,
  ref,
) => {
  const { value: propValue, mask, parseInput, onChange, transform, ...nativeProps } = props;

  const masked = useMasked();
  const parseInputFn = parseInput || masked.parseInput;

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const lastPropValue = React.useRef(propValue);

  const getMask = React.useCallback(
    (input: string) => (typeof mask === 'function' ? mask(input) : mask),
    [mask],
  );

  const getInputValue = React.useCallback(
    (v: string) => {
      const m = getMask(v);
      const parsed = parseInputFn(v, m, inputRef.current?.selectionStart || 0);
      const formatted = masked.formatParsedInput(parsed.text, m, parsed.caret);

      return formatted.text;
    },
    [getMask, parseInputFn, masked],
  );

  const [inputValue, setInputValue] = React.useState(getInputValue(propValue || ''));

  // Обновление при изменении внешнего значения
  React.useEffect(() => {
    if (lastPropValue.current !== propValue) {
      lastPropValue.current = propValue;
      setInputValue(getInputValue(propValue || ''));
    }
  }, [propValue, getInputValue]);

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    event => {
      const raw = event.currentTarget.value;
      const caret = inputRef.current?.selectionStart || 0;

      const m = getMask(raw);
      const parsed = parseInputFn(raw, m, caret);
      const formatted = masked.formatParsedInput(parsed.text, m, parsed.caret);

      const finalText = transform ? transform(formatted.text) : formatted.text;

      setInputValue(finalText);
      onChange({
        caret: formatted.caret,
        isValid: formatted.isValid,
        text: finalText,
      });

      // Устанавливаем caret после рендера
      requestAnimationFrame(() => {
        inputRef.current?.setSelectionRange(formatted.caret, formatted.caret);
      });
    },
    [getMask, parseInputFn, masked, transform, onChange],
  );

  const setInputRef = React.useCallback(
    (elem: HTMLInputElement | null) => {
      inputRef.current = elem;

      if (typeof nativeProps.inputRef === 'function') {
        nativeProps.inputRef(elem);
      } else if (nativeProps.inputRef && typeof nativeProps.inputRef === 'object') {
        nativeProps.inputRef.current = elem;
      }
    },
    [nativeProps],
  );

  return (
    <TextField
      ref={ref}
      {...nativeProps}
      type="text"
      value={inputValue}
      onChange={handleOnChange}
      inputRef={setInputRef}
    />
  );
};

export default React.forwardRef(MaskedField);
