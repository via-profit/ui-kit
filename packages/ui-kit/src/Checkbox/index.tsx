import React from 'react';

import Container, { CheckboxContainerProps } from './CheckboxContainer';
import ToggleWrapper, { CheckboxToggleWrapperProps } from './CheckboxToggleWrapper';
import TextWrapper, { CheckboxTextWrapperProps } from './CheckboxTextWrapper';
import Check, { CheckboxCheckProps } from './CheckboxCheck';
import Wrapper, { CheckboxWrapperProps } from './CheckboxWrapper';
import ErrorText, { CheckboxErrorTextProps } from './CheckboxErrorText';
import Asterisk, { CheckboxAsteriskProps } from './CheckboxAsterisk';

export type CheckboxProps = Omit<
  CheckboxToggleWrapperProps,
  'checked' | 'onChange' | 'disabled'
> & {
  /**
   * If true then `errorText` value will be displayed under the Checkbox element
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
   * This prop allows you to provide checkbox state and control it. This property overrides internal component state
   * Default: undefined
   */
  readonly checked?: boolean;

  /**
   * This prop allows you to control checkbox component. Function will be executed when user click a checkbox
   * This prop overrides internal comonent control function
   * Default: undefined
   */
  readonly onChange?: React.InputHTMLAttributes<HTMLInputElement>['onChange'];

  /**
   * if `true` checkbox state can not be changed
   * Default: false;
   */
  readonly disabled?: boolean;

  /**
   * if `true` checkbox would be turned on by default
   * Default: false;
   */
  readonly defaultChecked?: boolean;

  /**
   * You can pass the primary, default, secondary name of the colors or your specified color value
   */
  readonly color?: 'default' | 'primary' | 'secondary' | string;

  /**
   * This property changes position of checkbox and its label.
   * Default: `end`
   */
  readonly labelPosition?: 'start' | 'end' | 'top' | 'bottom';

  readonly overrides?: CheckboxOverrides;
};

export interface CheckboxOverrides {
  /**
   * Element container
   */
  readonly Container?: React.ForwardRefExoticComponent<
    CheckboxContainerProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * Element toggle
   */
  readonly ToggleWrapper?: React.ForwardRefExoticComponent<
    CheckboxToggleWrapperProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * text wrapper
   */
  readonly TextWrapper?: React.ForwardRefExoticComponent<
    CheckboxTextWrapperProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * Check wrapper
   */
  readonly Check?: React.ForwardRefExoticComponent<
    CheckboxCheckProps & React.RefAttributes<HTMLSpanElement>
  >;
  /**
   * error text wrapper
   */
  readonly ErrorText?: React.ForwardRefExoticComponent<
    CheckboxErrorTextProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * error text wrapper
   */
  readonly Asterisk?: React.ForwardRefExoticComponent<
    CheckboxAsteriskProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * the main cwitch wrapper
   */
  readonly Wrapper?: React.ForwardRefExoticComponent<
    CheckboxWrapperProps & React.RefAttributes<HTMLSpanElement>
  >;
}

const Checkbox: React.ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = (props, ref) => {
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
      Check: overrides?.Check || Check,
      ErrorText: overrides?.ErrorText || ErrorText,
      Asterisk: overrides?.Asterisk || Asterisk,
      Wrapper: overrides?.Wrapper || Wrapper,
    }),
    [overrides],
  );

  if (typeof checked !== 'undefined' && typeof onChange === 'undefined') {
    console.error(
      'The property «onChange» should be passed with prop «checked» to make component controlled',
    );
  }

  return (
    <overridesMap.Wrapper>
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
          <overridesMap.Check
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
      </overridesMap.Container>
      <overridesMap.ErrorText error={error}>{errorText}</overridesMap.ErrorText>
    </overridesMap.Wrapper>
  );
};

export default React.forwardRef(Checkbox);
