import React from 'react';
import { useTheme } from '@emotion/react';

import Popper, { AnchorPos } from '../Popper';
import Container, { TooltipContainerProps } from './TooltipContainer';
import Arrow, { TooltipArrowProps } from './TooltipArrow';
import useThemeProps from '../ThemeProvider/useThemeProps';

export type TooltipProps = {
  /**
   * The text of the tooltip. If it is empty, the tooltip is not shown and the child is rendered as is
   */
  readonly title: React.ReactNode;

  /**
   * The element the tooltip is attached to. It must be a single element that accepts `ref`
   * and the pointer and focus handlers: a DOM element or a component that passes them to the DOM element
   */
  readonly children: React.ReactElement;

  /**
   * The preferred placement. If there is no room, the tooltip moves to the opposite side
   * Default: `top`
   */
  readonly placement?: AnchorPos;

  /**
   * Shows the arrow pointing to the element
   * Default: false
   */
  readonly arrow?: boolean;

  /**
   * The delay before showing the tooltip when the pointer enters the element, in ms.
   * The tooltip appears without the delay on the keyboard focus
   * Default: 400
   */
  readonly enterDelay?: number;

  /**
   * The delay before hiding the tooltip when the pointer leaves the element, in ms.
   * During this time the pointer can be moved onto the tooltip, e.g. to select the text
   * Default: 100
   */
  readonly leaveDelay?: number;

  /**
   * The state of the controlled tooltip. Pass it together with `onOpenChange`
   * Default: undefined
   */
  readonly isOpen?: boolean;

  /**
   * Called when the tooltip wants to be shown or hidden
   */
  readonly onOpenChange?: (isOpen: boolean) => void;

  /**
   * `false`: the tooltip names the element — a string `title` becomes its `aria-label`. Use it for the icon buttons.\
   * `true`: the tooltip describes the element that already has a name — the element gets `aria-describedby`
   * Default: false
   */
  readonly describeChild?: boolean;

  /**
   * Default: 8
   */
  readonly offset?: number;

  /**
   * Default: `theme.zIndex.modal + 1`, so the tooltip is shown above the modal windows too
   */
  readonly zIndex?: number;

  /**
   * The id of the tooltip element
   * Default: generated
   */
  readonly id?: string;

  readonly overrides?: TooltipOverrides;
};

export interface TooltipOverrides {
  /**
   * The bubble with the text
   */
  readonly Container?: React.ComponentType<
    TooltipContainerProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * The arrow. Rendered only with `arrow`
   */
  readonly Arrow?: React.ComponentType<TooltipArrowProps & React.RefAttributes<HTMLSpanElement>>;
}

type ChildProps = React.HTMLAttributes<HTMLElement> & {
  readonly ref?: React.Ref<HTMLElement>;
};

/**
 * Pointer types that have the hover. A tap on the touch screen fires `pointerenter` too,
 * the tooltip would flash on every tap
 */
const isHoverPointer = (event: React.PointerEvent) => event.pointerType !== 'touch';

/**
 * The tooltip opens on the keyboard focus only, not on the focus after a click
 */
const isFocusVisible = (element: Element) => {
  try {
    return element.matches(':focus-visible');
  } catch (err) {
    // Old browsers without :focus-visible
    return true;
  }
};

/**
 * Shared by all the tooltips: when the pointer moves from one element to the next,
 * the next tooltip appears without the delay, as in the toolbars of the desktop apps
 */
const SKIP_DELAY_WINDOW = 500;
let openTooltipsCount = 0;
let lastTooltipClosedAt = 0;

const shouldSkipDelay = () =>
  openTooltipsCount > 0 || Date.now() - lastTooltipClosedAt < SKIP_DELAY_WINDOW;

const setRef = <T,>(ref: React.Ref<T> | undefined, value: T | null) => {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    (ref as React.MutableRefObject<T | null>).current = value;
  }
};

const isEmptyTitle = (title: React.ReactNode) =>
  title === null || typeof title === 'undefined' || title === false || title === '';

