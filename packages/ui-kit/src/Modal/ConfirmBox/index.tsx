import React from 'react';
import { Global, css, useTheme } from '@emotion/react';
import ReactModal from 'react-modal';

import Container, { ConfirmBoxContainerProps } from './ConfirmBoxContainer';
import Content, { ConfirmBoxContentProps } from './ConfirmBoxContent';
import Footer, { ConfirmBoxFooterProps } from './ConfirmBoxFooter';
import Header, { ConfirmBoxHeaderProps } from './ConfirmBoxHeader';

export interface ConfirmBoxProps extends ReactModal.Props {
  /**
   * Dialog title
   */
  readonly title: string;

  /**
   * Dialog message
   */
  readonly message: React.ReactNode;

  /**
   * On confirmation event
   */
  readonly onRequestYes: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * On close request
   */
  readonly onRequestClose: (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
  ) => void;

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

const ConfirmBox: React.ForwardRefRenderFunction<ReactModal, ConfirmBoxProps> = (props, ref) => {
  const {
    title,
    message,
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
  const theme = useTheme();

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
      <ReactModal
        ref={ref}
        portalClassName="modal-confirmbox"
        closeTimeoutMS={200}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick={false}
        onRequestClose={onRequestClose}
        isOpen={isOpen}
        {...otherProps}
      >
        <overridesMap.Container dialogID={dialogID}>
          {React.useMemo(
            () => (
              <overridesMap.Header dialogID={dialogID}>{title}</overridesMap.Header>
            ),
            [overridesMap, dialogID, title],
          )}
          {React.useMemo(
            () => (
              <overridesMap.Content dialogID={dialogID}>{message}</overridesMap.Content>
            ),
            [dialogID, message, overridesMap],
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
      </ReactModal>
      <Global
        styles={css`
          .modal-confirmbox .ReactModal__Overlay {
            position: fixed !important;
            inset: 0 !important;
            z-index: ${theme.zIndex.modal} !important;
            transition: background-color 120ms ease-in-out !important;
            background-color: ${theme.color.textPrimary.alpha(0).toString()}!important;
          }

          .modal-confirmbox .ReactModal__Overlay--after-open {
            background-color: ${theme.color.textPrimary.alpha(0.5).toString()}!important;
          }

          .modal-confirmbox .ReactModal__Overlay--before-close {
            background-color: ${theme.color.textPrimary.alpha(0).toString()}!important;
          }

          .modal-confirmbox .ReactModal__Content {
            inset: initial !important;
            border: none !important;
            position: absolute !important;
            top: 50% !important;
            padding: 0 !important;
            left: 50% !important;
            opacity: 0 !important;
            overflow: auto !important;
            -webkit-overflow-scrolling: touch !important;
            outline: none !important;
            background: ${theme.color.surface.toString()} !important;
            border-radius: 1em !important;
            transform: translate(-50%, -40%) !important;
            transition: transform 100ms ease-in-out, opacity 100ms ease-in-out !important;
          }

          .modal-confirmbox .ReactModal__Content--after-open {
            opacity: 1 !important;
            transform: translate(-50%, -50%) !important;
            transition-duration: 160ms !important;
          }

          .modal-confirmbox .ReactModal__Content--before-close {
            opacity: 0 !important;
            transform: translate(-50%, 300px) !important;
          }
        `}
      />
    </>
  );
};

export default React.forwardRef(ConfirmBox);
