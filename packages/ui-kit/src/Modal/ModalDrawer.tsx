import * as React from 'react';
import styled from '@emotion/styled';
import { Global, css, useTheme } from '@emotion/react';
import ReactModal from 'react-modal';

import Button from '../Button';
import CloseOutlineIcon from './CloseIcon';

export interface ModalDrawerProps extends ReactModal.Props {
  readonly children: React.ReactNode | React.ReactNode[];
  readonly title?: string;
  readonly toolbar?: React.ReactNode | React.ReactNode[] | null;
  readonly footer?: React.ReactNode | React.ReactNode[] | null;
  readonly closeButton?: boolean;
}

const Container = styled.div`
  min-height: 2rem;
  max-height: calc(100vh - 3rem);
  display: flex;
  flex-flow: column;
`;

const Header = styled.div`
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Toolbar = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Title = styled.div`
  font-size: 1.3em;
  font-weight: 600;
  margin-right: 1em;
`;

const Footer = styled.div`
  padding: 1em;
`;

const Inner = styled.div`
  padding: 1em;
  overflow-y: auto;
  flex: 1;
`;

const CloseButton = styled(Button)<{ $withToolbar: boolean }>`
  margin-left: ${props => (props.$withToolbar ? '1em' : 0)};
  color: ${props => props.theme.color.textPrimary.toString()};
  background: none;
  width: auto;
  height: auto;
  padding: 0.6em;
  font-size: 1em;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ModalDrawer: React.ForwardRefRenderFunction<ReactModal, ModalDrawerProps> = (props, ref) => {
  const { children, onRequestClose, title, toolbar, footer, closeButton, ...otherProps } = props;
  const theme = useTheme();
  const hasFooter = typeof footer !== 'undefined' && footer !== null;
  const hasHeader = typeof title === 'string' || typeof toolbar !== 'undefined' || closeButton;

  return (
    <>
      <ReactModal
        ref={ref}
        closeTimeoutMS={300}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
        portalClassName="modal-drawer"
        onRequestClose={onRequestClose}
        {...otherProps}
      >
        <Container>
          {hasHeader && (
            <Header>
              {typeof title === 'string' && <Title>{title}</Title>}
              <Toolbar>{toolbar}</Toolbar>
              {closeButton && (
                <CloseButton type="button" $withToolbar={Boolean(toolbar)} onClick={onRequestClose}>
                  <CloseOutlineIcon />
                </CloseButton>
              )}
            </Header>
          )}

          <Inner>{children}</Inner>
          {hasFooter && <Footer>{footer}</Footer>}
        </Container>
      </ReactModal>

      <Global
        styles={css`
          .modal-drawer .ReactModal__Overlay {
            position: fixed;
            inset: 0;
            z-index: ${theme.zIndex.modal}!important;
            background-color: ${theme.color.textPrimary.alpha(0).toString()}!important;
            transition: background-color 240ms ease-out;
          }

          .modal-drawer .ReactModal__Overlay--after-open {
            background-color: ${theme.color.textPrimary.alpha(0.5).toString()}!important;
          }

          .modal-drawer .ReactModal__Overlay--before-close {
            background-color: ${theme.color.textPrimary.alpha(0).toString()}!important;
          }

          .modal-drawer .ReactModal__Content {
            position: absolute !important;
            bottom: 0 !important;
            padding: 0 !important;
            left: 0 !important;
            right: 0 !important;
            overflow: auto !important;
            -webkit-overflow-scrolling: touch !important;
            outline: none !important;
            background: ${theme.color.surface.toString()}!important;
            border-radius: 1em 1em 0 0 !important;
            transform: translate(0, 100%) !important;
            transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important;
          }

          .modal-drawer .ReactModal__Content--after-open {
            transform: translate(0, 0) !important;
          }

          .modal-drawer .ReactModal__Content--before-close {
            transform: translate(0, 100%) !important;
            transition-duration: 160ms !important;
          }
        `}
      />
    </>
  );
};

export default React.forwardRef(ModalDrawer);
