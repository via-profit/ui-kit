import React from 'react';

import Menu, { MenuRef, Value, OnRequestClose, GetOptionSelected } from '../Menu';
import TextField from '../TextField';
import Button from '../Button';
import Spinner from '../LoadingIndicator/Spinner';
import type { MenuItemCommonProps } from '../Menu/MenuItem';

import IconClear from './IconClear';

import useContext, { actionSetPartial } from './context';

export type AutocompleteProps<T, Multiple extends boolean | undefined = undefined> = {
  readonly value: Value<T, Multiple> | null;

  /**
   * Array of items. If will be array of objects or array of strings
   */
  readonly items: T[];
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
  readonly isLoading?: boolean;
  readonly clearIfNotSelected?: boolean;
  readonly children: Children<T>;
  readonly filterItems?: FilterItems<T>;
  readonly onChange?: OnChange<T, Multiple>;
  readonly selectedItemToString: ItemToString<T, Multiple>;
  readonly getOptionSelected?: GetOptionSelected<T>;
  readonly onRequestClose?: OnRequestClose;
  readonly onInputChange?: React.ChangeEventHandler<HTMLInputElement>;
  readonly onRequestOpen?: (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement, Element>,
  ) => void;
};

export type Children<T> = (
  data: {
    item: T;
    index: number;
    inputValue: string;
  },
  itemProps: MenuItemCommonProps,
) => React.ReactNode;

export type ItemToString<T, Multiple extends boolean | undefined = undefined> = (
  item: Value<T, Multiple>,
) => string;

export type OnChange<T, Multiple extends boolean | undefined = undefined> = (
  item: Value<T, Multiple> | null,
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
      filterItems,
      children,
      onChange,
      selectedItemToString,
      onInputChange,
      getOptionSelected,
      onRequestOpen = () => undefined,
      onRequestClose = () => undefined,
    } = props;
    const menuRef = React.useRef<MenuRef | null>(null);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const isFocusedRef = React.useRef(false);
    const { state, dispatch } = useContext<T>();
    const { currentOpen, filteredItems, inputValue, currentValue, anchorElement, currentLoading } =
      state;

    const clear = React.useCallback(() => {
      if (onChange) {
        onChange(null);
      }
      dispatch(
        actionSetPartial({
          filteredItems: items,
          currentValue: null,
          inputValue: '',
        }),
      );

      setTimeout(() => {
        inputRef.current?.focus();
      }, 15);
    }, [dispatch, onChange, items]);
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

      if (multiple) {
        if (Array.isArray(value)) {
          dispatch(
            actionSetPartial({
              currentValue: value,
              inputValue: value === null ? inputValue : selectedItemToString(value),
            }),
          );
        }
      }

      if (!multiple) {
        if (!Array.isArray(value)) {
          dispatch(
            actionSetPartial({
              currentValue: value,
              inputValue: value === null ? inputValue : selectedItemToString(value),
            }),
          );
        }
      }
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

    return (
      <div>
        {React.useMemo(
          () => (
            <TextField
              endIcon={
                <Button iconOnly onClick={() => (currentLoading ? 'undefined' : clear())}>
                  {currentLoading ? <Spinner /> : <IconClear />}
                </Button>
              }
              onKeyDown={inputKeydownEvent}
              ref={el => {
                if (anchorElement !== el) {
                  dispatch(actionSetPartial({ anchorElement: el }));
                }
              }}
              inputRef={inputRef}
              value={inputValue}
              onBlur={() => {
                isFocusedRef.current = false;

                if (clearIfNotSelected) {
                  dispatch(
                    actionSetPartial({
                      inputValue: value !== null ? selectedItemToString(value) : '',
                    }),
                  );
                }
              }}
              onFocus={event => {
                isFocusedRef.current = true;
                onRequestOpen(event);
              }}
              onClick={event => {
                if (isFocusedRef.current) {
                  onRequestOpen(event);
                }
              }}
              onChange={event => {
                dispatch(actionSetPartial({ inputValue: event.currentTarget.value }));
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
                  }),
                );
              }}
            />
          ),
          [
            currentLoading,
            inputKeydownEvent,
            inputValue,
            clear,
            anchorElement,
            dispatch,
            clearIfNotSelected,
            value,
            selectedItemToString,
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
              anchorPos="left-bottom-right"
              multiple={multiple}
              items={filteredItems as T[]}
              value={currentValue as Value<T, Multiple>}
              isOpen={currentOpen && filteredItems.length > 0}
              autofocus={false}
              anchorElement={anchorElement}
              closeOutsideClick
              getOptionSelected={getOptionSelected}
              onSelectItem={item => {
                // console.log('selected', item);
                if (typeof onChange === 'function') {
                  if (!multiple) {
                    onChange(item);
                  } else {
                    // const set = new Set<any>(currentValue ? [...currentValue as any] : undefined);
                    // if (currentValue) {
                    //   set.add()
                    // }
                    const s = [...(currentValue || [])];
                    onChange([...(currentValue || [])].concat(item));
                  }
                }

                // if (multiple) {
                //   if (typeof onChange === 'function') {
                //     onChange(item ? ([item] as Value<T, Multiple>) : null);
                //   }
                // }

                // console.log(ImageBitmapRenderingContext)
                // dispatch(
                //   actionSetPartial({
                //     inputValue: selectedItemToString(multiple ? [item] : item),
                //   }),
                // );
              }}
              closeOnSelect={multiple ? false : true}
              onRequestClose={evt => {
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
            anchorElement,
            currentOpen,
            currentValue,
            filteredItems,
            inputValue,
            multiple,
            children,
            dispatch,
            onRequestClose,
            onChange,
            getOptionSelected,
            selectedItemToString,
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
