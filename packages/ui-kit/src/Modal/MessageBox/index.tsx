import * as React from 'react';
import { Global, css, useTheme } from '@emotion/react';
import ReactModal from 'react-modal';

import Container, { MessageBoxContainerProps } from './MessageBoxContainer';
import Content, { MessageBoxContentProps } from './MessageBoxContent';
import Footer, { MessageBoxFooterProps } from './MessageBoxFooter';
import Header, { MessageBoxHeaderProps } from './MessageBoxHeader';

export interface MessageBoxProps extends ReactModal.Props {
  /**
   * Dialog title
   */
  readonly title: string;

  /**
   * Dialog message
   */
  readonly message: React.ReactNode;

  /**
   * On close request
   */
  readonly onRequestClose: (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
  ) => void;

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
}

const MessageBox: React.ForwardRefRenderFunction<ReactModal, MessageBoxProps> = (props, ref) => {
  const { title, message, onRequestClose, overrides, okButtonLabel, isOpen, ...otherProps } = props;
  const dialogID = React.useMemo(() => `dialog-Message-${new Date().getTime()}`, []);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const theme = useTheme();

  React.useEffect(() => {
    setTimeout(() => {
      if (isOpen && buttonRef.current) {
        buttonRef.current.focus();
      }
    }, 15);
  }, [isOpen]);

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

  return (
    <>
      <ReactModal
        ref={ref}
        portalClassName="modal-messagebox"
        closeTimeoutMS={200}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick={false}
        onRequestClose={onRequestClose}
        isOpen={isOpen}
        {...otherProps}
      >
        <overridesMap.Container dialogID={dialogID}>
          <overridesMap.Header dialogID={dialogID}>{title}</overridesMap.Header>
          <overridesMap.Content dialogID={dialogID}>{message}</overridesMap.Content>
          <overridesMap.Footer
            dialogID={dialogID}
            onRequestClose={onRequestClose}
            okButtonLabel={okButtonLabel}
          />
        </overridesMap.Container>
      </ReactModal>
      <Global
        styles={css`
          .modal-messagebox .ReactModal__Overlay {
            position: fixed !important;
            inset: 0 !important;
            z-index: ${theme.zIndex.modal} !important;
            transition: background-color 120ms ease-in-out !important;
            background-color: ${theme.color.textPrimary.alpha(0).toString()}!important;
          }

          .modal-messagebox .ReactModal__Overlay--after-open {
            background-color: ${theme.color.textPrimary.alpha(0.5).toString()}!important;
          }

          .modal-messagebox .ReactModal__Overlay--before-close {
            background-color: ${theme.color.textPrimary.alpha(0).toString()}!important;
          }

          .modal-messagebox .ReactModal__Content {
            inset: initial !important;
            padding: 0 !important;
            position: absolute !important;
            top: 50% !important;
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

          .modal-messagebox .ReactModal__Content--after-open {
            opacity: 1 !important;
            transform: translate(-50%, -50%) !important;
            transition-duration: 160ms !important;
          }

          .modal-messagebox .ReactModal__Content--before-close {
            opacity: 0 !important;
            transform: translate(-50%, 300px) !important;
          }
        `}
      />
    </>
  );
};

export default React.forwardRef(MessageBox);
