import React from 'react';

import SwitchStandard, { SwitchStandardProps } from './SwitchStandard';
import Container, { SwitchContainerProps } from './SwitchContainer';
import Toggle, { SwitchToggleProps } from './SwitchToggle';
import TextWrapper, { SwitchTextWrapperProps } from './SwitchTextWrapper';

export type SwitchProps = Omit<SwitchStandardProps, 'checked' | 'onChange' | 'disabled'> & {
  /**
   * This prop allows you to provide switch state and control it. This property overrides internal component state
   * Default: undefined
   */
  readonly checked?: boolean;

  /**
   * This prop allows you to control switch component. Function will be executed when user click a switch
   * This prop overrides internal comonent control function
   * Default: undefined
   */
  readonly onChange?: React.InputHTMLAttributes<HTMLInputElement>['onChange'];

  /**
   * if `true` switch state can not be changed
   * Default: false;
   */
  readonly disabled?: boolean;

  /**
   * if `true` switch would be turned on by default
   * Default: false;
   */
  readonly defaultChecked?: boolean;

  /**
   * This property changes position of switch and its label.
   * Default: `end`
   */
  readonly labelPosition?: 'start' | 'end' | 'top' | 'bottom';
};

export interface SwitchBaseOverrides {
  /**
   * Element container
   */
  readonly Container?: React.ForwardRefExoticComponent<
    SwitchContainerProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * Element toggle
   */
  readonly Toggle?: React.ForwardRefExoticComponent<
    SwitchToggleProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * text wrapper
   */
  readonly TextWrapper?: React.ForwardRefExoticComponent<
    SwitchTextWrapperProps & React.RefAttributes<HTMLSpanElement>
  >;
}

const Switch: React.ForwardRefRenderFunction<HTMLLabelElement, SwitchProps> = (props, ref) => {
  const {
    checked,
    onChange,
    defaultChecked,
    overrides,
    disabled,
    labelPosition,
    children,
    color,
    ...nativeProps
  } = props;
  const [internalChecked, setInternalChecked] = React.useState<boolean>(
    typeof defaultChecked !== 'undefined' ? defaultChecked : false,
  );
  const overridesMap = React.useMemo(
    () => ({
      TextWrapper: overrides?.TextWrapper || TextWrapper,
      Toggle: overrides?.Toggle || Toggle,
      Container: overrides?.Container || Container,
    }),
    [overrides],
  );

  if (typeof checked !== 'undefined' && typeof onChange === 'undefined') {
    console.error(
      'The property «onChange» should be passed with prop «checked» to make component controlled',
    );
  }

  return (
    <overridesMap.Container
      labelPosition={labelPosition}
      disabled={disabled}
      ref={ref}
      onChange={onChange}
    >
      <overridesMap.Toggle {...nativeProps} color={color} />
      <overridesMap.TextWrapper>{children}</overridesMap.TextWrapper>
    </overridesMap.Container>
  );
};

export default React.forwardRef(Switch);
