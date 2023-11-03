import React from 'react';

import Menu, {
  MenuRef,
  Value,
  AnchorElement,
  OnSelectItem,
  OnRequestClose,
} from '@via-profit/ui-kit/src/Menu';
import type { MenuItemCommonProps } from '@via-profit/ui-kit/src/Menu/MenuItem';
import TextField from '@via-profit/ui-kit/src/TextField';
import Button from '@via-profit/ui-kit/src/Button';

import IconClear from './IconClear';
import reducer from './reducer';

export type AutocompleteProps<T, Multiple extends boolean | undefined = undefined> = {
  readonly value: Value<T, Multiple> | null;
  readonly items: T[];
  readonly multiple?: Multiple;
  readonly isOpen?: boolean;
  readonly children: Children<T>;
  readonly filterItems: FilterItems<T>;
  readonly onSelectItem?: OnSelectItem<T>;
  readonly selecteditemToString: ItemToString<T, Multiple>;
  readonly onRequestClose?: OnRequestClose;
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
export type AutocompleteContainerRef = HTMLDivElement;

export type FilterItems<T> = (
  items: readonly T[],
  data: {
    readonly query: string;
    readonly inputValue: string;
  },
) => readonly T[];
// type AutocompleteMenuProps<T, Multiple extends boolean | undefined = undefined> = MenuProps<
//   T,
//   Multiple
// > & {
//   readonly containerRef?: React.Ref<AutocompleteContainerRef>;
//   readonly itemToString: ItemToString<T, Multiple>;
//   readonly renderInput: (params: RenderInputProps<T, Multiple>) => React.ReactNode;
//   readonly onRequestOpen: (
//     event?:
//       | FocusEvent
//       | KeyboardEvent
//       | MouseEvent
//       | React.FocusEvent
//       | React.KeyboardEvent
//       | React.MouseEvent,
//   ) => void;
//   readonly onInputChange?: React.ChangeEventHandler<HTMLInputElement>;
//   readonly filterItems?: (
//     items: readonly T[],
//     data: {
//       readonly query: string;
//       readonly inputValue: string;
//     },
//   ) => readonly T[];
// };

export type AutocompleteRef = {
  foo: () => void;
  // readonly clear: () => void;
  // readonly focus: () => void;
  // readonly blur: () => void;
  // readonly clearInput: () => void;
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
      onRequestOpen = () => undefined,
      onRequestClose = () => undefined,
    } = props;
    const [inputValue, setInputValue] = React.useState<string>('');
    const menuRef = React.useRef<MenuRef | null>(null);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const isFocusedRef = React.useRef(false);
    const [currentOpen, setCurrentOpen] = React.useState(isOpen);
    const [currentValue, setCurrentValue] = React.useState(value);
    const [anchorElement, setAnchorElement] = React.useState<AnchorElement | null>(null);
    const [filteredItems, setFilteredItems] = React.useState(items);

    // const [] = React.useReducer(reducer, {
    //   currentValue: value,
    //   currentOpen: isOpen,
    //   filteredItems: items,
    //   anchorElement: null
    // });

    /**
     * API
     */
    React.useImperativeHandle(
      ref,
      () => ({
        foo: () => undefined,
        // scrollToIndex: (idx: number) => menuRef.current?.scrollToIndex(idx),
        // scrollToFirstSelected: () => menuRef.current?.scrollToFirstSelected(),
        // hightlightFirstItem: () => menuRef.current?.hightlightFirstItem(),
        // hightlightLastItem: () => menuRef.current?.hightlightLastItem(),
        // hightlightNextItem: () => menuRef.current?.hightlightNextItem(),
        // hightlightPrevItem: () => menuRef.current?.hightlightPrevItem(),
        // selectHightlightedItem: () => menuRef.current?.selectHightlightedItem(),
        // highlightIndex: (idx: number) => menuRef.current?.highlightIndex(idx),
        // selectItem: (index: number) => menuRef.current?.selectItem(index),
        // clear: () => {
        //   setCurrentValue(null);
        //   setInputValue('');
        //   anchorElement?.focus();
        //   setFilteredItems(items);
        // },
        // focus: () => anchorElement?.focus(),
        // blur: () => anchorElement?.blur(),
        // clearInput: () => setInputValue(''),
      }),
      [],
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

    // const onSelectItemF: OnSelectItem<T, Multiple> = React.useCallback(
    //   selected => {
    //     setCurrentValue(selected);
    //     if (typeof onSelectItem === 'function') {
    //       if (!Array.isArray(selected) && typeof itemToString === 'function') {
    //         setInputValue(itemToString(selected as T));
    //       }
    //       onSelectItem(selected);
    //     }
    //   },
    //   [itemToString, onSelectItem],
    // );

    React.useEffect(() => {
      if (value === null) {
        setCurrentValue(null);
        setInputValue('');

        return;
      }

      if (multiple) {
        if (Array.isArray(value)) {
          setCurrentValue(value);
          setInputValue(selecteditemToString(value));
        }
        if (!Array.isArray(value)) {
          setCurrentValue([value] as Value<T, Multiple>);
          setInputValue(selecteditemToString(value));
        }
      }

      if (!multiple) {
        if (Array.isArray(value)) {
          setCurrentValue(value[0]);
          setInputValue(selecteditemToString(value));
        }
        if (!Array.isArray(value)) {
          setCurrentValue(value);
          setInputValue(selecteditemToString(value));
        }
      }
    }, [value, multiple, selecteditemToString]);

    React.useEffect(() => {
      setCurrentOpen(isOpen);
      menuRef.current?.scrollToFirstSelected();
    }, [isOpen]);

    // const renderInputOnChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    //   event => {
    //     setInputValue(event.currentTarget.value);
    //     // if (typeof onInputChange === 'function') {
    //     //   onInputChange(event);
    //     // }

    //     const query = event.currentTarget.value.toLowerCase().trim();

    //     // Apply filter
    //     const newItems =
    //       typeof filterItems !== 'function' || query.length === 0
    //         ? items
    //         : filterItems(items, { query, inputValue });

    //     setFilteredItems(newItems);
    //   },
    //   [inputValue, items, filterItems],
    // );

    React.useEffect(() => {
      if (filteredItems.length === 1) {
        menuRef.current?.highlightIndex(0);
      }
    }, [filteredItems]);

    const clear = React.useCallback(() => {
      // FIXME: Use reducer
      setCurrentValue(null);
      setInputValue('');
      setFilteredItems(items);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 15);
    }, [items]);

    // const inputElement = React.useMemo(() => {
    //   const elem = renderInput({
    //     inputRef: setAnchorElement,
    //     value: inputValue,
    //     selected: currentValue,
    //     onBlur: () => {
    //       isFocusedRef.current = false;
    //     },
    //     onFocus: event => {
    //       isFocusedRef.current = true;
    //       onRequestOpen(event);
    //     },
    //     onKeyDown: inputKeydownEvent,
    //     onChange: renderInputOnChange,
    //     onClick: event => {
    //       if (isFocusedRef.current) {
    //         onRequestOpen(event);
    //       }
    //     },
    //   });

    //   return elem;
    // }, [
    //   inputKeydownEvent,
    //   inputValue,
    //   onRequestOpen,
    //   renderInput,
    //   renderInputOnChange,
    //   currentValue,
    // ]);

    return (
      <div>
        <TextField
          endIcon={
            <Button iconOnly onMouseDown={() => clear()}>
              <IconClear />
            </Button>
          }
          onKeyDown={inputKeydownEvent}
          ref={setAnchorElement}
          inputRef={inputRef}
          value={inputValue}
          // selected={currentValue}
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
            setInputValue(event.currentTarget.value);
            // if (typeof onInputChange === 'function') {
            //   onInputChange(event);
            // }

            const query = event.currentTarget.value.toLowerCase().trim();

            // Apply filter
            const newItems =
              typeof filterItems !== 'function' || query.length === 0
                ? items
                : filterItems(items, { query, inputValue });

            setFilteredItems(newItems as T[]);
          }}
        />
        <Menu
          ref={menuRef}
          anchorPos="left-bottom-right"
          multiple={multiple}
          items={filteredItems}
          value={currentValue}
          isOpen={currentOpen && filteredItems.length > 0}
          autofocus={false}
          anchorElement={anchorElement}
          closeOutsideClick
          onSelectItem={item => {
            if (typeof onSelectItem === 'function') {
              onSelectItem(item as T);
            }

            if (!multiple) {
              setInputValue(selecteditemToString(item));
            }
          }}
          closeOnSelect={multiple ? false : true}
          onRequestClose={evt => {
            if (evt?.target !== anchorElement) {
              onRequestClose(evt);
            }
          }}
        >
          {({ index, item }, itemProps) => children({ index, item, inputValue }, itemProps)}
        </Menu>
      </div>
    );
  },
);

Autocomplete.displayName = 'Autocomplete';

export default Autocomplete as <T, Multiple extends boolean | undefined = undefined>(
  props: AutocompleteProps<T, Multiple> & { ref?: React.Ref<AutocompleteRef> },
) => JSX.Element;
