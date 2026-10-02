import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';

import Card, { ToastCardProps } from './ToastCard';
import Icon, { ToastIconProps } from './ToastIcon';
import CloseButton, { ToastCloseButtonProps } from './ToastCloseButton';
import Action, { ToastActionProps } from './ToastAction';
import ToastItem, { ToastDefaults } from './ToastItem';
import { toastStore, ToastPosition, ToastState } from './store';

export interface ToastContainerProps {
  /**
   * The container shows only the toasts with the same `containerId`.
   * Needed only if there are several containers, e.g. with the different look
   * Default: undefined
   */
  readonly containerId?: string;

  /**
   * Where the toasts appear if the toast has no own `position`
   * Default: `top-right`
   */
  readonly position?: ToastPosition;

  /**
   * The time in ms before the toast closes, or `false` to keep the toasts until the user closes them
   * Default: 5000
   */
  readonly autoClose?: number | false;

  /**
   * The maximum number of the toasts on the screen. The rest wait in the queue
   * Default: undefined (no limit)
   */
  readonly limit?: number;

  /**
   * Default: true
   */
  readonly closeButton?: boolean;

  /**
   * The label of the close button for the screen readers
   * Default: `Close`
   */
  readonly closeButtonLabel?: string;

  /**
   * Closes the toast on the click. The clicks on the buttons, links and fields inside the toast are not counted
   * Default: true
   */
  readonly closeOnClick?: boolean;

  /**
   * Default: true
   */
  readonly pauseOnHover?: boolean;

  /**
   * Default: true
   */
  readonly pauseOnFocusLoss?: boolean;

  /**
   * The new toast appears above the previous ones
   * Default: false
   */
  readonly newestOnTop?: boolean;

  /**
   * The key that moves the focus to the newest toast, e.g. to press its button without the mouse
   * Default: `F8`
   */
  readonly hotkey?: string | null;

  /**
   * The label of the notifications area for the screen readers
   * Default: `Notifications`
   */
  readonly label?: string;

  /**
   * Default: `theme.zIndex.modal + 2`, above the modal windows and the tooltips
   */
  readonly zIndex?: number;

  readonly overrides?: ToastOverrides;
}

export interface ToastOverrides {
  /**
   * The card of the toast
   */
  readonly Toast?: React.ComponentType<ToastCardProps & React.RefAttributes<HTMLDivElement>>;

  /**
   * The icon of the type or the spinner
   */
  readonly Icon?: React.ComponentType<ToastIconProps & React.RefAttributes<HTMLSpanElement>>;

  readonly CloseButton?: React.ComponentType<
    ToastCloseButtonProps & React.RefAttributes<HTMLButtonElement>
  >;

  /**
   * The button of `actions`
   */
  readonly Action?: React.ComponentType<ToastActionProps & React.RefAttributes<HTMLButtonElement>>;
}

const POSITIONS: readonly ToastPosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

const Stack = styled.div<{ $position: ToastPosition; $zIndex: number }>`
  position: fixed;
  z-index: ${({ $zIndex }) => $zIndex};
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  box-sizing: border-box;
  max-width: min(26em, calc(100vw - 2em));
  pointer-events: none;
  ${({ $position }) => {
    const [vertical, horizontal] = $position.split('-');

    return css`
      ${vertical}: 1em;
      align-items: ${horizontal === 'left'
        ? 'flex-start'
        : horizontal === 'right'
          ? 'flex-end'
          : 'center'};
      ${horizontal === 'center'
        ? css`
            left: 50%;
            transform: translateX(-50%);
          `
        : css`
            ${horizontal}: 1em;
          `}

      /* The narrow screen: the toasts take the whole width */
      @media (max-width: 480px) {
        left: 0.5em;
        right: 0.5em;
        ${vertical}: 0.5em;
        max-width: none;
        transform: none;
        align-items: stretch;
        & > * {
          width: auto;
        }
      }
    `;
  }}
`;

