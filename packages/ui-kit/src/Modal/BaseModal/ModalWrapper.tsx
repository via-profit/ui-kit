import React from 'react';
import { Global, css } from '@emotion/react';

import { useContext, actionSetState, PORTAL_ID } from './context';
import TabManager from '../../utils/TabManager';

export type ModalWrapperProps = {
  /**
   * The dialog will remain open as long as the value is true
   */
  readonly isOpen: boolean;

  /**
   * Timeout (in `milliseconds`), after which the dialog box will be unmounted
   */
  readonly destroyTimeout: number;

  /**
   * should the modal component grab focus when opening and return it back when closing?\
   * **Default:** `true`
   */
  readonly autofocus?: boolean;

  readonly children: React.ReactNode | readonly React.ReactNode[];
};

/**
 * Count of the modals which lock the body scroll
 */
let bodyLocksCount = 0;

const ModalWrapper: React.FC<ModalWrapperProps> = props => {
  const { children, isOpen: isOpenProp, autofocus = true } = props;
  const { state, dispatch } = useContext();
  const { closeOnEscape, isMounted, isOpen, destroyTimeout, onRequestClose } = state;
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const bodyLockedRef = React.useRef(false);
  const isFirstRunRef = React.useRef(true);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const id = PORTAL_ID + React.useId();

  React.useEffect(() => {
    const container = containerRef.current;
    if (isOpen && container) {
      TabManager.registerContainer(container);
      if (autofocus) {
        TabManager.focusNext();
      }
    }

    return () => {
      if (container) {
        TabManager.unregisterContainer(container, autofocus);
      }
    };
  }, [isOpen, autofocus]);

  const getScrollWidth = React.useCallback(() => {
    const outer = window.document.createElement('div');
    const inner = window.document.createElement('div');

    const isVerticalScrollbar =
      window.document.body.scrollHeight > window.document.body.clientHeight;
    if (!isVerticalScrollbar) {
      return 0;
    }

    let widthNoScroll = 0;
    let widthWithScroll = 0;

    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    window.document.body.appendChild(outer);

    widthNoScroll = outer.offsetWidth;

    // force scrollbars
    outer.style.overflow = 'scroll';

    // add innerdiv
    inner.style.width = '100%';
    outer.appendChild(inner);

    widthWithScroll = inner.offsetWidth;

    // remove div
    outer.parentNode?.removeChild(outer);

    return widthNoScroll - widthWithScroll;
  }, []);

  const lockBody = React.useCallback(() => {
    if (!bodyLockedRef.current) {
      bodyLockedRef.current = true;
      bodyLocksCount += 1;
      window.document.body?.classList.add('-modal-over');
    }
  }, []);

  const unlockBody = React.useCallback(() => {
    if (bodyLockedRef.current) {
      bodyLockedRef.current = false;
      bodyLocksCount = Math.max(0, bodyLocksCount - 1);

      if (bodyLocksCount === 0) {
        window.document.body?.classList.remove('-modal-over');
      }
    }
  }, []);

  /**
   * Component will unmount
   * Clear pending timers and unlock the body scroll even if the modal is still open
   */
  React.useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      unlockBody();
    },
    [unlockBody],
  );

  React.useEffect(() => {
    /**
     * The last dialog will be found and closed
     */
    const keyDown = (event: KeyboardEvent) => {
      const key = event?.key?.toLowerCase() || '';

      if (
        key === 'escape' &&
        closeOnEscape &&
        isOpenProp &&
        TabManager.isCurrentContainer(containerRef.current)
      ) {
        const portal = window.document.querySelector(`#${PORTAL_ID}`);
        const lastID = portal?.children?.[portal?.childNodes?.length - 1]?.id;
        if (lastID === id) {
          onRequestClose(event);
        }
      }

      if (key === 'tab' && isOpenProp && TabManager.isCurrentContainer(containerRef.current)) {
        event.preventDefault();
        if (event.shiftKey) {
          TabManager.focusPrev();
        } else {
          TabManager.focusNext();
        }
      }
    };

    window.document.addEventListener('keydown', keyDown);

    return () => {
      // if (lastFocusedRef.current) {
      //   (lastFocusedRef.current as HTMLElement).focus();
      // }

      window.document.removeEventListener('keydown', keyDown);
    };
  }, [onRequestClose, closeOnEscape, id, isOpenProp]);

  /**
   * Controller for visibility state.
   * Waiting n milliseconds after closing the modal, then sets the visibility property to true
   * and sets visibility property to false otherwise
   */
  React.useEffect(() => {
    const isFirstRun = isFirstRunRef.current;
    isFirstRunRef.current = false;

    // Nothing to close on mount
    if (isFirstRun && !isOpenProp) {
      return;
    }

    // Previous transition (open or close) must not finish after the new one started
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    /**
     * Mark as mounted and wait minimum loop of event then mark as open
     */
    if (isOpenProp) {
      dispatch(actionSetState({ isMounted: true }));
      lockBody();

      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        dispatch(actionSetState({ isOpen: true }));
      }, 120);

      return;
    }

    /**
     * Mark as closed and wait destroyTimeout then mark as unmounted
     */
    dispatch(actionSetState({ isOpen: false }));

    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      unlockBody();
      dispatch(actionSetState({ isMounted: false }));
    }, destroyTimeout);
    // destroyTimeout is read at the moment of closing
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenProp, dispatch, lockBody, unlockBody]);

  return React.useMemo(
    () =>
      isMounted ? (
        <div ref={containerRef} tabIndex={-1} id={id}>
          {children}

          <Global
            styles={css`
              :root {
                --modal-scroll-width: ${getScrollWidth()}px;
              }
              body.-modal-over {
                overflow: hidden;
                margin-right: var(--modal-scroll-width);
              }
            `}
          />
        </div>
      ) : null,
    [children, getScrollWidth, isMounted, id],
  );
};

export default ModalWrapper;
