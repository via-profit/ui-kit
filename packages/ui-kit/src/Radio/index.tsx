import React from 'react';

import Container, { RadioContainerProps, RadioLabelPosition } from './RadioContainer';
import Box, { RadioBoxProps } from './RadioBox';
import TextWrapper, { RadioTextWrapperProps } from './RadioTextWrapper';
import RadioGroupContext from '../RadioGroup/RadioGroupContext';
import useThemeProps from '../ThemeProvider/useThemeProps';

export type { RadioLabelPosition };

export type RadioProps = Omit<RadioBoxProps, 'color' | 'error'> & {
  /**
   * The value of the radio button. Inside `<RadioGroup>` it is required:
   * the group compares it with its own value
   */
  readonly value?: string;

  /**
   * You can pass the primary, default, secondary name of the colors or your specified color value\
   * **Default:** `default`, inside `<RadioGroup>` — the color of the group
   */
  readonly color?: 'default' | 'primary' | 'secondary' | string;

  /**
   * Position of the label relative to the radio button\
   * **Default:** `end`
   */
  readonly labelPosition?: RadioLabelPosition;

  /**
   * Paints the circle with the error color. Inside `<RadioGroup>` it comes from the group
   */
  readonly error?: boolean;

  readonly overrides?: RadioOverrides;
};

export interface RadioOverrides {
  /**
   * The label element with the radio button and the text
   */
  readonly Container?: React.ComponentType<
    RadioContainerProps & React.RefAttributes<HTMLLabelElement>
  >;

  /**
   * The circle with the native input
   */
  readonly Box?: React.ComponentType<RadioBoxProps & React.RefAttributes<HTMLInputElement>>;

  /**
   * The text wrapper
   */
  readonly TextWrapper?: React.ComponentType<
    RadioTextWrapperProps & React.RefAttributes<HTMLSpanElement>
  >;
}

const Radio: React.ForwardRefRenderFunction<HTMLInputElement, RadioProps> = (props, ref) => {
  const group = React.useContext(RadioGroupContext);
  const {
    children,
    value,
    checked,
    defaultChecked,
    onChange,
    disabled,
    color,
    labelPosition,
    error,
    name,
    required,
    overrides,
    className,
    style,
    ...nativeProps
  } = useThemeProps('Radio', props);

  const overridesMap = React.useMemo(
    () => ({
      Container: overrides?.Container || Container,
      Box: overrides?.Box || Box,
      TextWrapper: overrides?.TextWrapper || TextWrapper,
    }),
    [overrides],
  );

  // Inside a group the group decides; the own props of the radio button win where it makes sense
  const isDisabled = disabled ?? group?.disabled;
  const groupChecked =
    group && typeof value !== 'undefined' && typeof group.value !== 'undefined'
      ? group.value === value
      : undefined;
  const groupDefaultChecked =
    group && typeof value !== 'undefined' && typeof group.value === 'undefined'
      ? group.defaultValue === value
      : undefined;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    onChange?.(event);

    if (group && typeof value !== 'undefined') {
      group.onChange(value, event);
    }
  };

  return (
    <overridesMap.Container
      className={className}
      style={style}
      labelPosition={labelPosition}
      disabled={isDisabled}
    >
      <overridesMap.Box
        {...nativeProps}
        value={value}
        name={group?.name ?? name}
        checked={checked ?? groupChecked}
        defaultChecked={defaultChecked ?? groupDefaultChecked}
        onChange={handleChange}
        disabled={isDisabled}
        required={required ?? group?.required}
        color={color ?? group?.color}
        error={error ?? group?.error}
        ref={ref}
      />
      {typeof children !== 'undefined' && (
        <overridesMap.TextWrapper>{children}</overridesMap.TextWrapper>
      )}
    </overridesMap.Container>
  );
};

export default React.forwardRef(Radio);
