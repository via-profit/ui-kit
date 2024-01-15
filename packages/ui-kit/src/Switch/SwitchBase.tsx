import React from 'react';

import TextWrapper, { SwitchTextWrapperProps } from './SwitchTextWrapper';
import Toggle, { SwitchToggleProps } from './SwitchToggle';
import Container, { SwitchContainerProps } from './SwitchContainer';

type SwitchNativeProps = React.HTMLAttributes<HTMLSpanElement> & {
  readonly onChange: () => void;
};

export interface SwitchBaseProps extends Omit<SwitchNativeProps, 'color'> {
  /**
   * You can pass the primary, default, secondary name of the colors or your specified color value
   */
  readonly color?: SwitchContainerProps['color'];

  /**
   * Overridable components map
   */
  readonly overrides?: SwitchBaseOverrides;

  readonly checked: boolean;
  readonly disabled?: boolean;
}

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

const SwitchBase: React.ForwardRefRenderFunction<HTMLSpanElement, SwitchBaseProps> = (
  props,
  ref,
) => {
  const { children, color, overrides, onChange, ...nativeProps } = props;
  const overridesMap = React.useMemo(
    () => ({
      TextWrapper: overrides?.TextWrapper || TextWrapper,
      Toggle: overrides?.Toggle || Toggle,
      Container: overrides?.Container || Container,
    }),
    [overrides],
  );

  return (
    <overridesMap.Container color={color} ref={ref} onChange={onChange}>
      <overridesMap.Toggle {...nativeProps} color={color} />
      <overridesMap.TextWrapper>{children}</overridesMap.TextWrapper>
    </overridesMap.Container>
  );
};

export default React.forwardRef(SwitchBase);
