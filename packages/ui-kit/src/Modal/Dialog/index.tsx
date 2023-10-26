import * as React from 'react';

import BaseModal, { BaseModalProps } from '../BaseModal';
import DialogInner from './DialogInner';

export interface DialogProps extends BaseModalProps {
  readonly children: React.ReactNode | React.ReactNode[];
}

const Dialog: React.FC<DialogProps> = props => {
  const { children, overrides, ...restProps } = props;
  const dialogID = React.useMemo(() => `dialog-${new Date().getTime()}`, []);

  return (
    <>
      <BaseModal
        {...restProps}
        overrides={{
          ...overrides,
          Inner:
            overrides?.Inner ??
            React.forwardRef(function Inner(props, ref) {
              const { children } = props;

              return (
                <DialogInner dialogID={dialogID} ref={ref} {...props}>
                  {children}
                </DialogInner>
              );
            }),
        }}
      >
        {children}
      </BaseModal>
    </>
  );
};

export default Dialog;
