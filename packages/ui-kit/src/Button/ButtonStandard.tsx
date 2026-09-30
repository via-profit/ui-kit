import React from 'react';

import ButtonStyled from './ButtonStyled';
import type { ButtonBaseProps } from './ButtonBase';

export type ButtonStandardProps = ButtonBaseProps;

/**
 * The button with the `standard` variant. Prefer `<Button variant="standard">`
 */
const ButtonStandard: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonStandardProps> = (
  props,
  ref,
) => <ButtonStyled {...props} variant="standard" ref={ref} />;

export default React.forwardRef(ButtonStandard);
