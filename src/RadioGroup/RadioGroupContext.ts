import React from 'react';

export type RadioGroupContextValue = {
  readonly name: string;

  /**
   * The selected value. `undefined` — the group is uncontrolled and the radio buttons are not
   * controlled either, `null` — nothing is selected
   */
  readonly value: string | null | undefined;
  readonly defaultValue?: string | null;
  readonly onChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly disabled?: boolean;
  readonly required?: boolean;
  readonly error?: boolean;
  readonly color?: string;
};

/**
 * Radio buttons inside the RadioGroup read the name, the value and the change handler from this context
 */
const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

export default RadioGroupContext;
