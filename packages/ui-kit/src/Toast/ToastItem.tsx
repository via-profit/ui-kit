import React from 'react';
import styled from '@emotion/styled';

import { ToastCardProps, TOAST_ANIMATION_MS } from './ToastCard';
import { ToastIconProps } from './ToastIcon';
import { ToastCloseButtonProps } from './ToastCloseButton';
import { ToastActionProps } from './ToastAction';
import { toast as toastApi, toastStore, ToastPosition, ToastState } from './store';

export interface ToastItemComponents {
  readonly Toast: React.ComponentType<ToastCardProps & React.RefAttributes<HTMLDivElement>>;
  readonly Icon: React.ComponentType<ToastIconProps & React.RefAttributes<HTMLSpanElement>>;
  readonly CloseButton: React.ComponentType<
    ToastCloseButtonProps & React.RefAttributes<HTMLButtonElement>
  >;
  readonly Action: React.ComponentType<ToastActionProps & React.RefAttributes<HTMLButtonElement>>;
}

export interface ToastDefaults {
  readonly autoClose: number | false;
  readonly closeButton: boolean;
  readonly closeOnClick: boolean;
  readonly pauseOnHover: boolean;
  readonly pauseOnFocusLoss: boolean;
  readonly closeButtonLabel: string;
}

interface ToastItemProps {
  readonly toast: ToastState;
  readonly position: ToastPosition;
  readonly defaults: ToastDefaults;
  readonly components: ToastItemComponents;
  readonly isWindowFocused: boolean;
}

const Body = styled.div`
  flex: 1;
  min-width: 0;
  /* Centers the one-line text against the icon and the close button */
  padding: 0.1em 0;
`;

const Description = styled.div`
  margin-top: 0.15em;
  font-size: 0.93em;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin-top: 0.6em;
`;

/**
 * The clicks on these elements are actions, not the click on the toast
 */
const INTERACTIVE =
  'a, button, input, select, textarea, label, summary, [role="button"], [contenteditable="true"]';

const ToastItem: React.FC<ToastItemProps> = props => {
  const { toast, position, defaults, components, isWindowFocused } = props;
  const {
    toastId,
    content,
    type = 'default',
    isLoading = false,
    description,
    actions,
    icon,
    onClick,
    onOpen,
    isClosing,
    version,
  } = toast;

  // The loading toast waits for `toast.update`: it can not be closed by the timer or by the click
  const autoClose = isLoading ? false : (toast.autoClose ?? defaults.autoClose);
  const closeButton = isLoading ? false : (toast.closeButton ?? defaults.closeButton);
  const closeOnClick = isLoading ? false : (toast.closeOnClick ?? defaults.closeOnClick);
  const pauseOnHover = toast.pauseOnHover ?? defaults.pauseOnHover;
  const pauseOnFocusLoss = toast.pauseOnFocusLoss ?? defaults.pauseOnFocusLoss;

  const [isHovered, setIsHovered] = React.useState(false);
  const [hasFocus, setHasFocus] = React.useState(false);
  const isPaused =
    (pauseOnHover && isHovered) || hasFocus || (pauseOnFocusLoss && !isWindowFocused);

  const closeToast = React.useCallback(() => toastApi.dismiss(toastId), [toastId]);

  React.useEffect(() => {
    onOpen?.();
    // Once, when the toast appears
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The time left. It starts again on every update of the toast
  const remainingRef = React.useRef(0);
  React.useEffect(() => {
    remainingRef.current = typeof autoClose === 'number' ? autoClose : 0;
  }, [autoClose, version]);

  React.useEffect(() => {
    if (autoClose === false || isPaused || isClosing) {
      return undefined;
    }

    const startedAt = Date.now();
    const timer = setTimeout(closeToast, Math.max(remainingRef.current, 0));

    return () => {
      clearTimeout(timer);
      remainingRef.current -= Date.now() - startedAt;
    };
  }, [autoClose, isPaused, isClosing, version, closeToast]);

  // The toast is removed after the exit animation. A timer, not `animationend`:
  // with the reduced motion there is no animation and no event
  React.useEffect(() => {
    if (!isClosing) {
      return undefined;
    }

    const timer = setTimeout(() => toastStore.remove(toastId), TOAST_ANIMATION_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [isClosing, toastId]);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = event => {
    onClick?.(event);
    const target = event.target as HTMLElement;
    if (closeOnClick && !event.defaultPrevented && !target.closest(INTERACTIVE)) {
      closeToast();
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = event => {
    if (event.key === 'Escape' && !isLoading) {
      event.stopPropagation();
      closeToast();
    }
  };

  const handleBlur: React.FocusEventHandler<HTMLDivElement> = event => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setHasFocus(false);
    }
  };

  const renderedContent =
    typeof content === 'function' ? content({ closeToast, toastProps: toast }) : content;

  return (
    <components.Toast
      type={type}
      position={position}
      isClosing={isClosing}
      // Errors interrupt the screen reader, the rest is read when it is free
      role={type === 'error' ? 'alert' : 'status'}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onFocus={() => setHasFocus(true)}
      onBlur={handleBlur}
    >
      {icon !== false && (
        <components.Icon type={type} isLoading={isLoading}>
          {icon}
        </components.Icon>
      )}
      <Body>
        {renderedContent}
        {description != null && <Description>{description}</Description>}
        {actions && actions.length > 0 && (
          <Actions>
            {actions.map((action, index) => (
              <components.Action
                // The actions are a static list of the toast
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                onClick={event => {
                  action.onClick?.(event, closeToast);
                  if (action.closeOnClick !== false) {
                    closeToast();
                  }
                }}
              >
                {action.label}
              </components.Action>
            ))}
          </Actions>
        )}
      </Body>
      {typeof closeButton === 'function'
        ? closeButton({ closeToast })
        : closeButton && (
            <components.CloseButton aria-label={defaults.closeButtonLabel} onClick={closeToast} />
          )}
    </components.Toast>
  );
};

export default ToastItem;
