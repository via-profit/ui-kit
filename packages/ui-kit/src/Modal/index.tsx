import * as React from 'react';
import type ReactModal from 'react-modal';

import ModalDialog, { ModalDialogProps } from './ModalDialog';
import ConfirmBox, { ConfirmBoxProps } from './ConfirmBox';
import MessageBox, { MessageBoxProps } from './MessageBox';
import ModalDrawer, { ModalDrawerProps } from './ModalDrawer';

interface BaseProps {
  readonly variant?: 'dialog' | 'message-box' | 'confirm-box' | 'drawer';
}

export type ModalProps =
  | (ModalDialogProps & BaseProps)
  | (ConfirmBoxProps & BaseProps)
  | (MessageBoxProps & BaseProps)
  | (ModalDrawerProps & BaseProps);

const isDialog = (props: ModalProps): props is ModalDialogProps =>
  ('variant' in props && props.variant === 'dialog') || typeof props.variant === 'undefined';

const isConfirmBox = (props: ModalProps): props is ConfirmBoxProps =>
  'variant' in props && props.variant === 'confirm-box';

const isMessageBox = (props: ModalProps): props is MessageBoxProps =>
  'variant' in props && props.variant === 'message-box';

const isDrawer = (props: ModalProps): props is ModalDrawerProps =>
  'variant' in props && props.variant === 'drawer';

const Modal: React.ForwardRefRenderFunction<ReactModal, ModalProps> = (props, ref) => {
  if (isDialog(props)) {
    return <ModalDialog {...props} ref={ref} />;
  }
  if (isConfirmBox(props)) {
    return <ConfirmBox {...props} ref={ref} />;
  }
  if (isMessageBox(props)) {
    return <MessageBox {...props} ref={ref} />;
  }
  if (isDrawer(props)) {
    return <ModalDrawer {...(props as any)} ref={ref} />;
  }
  const { variant } = props;

  throw new Error(
    `Expected «variant» property is «dialog», «drawer», «message-box» or «confirm-box», but got «${variant}»`,
  );
};

export default React.forwardRef(Modal);
