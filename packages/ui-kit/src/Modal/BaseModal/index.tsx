import React from 'react';
import ReactDOM from 'react-dom';

import { ContextProvider, defaultState, PORTAL_ID } from './context';
import Overlay, { ModalOverlayProps } from './ModalOverlay';
import Inner, { ModalInnerProps } from './ModalInner';
import ModalWrapper from './ModalWrapper';
import RenderModal from './RenderModal';
import NoSSR from '../../NoSSR';

export interface BaseModalProps {
  /**
   * The dialog will remain open as long as the value is true
   */
  readonly isOpen: boolean;

  /**
   * The function that will be called to close the dialog
   */
  readonly onRequestClose: () => void;

  /**
   * Dialog content
   */
  readonly children: React.ReactNode;
  /**
   * Timeout (in `milliseconds`), after which the dialog box will be unmounted.\
   * Correct if the value is equal to the length of the transition time\
   * \
   * **Default:** `240`
   */
  readonly destroyTimeout?: number;

  /**
   * Should the dialog close when `escape` key press\
   * \
   * **Default**: `true`
   */
  readonly closeOnEscape?: boolean;

  /**
   * Should the dialog close when overlay mouse click\
   * \
   * **Default**: `true`
   */
  readonly closeOnOverlayClick?: boolean;

  /**
   * should the modal component grab focus when opening and return it back when closing?\
   * **Default:** `true`
   */
  readonly autofocus?: boolean;

  /**
   * Overridable components map
   */
  readonly overrides?: BaseModalOverrides;
}

export interface BaseModalOverrides {
  readonly Overlay?: React.ForwardRefExoticComponent<
    ModalOverlayProps & React.RefAttributes<HTMLDivElement>
  >;
  readonly Inner?: React.ForwardRefExoticComponent<
    ModalInnerProps & React.RefAttributes<HTMLDivElement>
  >;
}

const BaseModal: React.FC<BaseModalProps> = props => {
  const {
    isOpen,
    children,
    overrides,
    autofocus = true,
    closeOnOverlayClick = defaultState.closeOnOverlayClick,
    closeOnEscape = defaultState.closeOnEscape,
    destroyTimeout = defaultState.destroyTimeout,
    onRequestClose,
  } = props;
  const destroyTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [domLoaded, setDomLoaded] = React.useState(false);

  const overridesMap = React.useMemo(
    () => ({
      Overlay,
      Inner,
      ...overrides,
    }),
    [overrides],
  );

  React.useEffect(() => {
    /**
     * Client render detection
     */
    setDomLoaded(true);

    const timeout = destroyTimeoutRef.current;

    // unload destroy timeout
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  const portalEl = React.useMemo(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const node = window.document.body.querySelector(`#${PORTAL_ID}`);
    if (node) {
      return node;
    }

    const newNode = window.document.createElement('div');
    newNode.setAttribute('id', PORTAL_ID);

    window.document.body.appendChild(newNode);

    return newNode;
  }, []);

  return (
    <NoSSR>
      {domLoaded &&
        portalEl &&
        ReactDOM.createPortal(
          <ContextProvider
            initialState={{
              isOpen,
              destroyTimeout,
              closeOnEscape,
              closeOnOverlayClick,
              onRequestClose,
            }}
          >
            <ModalWrapper isOpen={isOpen} autofocus={autofocus} destroyTimeout={destroyTimeout}>
              <RenderModal overrides={overridesMap}>{children}</RenderModal>
            </ModalWrapper>
          </ContextProvider>,
          portalEl,
          PORTAL_ID,
        )}
    </NoSSR>
  );
};

export default BaseModal;
