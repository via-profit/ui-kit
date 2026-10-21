import React from 'react';

import ButtonStyled from './ButtonStyled';
import type { ButtonStandardProps } from './ButtonStandard';
import type { ButtonOutlinedProps } from './ButtonOutlined';
import type { ButtonPlainProps } from './ButtonPlain';

export type ButtonProps = (ButtonStandardProps | ButtonOutlinedProps | ButtonPlainProps) & {
  /**
   * Button style variant\
   * Allowed variants: `standard`, `outlined`, `plain` or `soft` (the pale background of the color)\
   * \
   * **Default**: `standard`
   */
  readonly variant?: 'standard' | 'outlined' | 'plain' | 'soft';
};

// One component for all the variants, so changing the variant does not remount the button
const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (props, ref) => (
  <ButtonStyled {...props} ref={ref} />
);

export default React.forwardRef(Button);
