import React from 'react';

import ButtonStyled from './ButtonStyled';
import ButtonGroupContext from '../ButtonGroup/ButtonGroupContext';
import useThemeProps from '../ThemeProvider/useThemeProps';
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

/**
 * The props the ButtonGroup gives to its buttons. Inside the group the theme does not set them:
 * the own props of the button win, then the group, then the theme
 */
const GROUP_PROPS = ['variant', 'color', 'disabled'] as const;

// One component for all the variants, so changing the variant does not remount the button
const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (props, ref) => {
  const group = React.useContext(ButtonGroupContext);
  const themedProps = useThemeProps('Button', props);

  if (!group) {
    return <ButtonStyled {...themedProps} ref={ref} />;
  }

  const ownProps = props as unknown as Record<string, unknown>;
  const buttonProps: Record<string, unknown> = { ...themedProps };
  GROUP_PROPS.forEach(key => {
    buttonProps[key] = ownProps[key];
  });

  return <ButtonStyled {...(buttonProps as ButtonProps)} ref={ref} />;
};

export default React.forwardRef(Button);
