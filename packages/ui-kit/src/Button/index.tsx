import React from 'react';

import type { ButtonProps } from '@via-profit/ui-kit/Button';

import ButtonStandard from './ButtonStandard';
import ButtonAccent from './ButtonAccent';

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (props, ref) => {
  const { variant, ...buttonProps } = props;

  if (variant === 'accent') {
    return <ButtonAccent {...buttonProps} ref={ref} />;
  }

  return <ButtonStandard {...buttonProps} ref={ref} />;
};

export default React.forwardRef(Button);
