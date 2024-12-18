import React from 'react';

import Menu, { MenuRef, Value, OnRequestClose, GetOptionSelected } from '../Menu';
import TextField, { AutocompleteTextFieldProps } from './AutocompleteTextField';
import Button from '../Button';
import Spinner from '../LoadingIndicator/Spinner';
import useContext, { actionSetPartial } from './context';
import IconClear from './IconClear';
import type { AnchorPos } from '../Popper';
import type { MenuItemCommonProps } from '../Menu/MenuItem';
import { mouseEventMap } from '../ClickOutside';

export interface AutocompleteProps<T, Multiple extends boolean | undefined = undefined>
  extends Omit<AutocompleteTextFieldProps, 'value' | 'onChange' | 'children' | 'overrides'> {
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
   * Loading indicator visiblility\
   * If `true` then visible, otherwise - hidden
   */
  /**
   * Anchor position\
   * \
   * Default: `auto-start-end`
   */
  readonly anchorPos?: AnchorPos;

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
  readonly TextField?: React.ForwardRefExoticComponent<
    AutocompleteTextFieldProps & React.RefAttributes<HTMLDivElement>
  >;
}

export type Children<T> = (
  data: {
    item: T;
    index: number;
    inputValue: string;
  },
  itemProps: MenuItemCommonProps,
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
      anchorPos = 'auto-start-end',
      openOnFocus = true,
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
    const { state, dispatch } = useContext();
    const { currentOpen, filteredItems, inputValue, currentValue, anchorElement, currentLoading } =
      state;

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
              menuRef.current?.selectHightlightedItem();
            }
            break;

          case 'ArrowUp':
            {
              event.preventDefault();
              menuRef.current?.hightlightPrevItem();
            }
            break;

          case 'ArrowDown':
            {
              event.preventDefault();
              if (!currentOpen && filteredItems.length > 0) {
                onRequestOpen(event);
              }

              if (currentOpen) {
                menuRef.current?.hightlightNextItem();
              }
            }

            break;

          case 'Home':
            {
              event.preventDefault();
              menuRef.current?.hightlightFirstItem();
            }

            break;

          case 'End':
            {
              event.preventDefault();
              menuRef.current?.hightlightLastItem();
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
        const newItems =
          typeof filterItems !== 'function' || query.length === 0
            ? itemList
            : filterItems(itemList, { query, inputValue });

        return newItems;
      },
      [filterItems],
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
      if (currentOpen !== isOpen || currentLoading !== isLoading) {
        dispatch(actionSetPartial({ currentOpen: isOpen, currentLoading: isLoading }));
      }
    }, [isOpen, isLoading, dispatch, currentOpen, currentLoading]);

    React.useEffect(() => {
      if (JSON.stringify(items) !== JSON.stringify(itemsRef.current)) {
        itemsRef.current = items;
        const newFilteredItems = applyFilterForItems(inputValue, items);

        dispatch(actionSetPartial({ filteredItems: newFilteredItems }));
        if (!newFilteredItems.length) {
          onRequestClose();
        }
      }
    }, [items, inputValue, applyFilterForItems, dispatch, onRequestClose]);

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
              isLoading={currentLoading}
              endIcon={
                clearable ? (
                  <Button
                    iconOnly
                    type="button"
                    onClick={() => (currentLoading ? 'undefined' : clear())}
                  >
                    {currentLoading ? <Spinner /> : <IconClear />}
                  </Button>
                ) : undefined
              }
              {...nativeInputProps}
              onKeyDown={event => {
                inputKeydownEvent(event);
                if (typeof nativeInputProps.onKeyDown === 'function') {
                  nativeInputProps.onKeyDown(event);
                }
              }}
              ref={el => {
                if (anchorElement !== el) {
                  dispatch(actionSetPartial({ anchorElement: el }));
                }
              }}
              inputRef={el => {
                fieldInputRef.current = el;
                if (typeof inputRef === 'function') {
                  inputRef(el);
                }
                if (inputRef && typeof inputRef === 'object') {
                  inputRef.current = el;
                }
              }}
              value={inputValue}
              onBlur={event => {
                isFocusedRef.current = false;

                if (typeof nativeInputProps.onBlur === 'function') {
                  nativeInputProps.onBlur(event);
                }
              }}
              onFocus={event => {
                isFocusedRef.current = true;

                if (
                  openOnFocus &&
                  !currentOpen &&
                  filteredItems.length > 0
                  // && inputValue.trim() !== ''
                ) {
                  onRequestOpen(event);
                }

                if (!openOnFocus && !currentOpen && inputValue !== '' && filteredItems.length > 0) {
                  onRequestOpen(event);
                }

                if (typeof nativeInputProps.onFocus === 'function') {
                  nativeInputProps.onFocus(event);
                }
              }}
              onClick={event => {
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
              }}
              onChange={event => {
                if (typeof onInputChange === 'function') {
                  onInputChange(event);
                }

                // If openOnFocus is false, but value is not empty
                // we should open menu list if is not opened
                if (
                  !openOnFocus &&
                  isFocusedRef.current &&
                  !currentOpen &&
                  filteredItems.length > 0
                ) {
                  onRequestOpen(event);
                }

                // console.debug('set filteredItems');
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
              }}
            />
          ),
          [
            overridesMap,
            placeholder,
            label,
            onRequestClose,
            error,
            requiredAsterisk,
            errorText,
            fullWidth,
            startIcon,
            currentLoading,
            clearable,
            nativeInputProps,
            inputValue,
            clear,
            inputKeydownEvent,
            anchorElement,
            dispatch,
            inputRef,
            openOnFocus,
            currentOpen,
            filteredItems.length,
            onRequestOpen,
            onInputChange,
            items,
            applyFilterForItems,
          ],
        )}
        {React.useMemo(
          () => (
            <Menu
              ref={menuRef}
              anchorPos={anchorPos}
              multiple={multiple}
              items={filteredItems as T[]}
              value={currentValue as Value<T, Multiple>}
              isOpen={currentOpen}
              autofocus={false}
              anchorElement={anchorElement}
              closeOutsideClick={false}
              getOptionSelected={getOptionSelected}
              onRequestClose={onRequestClose}
              closeOnSelect={multiple ? false : true}
              onSelectItem={item => {
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
              }}
            >
              {({ index, item }, itemProps) =>
                children({ index, item: item as T, inputValue }, itemProps)
              }
            </Menu>
          ),
          [
            anchorPos,
            multiple,
            filteredItems,
            currentValue,
            currentOpen,
            anchorElement,
            getOptionSelected,
            onRequestClose,
            dispatch,
            applyFilterForItems,
            selectedItemToString,
            items,
            onChange,
            children,
            inputValue,
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
