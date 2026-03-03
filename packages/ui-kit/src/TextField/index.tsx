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
  readonly Input?: React.ComponentType<TextFieldInputProps & React.RefAttributes<HTMLInputElement>>;

  /**
   * Component for display error text
   */
  readonly ErrorText?: React.ComponentType<
    TextFieldErrorTextProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Icons wrapper component
   */
  readonly IconWrapper?: React.ComponentType<
    TextFieldIconWrapperProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * input field wrapper component
   */
  readonly InputWrapper?: React.ComponentType<
    TextFieldInputWrapperProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * label component
   */
  readonly Label?: React.ComponentType<TextFieldLabelProps & React.RefAttributes<HTMLLabelElement>>;

  /**
   * label asterisk component
   */
  readonly Asterisk?: React.ComponentType<
    TextFieldLabelAsteriskProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * label component
   */
  readonly Container?: React.ComponentType<
    TextFieldContainerProps & React.RefAttributes<HTMLDivElement>
  >;
}

const defailtOverrides = {
  Label,
  Input,
  Asterisk,
  Container,
  ErrorText,
  IconWrapper,
  InputWrapper,
};

const TextField = React.forwardRef(
  (props: TextFieldProps, ref: React.ForwardedRef<HTMLDivElement>) => {
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

      return [
        u.substring(0, 8),
        u.substring(8, 12),
        '4000-8' + u.substring(13, 16),
        u.substring(16, 28),
      ].join('-');
    }, [id]);

    const stableOnChange = React.useCallback(onChange ? onChange : () => undefined, [onChange]); // уже есть
// const stableOnFocus = React.useCallback(onFocus, [onFocus]); // уже есть
// const stableOnBlur = React.useCallback(onBlur, [onBlur]); // уже есть

    const inputChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
      event => {
        if (stableOnChange) {
          stableOnChange(event);
        }
      },
      [stableOnChange],
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
        ...defailtOverrides,
        ...overrides,
      }),
      [overrides],
    );

    const renderAsterisk = React.useCallback(() => {
      if (!requiredAsterisk) {
        return null;
      }

      return (
        <overridesMap.Asterisk>
          {typeof requiredAsterisk === 'boolean' ? '*' : requiredAsterisk}
        </overridesMap.Asterisk>
      );
    }, [overridesMap, requiredAsterisk]);

    const renderLabel = React.useCallback(() => {
      if (!label) {
        return null;
      }

      return (
        <overridesMap.Label htmlFor={inputID} error={error}>
          {label}
          {renderAsterisk()}
        </overridesMap.Label>
      );
    }, [error, inputID, label, overridesMap, renderAsterisk]);

    const renderIcon = React.useCallback(
      (position: 'start' | 'end', icon?: React.ReactElement) => (
        <overridesMap.IconWrapper position={position}>{icon}</overridesMap.IconWrapper>
      ),
      [overridesMap],
    );

    return (
      <overridesMap.Container
        ref={ref}
        fullWidth={fullWidth}
        className={className}
        style={style}
        focused={focused}
      >
        {renderLabel()}

        <overridesMap.InputWrapper error={error} focused={focused} fullWidth={fullWidth}>
          {hasStartIcon && renderIcon('start', startIcon)}

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
          {hasEndIcon && renderIcon('end', endIcon)}
        </overridesMap.InputWrapper>
        <overridesMap.ErrorText error={error}>{errorText}</overridesMap.ErrorText>
      </overridesMap.Container>
    );
  },
);

TextField.displayName = 'TextField';
export default React.memo(TextField);
