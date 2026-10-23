import React from 'react';
import { useTheme } from '@emotion/react';

import Popper, { AnchorPos } from '../Popper';
import ClickOutside from '../ClickOutside';
import Button, { HintPopoverButtonProps } from './HintPopoverButton';
import Container, { HintPopoverContainerProps } from './HintPopoverContainer';

export type HintPopoverProps = {
  /**
   * The content of the hint: the text, the paragraphs, the list
   */
  readonly children: React.ReactNode;

  /**
   * The name of the button for the screen readers and its tooltip: what the hint is about.
   * Pass it in the language of your interface
   * Default: `Hint`
   */
  readonly label?: string;

  /**
   * Replaces the «?» icon of the button
   */
  readonly icon?: React.ReactNode;

  /**
   * The preferred placement. If there is no room, the hint moves to the opposite side
   * Default: `bottom-start`
   */
  readonly placement?: AnchorPos;

  /**
   * The state of the controlled hint. Pass it together with `onOpenChange`
   * Default: undefined
   */
  readonly isOpen?: boolean;

  /**
   * Called when the hint wants to be opened or closed
   */
  readonly onOpenChange?: (isOpen: boolean) => void;

  /**
   * Default: 6
   */
  readonly offset?: number;

  /**
   * Default: `theme.zIndex.modal + 1`, so the hint is shown above the modal windows too
   */
  readonly zIndex?: number;

  /**
   * The id of the hint element
   * Default: generated
   */
  readonly id?: string;

  readonly overrides?: HintPopoverOverrides;
};

export interface HintPopoverOverrides {
  /**
   * The «?» button
   */
  readonly Button?: React.ComponentType<
    HintPopoverButtonProps & React.RefAttributes<HTMLButtonElement>
  >;

  /**
   * The bubble with the content
   */
  readonly Container?: React.ComponentType<
    HintPopoverContainerProps & React.RefAttributes<HTMLDivElement>
  >;
}

/**
 * «?» next to a field, a button or a title: the explanation in the popper by the click.
 * For what is needed sometimes; what everybody must know goes into InfoNote.
 * Closes by the outside click and by Escape, Escape returns the focus to the button
 */
const HintPopover: React.FC<HintPopoverProps> = props => {
  const {
    children,
    label = 'Hint',
    icon,
    placement = 'bottom-start',
    isOpen,
    onOpenChange,
    offset = 6,
    zIndex,
    id,
    overrides,
  } = props;

  const theme = useTheme();
  const generatedId = `hint-popover-${React.useId().replace(/:/g, '')}`;
  const hintId = id || generatedId;
  const [button, setButton] = React.useState<HTMLButtonElement | null>(null);
  const [internalOpen, setInternalOpen] = React.useState(false);

  const isControlled = typeof isOpen !== 'undefined';
  const open = isControlled ? Boolean(isOpen) : internalOpen;

  const overridesMap = React.useMemo(
    () => ({
      Button: overrides?.Button || Button,
      Container: overrides?.Container || Container,
    }),
    [overrides],
  );

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        button?.focus({ preventScroll: true });
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, setOpen, button]);

  return (
    <>
      <overridesMap.Button
        ref={setButton}
        title={label}
        aria-label={label}
        aria-expanded={open}
        aria-controls={open ? hintId : undefined}
        onClick={() => setOpen(!open)}
      >
        {icon}
      </overridesMap.Button>
      <ClickOutside onOutsideClick={() => open && setOpen(false)} ignoreElements={[button]}>
        <Popper
          isOpen={open}
          anchorElement={button}
          anchorPos={placement}
          autoFlip
          offset={offset}
          viewportMargin={8}
          zIndex={zIndex ?? theme.zIndex.modal + 1}
          id={hintId}
        >
          <overridesMap.Container>{children}</overridesMap.Container>
        </Popper>
      </ClickOutside>
    </>
  );
};

export * from './HintPopoverButton';
export * from './HintPopoverContainer';

export default HintPopover;
