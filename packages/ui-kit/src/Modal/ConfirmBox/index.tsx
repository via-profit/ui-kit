import React from 'react';

import BaseModal, { BaseModalProps } from '../BaseModal';
import Container, { ConfirmBoxContainerProps } from './ConfirmBoxContainer';
import Content, { ConfirmBoxContentProps } from './ConfirmBoxContent';
import Footer, { ConfirmBoxFooterProps } from './ConfirmBoxFooter';
import Header, { ConfirmBoxHeaderProps } from './ConfirmBoxHeader';

export interface ConfirmBoxProps extends Omit<BaseModalProps, 'overrides'> {
  readonly variant: 'confirm-box';
  /**
   * Dialog header
   */
  readonly header: string;

  /**
   * On confirmation event
   */
  readonly onRequestYes: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * On close request
   */
  readonly onRequestClose: () => void;

  /**
   * Label of Dissmiss button
   * **Default**: `"Dismiss"`
   */
  readonly dismissButtonLabel?: React.ReactNode;

  /**
   * Label of Confirmation button
   * **Default**: `"Confirm"`
   */
  readonly confirmButtonLabel?: React.ReactNode;

  /**
   * Overridable components map
   */
  readonly overrides?: ConfirmBoxOverrides;
}

export interface ConfirmBoxOverrides {
  /**
   * Element container
   */
  readonly Container?: React.ForwardRefExoticComponent<
    ConfirmBoxContainerProps & React.RefAttributes<HTMLDivElement>
  >;
  /**
   * Element ontent
   */
  readonly Content?: React.ForwardRefExoticComponent<
    ConfirmBoxContentProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Element footer
   */
  readonly Footer?: React.ForwardRefExoticComponent<
    ConfirmBoxFooterProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Element header
   */
  readonly Header?: React.ForwardRefExoticComponent<
    ConfirmBoxHeaderProps & React.RefAttributes<HTMLDivElement>
  >;
}

const ConfirmBox: React.FC<ConfirmBoxProps> = props => {
  const {
    header,
    children,
    onRequestYes,
    onRequestClose,
    overrides,
    isOpen,
    dismissButtonLabel,
    confirmButtonLabel,
    ...otherProps
  } = props;
  const dialogID = React.useMemo(() => `dialog-confirm-${new Date().getTime()}`, []);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  const overridesMap = React.useMemo(
    () => ({
      Container,
      Content,
      Footer,
      Header,
      ...overrides,
    }),
    [overrides],
  );

  React.useEffect(() => {
    setTimeout(() => {
      if (isOpen && buttonRef.current) {
        buttonRef.current.focus();
      }
    }, 15);
  }, [isOpen]);

  return (
    <>
      <BaseModal onRequestClose={onRequestClose} isOpen={isOpen} {...otherProps}>
        <overridesMap.Container dialogID={dialogID}>
          {React.useMemo(
            () => (
              <overridesMap.Header dialogID={dialogID}>{header}</overridesMap.Header>
            ),
            [overridesMap, dialogID, header],
          )}
          {React.useMemo(
            () => (
              <overridesMap.Content dialogID={dialogID}>{children}</overridesMap.Content>
            ),
            [dialogID, children, overridesMap],
          )}
          {React.useMemo(
            () => (
              <overridesMap.Footer
                dialogID={dialogID}
                onRequestClose={onRequestClose}
                onRequestYes={onRequestYes}
                dismissButtonLabel={dismissButtonLabel}
                confirmButtonLabel={confirmButtonLabel}
              />
            ),
            [
              confirmButtonLabel,
              dialogID,
              dismissButtonLabel,
              onRequestClose,
              onRequestYes,
              overridesMap,
            ],
          )}
        </overridesMap.Container>
      </BaseModal>
    </>
  );
};

export default ConfirmBox;