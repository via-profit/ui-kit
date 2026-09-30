import React from 'react';

import ButtonStyled from './ButtonStyled';
import type { ButtonBaseProps } from './ButtonBase';

export type ButtonOutlinedProps = ButtonBaseProps;

/**
 * The button with the `outlined` variant. Prefer `<Button variant="outlined">`
 */
const ButtonOutlined: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonOutlinedProps> = (
  props,
  ref,
) => <ButtonStyled {...props} variant="outlined" ref={ref} />;

export default React.forwardRef(ButtonOutlined);
