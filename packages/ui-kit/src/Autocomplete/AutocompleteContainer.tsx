import React from 'react';

import Menu, { MenuRef, Value, OnSelectItem, OnRequestClose } from '@via-profit/ui-kit/src/Menu';
import type { MenuItemCommonProps } from '@via-profit/ui-kit/src/Menu/MenuItem';
import TextField from '@via-profit/ui-kit/src/TextField';
import Button from '@via-profit/ui-kit/src/Button';

import IconClear from './IconClear';
import useContext, { actionSetPartial } from './context';

export type AutocompleteProps<T, Multiple extends boolean | undefined = undefined> = {
  readonly value: Value<T, Multiple> | null;
  readonly items: T[];
  readonly multiple?: Multiple;
  readonly isOpen?: boolean;
  readonly children: Children<T>;
  readonly filterItems?: FilterItems<T>;
  readonly onSelectItem?: OnSelectItem<T>;
  readonly selecteditemToString: ItemToString<T, Multiple>;
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
      filterItems,
      children,
      onSelectItem,
      selecteditemToString,
      onInputChange,
      onRequestOpen = () => undefined,
      onRequestClose = () => undefined,
    } = props;
    const menuRef = React.useRef<MenuRef | null>(null);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const isFocusedRef = React.useRef(false);
    const { state, dispatch } = useContext();
    const { currentOpen, filteredItems, inputValue, currentValue, anchorElement } = state;

    const clear = React.useCallback(() => {
      if (onSelectItem) {
        onSelectItem(null as T);
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
    }, [dispatch, onSelectItem, items]);
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

    React.useEffect(() => {
      if (value === null && currentValue !== null) {
        dispatch(actionSetPartial({ currentValue: null }));

        return;
      }

      if (multiple) {
        if (Array.isArray(value)) {
          dispatch(actionSetPartial({ currentValue: value }));
        }
        if (!Array.isArray(value)) {
          dispatch(actionSetPartial({ currentValue: value }));
        }
      }

      if (!multiple) {
        if (Array.isArray(value)) {
          dispatch(actionSetPartial({ currentValue: value }));
        }
        if (!Array.isArray(value)) {
          dispatch(actionSetPartial({ currentValue: value }));
        }
      }
    }, [value, multiple, currentValue, dispatch, selecteditemToString]);

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
      dispatch(actionSetPartial({ currentOpen: isOpen }));
    }, [isOpen, dispatch]);

    React.useEffect(() => {
      dispatch(actionSetPartial({ filteredItems: items }));
    }, [items, dispatch]);

    return (
      <div>
        {React.useMemo(
          () => (
            <TextField
              endIcon={
                <Button iconOnly onClick={() => clear()}>
                  <IconClear />
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
            anchorElement,
            clear,
            dispatch,
            filterItems,
            inputKeydownEvent,
            inputValue,
            items,
            onInputChange,
            onRequestOpen,
          ],
        )}
        {React.useMemo(
          () => (
            <Menu
              ref={menuRef}
              anchorPos="left-bottom-right"
              multiple={multiple}
              items={filteredItems}
              value={currentValue as Value<T, Multiple>}
              isOpen={currentOpen && filteredItems.length > 0}
              autofocus={false}
              anchorElement={anchorElement}
              closeOutsideClick
              onSelectItem={item => {
                if (typeof onSelectItem === 'function') {
                  onSelectItem(item as T);
                }

                if (!multiple) {
                  dispatch(
                    actionSetPartial({
                      inputValue: selecteditemToString(item as Value<T, Multiple>),
                    }),
                  );
                }
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
            onSelectItem,
            selecteditemToString,
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
