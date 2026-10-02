import React from 'react';

export type ToastId = string | number;

export type ToastType = 'default' | 'info' | 'success' | 'warning' | 'error';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastContentProps {
  /**
   * Closes this toast
   */
  readonly closeToast: () => void;
  readonly toastProps: ToastState;
}

/**
 * A text or an element, or a function that receives `closeToast`, as in react-toastify
 */
export type ToastContent = React.ReactNode | ((props: ToastContentProps) => React.ReactNode);

export interface ToastAction {
  readonly label: React.ReactNode;

  /**
   * Called on the click. `closeToast` closes the toast before the end of the timer
   */
  readonly onClick?: (event: React.MouseEvent<HTMLButtonElement>, closeToast: () => void) => void;

  /**
   * Closes the toast after the click
   * Default: true
   */
  readonly closeOnClick?: boolean;
}

export interface ToastOptions {
  /**
   * The id of the toast. A toast with the id that is already shown is not added again
   * Default: generated
   */
  readonly toastId?: ToastId;
  readonly type?: ToastType;

  /**
   * The `containerId` of the `ToastContainer` that shows the toast, if there are several containers
   * Default: the container without `containerId`
   */
  readonly containerId?: string;

  /**
   * Shows the spinner instead of the icon. The loading toast does not close by the timer,
   * has no close button and does not close by the click: finish it with `toast.update`
   * Default: false
   */
  readonly isLoading?: boolean;

  /**
   * The time in ms before the toast closes, or `false` to keep it until the user closes it
   * Default: `autoClose` of the `ToastContainer`
   */
  readonly autoClose?: number | false;

  /**
   * Default: `position` of the `ToastContainer`
   */
  readonly position?: ToastPosition;

  /**
   * The second line under the main text
   */
  readonly description?: React.ReactNode;

  /**
   * The buttons of the toast, e.g. «Undo»
   */
  readonly actions?: readonly ToastAction[];

  /**
   * `false` hides the close button, a function renders your own button
   * Default: true
   */
  readonly closeButton?:
    | boolean
    | ((props: { readonly closeToast: () => void }) => React.ReactNode);

  /**
   * Closes the toast on the click. The clicks on the buttons, links and fields inside the toast are not counted
   * Default: true
   */
  readonly closeOnClick?: boolean;

  /**
   * Called on the click on the toast
   */
  readonly onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * Called when the toast is closed
   */
  readonly onClose?: () => void;

  /**
   * Called when the toast is shown
   */
  readonly onOpen?: () => void;

  /**
   * Your icon instead of the icon of the type, or `false` without the icon
   */
  readonly icon?: React.ReactNode | false;

  /**
   * The timer stops while the pointer is over the toast
   * Default: true
   */
  readonly pauseOnHover?: boolean;

  /**
   * The timer stops while the browser window is not active
   * Default: true
   */
  readonly pauseOnFocusLoss?: boolean;
}

export interface ToastUpdateOptions extends Omit<ToastOptions, 'toastId'> {
  /**
   * The new content of the toast
   */
  readonly render?: ToastContent;
}

export interface ToastState extends Omit<ToastOptions, 'toastId'> {
  readonly toastId: ToastId;
  readonly content: ToastContent;

  /**
   * Grows on every update: the timer of the updated toast starts again
   */
  readonly version: number;

  /**
   * The toast is closing: the exit animation is played, then the toast is removed
   */
  readonly isClosing: boolean;
}

type Listener = () => void;

let toasts: readonly ToastState[] = [];
const listeners = new Set<Listener>();
let idCounter = 0;

const emit = () => {
  listeners.forEach(listener => listener());
};

const setToasts = (next: readonly ToastState[]) => {
  toasts = next;
  emit();
};

export const toastStore = {
  subscribe(listener: Listener) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  },
  getSnapshot: () => toasts,
  getServerSnapshot: () => [] as readonly ToastState[],

  /**
   * Removes the toast after its exit animation
   */
  remove(toastId: ToastId) {
    const removed = toasts.find(item => item.toastId === toastId);
    setToasts(toasts.filter(item => item.toastId !== toastId));
    removed?.onClose?.();
  },
};

const isActive = (toastId: ToastId) =>
  toasts.some(item => item.toastId === toastId && !item.isClosing);

const show = (content: ToastContent, options: ToastOptions = {}): ToastId => {
  const { toastId = `toast-${(idCounter += 1)}`, ...rest } = options;

  // As in react-toastify: the toast with the same id is not duplicated
  if (isActive(toastId)) {
    return toastId;
  }

  setToasts([
    ...toasts.filter(item => item.toastId !== toastId),
    { ...rest, toastId, content, version: 0, isClosing: false },
  ]);

  return toastId;
};

type ToastFunction = {
  (content: ToastContent, options?: ToastOptions): ToastId;
  info: (content: ToastContent, options?: ToastOptions) => ToastId;
  success: (content: ToastContent, options?: ToastOptions) => ToastId;
  warning: (content: ToastContent, options?: ToastOptions) => ToastId;
  /**
   * The alias of `toast.warning`, as in react-toastify
   */
  warn: (content: ToastContent, options?: ToastOptions) => ToastId;
  error: (content: ToastContent, options?: ToastOptions) => ToastId;
  /**
   * The toast with the spinner. Finish it with `toast.update(id, { render, type, isLoading: false })`
   */
  loading: (content: ToastContent, options?: ToastOptions) => ToastId;

  /**
   * Changes the content and the options of the shown toast. The timer starts again
   */
  update: (toastId: ToastId, options: ToastUpdateOptions) => void;

  /**
   * Closes the toast, or all the toasts without the id
   */
  dismiss: (toastId?: ToastId) => void;
  isActive: (toastId: ToastId) => boolean;
};

const withType =
  (type: ToastType) =>
  (content: ToastContent, options?: ToastOptions): ToastId =>
    show(content, { ...options, type });

export const toast: ToastFunction = Object.assign(
  (content: ToastContent, options?: ToastOptions) => show(content, options),
  {
    info: withType('info'),
    success: withType('success'),
    warning: withType('warning'),
    warn: withType('warning'),
    error: withType('error'),
    loading: (content: ToastContent, options?: ToastOptions) =>
      show(content, { ...options, isLoading: true }),
    update: (toastId: ToastId, options: ToastUpdateOptions) => {
      const { render, ...rest } = options;
      setToasts(
        toasts.map(item =>
          item.toastId === toastId
            ? {
                ...item,
                ...rest,
                content: typeof render !== 'undefined' ? render : item.content,
                version: item.version + 1,
              }
            : item,
        ),
      );
    },
    dismiss: (toastId?: ToastId) => {
      setToasts(
        toasts.map(item =>
          typeof toastId === 'undefined' || item.toastId === toastId
            ? { ...item, isClosing: true }
            : item,
        ),
      );
    },
    isActive,
  },
);