const getPortal = () => {
  const id = 'ui-kit-toasts';
  const existing = document.getElementById(id);
  if (existing) {
    return existing;
  }

  const node = document.createElement('div');
  node.id = id;
  document.body.appendChild(node);

  return node;
};

const useWindowFocused = () => {
  const [isFocused, setIsFocused] = React.useState(true);

  React.useEffect(() => {
    const update = () => setIsFocused(document.hasFocus());
    update();
    window.addEventListener('focus', update);
    window.addEventListener('blur', update);

    return () => {
      window.removeEventListener('focus', update);
      window.removeEventListener('blur', update);
    };
  }, []);

  return isFocused;
};

const ToastContainer: React.FC<ToastContainerProps> = props => {
  const {
    containerId,
    position = 'top-right',
    autoClose = 5000,
    limit,
    closeButton = true,
    closeButtonLabel = 'Close',
    closeOnClick = true,
    pauseOnHover = true,
    pauseOnFocusLoss = true,
    newestOnTop = false,
    hotkey = 'F8',
    label = 'Notifications',
    zIndex,
    overrides,
  } = props;

  const theme = useTheme();
  const allToasts = React.useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getSnapshot,
    toastStore.getServerSnapshot,
  );
  const toasts = React.useMemo(
    () => allToasts.filter(item => item.containerId === containerId),
    [allToasts, containerId],
  );
  const isWindowFocused = useWindowFocused();
  const [portal, setPortal] = React.useState<HTMLElement | null>(null);
  const regionRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    setPortal(getPortal());
  }, []);

  const components = React.useMemo(
    () => ({
      Toast: overrides?.Toast || Card,
      Icon: overrides?.Icon || Icon,
      CloseButton: overrides?.CloseButton || CloseButton,
      Action: overrides?.Action || Action,
    }),
    [overrides],
  );

  const defaults = React.useMemo<ToastDefaults>(
    () => ({
      autoClose,
      closeButton,
      closeOnClick,
      pauseOnHover,
      pauseOnFocusLoss,
      closeButtonLabel,
    }),
    [autoClose, closeButton, closeOnClick, pauseOnHover, pauseOnFocusLoss, closeButtonLabel],
  );

  // The toasts over the limit wait: they appear when the shown ones close
  const visible: readonly ToastState[] =
    typeof limit === 'number' ? toasts.slice(0, Math.max(limit, 0)) : toasts;

  // A waiting toast closed before it was shown has no exit animation: it is removed at once
  React.useEffect(() => {
    toasts
      .filter(item => item.isClosing && !visible.includes(item))
      .forEach(item => toastStore.remove(item.toastId));
  }, [toasts, visible]);

  React.useEffect(() => {
    if (!hotkey) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === hotkey) {
        const cards = regionRef.current?.querySelectorAll<HTMLElement>(
          '[role="status"], [role="alert"]',
        );
        const newest = cards?.[cards.length - 1];
        if (newest) {
          event.preventDefault();
          newest.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [hotkey]);

  if (!portal) {
    return null;
  }

  const byPosition = POSITIONS.map(stackPosition => {
    const items = visible.filter(item => (item.position ?? position) === stackPosition);

    return { stackPosition, items: newestOnTop ? [...items].reverse() : items };
  }).filter(({ items }) => items.length > 0);

  // The region is always in the DOM: the screen readers announce what is added to a live region they already know
  return ReactDOM.createPortal(
    <div
      role="region"
      aria-label={hotkey ? `${label} (${hotkey})` : label}
      aria-live="polite"
      ref={regionRef}
    >
      {byPosition.map(({ stackPosition, items }) => (
        <Stack
          key={stackPosition}
          $position={stackPosition}
          $zIndex={zIndex ?? theme.zIndex.modal + 2}
        >
          {items.map(item => (
            <ToastItem
              key={item.toastId}
              toast={item}
              position={stackPosition}
              defaults={defaults}
              components={components}
              isWindowFocused={isWindowFocused}
            />
          ))}
        </Stack>
      ))}
    </div>,
    portal,
  );
};

export default ToastContainer;
