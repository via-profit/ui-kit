import React from 'react';

import ButtonStyled from './ButtonStyled';
import type { ButtonBaseProps } from './ButtonBase';

export type ButtonPlainProps = ButtonBaseProps;

/**
 * The button with the `plain` variant. Prefer `<Button variant="plain">`
 */
const ButtonPlain: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonPlainProps> = (
  props,
  ref,
) => <ButtonStyled {...props} variant="plain" ref={ref} />;

export default React.forwardRef(ButtonPlain);
