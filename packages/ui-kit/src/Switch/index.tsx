import React from 'react';

import Container, { SwitchContainerProps } from './SwitchContainer';
import ToggleWrapper, { SwitchToggleWrapperProps } from './SwitchToggleWrapper';
import TextWrapper, { SwitchTextWrapperProps } from './SwitchTextWrapper';
import Dot, { SwitchDotProps } from './SwitchDot';
import Track, { SwitchTrackProps } from './SwitchTrack';

export type SwitchProps = Omit<SwitchToggleWrapperProps, 'checked' | 'onChange' | 'disabled'> & {
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

  readonly overrides?: SwitchOverrides;
};

export interface SwitchOverrides {
  /**
   * Element container
   */
  readonly Container?: React.ForwardRefExoticComponent<
    SwitchContainerProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * Element toggle
   */
  readonly ToggleWrapper?: React.ForwardRefExoticComponent<
    SwitchToggleWrapperProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * text wrapper
   */
  readonly TextWrapper?: React.ForwardRefExoticComponent<
    SwitchTextWrapperProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * text wrapper
   */
  readonly Dot?: React.ForwardRefExoticComponent<
    SwitchDotProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * text wrapper
   */
  readonly Track?: React.ForwardRefExoticComponent<
    SwitchTrackProps & React.RefAttributes<HTMLSpanElement>
  >;
}

const Switch: React.ForwardRefRenderFunction<HTMLInputElement, SwitchProps> = (props, ref) => {
  const {
    checked,
    onChange,
    defaultChecked,
    overrides,
    disabled,
    labelPosition,
    children,
    color,
    name,
    ...nativeProps
  } = props;
  const [internalChecked, setInternalChecked] = React.useState<boolean>(
    typeof defaultChecked !== 'undefined' ? defaultChecked : false,
  );
  const overridesMap = React.useMemo(
    () => ({
      TextWrapper: overrides?.TextWrapper || TextWrapper,
      ToggleWrapper: overrides?.ToggleWrapper || ToggleWrapper,
      Container: overrides?.Container || Container,
      Track: overrides?.Track || Track,
      Dot: overrides?.Dot || Dot,
    }),
    [overrides],
  );

  if (typeof checked !== 'undefined' && typeof onChange === 'undefined') {
    console.error(
      'The property «onChange» should be passed with prop «checked» to make component controlled',
    );
  }

  return (
    <overridesMap.Container labelPosition={labelPosition} disabled={disabled}>
      <overridesMap.ToggleWrapper
        {...nativeProps}
        disabled={disabled}
        onChange={
          typeof onChange !== 'undefined'
            ? onChange
            : () => {
                setInternalChecked(!internalChecked);
              }
        }
        color={color}
        checked={typeof checked !== 'undefined' ? checked : defaultChecked ? true : undefined}
        name={name}
        ref={ref}
      >
        <overridesMap.Track
          color={color}
          checked={typeof checked !== 'undefined' ? checked : internalChecked}
        />
        <overridesMap.Dot
          color={color}
          checked={typeof checked !== 'undefined' ? checked : internalChecked}
        />
      </overridesMap.ToggleWrapper>
      <overridesMap.TextWrapper>{children}</overridesMap.TextWrapper>
    </overridesMap.Container>
  );
};

export default React.forwardRef(Switch);
