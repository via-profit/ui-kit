import React from 'react';

import useContext, { actionSetmenuState } from './context';
import List, { MenuListProps } from './MenuList';
import Popper, { MenuListPopperProps } from './MenuListPopper';
import type { MenuItemCommonProps } from './MenuItem';

export type AnchorElement<E extends HTMLElement = HTMLElement> = E;

export type Children<T> = (
  data: {
    item: T;
    index: number;
  },
  itemProps: MenuItemCommonProps,
) => React.ReactNode;

export interface MenuContainerProps<T, Multiple extends boolean | undefined = undefined> {
  /**
   * List of items
   */
  readonly items: readonly T[];

  /**
   * Current value\
   * If `Menu` component has `multiple` property then value must be an array of items
   */
  readonly value: Value<T, Multiple> | null;

  readonly children: Children<T>;

  /**
   * Menu open state
   */
  readonly isOpen: boolean;

  /**
   * An HTML element. It's used to set the position of the menu.
   * \
   * **Default**: `false`
   */
  readonly anchorElement?: AnchorElement | null;

  /**
   * A function that extract key for each item\
   * (for details: [React List and keys](https://react.dev/learn/rendering-lists))\
   * \
   * Example:
   * ```tsx
   * <Menu
   *    ...
   *   keyExtractor={item => item.id} // <-- Just use the user ID
   *   items={[
   *     {id: '1', name: 'Olezhka Rukobludenko'},
   *     {id: '2', name: 'Feodosiya Trahovna'},
   *   ]}
   * />
   * ```
   */
  // readonly keyExtractor: KeyExtractor<T>;

  /**
   * Close list if click outside of the list and anchor element\
   * \
   * **Default**: `true`
   */
  readonly closeOutsideClick?: boolean;

  /**
   * Allow the multiple selection
   * \
   * **Default**: `false`
   */
  readonly multiple?: Multiple;

  /**
   * Autofocus list after menu open\
   * Dependent of `onEndReached` property\
   * \
   * **Default**: `true`
   */
  readonly autofocus?: boolean;

  /**
   * Anchor position\
   * \
   * Default: `left-bottom`
   */
  readonly anchorPos?: MenuAnchorPos;

  /**
   * Should menu will be closed when item selected\
   * \
   * **Default**: if **multiple** is true then `false` otherwise - `true`
   */
  readonly closeOnSelect?: boolean;

  /**
   * Do not use react portal\
   * \
   * **Default**: `false`
   */
  readonly disablePortal?: boolean;

  /**
   * Overridable components map
   */
  readonly overrides?: MenuContainerOverrides;
  /**
   * A function that determines which of the elements is currently selected
   */
  readonly getOptionSelected?: GetOptionSelected<T>;

  /**
   * Called when item selected
   */
  readonly onSelectItem?: OnSelectItem<T, Multiple>;

  /**
   * A function that renders each list item as string\
   * \
   * **Default**: `JSON.stringify(...)`
   */
  // readonly itemToString?: ItemToString<T>;

  /**
   * The function that will be called at the moment when you want to close the menu
   */
  readonly onRequestClose?: OnRequestClose;
}

export interface MenuContainerOverrides {
  /**
   * Element wrapper
   */
  readonly List?: React.ForwardRefExoticComponent<
    MenuListProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * List popper container
   */
  readonly Popper?: React.ForwardRefExoticComponent<
    MenuListPopperProps & React.RefAttributes<HTMLDivElement>
  >;
}

export type MenuContainerRef = {
  /**
   * Scroll list to specified element index
   */
  scrollToIndex: (index: number) => void;
  /**
   * Scroll list to first of selected item
   */
  scrollToFirstSelected: () => void;

  /**
   * Select specified item by index
   */
  selectItem: (index: number) => void;

  /**
   * Hightlight specified item by index
   */
  highlightIndex: (index: number) => void;

  /**
   * Highlight the previous item relative to the currently highlighted one
   */
  hightlightPrevItem: () => void;

  /**
   * Highlight the next item relative to the currently highlighted one
   */
  hightlightNextItem: () => void;

  /**
   * Highlight the first item in list
   */
  hightlightFirstItem: () => void;

  /**
   * Highlight the last item in list
   */
  hightlightLastItem: () => void;

  /**
   * Select highlighted item in list
   */
  selectHightlightedItem: () => void;
};

export type Value<T, Multiple> = Multiple extends undefined | undefined ? T : readonly T[];
export type GetOptionSelected<T> = (payload: { readonly item: T; readonly value: T }) => boolean;
// export type ItemToString<T> = (item: T) => string;
// export type KeyExtractor<T> = (item: T) => React.Key;
export type OnSelectItem<T, Multiple extends boolean | undefined = undefined> = (
  value: Value<T, Multiple>,
) => void;

