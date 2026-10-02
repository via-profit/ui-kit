import * as React from 'react';

import BaseModal, { BaseModalProps } from '../BaseModal';
import type { ModalInnerProps } from '../BaseModal/ModalInner';
import DialogInner from './DialogInner';
import useDialogID from '../BaseModal/useDialogID';
import useThemeProps from '../../ThemeProvider/useThemeProps';

export interface DialogProps extends BaseModalProps {
  readonly children: React.ReactNode | React.ReactNode[];
}

const Dialog: React.FC<DialogProps> = props => {
  const { children, overrides, ...restProps } = useThemeProps('Dialog', props);
  const dialogID = useDialogID('dialog');

  // Created once: a component created during the render is a new type on every render,
  // so React would remount the whole dialog content (inputs lose the focus and the state)
  const Inner = React.useMemo(
    () =>
      overrides?.Inner ??
      React.forwardRef<HTMLDivElement, ModalInnerProps>(function Inner(innerProps, ref) {
        return <DialogInner dialogID={dialogID} ref={ref} {...innerProps} />;
      }),
    [overrides?.Inner, dialogID],
  );

  const modalOverrides = React.useMemo(() => ({ ...overrides, Inner }), [overrides, Inner]);

  return (
    <BaseModal {...restProps} overrides={modalOverrides}>
      {children}
    </BaseModal>
  );
};

export default Dialog;
