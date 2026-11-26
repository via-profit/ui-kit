import * as React from 'react';

import Dialog, { DialogProps } from './Dialog';
import ConfirmBox, { ConfirmBoxProps } from './ConfirmBox';
import MessageBox, { MessageBoxProps } from './MessageBox';
import Drawer, { DrawerProps } from './Drawer';

interface BaseProps {
  readonly variant?: 'dialog' | 'message-box' | 'confirm-box' | 'drawer';
}

export * from './Dialog';
export * from './ConfirmBox';
export * from './MessageBox';
export * from './Drawer';

export type ModalProps =
  | (DialogProps & BaseProps)
  | (ConfirmBoxProps & BaseProps)
  | (MessageBoxProps & BaseProps)
  | (DrawerProps & BaseProps);

const isDialog = (props: ModalProps): props is DialogProps =>
  ('variant' in props && props.variant === 'dialog') || typeof props.variant === 'undefined';

const isConfirmBox = (props: ModalProps): props is ConfirmBoxProps =>
  'variant' in props && props.variant === 'confirm-box';

const isMessageBox = (props: ModalProps): props is MessageBoxProps =>
  'variant' in props && props.variant === 'message-box';

const isDrawer = (props: ModalProps): props is DrawerProps =>
  'variant' in props && props.variant === 'drawer';

const Modal: React.FC<ModalProps> = props => {
  if (isDialog(props)) {
    return <Dialog {...props} />;
  }
  if (isConfirmBox(props)) {
    return <ConfirmBox {...props} />;
  }
  if (isMessageBox(props)) {
    return <MessageBox {...props} />;
  }
  if (isDrawer(props)) {
    return <Drawer {...(props as any)} />;
  }
  const { variant } = props;

  throw new Error(
    `Expected «variant» property is «dialog», «drawer», «message-box» or «confirm-box», but got «${variant}»`,
  );
};

export default Modal;
