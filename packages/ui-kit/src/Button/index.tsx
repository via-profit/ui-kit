import React from 'react';

import ButtonStandard, { ButtonStandardProps } from './ButtonStandard';
import ButtonOutlined, { ButtonOutlinedProps } from './ButtonOutlined';
import ButtonPlain, { ButtonPlainProps } from './ButtonPlain';

export type ButtonProps = (ButtonStandardProps | ButtonOutlinedProps | ButtonPlainProps) & {
  /**
   * Button style variant\
   * Allowed variants: `standard` ,`outlined` or `plain`\
   * \
   * **Default**: `standard`
   */
  readonly variant?: 'standard' | 'outlined' | 'plain';
};

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (props, ref) => {
  const { variant, ...buttonProps } = props;

  if (variant === 'outlined') {
    return <ButtonOutlined {...buttonProps} ref={ref} />;
  }

  if (variant === 'plain') {
    return <ButtonPlain {...buttonProps} ref={ref} />;
  }

  return <ButtonStandard {...buttonProps} ref={ref} />;
};

export default React.forwardRef(Button);
