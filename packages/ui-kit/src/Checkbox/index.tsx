import React from 'react';

import Wrapper, { CheckboxWrapperProps } from './CheckboxWrapper';
import Container, { CheckboxContainerProps, CheckboxLabelPosition } from './CheckboxContainer';
import Box, { CheckboxBoxProps } from './CheckboxBox';
import Icon, { CheckboxIconProps } from './CheckboxIcon';
import TextWrapper, { CheckboxTextWrapperProps } from './CheckboxTextWrapper';
import Asterisk, { CheckboxAsteriskProps } from './CheckboxAsterisk';
import ErrorText, { CheckboxErrorTextProps } from './CheckboxErrorText';

export type { CheckboxLabelPosition };

export type CheckboxProps = Omit<
  CheckboxBoxProps,
  'checked' | 'defaultChecked' | 'onChange' | 'disabled' | 'color' | 'error' | 'indeterminate'
> & {
  /**
   * The state of the controlled checkbox. Pass it together with `onChange`
   * Default: undefined
   */
  readonly checked?: boolean;

  /**
   * The initial state of the uncontrolled checkbox
   * Default: false
   */
  readonly defaultChecked?: boolean;

  /**
   * Called when the user toggles the checkbox. The new value is `event.currentTarget.checked`
   */
  readonly onChange?: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * Shows the dash instead of the check mark, e.g. «select all» when only some items are selected.\
   * Only the look changes: `checked` keeps its value
   * Default: false
   */
  readonly indeterminate?: boolean;

  /**
   * If `true` the checkbox state can not be changed
   * Default: false
   */
  readonly disabled?: boolean;

  /**
   * You can pass the primary, default, secondary name of the colors or your specified color value
   * Default: `default`
   */
  readonly color?: 'default' | 'primary' | 'secondary' | string;

  /**
   * Position of the label relative to the checkbox
   * Default: `end`
   */
  readonly labelPosition?: CheckboxLabelPosition;

  /**
   * If true then `errorText` value will be displayed under the checkbox
   */
  readonly error?: boolean;

  /**
   * Text or ReactNode to show in the error element.\
   * Will be displayed only if `error` property is true
   */
  readonly errorText?: React.ReactNode;

  /**
   * If is true then the asterisk will be displayed in label\
   * If is ReactNode then ReactNode will be displayed in label
   */
  readonly requiredAsterisk?: boolean | React.ReactNode;

  readonly overrides?: CheckboxOverrides;
};

export interface CheckboxOverrides {
  /**
   * The root element: the checkbox with the label and the error text
   */
  readonly Wrapper?: React.ComponentType<
    CheckboxWrapperProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * The label element with the checkbox and the text
   */
  readonly Container?: React.ComponentType<
    CheckboxContainerProps & React.RefAttributes<HTMLLabelElement>
  >;

  /**
   * The square with the native input
   */
  readonly Box?: React.ComponentType<CheckboxBoxProps & React.RefAttributes<HTMLInputElement>>;

  /**
   * The check mark and the dash of the indeterminate state
   */
  readonly Icon?: React.ComponentType<CheckboxIconProps & React.RefAttributes<HTMLSpanElement>>;

  /**
   * The text wrapper
   */
  readonly TextWrapper?: React.ComponentType<
    CheckboxTextWrapperProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * The asterisk of the required field
   */
  readonly Asterisk?: React.ComponentType<
    CheckboxAsteriskProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * The error text wrapper
   */
  readonly ErrorText?: React.ComponentType<
    CheckboxErrorTextProps & React.RefAttributes<HTMLDivElement>
  >;
}

const Checkbox: React.ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = (props, ref) => {
  const {
    checked,
    defaultChecked,
    onChange,
    indeterminate = false,
    disabled,
    color,
    labelPosition,
    error,
    errorText,
    requiredAsterisk,
    overrides,
    children,
    className,
    style,
    ...nativeProps
  } = props;

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [internalChecked, setInternalChecked] = React.useState(Boolean(defaultChecked));
  const isControlled = typeof checked !== 'undefined';
  const isChecked = isControlled ? Boolean(checked) : internalChecked;

  const overridesMap = React.useMemo(
    () => ({
      Wrapper: overrides?.Wrapper || Wrapper,
      Container: overrides?.Container || Container,
      Box: overrides?.Box || Box,
      Icon: overrides?.Icon || Icon,
      TextWrapper: overrides?.TextWrapper || TextWrapper,
      Asterisk: overrides?.Asterisk || Asterisk,
      ErrorText: overrides?.ErrorText || ErrorText,
    }),
    [overrides],
  );

  React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  // `indeterminate` exists only as the DOM property, not as the attribute.
  // The browser resets it on click, so it is restored after every change
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate, isChecked]);

  // Warn once, not on every render
  const isControlledWithoutOnChange = isControlled && typeof onChange === 'undefined';
  React.useEffect(() => {
    if (isControlledWithoutOnChange) {
      console.error(
        'The property «onChange» should be passed with prop «checked» to make component controlled',
      );
    }
  }, [isControlledWithoutOnChange]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    if (!isControlled) {
      setInternalChecked(event.currentTarget.checked);
    }

    onChange?.(event);
  };

  return (
    <overridesMap.Wrapper className={className} style={style}>
      <overridesMap.Container labelPosition={labelPosition} disabled={disabled}>
        <overridesMap.Box
          {...nativeProps}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          indeterminate={indeterminate}
          color={color}
          error={error}
          aria-invalid={error || undefined}
          ref={inputRef}
        >
          <overridesMap.Icon checked={isChecked} indeterminate={indeterminate} />
        </overridesMap.Box>
        {(typeof children !== 'undefined' ||
          (requiredAsterisk != null && requiredAsterisk !== false)) && (
          <overridesMap.TextWrapper>
            {children}
            {requiredAsterisk != null && requiredAsterisk !== false && (
              <overridesMap.Asterisk>
                {typeof requiredAsterisk === 'boolean' ? '*' : requiredAsterisk}
              </overridesMap.Asterisk>
            )}
          </overridesMap.TextWrapper>
        )}
      </overridesMap.Container>
      {typeof errorText !== 'undefined' && (
        <overridesMap.ErrorText error={error}>{errorText}</overridesMap.ErrorText>
      )}
    </overridesMap.Wrapper>
  );
};

export default React.forwardRef(Checkbox);
