import * as React from 'react';
import styled from '@emotion/styled';
import { Global, css, useTheme } from '@emotion/react';
import ReactModal from 'react-modal';

import Button from '../Button';

export interface ModalConfirmBoxProps extends ReactModal.Props {
  readonly title: string;
  readonly message: React.ReactNode;
  readonly onRequestYes: React.MouseEventHandler<HTMLButtonElement>;
}

const Container = styled.div`
  display: flex;
  flex-flow: column;
  min-width: 20em;
`;

const Header = styled.div`
  padding: 1em 1em 0 1em;
`;

const HeaderTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
`;

const Content = styled.div`
  flex: 1;
  padding: 1em 1em;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1em 1em 1em 1em;

  & > button {
    border-radius: 0;
  }

  & > button:first-of-type {
    border-top-left-radius: 1em;
    border-bottom-left-radius: 1em;
  }

  & > button:last-child {
    border-top-right-radius: 1em;
    border-bottom-right-radius: 1em;
  }
`;

const ModalConfirmBox: React.ForwardRefRenderFunction<ReactModal, ModalConfirmBoxProps> = (
  props,
  ref,
) => {
  const { title, message, onRequestYes, onRequestClose, isOpen, ...otherProps } = props;
  const dialogID = React.useMemo(() => `dialog-confirm-${new Date().getTime()}`, []);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const theme = useTheme();

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
        <Container
          role="modal-confirmbox"
          aria-labelledby={`${dialogID}-title`}
          aria-describedby={`${dialogID}-description`}
        >
          <Header>
            <HeaderTitle id={`${dialogID}-title`}>{title}</HeaderTitle>
          </Header>
          <Content id={`${dialogID}-description`}>{message}</Content>
          <Footer>
            <Button onClick={onRequestClose}>Dismiss</Button>
            <Button color="primary" onClick={onRequestYes}>
              Confirm
            </Button>
          </Footer>
        </Container>
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

export default React.forwardRef(ModalConfirmBox);