const Tooltip: React.FC<TooltipProps> = props => {
  const {
    title,
    children,
    placement = 'top',
    arrow = false,
    enterDelay = 400,
    leaveDelay = 100,
    isOpen,
    onOpenChange,
    describeChild = false,
    offset = 8,
    zIndex,
    id,
    overrides,
  } = useThemeProps('Tooltip', props);

  const theme = useTheme();
  const generatedId = `tooltip-${React.useId().replace(/:/g, '')}`;
  const tooltipId = id || generatedId;

  const overridesMap = React.useMemo(
    () => ({
      Container: overrides?.Container || Container,
      Arrow: overrides?.Arrow || Arrow,
    }),
    [overrides],
  );

  const [anchorElement, setAnchorElement] = React.useState<HTMLElement | null>(null);
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [actualPlacement, setActualPlacement] = React.useState<AnchorPos>(placement);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const isControlled = typeof isOpen !== 'undefined';
  const isEmpty = isEmptyTitle(title);
  const open = !isEmpty && (isControlled ? Boolean(isOpen) : internalOpen);

  // The handlers below are called from the timers: they read the latest values from the ref
  const openRef = React.useRef(open);
  openRef.current = open;
  const onOpenChangeRef = React.useRef(onOpenChange);
  onOpenChangeRef.current = onOpenChange;

  const clearTimer = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (openRef.current === next) {
        return;
      }

      if (!isControlled) {
        setInternalOpen(next);
      }

      onOpenChangeRef.current?.(next);
    },
    [isControlled],
  );

  const show = (delay: number) => {
    clearTimer();
    if (delay > 0) {
      timerRef.current = setTimeout(() => setOpen(true), delay);
    } else {
      setOpen(true);
    }
  };

  const hide = (delay: number) => {
    clearTimer();
    if (delay > 0) {
      timerRef.current = setTimeout(() => setOpen(false), delay);
    } else {
      setOpen(false);
    }
  };

  React.useEffect(() => clearTimer, []);

  // A stable callback: a new one on every render would reset the anchor and render again, endlessly
  const childRefRef = React.useRef<React.Ref<HTMLElement> | undefined>(undefined);
  const handleAnchorRef = React.useCallback((node: HTMLElement | null) => {
    setAnchorElement(node);
    setRef(childRefRef.current, node);
  }, []);

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    openTooltipsCount += 1;

    return () => {
      openTooltipsCount -= 1;
      lastTooltipClosedAt = Date.now();
    };
  }, [open]);

  // Escape hides the tooltip wherever the focus is (WCAG 1.4.13: the tooltip must be dismissable)
  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        clearTimer();
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, setOpen]);

  if (!React.isValidElement(children)) {
    return <>{children}</>;
  }

  const child = children as React.ReactElement<ChildProps>;
  const childProps = child.props;
  // React 18 keeps the ref of the element outside of props
  childRefRef.current = (child as unknown as { ref?: React.Ref<HTMLElement> }).ref;

  if (isEmpty) {
    return child;
  }

  const ariaProps: React.AriaAttributes = describeChild
    ? {
        'aria-describedby': open
          ? [childProps['aria-describedby'], tooltipId].filter(Boolean).join(' ')
          : childProps['aria-describedby'],
      }
    : {
        // The visible text of the element or its own label wins over the tooltip
        'aria-label': childProps['aria-label'] ?? (typeof title === 'string' ? title : undefined),
      };

  const anchor = React.cloneElement(child, {
    ...ariaProps,
    ref: handleAnchorRef,
    onPointerEnter: (event: React.PointerEvent<HTMLElement>) => {
      childProps.onPointerEnter?.(event);
      if (isHoverPointer(event)) {
        show(openRef.current || shouldSkipDelay() ? 0 : enterDelay);
      }
    },
    onPointerLeave: (event: React.PointerEvent<HTMLElement>) => {
      childProps.onPointerLeave?.(event);
      if (isHoverPointer(event)) {
        hide(leaveDelay);
      }
    },
    onFocus: (event: React.FocusEvent<HTMLElement>) => {
      childProps.onFocus?.(event);
      if (isFocusVisible(event.currentTarget)) {
        show(0);
      }
    },
    onBlur: (event: React.FocusEvent<HTMLElement>) => {
      childProps.onBlur?.(event);
      hide(0);
    },
    onPointerDown: (event: React.PointerEvent<HTMLElement>) => {
      childProps.onPointerDown?.(event);
      // A click is an action, the tooltip should not cover its result
      hide(0);
    },
  });

  return (
    <>
      {anchor}
      <Popper
        isOpen={open}
        anchorElement={anchorElement}
        anchorPos={placement}
        autoFlip
        offset={offset}
        viewportMargin={8}
        zIndex={zIndex ?? theme.zIndex.modal + 1}
        onAnchorPosChanged={setActualPlacement}
        id={tooltipId}
        role="tooltip"
        // The pointer can move from the element onto the tooltip without hiding it
        onPointerEnter={clearTimer}
        onPointerLeave={event => {
          if (isHoverPointer(event)) {
            hide(leaveDelay);
          }
        }}
      >
        <overridesMap.Container>
          {title}
          {arrow && <overridesMap.Arrow placement={actualPlacement} />}
        </overridesMap.Container>
      </Popper>
    </>
  );
};

export default Tooltip;
