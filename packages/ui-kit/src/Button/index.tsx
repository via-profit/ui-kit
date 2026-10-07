import React from 'react';

import ButtonStyled from './ButtonStyled';
import type { ButtonStandardProps } from './ButtonStandard';
import type { ButtonOutlinedProps } from './ButtonOutlined';
import type { ButtonPlainProps } from './ButtonPlain';

export type ButtonProps = (ButtonStandardProps | ButtonOutlinedProps | ButtonPlainProps) & {
  /**
   * Button style variant\
   * Allowed variants: `standard`, `outlined` or `plain`\
   * \
   * **Default**: `standard`
   */
  readonly variant?: 'standard' | 'outlined' | 'plain';
};

// One component for all the variants, so changing the variant does not remount the button
const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (props, ref) => (
  <ButtonStyled {...props} ref={ref} />
);

export default React.forwardRef(Button);
