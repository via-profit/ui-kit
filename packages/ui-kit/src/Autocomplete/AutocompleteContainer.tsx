import React from 'react';

import TextField, { TextFieldProps } from '../TextField';
import Button from '../Button';
import { StaticLoadingIndicator } from '../LoadingIndicator';
import { actionSetPartial, useContextDispatch, useContextState } from './context';
import IconClear from './IconClear';
import { PositionStrategy } from '../Popper';
import { mouseEventMap } from '../ClickOutside';
import Menu, { AnchorPos, GetOptionSelected, MenuItemProps, MenuProps, MenuRef, OnRequestClose, Value } from '../Menu';

export type AutocompleteTextFieldProps = Omit<TextFieldProps, 'value' | 'onChange' | 'children' | 'overrides'>;

export interface AutocompleteProps<T, Multiple extends boolean | undefined = undefined>
  extends AutocompleteTextFieldProps {
  readonly items: readonly T[];

  readonly value: Value<T, Multiple>;

  /**
   * Array of items. If will be array of objects or array of strings
   */
  readonly multiple?: Multiple;

  /**
   * Menu open state\
   * If `true` then menu is open, otherwise - closed
   */
  readonly isOpen?: boolean;

  /**
   * Loading indicator visibility\
   * If `true` then visible, otherwise - hidden
   */
  /**
   * Anchor position\
   * \
   * Default: `bottom`
   */
  readonly anchorPos?: AnchorPos;

  /**
   * When enabled, the popper will automatically try to find the best placement
   * if the preferred placement doesn't fit in the viewport.
   * The component will iterate through possible placements until it finds one that fits.
   *
   * **Default**: `true`
   * ```
   */
  readonly autoFlip?: boolean;

  /**
   * The positioning strategy to use.
   * - `'fixed'`: Positions relative to the viewport. Works reliably in all cases.
   * - `'absolute'`: Positions relative to the nearest positioned ancestor.
   *                 When using 'absolute', make sure a parent element has `position: relative`.
   *
   * **Default**: `fixed`
   * ```
   */
  readonly positionStrategy?: PositionStrategy;

  readonly alternativePlacements?: readonly AnchorPos[];
  /**
   * Minimum distance (in pixels) that the popper must maintain from the viewport edges.
   * Used to prevent the popper from being positioned too close to the screen boundaries.
   * The popper will try to flip to another placement if it cannot maintain this margin.
   *
   * **Default**: `8`
   * ```
   */
  readonly viewportMargin?: number;

  /**
   * Text field loading state\
   * If `true` then text field has been contained the loading indicator, otherwise - nop
   */
  readonly isLoading?: boolean;

  /**
   * Should the autocomplete element be cleared when blur and if no element is selected\
   * **Default:** `true`
   */
  readonly clearOnBlur?: boolean;

  /**
   * Show clear button if clearable is true\
   * **Default:** `true`
   */
  readonly clearable?: boolean;

  /**
   * should the Menu component opening when input focused\
   * **Default:** `true`
   */
  readonly openOnFocus?: boolean;

  /**
   * items render function
   */
  readonly children: Children<T>;

  /**
   * A function that returns a filtered array of values. which correspond to the entered query
   * Example:
   * ```tsx
   * <Autocomplete
   *  filterItems={(items, { query }) =>
   *    items.filter(item => item.name.toLocaleLowerCase().indexOf(query) !== -1)
   *  }
   *  ...
   * >
   * ```
   * </Autocomplete>
   */
  readonly filterItems?: FilterItems<T>;

  /**
   * The function that will be called when an item is selected from the list
   */
  readonly onChange?: OnChange<T, Multiple>;

  /**
   * A function that transforms the selected item into a string
   * Example:
   * ```tsx
   * <Autocomplete
   *   selectedItemToString={item => item.name} // item is {id: 1, name: 'Oleg'}
   *   ...
   * >
   *   ...
   * </Autocomplete>
   * ```
   */
  readonly selectedItemToString: ItemToString<T, Multiple>;

  /**
   * A function that determines which of the elements is currently selected\
   * Example:
   * ```tsx
   * <Menu
   *   ...
   *   getOptionSelected={({ item, value }) => item.id === value.id}
   */
  readonly getOptionSelected?: GetOptionSelected<T>;

  /**
   * The function that will be called at the moment when you want to close the autocomplete
   */
  readonly onRequestClose?: OnRequestClose;

  /**
   * The function that will be called at the moment when you change the input value of input element
   */
  readonly onInputChange?: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * The function that will be called at the moment when you want to open the selectbox
   */
  readonly onRequestOpen?: (
    event:
      | React.KeyboardEvent<HTMLElement>
      | React.MouseEvent<HTMLElement>
      | React.FocusEvent<HTMLInputElement, Element>
      | React.ChangeEvent<HTMLInputElement>,
  ) => void;

  /**
   * Overridable components map
   */
  readonly overrides?: AutocompleteOverrides;
}