export type OnRequestClose = (
  event?:
    | React.KeyboardEvent<HTMLElement>
    | React.MouseEvent<HTMLElement>
    | KeyboardEvent
    | MouseEvent,
) => void;

export type MenuAnchorPos =
  | 'static'
  | 'left-top'
  | 'left-bottom'
  | 'right-top'
  | 'right-bottom'
  | 'left-bottom-right'
  | 'left-top-right';

const MenuContainer = React.forwardRef(
  <T, Multiple extends boolean | undefined = undefined>(
    props: MenuContainerProps<T, Multiple>,
    ref: React.Ref<MenuContainerRef>,
  ) => {
    const {
      items,
      value,
      anchorElement,
      overrides,
      children,
      closeOutsideClick = true,
      isOpen = props.anchorPos === 'static' ? true : false,
      multiple = false,
      autofocus = true,
      closeOnSelect = !multiple,
      anchorPos = 'left-bottom',
      // itemToString = itemToStringDefault,
      onRequestClose = () => undefined,
      // keyExtractor,
      onSelectItem,
      getOptionSelected,
    } = props;

    const overridesMap = React.useMemo(
      () => ({
        List,
        Popper,
        ...overrides,
      }),
      [overrides],
    );

    const getSelectedIndexes = React.useCallback(() => {
      const idx = new Set<number>();

      if (typeof value === 'object' && value !== null) {
        if (typeof getOptionSelected === 'function') {
          if (Array.isArray(value)) {
            value.forEach(v => {
              idx.add(items.findIndex(item => getOptionSelected({ item, value: v })));
            });
          }

          if (!Array.isArray(value)) {
            idx.add(items.findIndex(item => getOptionSelected({ item, value: value as T })));
          }
        }

        if (Array.isArray(value)) {
          value.forEach(v => {
            idx.add(items.findIndex(item => JSON.stringify(item) === JSON.stringify(v)));
          });
        } else {
          idx.add(items.findIndex(item => JSON.stringify(item) === JSON.stringify(value)));
        }
      }

      return [...idx];
    }, [getOptionSelected, items, value]);

    const [menuIsOpen, setMenuOpen] = React.useState(Boolean(isOpen));
    const [currentAnchorElement, setAnchorElement] = React.useState(anchorElement);
    const isOpenRef = React.useRef(menuIsOpen);
    const MenuListRef = React.useRef<HTMLDivElement | null>(null);
    const {
      dispatch,
      state: { selectedIndexes, markedIndex, hoveredIndex },
    } = useContext();
    const selectedIndexesRef = React.useRef(selectedIndexes);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const [style, setStyle] = React.useState<React.CSSProperties | null>(null);
    const calculateElementPos = React.useCallback(
      (elem: HTMLElement): React.CSSProperties => {
        // for absolute
        const rect = elem.getBoundingClientRect();

        switch (anchorPos) {
          case 'left-bottom':
            return {
              position: 'absolute',
              left: rect.left + window.scrollX,
              top: rect.top + window.scrollY + rect.height,
            };

          case 'left-top':
            return {
              position: 'absolute',
              left: rect.left + window.scrollX,
              top: rect.top + window.scrollY,
            };

          case 'right-top':
            return {
              position: 'absolute',
              left: rect.left + window.scrollX + rect.width,
              top: rect.top + window.scrollY,
            };

          case 'right-bottom':
            return {
              position: 'absolute',
              left: rect.left + window.scrollX + rect.width,
              top: rect.top + window.scrollY + rect.height,
            };

          case 'left-bottom-right':
            return {
              position: 'absolute',
              left: rect.left + window.scrollX,
              top: rect.top + window.scrollY + rect.height,
              width: rect.width,
            };

          case 'left-top-right':
            return {
              position: 'absolute',
              left: rect.left + window.scrollX,
              top: rect.top + window.scrollY,
              width: rect.width,
            };

          case 'static':
          default:
            return {
              position: 'static',
            };
        }
      },
      [anchorPos],
    );

    const scrollToIndex = React.useCallback((index: number) => {
      const option = MenuListRef?.current?.children[index];
      if (option) {
        option.scrollIntoView({
          behavior: 'auto',
          block: 'nearest',
        });
      }
    }, []);

    React.useEffect(() => {
      const recalc = () => {
        if (anchorElement) {
          setStyle(calculateElementPos(anchorElement || null));
        }
      };

      window.addEventListener('resize', recalc);

      recalc();

      return () => {
        window.removeEventListener('resize', recalc);
      };
    }, [anchorElement, isOpen, calculateElementPos]);

    /**
     * Scroll to first of selected item
     */
    const scrollToFirstSelected = React.useCallback(() => {
      const indexes = getSelectedIndexes();
      // Sort array of indexes by DESC and get the index
      const index = indexes.length ? [...indexes.sort()][0] : -1;
      dispatch({
        type: 'setMenuState',
        payload: {
          markedIndex: index,
        },
      });
      scrollToIndex(index);
    }, [dispatch, getSelectedIndexes, scrollToIndex]);

    /**
     * Select specified item by index
     */
    const selectItem = React.useCallback(
      (index: number) => {
        const item = items[index];

        if (!item) {
          return;
        }

        if (typeof onSelectItem === 'function') {
          // For multiple
          if (multiple && Array.isArray(value)) {
            const selItems = new Set<Value<T, Multiple>>(value);

            if (selectedIndexes.includes(index)) {
              selItems.delete(item as Value<T, Multiple>);
            } else {
              selItems.add(item as Value<T, Multiple>);
            }

            onSelectItem([...selItems] as Value<T, Multiple>);
          } else {
            // For single
            onSelectItem(item as Value<T, Multiple>);
          }

          if (closeOnSelect) {
            onRequestClose();
          }
        }
      },
      [onSelectItem, onRequestClose, closeOnSelect, items, selectedIndexes, value, multiple],
    );

    /**
     * Highlight specified item by index
     */
    const highlightIndex = React.useCallback(
      (index: number) => {
        dispatch(actionSetmenuState({ markedIndex: items[index] ? index : -1 }));
        scrollToIndex(index);
      },
      [dispatch, items, scrollToIndex],
    );

    const hightlightPrevItem = React.useCallback(() => {
      const index = Math.max(markedIndex - 1, 0);
      highlightIndex(index);
      scrollToIndex(index);
    }, [markedIndex, highlightIndex, scrollToIndex]);

    const hightlightNextItem = React.useCallback(() => {
      const index = Math.min(markedIndex + 1, items.length);
      highlightIndex(index);
      scrollToIndex(index);
    }, [markedIndex, items.length, highlightIndex, scrollToIndex]);

    const hightlightFirstItem = React.useCallback(() => {
      const index = 0;
      highlightIndex(index);
      scrollToIndex(index);
    }, [highlightIndex, scrollToIndex]);

    const hightlightLastItem = React.useCallback(() => {
      const index = items.length - 1;
      highlightIndex(index);
      scrollToIndex(index);
    }, [highlightIndex, scrollToIndex, items.length]);

    const selectHightlightedItem = React.useCallback(() => {
      if (markedIndex > -1) {
        selectItem(markedIndex);
      }
    }, [markedIndex, selectItem]);

    /**
     * API
     */
    React.useImperativeHandle(
      ref,
      () => ({
        // focus: () => MenuListRef.current?.focus(),
        scrollToIndex: (idx: number) => scrollToIndex(idx),
        highlightIndex: (idx: number) => highlightIndex(idx),
        hightlightPrevItem: () => hightlightPrevItem(),
        hightlightNextItem: () => hightlightNextItem(),
        hightlightFirstItem: () => hightlightFirstItem(),
        hightlightLastItem: () => hightlightLastItem(),
        scrollToFirstSelected: () => scrollToFirstSelected(),
        selectHightlightedItem: () => selectHightlightedItem(),
        selectItem: (idx: number) => selectItem(idx),
      }),
      [
        scrollToIndex,
        highlightIndex,
        hightlightPrevItem,
        hightlightNextItem,
        hightlightFirstItem,
        hightlightLastItem,
        selectHightlightedItem,
        scrollToFirstSelected,
        selectItem,
      ],
    );

    /**
     * Update achnor
     */
    React.useEffect(() => {
      if (anchorElement !== currentAnchorElement) {
        setAnchorElement(anchorElement);
      }
    }, [anchorElement, currentAnchorElement]);

    /**
     * Keyboard events of menu list container.
     * Note: Moved selection up and down while keys pressed
     */
    const listKeydownEvent = React.useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        switch (event.code) {
          case 'Enter':
          case 'NumpadEnter':
          case 'Tab':
            event.preventDefault();
            if (markedIndex > -1) {
              selectItem(markedIndex);
            }
            break;

          case 'ArrowUp':
            {
              event.preventDefault();
              hightlightPrevItem();
            }
            break;

          case 'ArrowDown':
            {
              event.preventDefault();
              hightlightNextItem();
            }

            break;

          case 'Home':
            {
              event.preventDefault();
              hightlightFirstItem();
            }

            break;

          case 'End':
            {
              event.preventDefault();
              hightlightLastItem();
            }

            break;

          case 'PageUp':
          case 'PageDown':
          case 'Space':
            event.preventDefault();

            break;

          case 'Escape':
            event.preventDefault();
            onRequestClose(event);

            break;

          default:
            // do nothing
            break;
        }
      },
      [
        markedIndex,
        onRequestClose,
        selectItem,
        hightlightPrevItem,
        hightlightNextItem,
        hightlightFirstItem,
        hightlightLastItem,
      ],
    );

    React.useEffect(() => {
      const timeoutID = timeoutRef.current;

      return () => {
        if (timeoutID) {
          clearTimeout(timeoutID);
        }
      };
    }, []);

    React.useEffect(() => {
      const windowResizeEvent = (_event: UIEvent) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };

      const mouseDownEvent = (event: MouseEvent) => {
        if (!menuIsOpen) {
          return;
        }

        let parentElem = event.target as Node;
        let needToClose = true;

        while (parentElem && 'parentNode' in parentElem) {
          if (
            parentElem === MenuListRef.current ||
            (anchorElement && parentElem === anchorElement)
          ) {
            needToClose = false;
            break;
          }
          parentElem = parentElem.parentNode as Node;
        }

        if (needToClose) {
          onRequestClose(event);
        }
      };

      if (closeOutsideClick) {
        window.document.addEventListener('mousedown', mouseDownEvent);
      }
      window.document.addEventListener('resize', windowResizeEvent);

      return () => {
        if (closeOutsideClick) {
          window.document.removeEventListener('mousedown', mouseDownEvent);
        }

        window.document.removeEventListener('resize', windowResizeEvent);
      };
    }, [menuIsOpen, onRequestClose, anchorElement, closeOutsideClick]);

    /**
     * Toggle menu open
     */
    React.useEffect(() => {
      if (isOpenRef.current !== isOpen) {
        isOpenRef.current = Boolean(isOpen);
        setMenuOpen(Boolean(isOpen));
        if (isOpen) {
          scrollToFirstSelected();

          if (autofocus) {
            setTimeout(() => {
              MenuListRef.current?.focus();
            }, 300);
          }
        }

        // Reset indexes
        if (!isOpen) {
          // listVirtRef.current?.scrollToIndex(0);
          dispatch(actionSetmenuState({ markedIndex: -1, hoveredIndex: -1 }));
        }
      }
    }, [getSelectedIndexes, scrollToFirstSelected, isOpen, autofocus, dispatch]);

    /**
     * Mark selected items by values
     */
    React.useEffect(() => {
      const indexes = getSelectedIndexes();

      // If elements in selectedIndexesRef and indexes are not equale
      if (
        (selectedIndexesRef.current.length === indexes.length &&
          selectedIndexesRef.current.every(value => indexes.includes(value))) === false
      ) {
        selectedIndexesRef.current = indexes;
        dispatch({
          type: 'setMenuState',
          payload: {
            selectedIndexes: indexes,
          },
        });
      }
    }, [value, getSelectedIndexes, dispatch]);

    const itemClickHandler = React.useCallback(
      (index: number): React.MouseEventHandler<HTMLDivElement> =>
        () => {
          selectItem(index);
        },
      [selectItem],
    );

    const itemMouseLeaveHandler = React.useCallback(
      (index: number, hoveredIndex: number) => () => {
        if (index === hoveredIndex) {
          dispatch(
            actionSetmenuState({
              hoveredIndex: -1,
              markedIndex: -1,
            }),
          );
        }
      },
      [dispatch],
    );

    const itemMouseEnterHandler = React.useCallback(
      (index: number, hoveredIndex: number) => () => {
        if (index !== hoveredIndex) {
          dispatch(
            actionSetmenuState({
              hoveredIndex: index,
              markedIndex: -1,
            }),
          );
        }
      },
      [dispatch],
    );

    if (!isOpen || (anchorPos !== 'static' && !style)) {
      return null;
    }

    return (
      <overridesMap.Popper isOpen={Boolean(isOpen)} style={style || undefined}>
        <overridesMap.List isOpen={Boolean(isOpen)} ref={MenuListRef} onKeyDown={listKeydownEvent}>
          {items.map((item, index) =>
            children(
              {
                item,
                index,
              },
              {
                key: index,
                onMouseEnter: itemMouseEnterHandler(index, hoveredIndex),
                onMouseLeave: itemMouseLeaveHandler(index, hoveredIndex),
                onClick: itemClickHandler(index),
                selected: selectedIndexes.includes(index),
                hovered: hoveredIndex === index || markedIndex === index,
              },
            ),
          )}
        </overridesMap.List>
      </overridesMap.Popper>
    );
  },
);

MenuContainer.displayName = 'Menu';

export default MenuContainer as <T, Multiple extends boolean | undefined = undefined>(
  props: MenuContainerProps<T, Multiple> & { ref?: React.Ref<MenuContainerRef> },
) => JSX.Element;
