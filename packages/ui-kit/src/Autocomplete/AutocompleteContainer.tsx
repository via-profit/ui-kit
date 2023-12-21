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
   * Should the autocomplete element be cleared when blur and if no element is selected
   */
  readonly clearIfNotSelected?: boolean;

  /**
   * Show clear button if clearable is true
   */
  readonly clearable?: boolean;

  /**
   * items render function
   */
  readonly children: Children<T>;
  readonly filterItems?: FilterItems<T>;
  readonly onChange?: OnChange<T, Multiple>;
  readonly selectedItemToString: ItemToString<T, Multiple>;
  readonly getOptionSelected?: GetOptionSelected<T>;
  readonly onRequestClose?: OnRequestClose;
  readonly onInputChange?: React.ChangeEventHandler<HTMLInputElement>;
  readonly onRequestOpen?: (
    event:
      | React.KeyboardEvent<HTMLElement>
      | React.MouseEvent<HTMLElement>
      | React.FocusEvent<HTMLInputElement, Element>,
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
      clearIfNotSelected = true,
      anchorPos = 'auto-start-end',
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
    const { state, dispatch } = useContext();
    const { currentOpen, filteredItems, inputValue, currentValue, anchorElement, currentLoading } =
      state;

    const overridesMap = React.useMemo(
      () => ({
        TextField,
        ...overrides,
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
          currentValue: null,
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
            event.preventDefault();
            menuRef.current?.selectHightlightedItem();
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
              menuRef.current?.hightlightNextItem();
              if (!currentOpen) {
                onRequestOpen(event);
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
      [currentOpen, onRequestClose, onRequestOpen],
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
          inputValue: multiple
            ? ''
            : value === null
            ? inputValue
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
      dispatch(
        actionSetPartial({ currentOpen: isOpen, currentLoading: isLoading, filteredItems: items }),
      );
    }, [isOpen, isLoading, items, dispatch]);

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

        if (needToClose) {
          onRequestClose(event);
        }
      };

      window.document.addEventListener(mouseEventMap.onMouseDown, mouseDownEvent);

      return () => {
        window.document.removeEventListener(mouseEventMap.onMouseDown, mouseDownEvent);
      };
    }, [onRequestClose, anchorElement]);

    return (
      <div>
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
                onRequestOpen(event);

                if (typeof nativeInputProps.onFocus === 'function') {
                  nativeInputProps.onFocus(event);
                }
              }}
              onClick={event => {
                if (isFocusedRef.current) {
                  onRequestOpen(event);
                }

                if (typeof nativeInputProps.onClick === 'function') {
                  nativeInputProps.onClick(event);
                }
              }}
              onChange={event => {
                if (typeof onInputChange === 'function') {
                  onInputChange(event);
                }

                const query = event.currentTarget.value.toLowerCase().trim();

                // Apply filter
                const newItems =
                  typeof filterItems !== 'function' || query.length === 0
                    ? items
                    : filterItems(items, { query, inputValue });

                dispatch(
                  actionSetPartial({
                    filteredItems: newItems,
                    inputValue: event.currentTarget.value,
                  }),
                );

                // dispatch(actionSetPartial({ inputValue: event.currentTarget.value }));
              }}
            />
          ),
          [
            overridesMap,
            placeholder,
            label,
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
            onRequestOpen,
            onInputChange,
            filterItems,
            items,
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
              isOpen={currentOpen && filteredItems.length > 0}
              autofocus={false}
              anchorElement={anchorElement}
              closeOutsideClick={false}
              getOptionSelected={getOptionSelected}
              onSelectItem={item => {
                if (typeof onChange === 'function') {
                  onChange(item);
                }
              }}
              closeOnSelect={multiple ? false : true}
              onRequestClose={evt => {
                if (clearIfNotSelected) {
                  dispatch(
                    actionSetPartial({
                      inputValue: multiple
                        ? ''
                        : value !== null
                        ? selectedItemToString(
                            value as Multiple extends undefined ? T : readonly T[],
                          )
                        : '',
                    }),
                  );
                }

                if (evt?.target !== anchorElement) {
                  onRequestClose(evt);
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
            onChange,
            clearIfNotSelected,
            dispatch,
            value,
            selectedItemToString,
            onRequestClose,
            children,
            inputValue,
          ],
        )}
      </div>
    );
  },
);

Autocomplete.displayName = 'Autocomplete';

export default Autocomplete as <T, Multiple extends boolean | undefined = undefined>(
  props: AutocompleteProps<T, Multiple> & { ref?: React.Ref<AutocompleteRef> },
) => JSX.Element;
