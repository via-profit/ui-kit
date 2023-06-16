import React from 'react';

import ButtonStandard, { ButtonStandardProps } from './ButtonStandard';
import ButtonOutlined, { ButtonOutlinedProps } from './ButtonOutlined';

export type ButtonProps = (ButtonStandardProps | ButtonOutlinedProps) & {
  /**
   * Button style variant\
   * Allowed variants: `standard` or `outlined`\
   * \
   * **Default**: `standard`
   */
  readonly variant?: 'standard' | 'outlined';
};

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (props, ref) => {
  const { variant, ...buttonProps } = props;

  if (variant === 'outlined') {
    return <ButtonOutlined {...buttonProps} ref={ref} />;
  }

  return <ButtonStandard {...buttonProps} ref={ref} />;
};

export default React.forwardRef(Button);
