import React from 'react';

import SwitchStandard, { SwitchStandardProps } from './SwitchStandard';

export type SwitchProps = Omit<SwitchStandardProps, 'checked' | 'onChange' | 'disabled'> & {
  readonly checked?: boolean;
  readonly onChange?: () => void;
  readonly disabled?: boolean;
  readonly defaultChecked?: boolean;
};

const Switch: React.ForwardRefRenderFunction<HTMLInputElement, SwitchProps> = (props, ref) => {
  const { checked, onChange, defaultChecked, ...switchProps } = props;
  const [internalChecked, setInternalChecked] = React.useState<boolean>(
    typeof defaultChecked !== 'undefined' ? defaultChecked : false,
  );

  if (typeof checked !== 'undefined' && typeof onChange === 'undefined') {
    console.error(
      'The property «onChange» should be passed with prop «checked» to make component controlled',
    );
  }

  return (
    <SwitchStandard
      {...switchProps}
      ref={ref}
      checked={typeof checked !== 'undefined' ? checked : internalChecked}
      onChange={
        typeof onChange !== 'undefined' ? onChange : () => setInternalChecked(!internalChecked)
      }
    />
  );
};

export default React.forwardRef(Switch);