export interface AutocompleteOverrides {
  /**
   * Element wrapper
   */
  readonly TextField?: React.ComponentType<TextFieldProps & React.RefAttributes<HTMLDivElement>>;
}

export type Children<T> = (
  data: {
    item: T;
    index: number;
    inputValue: string;
  },
  itemProps: MenuItemProps,
) => React.ReactNode;

export type ItemToString<T, Multiple extends boolean | undefined = undefined> = (
  item: Multiple extends undefined ? T : readonly T[],
) => string;

export type OnChange<T, Multiple extends boolean | undefined = undefined> = (
  item: Value<T, Multiple>,
) => void;

export type FilterItems<T> = (
  items: readonly T[],
  data: {
    readonly query: string;
    readonly inputValue: string;
  },
) => readonly T[];

export type AutocompleteRef = {
  clear: () => void;
};

const Autocomplete = React.forwardRef(
  <T, Multiple extends boolean | undefined = undefined>(
    props: AutocompleteProps<T, Multiple>,
    ref: React.Ref<AutocompleteRef>,
  ) => {
    const {
      items,
      value,
      multiple,
      isOpen = false,
      isLoading = false,
      clearOnBlur = true,
      anchorPos = 'bottom-fill',
      alternativePlacements = ['bottom-fill', 'top-fill'],
      openOnFocus = true,
      autoFlip = true,
      viewportMargin,
      positionStrategy,
      requiredAsterisk,
      startIcon,
      fullWidth,
      placeholder,
      label,
      error,
      errorText,
      inputRef,
      filterItems,
      children,
      onChange,
      selectedItemToString,
      clearable = true,
      onInputChange,
      getOptionSelected,
      onRequestOpen = () => undefined,
      onRequestClose = () => undefined,
      overrides,
      ...nativeInputProps
    } = props;
    const menuRef = React.useRef<MenuRef | null>(null);
    const fieldInputRef = React.useRef<HTMLInputElement | null>(null);
    const isFocusedRef = React.useRef(false);
    const itemsRef = React.useRef(items);
    const { currentOpen, filteredItems, inputValue, currentValue, anchorElement, currentLoading } =
      useContextState();
    const dispatch = useContextDispatch();
    const overridesMap = React.useMemo(
      () => ({
        TextField: overrides?.TextField || TextField,
      }),
      [overrides],
    );

    const clear = React.useCallback(() => {
      if (onChange) {
        onChange((multiple ? [] : null) as Value<T, Multiple>);
      }
      dispatch(
        actionSetPartial({
          filteredItems: items,
          inputValue: '',
        }),
      );

      setTimeout(() => {
        fieldInputRef.current?.focus();
      }, 15);
    }, [dispatch, onChange, items, multiple]);
    /**
     * API
     */
    React.useImperativeHandle(
      ref,
      () => ({
        clear: () => clear(),
      }),
      [clear],
    );

    const inputKeydownEvent = React.useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isFocusedRef.current) {
          return;
        }

        switch (event.code) {
          case 'Enter':
          case 'NumpadEnter':
            if (currentOpen) {
              event.preventDefault();
              menuRef.current?.selectHighlightedItem();
            }
            break;

          case 'ArrowUp':
            {
              event.preventDefault();
              menuRef.current?.highlightPrevItem();
            }
            break;

          case 'ArrowDown':
            {
              event.preventDefault();
              if (!currentOpen && filteredItems.length > 0) {
                onRequestOpen(event);
              }

              if (currentOpen) {
                menuRef.current?.highlightNextItem();
              }
            }

            break;

          case 'Home':
            {
              event.preventDefault();
              menuRef.current?.highlightFirstItem();
            }

            break;

          case 'End':
            {
              event.preventDefault();
              menuRef.current?.highlightLastItem();
            }

            break;

          // case 'PageUp':
          // case 'PageDown':
          //   event.preventDefault();

          //   break;

          case 'Escape':
          case 'Tab':
            if (currentOpen) {
              onRequestClose(event);
            }

            break;

          default:
            // do nothing
            break;
        }
      },
      [currentOpen, onRequestClose, onRequestOpen, filteredItems.length],
    );

    const applyFilterForItems = React.useCallback(
      (inputValue: string, itemList: readonly T[]) => {
        const query = inputValue.toLowerCase().trim();

        // Apply filter
        return typeof filterItems !== 'function' || query.length === 0
          ? itemList
          : filterItems(itemList, { query, inputValue });
      },
      [filterItems],
    );

    const renderChildren: MenuProps<T>['children'] = React.useCallback(
      ({ index, item }, itemProps) => children({ index, item: item as T, inputValue }, itemProps),
      [children, inputValue],
    );
    /**
     * Only affected value change action
     */
    React.useEffect(() => {
      if (value === currentValue) {
        return;
      }

      dispatch(
        actionSetPartial({
          currentValue: value,
          inputValue:
            value === null
              ? ''
              : selectedItemToString(value as Multiple extends undefined ? T : readonly T[]),
        }),
      );
    }, [value, multiple, currentValue, inputValue, dispatch, selectedItemToString]);

    React.useEffect(() => {
      if (currentOpen && menuRef.current) {
        menuRef.current.scrollToFirstSelected();
      }
    }, [currentOpen]);

    React.useEffect(() => {
      if (filteredItems.length === 1) {
        menuRef.current?.highlightIndex(0);
      }
    }, [filteredItems]);

    React.useEffect(() => {
      if (currentOpen !== isOpen) {
        dispatch(actionSetPartial({ currentOpen: isOpen }));
      }
    }, [isOpen, currentOpen, dispatch]);

    React.useEffect(() => {
      if (currentLoading !== isLoading) {
        dispatch(actionSetPartial({ currentLoading: isLoading }));
      }
    }, [isLoading, currentLoading, dispatch]);

    React.useEffect(() => {
      if (itemsRef.current === items) {
        return;
      }

      itemsRef.current = items;
      const newFilteredItems = applyFilterForItems(inputValue, items);

      dispatch(actionSetPartial({ filteredItems: newFilteredItems }));

      if (!newFilteredItems.length && currentOpen) {
        onRequestClose();
      }
    }, [items, inputValue, applyFilterForItems, dispatch, onRequestClose, currentOpen]);

    React.useEffect(() => {
      const mouseDownEvent = (event: MouseEvent) => {
        let parentElem = event.target as Node;
        let needToClose = true;

        while (parentElem && 'parentNode' in parentElem) {
          if (parentElem === anchorElement || parentElem === menuRef.current?.getListElement()) {
            needToClose = false;
            break;
          }
          parentElem = parentElem.parentNode as Node;
        }

        // Click outside
        if (needToClose && currentOpen) {
          if (clearOnBlur) {
            const newInputValue =
              currentValue === null
                ? ''
                : selectedItemToString(
                    currentValue as Multiple extends undefined ? T : readonly T[],
                  );

            const newFilteredItems = multiple
              ? filteredItems
              : applyFilterForItems(newInputValue, items);

            dispatch(
              actionSetPartial({
                filteredItems: newFilteredItems,
                inputValue: newInputValue,
              }),
            );
          }

          if (isOpen) {
            onRequestClose(event);
          }
        }
      };

      window.document.addEventListener(mouseEventMap.onMouseDown, mouseDownEvent);

      return () => {
        window.document.removeEventListener(mouseEventMap.onMouseDown, mouseDownEvent);
      };
    }, [
      onRequestClose,
      anchorElement,
      filteredItems,
      items,
      isOpen,
      clearOnBlur,
      currentOpen,
      dispatch,
      value,
      selectedItemToString,
      currentValue,
      applyFilterForItems,
      inputValue,
      multiple,
    ]);

    const onSelectMenuItem: NonNullable<MenuProps<T, Multiple>['onSelectItem']> = React.useCallback(
      item => {
        if (!multiple) {
          dispatch({
            type: 'setPartial',
            payload: {
              filteredItems: applyFilterForItems(selectedItemToString(item), items),
            },
          });
        }
        if (typeof onChange === 'function') {
          onChange(item);
        }
      },
      [applyFilterForItems, dispatch, items, multiple, onChange, selectedItemToString],
    );

    const endIconMemo = React.useMemo(() => {
      if (currentLoading) {
        return (
          <Button iconOnly type="button" variant="plain" disabled>
            <StaticLoadingIndicator />
          </Button>
        );
      }

      if (!clearable) {
        return undefined;
      }

      return (
        <Button iconOnly type="button" variant="plain" onClick={clear} aria-label="Clear">
          <IconClear />
        </Button>
      );
    }, [clear, clearable, currentLoading]);

    const textFieldOnKeyDown: React.KeyboardEventHandler<HTMLInputElement> = React.useCallback(
      event => {
        inputKeydownEvent(event);
        if (typeof nativeInputProps.onKeyDown === 'function') {
          nativeInputProps.onKeyDown(event);
        }
      },
      [inputKeydownEvent, nativeInputProps],
    );

    const textFieldOnChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
      event => {
        if (typeof onInputChange === 'function') {
          onInputChange(event);
        }

        // If openOnFocus is false, but value is not empty
        // we should open menu list if is not opened
        if (!openOnFocus && isFocusedRef.current && !currentOpen && filteredItems.length > 0) {
          onRequestOpen(event);
        }

        const newFilteredItems = applyFilterForItems(event.currentTarget.value, items);

        if (newFilteredItems.length === 0 && currentOpen) {
          onRequestClose();
        }

        if (newFilteredItems.length > 0 && !currentOpen) {
          onRequestOpen(event);
        }
        dispatch(
          actionSetPartial({
            filteredItems: newFilteredItems,
            inputValue: event.currentTarget.value,
          }),
        );
      },
      [
        applyFilterForItems,
        currentOpen,
        dispatch,
        filteredItems.length,
        items,
        onInputChange,
        onRequestClose,
        onRequestOpen,
        openOnFocus,
      ],
    );

    const textFieldClick: React.MouseEventHandler<HTMLInputElement> = React.useCallback(
      event => {
        if (typeof nativeInputProps.onClick === 'function') {
          nativeInputProps.onClick(event);
        }

        if (
          isFocusedRef.current &&
          !currentOpen &&
          filteredItems.length > 0
          // && inputValue.trim() !== ''
        ) {
          onRequestOpen(event);
        }
      },
      [currentOpen, filteredItems.length, nativeInputProps, onRequestOpen],
    );

    const textFieldFocus: React.FocusEventHandler<HTMLInputElement> = React.useCallback(
      event => {
        isFocusedRef.current = true;

        if (openOnFocus && !currentOpen && filteredItems.length > 0) {
          onRequestOpen(event);
        }

        if (typeof nativeInputProps.onFocus === 'function') {
          nativeInputProps.onFocus(event);
        }
      },
      [currentOpen, filteredItems.length, nativeInputProps, onRequestOpen, openOnFocus],
    );

    const textFieldBlur: React.FocusEventHandler<HTMLInputElement> = React.useCallback(
      event => {
        isFocusedRef.current = false;

        if (typeof nativeInputProps.onBlur === 'function') {
          nativeInputProps.onBlur(event);
        }
      },
      [nativeInputProps],
    );

    const setAnchorElementRef = React.useCallback(
      (el: HTMLDivElement | null) => {
        if (anchorElement !== el) {
          dispatch(actionSetPartial({ anchorElement: el }));
        }
      },
      [anchorElement, dispatch],
    );

    const inputRefRef = React.useRef(inputRef);
    React.useEffect(() => {
      inputRefRef.current = inputRef;
    }, [inputRef]);

    const setInputElementRef = React.useCallback((el: HTMLInputElement | null) => {
      fieldInputRef.current = el;
      const currentInputRef = inputRefRef.current;
      if (typeof currentInputRef === 'function') {
        currentInputRef(el);
      } else if (currentInputRef && typeof currentInputRef === 'object') {
        currentInputRef.current = el;
      }
    }, []);

    return (
      <>
        {React.useMemo(
          () => (
            <overridesMap.TextField
              placeholder={placeholder}
              label={label}
              error={error}
              requiredAsterisk={requiredAsterisk}
              errorText={errorText}
              fullWidth={fullWidth}
              startIcon={startIcon}
              endIcon={endIconMemo}
              {...nativeInputProps}
              onKeyDown={textFieldOnKeyDown}
              ref={setAnchorElementRef}
              inputRef={setInputElementRef}
              value={inputValue}
              onBlur={textFieldBlur}
              onFocus={textFieldFocus}
              onClick={textFieldClick}
              onChange={textFieldOnChange}
            />
          ),
          [
            setAnchorElementRef,
            setInputElementRef,
            overridesMap,
            placeholder,
            label,
            error,
            requiredAsterisk,
            errorText,
            fullWidth,
            startIcon,
            endIconMemo,
            nativeInputProps,
            textFieldOnKeyDown,
            inputValue,
            textFieldBlur,
            textFieldFocus,
            textFieldClick,
            textFieldOnChange,
          ],
        )}
        {React.useMemo(
          () => (
            <Menu
              ref={menuRef}
              anchorPos={anchorPos}
              alternativePlacements={alternativePlacements}
              multiple={multiple}
              items={filteredItems as T[]}
              value={currentValue as Value<T, Multiple>}
              isOpen={currentOpen}
              autofocus={false}
              autoFlip={autoFlip}
              viewportMargin={viewportMargin}
              offset={0}
              positionStrategy={positionStrategy}
              anchorElement={anchorElement}
              closeOutsideClick={false}
              getOptionSelected={getOptionSelected}
              onRequestClose={onRequestClose}
              closeOnSelect={!multiple}
              onSelectItem={onSelectMenuItem}
            >
              {renderChildren}
            </Menu>
          ),
          [
            anchorPos,
            alternativePlacements,
            multiple,
            filteredItems,
            currentValue,
            currentOpen,
            autoFlip,
            viewportMargin,
            positionStrategy,
            anchorElement,
            getOptionSelected,
            onRequestClose,
            onSelectMenuItem,
            renderChildren,
          ],
        )}
      </>
    );
  },
);

Autocomplete.displayName = 'Autocomplete';

export default Autocomplete as <T, Multiple extends boolean | undefined = undefined>(
  props: AutocompleteProps<T, Multiple> & { ref?: React.Ref<AutocompleteRef> },
) => JSX.Element;
