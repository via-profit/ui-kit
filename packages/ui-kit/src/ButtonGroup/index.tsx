import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import type { ButtonVariant } from '../Button/ButtonStyled';
import ButtonGroupContext, {
  ButtonGroupContextValue,
  ButtonGroupOrientation,
} from './ButtonGroupContext';
import { CONTROL_BORDER } from '../ThemeProvider/tokens';

export type { ButtonGroupOrientation };

type ButtonGroupSelectionSingle = {
  /**
   * Only one button can be selected
   */
  readonly multiple?: false;

  /**
   * The value of the selected button (controlled)
   */
  readonly value?: string | null;

  /**
   * The value of the initially selected button (uncontrolled)
   */
  readonly defaultValue?: string | null;

  /**
   * Called with the value of the new selected button
   */
  readonly onChange?: (value: string | null) => void;
};

type ButtonGroupSelectionMultiple = {
  /**
   * Several buttons can be selected
   */
  readonly multiple: true;

  /**
   * The values of the selected buttons (controlled)
   */
  readonly value?: readonly string[];

  /**
   * The values of the initially selected buttons (uncontrolled)
   */
  readonly defaultValue?: readonly string[];

  /**
   * Called with the values of the selected buttons
   */
  readonly onChange?: (value: string[]) => void;
};

export type ButtonGroupProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue' | 'color'
> &
  (ButtonGroupSelectionSingle | ButtonGroupSelectionMultiple) & {
    /**
     * The variant of the buttons. In the selection mode — of the not selected buttons\
     * **Default:** `outlined`
     */
    readonly variant?: ButtonVariant;

    /**
     * The color of the buttons. In the selection mode — of the not selected buttons\
     * **Default:** `default`
     */
    readonly color?: 'default' | 'primary' | 'secondary' | string;

    /**
     * The color of the selected buttons. The selected button is always the `standard` variant\
     * **Default:** `primary`
     */
    readonly selectedColor?: 'default' | 'primary' | 'secondary' | string;

    /**
     * Disables all the buttons
     */
    readonly disabled?: boolean;

    /**
     * **Default:** `horizontal`
     */
    readonly orientation?: ButtonGroupOrientation;

    /**
     * The group takes the full width, the buttons share it equally
     */
    readonly fullWidth?: boolean;

    /**
     * Single selection only: clicking the selected button clears the selection\
     * **Default:** `false`
     */
    readonly deselectable?: boolean;
  };

type StyledProps = {
  readonly $orientation: ButtonGroupOrientation;
  readonly $fullWidth: boolean;
};

/**
 * The buttons are glued: the inner corners are square and the borders overlap by the width of the border.
 * `:not(...)` raises the specificity above the own styles of the button.
 * `-of-type`, not `-child`: with SSR emotion inserts <style> elements between the children
 */
const StyledGroup = styled.div<StyledProps>`
  display: ${({ $fullWidth }) => ($fullWidth ? 'flex' : 'inline-flex')};
  flex-direction: ${({ $orientation }) => ($orientation === 'vertical' ? 'column' : 'row')};
  vertical-align: middle;

  & > * {
    position: relative;
  }

  & > *:hover,
  & > [aria-pressed='true'] {
    z-index: 1;
  }

  & > *:focus-visible {
    z-index: 2;
  }

  ${({ $orientation }) =>
    $orientation === 'vertical'
      ? css`
          & > *:not(:first-of-type) {
            margin-top: calc(-1 * ${CONTROL_BORDER});
            border-top-left-radius: 0;
            border-top-right-radius: 0;
          }
          & > *:not(:last-of-type) {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
        `
      : css`
          & > *:not(:first-of-type) {
            margin-left: calc(-1 * ${CONTROL_BORDER});
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
          & > *:not(:last-of-type) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
        `}

  ${({ $fullWidth, $orientation }) =>
    $fullWidth &&
    css`
      & > * {
        ${$orientation === 'vertical' ? 'width: 100%;' : 'flex: 1 1 0; justify-content: center;'}
      }
    `}
`;

const toArray = (value: string | null | readonly string[] | undefined): readonly string[] => {
  if (typeof value === 'undefined' || value === null) {
    return [];
  }

  return typeof value === 'string' ? [value] : value;
};

const ButtonGroup: React.ForwardRefRenderFunction<HTMLDivElement, ButtonGroupProps> = (
  props,
  ref,
) => {
  const {
    children,
    multiple,
    value,
    defaultValue,
    onChange,
    variant = 'outlined',
    color,
    selectedColor = 'primary',
    disabled,
    orientation = 'horizontal',
    fullWidth = false,
    deselectable = false,
    ...nativeProps
  } = props;

  const selectable =
    typeof value !== 'undefined' ||
    typeof defaultValue !== 'undefined' ||
    typeof onChange !== 'undefined';
  const isControlled = typeof value !== 'undefined';
  const [internalValue, setInternalValue] = React.useState(() => toArray(defaultValue));
  const selected = isControlled ? toArray(value) : internalValue;

  // The latest values for the toggle callback, so the context value does not change on every render
  const latest = React.useRef({ selected, multiple, deselectable, isControlled, onChange });
  latest.current = { selected, multiple, deselectable, isControlled, onChange };

  const toggle = React.useCallback((buttonValue: string) => {
    const { selected, multiple, deselectable, isControlled, onChange } = latest.current;
    const isSelected = selected.includes(buttonValue);
    let next: readonly string[];

    if (multiple) {
      next = isSelected
        ? selected.filter(item => item !== buttonValue)
        : [...selected, buttonValue];
    } else {
      if (isSelected && !deselectable) {
        return;
      }
      next = isSelected ? [] : [buttonValue];
    }

    if (!isControlled) {
      setInternalValue(next);
    }

    if (multiple) {
      (onChange as ButtonGroupSelectionMultiple['onChange'])?.([...next]);
    } else {
      (onChange as ButtonGroupSelectionSingle['onChange'])?.(next[0] ?? null);
    }
  }, []);

  const selectedKey = selected.join('\u0000');
  const contextValue = React.useMemo<ButtonGroupContextValue>(
    () => ({
      variant,
      color,
      selectedColor,
      disabled,
      orientation,
      selectable,
      isSelected: buttonValue =>
        selectedKey !== '' && selectedKey.split('\u0000').includes(buttonValue),
      toggle,
    }),
    [variant, color, selectedColor, disabled, orientation, selectable, selectedKey, toggle],
  );

  return (
    <ButtonGroupContext.Provider value={contextValue}>
      <StyledGroup
        role="group"
        {...nativeProps}
        $orientation={orientation}
        $fullWidth={fullWidth}
        ref={ref}
      >
        {children}
      </StyledGroup>
    </ButtonGroupContext.Provider>
  );
};

export default React.forwardRef(ButtonGroup);
