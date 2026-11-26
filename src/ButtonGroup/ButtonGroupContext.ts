import React from 'react';

import type { ButtonVariant } from '../Button/ButtonStyled';

export type ButtonGroupOrientation = 'horizontal' | 'vertical';

export type ButtonGroupContextValue = {
  readonly variant: ButtonVariant;
  readonly color?: string;
  readonly selectedColor: string;
  readonly disabled?: boolean;
  readonly orientation: ButtonGroupOrientation;

  /**
   * `true` when the group has the selection (value, defaultValue or onChange is passed)
   */
  readonly selectable: boolean;
  readonly isSelected: (value: string) => boolean;
  readonly toggle: (value: string) => void;
};

/**
 * Buttons inside the ButtonGroup read the common props and the selection from this context
 */
const ButtonGroupContext = React.createContext<ButtonGroupContextValue | null>(null);

export default ButtonGroupContext;
