import React from 'react';

import Container, { RadioGroupContainerProps } from './RadioGroupContainer';
import Legend, { RadioGroupLegendProps } from './RadioGroupLegend';
import Items, { RadioGroupItemsProps, RadioGroupOrientation } from './RadioGroupItems';
import Asterisk, { RadioGroupAsteriskProps } from './RadioGroupAsterisk';
import ErrorText, { RadioGroupErrorTextProps } from './RadioGroupErrorText';
import RadioGroupContext, { RadioGroupContextValue } from './RadioGroupContext';

export type { RadioGroupOrientation };

export type RadioGroupProps = Omit<
  RadioGroupContainerProps,
  'onChange' | 'defaultValue' | 'color'
> & {
  /**
   * The name of the radio buttons. Generated if not passed
   */
  readonly name?: string;

  /**
   * The selected value of the controlled group, `null` — nothing is selected
   */
  readonly value?: string | null;

  /**
   * The initially selected value of the uncontrolled group
   */
  readonly defaultValue?: string | null;

  /**
   * Called with the value of the selected radio button
   */
  readonly onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * The title of the group (`<legend>`)
   */
  readonly label?: React.ReactNode;

  /**
   * **Default:** `vertical`
   */
  readonly orientation?: RadioGroupOrientation;

  /**
   * The color of all the radio buttons
   */
  readonly color?: 'default' | 'primary' | 'secondary' | string;

  /**
   * Disables all the radio buttons
   */
  readonly disabled?: boolean;

  /**
   * The native `required` of the radio buttons: the browser does not submit the form without a choice
   */
  readonly required?: boolean;

  /**
   * If is true then the asterisk will be displayed after the label\
   * If is ReactNode then ReactNode will be displayed
   */
  readonly requiredAsterisk?: boolean | React.ReactNode;

  /**
   * Paints the radio buttons with the error color and shows `errorText`
   */
  readonly error?: boolean;

  /**
   * Text or ReactNode to show under the group when `error` is true
   */
  readonly errorText?: React.ReactNode;

  readonly overrides?: RadioGroupOverrides;
};

export interface RadioGroupOverrides {
  /**
   * The `<fieldset>` element
   */
  readonly Container?: React.ComponentType<
    RadioGroupContainerProps & React.RefAttributes<HTMLFieldSetElement>
  >;

  /**
   * The `<legend>` with the label
   */
  readonly Legend?: React.ComponentType<
    RadioGroupLegendProps & React.RefAttributes<HTMLLegendElement>
  >;

  /**
   * The asterisk of the required group
   */
  readonly Asterisk?: React.ComponentType<
    RadioGroupAsteriskProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * The wrapper of the radio buttons
   */
  readonly Items?: React.ComponentType<RadioGroupItemsProps & React.RefAttributes<HTMLDivElement>>;

  /**
   * The error text
   */
  readonly ErrorText?: React.ComponentType<
    RadioGroupErrorTextProps & React.RefAttributes<HTMLDivElement>
  >;
}

const RadioGroup: React.ForwardRefRenderFunction<HTMLFieldSetElement, RadioGroupProps> = (
  props,
  ref,
) => {
  const {
    children,
    name: inputName,
    value,
    defaultValue,
    onChange,
    label,
    orientation = 'vertical',
    color,
    disabled,
    required,
    requiredAsterisk,
    error,
    errorText,
    overrides,
    ...nativeProps
  } = props;

  const id = React.useId().replace(/:/g, '');
  const name = inputName ?? `radio-group-${id}`;
  const legendID = `radio-group-${id}-legend`;
  const errorID = `radio-group-${id}-error`;
  const hasErrorText = Boolean(error) && typeof errorText !== 'undefined';

  const overridesMap = React.useMemo(
    () => ({
      Container: overrides?.Container || Container,
      Legend: overrides?.Legend || Legend,
      Asterisk: overrides?.Asterisk || Asterisk,
      Items: overrides?.Items || Items,
      ErrorText: overrides?.ErrorText || ErrorText,
    }),
    [overrides],
  );

  // The latest handler, so the context does not change on every render
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;
  const handleChange = React.useCallback(
    (selected: string, event: React.ChangeEvent<HTMLInputElement>) =>
      onChangeRef.current?.(selected, event),
    [],
  );

  // The initial value of the uncontrolled group, read once
  const [initialValue] = React.useState(defaultValue);

  const contextValue = React.useMemo<RadioGroupContextValue>(
    () => ({
      name,
      value,
      defaultValue: initialValue,
      onChange: handleChange,
      disabled,
      required,
      error,
      color,
    }),
    [name, value, initialValue, handleChange, disabled, required, error, color],
  );

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <overridesMap.Container
        role="radiogroup"
        aria-labelledby={typeof label !== 'undefined' ? legendID : undefined}
        aria-required={required || undefined}
        aria-invalid={error || undefined}
        aria-describedby={hasErrorText ? errorID : undefined}
        disabled={disabled}
        {...nativeProps}
        ref={ref}
      >
        {typeof label !== 'undefined' && (
          <overridesMap.Legend id={legendID}>
            {label}
            {requiredAsterisk != null && requiredAsterisk !== false && (
              <overridesMap.Asterisk aria-hidden>
                {typeof requiredAsterisk === 'boolean' ? '*' : requiredAsterisk}
              </overridesMap.Asterisk>
            )}
          </overridesMap.Legend>
        )}
        <overridesMap.Items orientation={orientation}>{children}</overridesMap.Items>
        {typeof errorText !== 'undefined' && (
          <overridesMap.ErrorText id={errorID} error={error}>
            {errorText}
          </overridesMap.ErrorText>
        )}
      </overridesMap.Container>
    </RadioGroupContext.Provider>
  );
};

export default React.forwardRef(RadioGroup);
