import * as React from 'react';

import BaseModal, { BaseModalProps } from '../BaseModal';
import Container, { MessageBoxContainerProps } from './MessageBoxContainer';
import Content, { MessageBoxContentProps } from './MessageBoxContent';
import Footer, { MessageBoxFooterProps } from './MessageBoxFooter';
import Header, { MessageBoxHeaderProps } from './MessageBoxHeader';
import Overlay, { ModalOverlayProps } from '../BaseModal/ModalOverlay';

export interface MessageBoxProps extends Omit<BaseModalProps, 'overrides'> {
  /**
   * Dialog header
   */
  readonly header: React.ReactNode;

  /**
   * On close request
   */
  readonly onRequestClose: () => void;

  /**
   * Label of button
   * **Default**: `"OK"`
   */
  readonly okButtonLabel?: React.ReactNode;

  /**
   * Overridable components map
   */
  readonly overrides?: MessageBoxOverrides;
}

export interface MessageBoxOverrides {
  /**
   * Element container
   */
  readonly Container?: React.ForwardRefExoticComponent<
    MessageBoxContainerProps & React.RefAttributes<HTMLDivElement>
  >;
  /**
   * Element ontent
   */
  readonly Content?: React.ForwardRefExoticComponent<
    MessageBoxContentProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Element footer
   */
  readonly Footer?: React.ForwardRefExoticComponent<
    MessageBoxFooterProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Element header
   */
  readonly Header?: React.ForwardRefExoticComponent<
    MessageBoxHeaderProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Overlay header
   */
  readonly Overlay?: React.ForwardRefExoticComponent<
    ModalOverlayProps & React.RefAttributes<HTMLDivElement>
  >;
}

const MessageBox: React.FC<MessageBoxProps> = props => {
  const { header, children, onRequestClose, overrides, okButtonLabel, isOpen, ...otherProps } =
    props;
  const dialogID = React.useMemo(() => `dialog-Message-${new Date().getTime()}`, []);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    setTimeout(() => {
      if (isOpen && buttonRef.current) {
        buttonRef.current.focus();
      }
    }, 15);
  }, [isOpen]);

  const overridesMap = React.useMemo(
    () => ({
      Container: overrides?.Container || Container,
      Content: overrides?.Content || Content,
      Footer: overrides?.Footer || Footer,
      Header: overrides?.Header || Header,
      Overlay: overrides?.Overlay || Overlay,
    }),
    [overrides],
  );

  return (
    <>
      <BaseModal
        onRequestClose={onRequestClose}
        isOpen={isOpen}
        overrides={{
          Overlay: overridesMap.Overlay,
        }}
        {...otherProps}
      >
        <overridesMap.Container dialogID={dialogID}>
          <overridesMap.Header dialogID={dialogID}>{header}</overridesMap.Header>
          <overridesMap.Content dialogID={dialogID}>{children}</overridesMap.Content>
          <overridesMap.Footer
            dialogID={dialogID}
            onRequestClose={onRequestClose}
            okButtonLabel={okButtonLabel}
          />
        </overridesMap.Container>
      </BaseModal>
    </>
  );
};

export default MessageBox;
