import React from 'react';

import Container, { SwitchContainerProps } from './SwitchContainer';
import ToggleWrapper, { SwitchToggleWrapperProps } from './SwitchToggleWrapper';
import TextWrapper, { SwitchTextWrapperProps } from './SwitchTextWrapper';
import Dot, { SwitchDotProps } from './SwitchDot';
import Track, { SwitchTrackProps } from './SwitchTrack';
import ErrorText, { SwitchErrorTextProps } from './SwitchErrorText';
import Asterisk, { SwitchAsteriskProps } from './SwitchAsterisk';

export type SwitchProps = Omit<SwitchToggleWrapperProps, 'checked' | 'onChange' | 'disabled'> & {
  /**
   * If true then `errorText` value will be displayed under the Switch element
   */
  readonly error?: boolean;

  /**
   * If is true then the asterisk will be displayed in label\
   * If is ReactNode then ReactNode will be displayed in label
   */
  readonly requiredAsterisk?: boolean | React.ReactNode;

  /**
   * Text or ReactNode to show in error element\
   * Will be displaed only if `error` property is tru
   */
  readonly errorText?: React.ReactNode;

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
   * You can pass the primary, default, secondary name of the colors or your specified color value
   */
  readonly color?: 'default' | 'primary' | 'secondary' | string;

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
   * Dot wrapper
   */
  readonly Dot?: React.ForwardRefExoticComponent<
    SwitchDotProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * Toggle track wrapper
   */
  readonly Track?: React.ForwardRefExoticComponent<
    SwitchTrackProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * error text wrapper
   */
  readonly ErrorText?: React.ForwardRefExoticComponent<
    SwitchErrorTextProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * error text wrapper
   */
  readonly Asterisk?: React.ForwardRefExoticComponent<
    SwitchAsteriskProps & React.RefAttributes<HTMLSpanElement>
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
    error,
    errorText,
    requiredAsterisk,
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
      ErrorText: overrides?.ErrorText || ErrorText,
      Asterisk: overrides?.Asterisk || Asterisk,
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
      <overridesMap.TextWrapper>
        {children}
        {typeof requiredAsterisk !== 'undefined' && requiredAsterisk !== null && (
          <overridesMap.Asterisk>
            {typeof requiredAsterisk === 'boolean' ? '*' : requiredAsterisk}
          </overridesMap.Asterisk>
        )}
      </overridesMap.TextWrapper>
      <overridesMap.ErrorText error={error}>{errorText}</overridesMap.ErrorText>
    </overridesMap.Container>
  );
};

export default React.forwardRef(Switch);
