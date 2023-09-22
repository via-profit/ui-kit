import * as React from 'react';
import { Global, css, useTheme } from '@emotion/react';
import ReactModal from 'react-modal';

export interface DialogProps extends ReactModal.Props {
  readonly children: React.ReactNode | React.ReactNode[];
}

const Dialog: React.ForwardRefRenderFunction<ReactModal, DialogProps> = (props, ref) => {
  const { children, ...otherProps } = props;
  const theme = useTheme();

  return (
    <>
      <ReactModal ref={ref} closeTimeoutMS={200} portalClassName="modal-dialog" {...otherProps}>
        <div>{children}</div>
      </ReactModal>

      <Global
        styles={css`
          .modal-dialog .ReactModal__Overlay {
            position: fixed !important;
            inset: 0 !important;
            z-index: ${theme.zIndex.modal} !important;
            transition: background-color 120ms ease-in-out !important;
            background-color: ${theme.color.textPrimary.alpha(0).toString()}!important;
          }

          .modal-dialog .ReactModal__Overlay--after-open {
            background-color: ${theme.color.textPrimary.alpha(0.5).toString()}!important;
          }

          .modal-dialog .ReactModal__Overlay--before-close {
            background-color: ${theme.color.textPrimary.alpha(0).toString()}!important;
          }

          .modal-dialog .ReactModal__Content {
            inset: initial !important;
            border: none !important;
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            opacity: 0 !important;
            padding: 0 !important;
            overflow: auto !important;
            -webkit-overflow-scrolling: touch !important;
            outline: none !important;
            padding: 1em !important;
            background: ${theme.color.surface.toString()} !important;
            border-radius: 1em !important;
            transform: translate(-50%, -40%) !important;
            transition: transform 100ms ease-in-out, opacity 100ms ease-in-out !important;
          }

          .modal-dialog .ReactModal__Content--after-open {
            opacity: 1 !important;
            transform: translate(-50%, -50%) !important;
            transition-duration: 160ms !important;
          }

          .modal-dialog .ReactModal__Content--before-close {
            opacity: 0 !important;
            transform: translate(-50%, 300px) !important;
          }
        `}
      />
    </>
  );
};

export default React.forwardRef(Dialog);
