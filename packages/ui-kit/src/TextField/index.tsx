import * as React from 'react';

import Container, { TextFieldContainerProps } from './TextFieldContainer';
import Label, { TextFieldLabelProps } from './TextFieldLabel';
import Asterisk, { TextFieldLabelAsteriskProps } from './TextFieldLabelAsterisk';
import InputWrapper, { TextFieldInputWrapperProps } from './TextFieldInputWrapper';
import Input, { TextFieldInputProps } from './TextFieldInput';
import ErrorText, { TextFieldErrorTextProps } from './TextFieldErrorText';
import IconWrapper, { TextFieldIconWrapperProps } from './TextFieldIconWrapper';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * If true then `errorText` value will be displayed under the TextField element
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
   * If true then TextField will be filled in full width on horizontal
   */
  readonly fullWidth?: boolean;

  /**
   * Native <input> element reference
   */
  readonly inputRef?:
    | React.MutableRefObject<HTMLInputElement | null>
    | React.RefCallback<HTMLInputElement | null>;

  /**
   * Field label text or element
   */
  readonly label?: React.ReactNode;

  /**
   * End icon component
   */
  readonly endIcon?: React.ReactElement;

  /**
   * Start icon component
   */
  readonly startIcon?: React.ReactElement;

  /**
   * Overridable components map
   */
  readonly overrides?: TextFieldOverrides;
}

export interface TextFieldOverrides {
  /**
   * Native `input` component
   */
  readonly Input?: React.ForwardRefExoticComponent<
    TextFieldInputProps & React.RefAttributes<HTMLInputElement>
  >;

  /**
   * Component for display error text
   */
  readonly ErrorText?: React.ForwardRefExoticComponent<
    TextFieldErrorTextProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Icons wrapper component
   */
  readonly IconWrapper?: React.ForwardRefExoticComponent<
    TextFieldIconWrapperProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * input field wrapper component
   */
  readonly InputWrapper?: React.ForwardRefExoticComponent<
    TextFieldInputWrapperProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * label component
   */
  readonly Label?: React.ForwardRefExoticComponent<
    TextFieldLabelProps & React.RefAttributes<HTMLLabelElement>
  >;

  /**
   * label asterisk component
   */
  readonly Asterisk?: React.ForwardRefExoticComponent<
    TextFieldLabelAsteriskProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * label component
   */
  readonly Container?: React.ForwardRefExoticComponent<
    TextFieldContainerProps & React.RefAttributes<HTMLDivElement>
  >;
}

const TextField: React.ForwardRefRenderFunction<HTMLDivElement, TextFieldProps> = (props, ref) => {
  const {
    error,
    fullWidth,
    inputRef,
    label,
    id,
    errorText,
    className,
    style,
    endIcon,
    startIcon,
    requiredAsterisk,
    overrides,
    onChange,
    onFocus,
    onBlur,
    ...nativeInputProps
  } = props;

  const [focused, setFocused] = React.useState(false);
  const inputID = React.useMemo(() => {
    if (typeof id === 'string') {
      return id;
    }

    const u = Date.now().toString(16) + Math.random().toString(16) + '0'.repeat(16);
    const guid = [
      u.substring(0, 8),
      u.substring(8, 12),
      '4000-8' + u.substring(13, 16),
      u.substring(16, 28),
    ].join('-');

    return guid;
  }, [id]);

  const inputChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    event => {
      if (onChange) {
        onChange(event);
      }
    },
    [onChange],
  );

  const inputFocus: React.FocusEventHandler<HTMLInputElement> = React.useCallback(
    event => {
      setFocused(true);
      if (typeof onFocus === 'function') {
        onFocus(event);
      }
    },
    [onFocus],
  );

  const inputBlur: React.FocusEventHandler<HTMLInputElement> = React.useCallback(
    event => {
      setFocused(false);
      if (typeof onBlur === 'function') {
        onBlur(event);
      }
    },
    [onBlur],
  );

  const hasStartIcon = React.useMemo(
    () => typeof startIcon !== 'undefined' && startIcon !== null,
    [startIcon],
  );
  const hasEndIcon = React.useMemo(
    () => typeof endIcon !== 'undefined' && endIcon !== null,
    [endIcon],
  );

  const overridesMap = React.useMemo(
    () => ({
      Label,
      Input,
      Asterisk,
      Container,
      ErrorText,
      IconWrapper,
      InputWrapper,
      ...overrides,
    }),
    [overrides],
  );

  return (
    <overridesMap.Container
      ref={ref}
      fullWidth={fullWidth}
      className={className}
      style={style}
      focused={focused}
    >
      {typeof label !== 'undefined' && label !== null && (
        <overridesMap.Label htmlFor={inputID} error={error}>
          {label}
          {typeof requiredAsterisk !== 'undefined' && requiredAsterisk !== null && (
            <overridesMap.Asterisk>
              {typeof requiredAsterisk === 'boolean' ? '*' : requiredAsterisk}
            </overridesMap.Asterisk>
          )}
        </overridesMap.Label>
      )}

      <overridesMap.InputWrapper error={error} focused={focused} fullWidth={fullWidth}>
        {hasStartIcon && (
          <overridesMap.IconWrapper position="start">{startIcon}</overridesMap.IconWrapper>
        )}

        <overridesMap.Input
          {...nativeInputProps}
          hasStartIcon={hasStartIcon}
          hasEndIcon={hasEndIcon}
          ref={inputRef}
          id={inputID}
          onChange={inputChange}
          onFocus={inputFocus}
          onBlur={inputBlur}
        />
        {hasEndIcon && (
          <overridesMap.IconWrapper position="end">{endIcon}</overridesMap.IconWrapper>
        )}
      </overridesMap.InputWrapper>
      <overridesMap.ErrorText error={error}>{errorText}</overridesMap.ErrorText>
    </overridesMap.Container>
  );
};

export default React.forwardRef(TextField);
