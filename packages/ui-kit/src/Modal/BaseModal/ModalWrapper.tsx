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

const ModalWrapper: React.FC<ModalWrapperProps> = props => {
  const { children, isOpen: isOpenProp, autofocus = true } = props;
  const { state, dispatch } = useContext();
  const [alreadyMounted, setMountState] = React.useState(true);
  const { closeOnEscape, isMounted, isOpen, destroyTimeout, onRequestClose } = state;
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

  /**
   * Component will unmount
   * Mark component as unmounted
   */
  React.useEffect(
    () => () => {
      setMountState(false);
    },
    [],
  );

  React.useEffect(() => {
    /**
     * The last dialog will be found and closed
     */
    const keyDown = (event: KeyboardEvent) => {
      if (event.key.toLocaleLowerCase() === 'escape' && closeOnEscape) {
        const portal = window.document.querySelector(`#${PORTAL_ID}`);
        const lastID = portal?.children?.[portal?.childNodes?.length - 1]?.id;
        if (lastID === id) {
          onRequestClose();
        }
      }

      if (
        event.key.toLowerCase() === 'tab' &&
        isOpenProp &&
        TabManager.isCurrentContainer(containerRef.current)
      ) {
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
    if (isOpen !== isOpenProp) {
      /**
       * Mark as mounted and wait minimum loop of event (15ms) then mark as open
       */
      if (isOpenProp) {
        dispatch(actionSetState({ isMounted: true }));
        window.document.body?.classList.add('-modal-over');

        setTimeout(() => {
          if (alreadyMounted) {
            dispatch(actionSetState({ isOpen: true }));
          }
        }, 15);

        return;
      }

      /**
       * Mark as closed and wait destroyTimeout then mark as unmounted
       */
      if (!isOpenProp) {
        dispatch(actionSetState({ isOpen: false }));

        setTimeout(() => {
          if (alreadyMounted) {
            const portal = window.document.querySelector(`#${PORTAL_ID}`);
            if (portal?.children?.length === 1) {
              window.document.body?.classList.remove('-modal-over');
            }
            dispatch(actionSetState({ isMounted: false }));
          }
        }, destroyTimeout);

        return;
      }
    }
  }, [isOpenProp, isOpen, alreadyMounted, destroyTimeout, dispatch, getScrollWidth]);

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
