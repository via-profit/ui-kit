import React from 'react';

import useContext, { actionSetmenuState } from './context';
import List, { MenuListProps } from './MenuList';
import Popper, { AnchorPos, PopperProps } from '../Popper';
import type { MenuItemCommonProps } from './MenuItem';
import ClickOutside from '../ClickOutside';

export type AnchorElement<E extends HTMLElement = HTMLElement> = E;

export type Children<T> = (
  data: {
    item: T;
    index: number;
  },
  itemProps: MenuItemCommonProps,
) => React.ReactNode;

export interface MenuProps<T, Multiple extends boolean | undefined = undefined> {
  /**
   * List of items
   */
  readonly items: readonly T[];

  /**
   * Current value\
   * If `Menu` component has `multiple` property then value must be an array of items\
   * **Note**: Value can be null only when `multiple` property has been `false`
   */
  readonly value: Value<T, Multiple>;

  /**
   * Function to which an object with data will be passed\
   * The first of  argument - is an object with item and item index\
   * The second argument - is an item properties (onKeyDown, onClick, etc.)\
   * \
   * Example:
   * ```tsx
   * <Menu
   *   anchorElement={anchorElement}
   *   value={value}
   *   ...
   * >
   *   {({ item }, itemProps) => (
   *     <MenuItem {...itemProps} key={item.id}>
   *       {item.name}
   *     </MenuItem>
   *   )}
   * </Menu>
   * ```
   */
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
   * Default: `auto`
   */
  readonly anchorPos?: AnchorPos;

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
  // readonly disablePortal?: boolean;

  /**
   * Popper z-index\
   * \
   * **Default**: theme.zIndex.modal
   */
  readonly zIndex?: number;

  /**
   * Overridable components map
   */
  readonly overrides?: MenuOverrides;
  /**
   * A function that determines which of the elements is currently selected\
   * Example:
   * ```tsx
   * <Menu
   *   ...
   *   getOptionSelected={({ item, value }) => item.id === value.id}
   * >
   *  ...
   * </Menu>
   * ```
   */
  readonly getOptionSelected?: GetOptionSelected<T>;

  /**
   * Called when item selected
   */
  readonly onSelectItem?: OnSelectItem<T, Multiple>;

  /**
   * The function that will be called at the moment when you want to close the menu
   */
  readonly onRequestClose?: OnRequestClose;
}

export interface MenuOverrides {
  /**
   * Element wrapper
   */
  readonly List?: React.ForwardRefExoticComponent<
    MenuListProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Popper wrapper
   */
  readonly Popper?: React.ForwardRefExoticComponent<
    PopperProps & React.RefAttributes<HTMLDivElement>
  >;
}

export type MenuRef = {
  /**
   * Focus on list
   */
  focus: () => void;
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

  /**
   * Returns the list HTML container
   */
  getListElement: () => HTMLDivElement | null;
};

export type Value<T, Multiple> = Multiple extends undefined | undefined ? T | null : readonly T[];
export type GetOptionSelected<T> = (payload: { readonly item: T; readonly value: T }) => boolean;

export type OnSelectItem<T, Multiple extends boolean | undefined = undefined> = (
  value: Multiple extends undefined ? T : readonly T[],
) => void;

export type OnRequestClose = (
  event?:
    | React.KeyboardEvent<HTMLElement>
    | React.MouseEvent<HTMLElement>
    | KeyboardEvent
    | MouseEvent,
) => void;

const onRequestCloseDefault = () => undefined;

const MenuContainer = React.forwardRef(
  <T, Multiple extends boolean | undefined = undefined>(
    props: MenuProps<T, Multiple>,
    ref: React.Ref<MenuRef>,
  ) => {
    const {
      items,
      value,
      anchorElement,
      overrides,
      children,
      closeOutsideClick = true,
      isOpen = props.anchorPos === 'static',
      anchorPos = 'auto',
      multiple = false,
      autofocus = true,
      closeOnSelect = !multiple,
      onRequestClose = onRequestCloseDefault,
      zIndex,
      onSelectItem,
      getOptionSelected,
    } = props;

    const overridesMap = React.useMemo(
      () => ({
        List: overrides?.List || List,
        Popper: overrides?.Popper || Popper,
      }),
      [overrides],
    );

    const getSelectedIndexes = React.useCallback(() => {
      const idx = new Set<number>();

      if (value !== null) {
        if (typeof getOptionSelected === 'function') {
          if (multiple) {
            (value as T[]).forEach(v => {
              idx.add(items.findIndex(item => getOptionSelected({ item, value: v })));
            });
          } else {
            idx.add(items.findIndex(item => getOptionSelected({ item, value: value as T })));
          }
        }

        if (multiple) {
          (value as T[]).forEach(v => {
            idx.add(items.findIndex(item => JSON.stringify(item) === JSON.stringify(v)));
          });
        } else {
          idx.add(items.findIndex(item => JSON.stringify(item) === JSON.stringify(value)));
        }
      }

      return [...idx];
    }, [getOptionSelected, items, multiple, value]);

    const [currentAnchorElement, setAnchorElement] = React.useState(anchorElement);
    const isOpenRef = React.useRef(isOpen);
    const menuListRef = React.useRef<HTMLDivElement | null>(null);
    const menuPopperRef = React.useRef<HTMLDivElement | null>(null);
    const {
      dispatch,
      state: { selectedIndexes, markedIndex, hoveredIndex },
    } = useContext();
    const selectedIndexesRef = React.useRef(selectedIndexes);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const scrollToIndex = React.useCallback((index: number) => {
      const option = menuListRef?.current?.children[index];
      if (option) {
        option.scrollIntoView({
          behavior: 'auto',
          block: 'nearest',
        });
      }
    }, []);

    React.useEffect(() => {
      let timeout: NodeJS.Timeout | null;
      const recalc = () => {
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
          if (anchorElement) {
            // calculateElementPos();
          }
        }, 300);
      };

      window.addEventListener('resize', recalc);
      window.addEventListener('scroll', recalc);

      recalc();

      return () => {
        window.removeEventListener('resize', recalc);
        window.removeEventListener('scroll', recalc);
      };
    }, [anchorElement, isOpen]);

    /**
     * Scroll to first of selected item
     */
    const scrollToFirstSelected = React.useCallback(() => {
      const indexes = [...selectedIndexes];
      // Sort array of indexes by DESC and get the index
      const index = indexes.length ? [...indexes.sort()][0] : -1;
      dispatch({
        type: 'setMenuState',
        payload: {
          markedIndex: index,
        },
      });
      scrollToIndex(index);
    }, [dispatch, selectedIndexes, scrollToIndex]);

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
          if (multiple) {
            const selectedMap = new Map<string, T>();
            if (value !== null) {
              (value as Value<T, Multiple>[]).forEach(v =>
                selectedMap.set(JSON.stringify(v), v as T),
              );
            }

            if (selectedIndexes.includes(index)) {
              selectedMap.delete(JSON.stringify(item));
            }
            if (!selectedIndexes.includes(index)) {
              selectedMap.set(JSON.stringify(item), item as T);
            }

            onSelectItem(
              Array.from(selectedMap, ([_key, v]) => v) as Multiple extends undefined
                ? T
                : readonly T[],
            );
          } else {
            // For single

            onSelectItem(item as Multiple extends undefined ? T : readonly T[]);
          }

          if (closeOnSelect) {
            onRequestClose();
          }
        }
      },
      [onSelectItem, onRequestClose, selectedIndexes, closeOnSelect, items, value, multiple],
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
        focus: () => menuListRef.current?.focus(),
        scrollToIndex: (idx: number) => scrollToIndex(idx),
        highlightIndex: (idx: number) => highlightIndex(idx),
        hightlightPrevItem: () => hightlightPrevItem(),
        hightlightNextItem: () => hightlightNextItem(),
        hightlightFirstItem: () => hightlightFirstItem(),
        hightlightLastItem: () => hightlightLastItem(),
        scrollToFirstSelected: () => scrollToFirstSelected(),
        selectHightlightedItem: () => selectHightlightedItem(),
        selectItem: (idx: number) => selectItem(idx),
        getListElement: () => menuListRef.current,
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

      window.document.addEventListener('resize', windowResizeEvent);

      return () => {
        window.document.removeEventListener('resize', windowResizeEvent);
      };
    }, [isOpen, onRequestClose, anchorElement, closeOutsideClick]);

    /**
     * Toggle menu open
     */
    React.useEffect(() => {
      if (isOpenRef.current !== isOpen) {
        isOpenRef.current = Boolean(isOpen);
        // setMenuOpen(Boolean(isOpen));
        if (!isOpen) {
          onRequestClose();
        }
        if (isOpen) {
          scrollToFirstSelected();

          if (autofocus) {
            setTimeout(() => {
              menuListRef.current?.focus();
            }, 15);
          }
        }

        // Reset indexes
        if (!isOpen) {
          // listVirtRef.current?.scrollToIndex(0);
          dispatch(actionSetmenuState({ markedIndex: -1, hoveredIndex: -1 }));
        }
      }
    }, [getSelectedIndexes, scrollToFirstSelected, isOpen, autofocus, dispatch, onRequestClose]);

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

    return (
      <ClickOutside
        onOutsideClick={onRequestClose}
        mouseEvent={closeOutsideClick ? 'onMouseDown' : false}
      >
        <overridesMap.Popper
          isOpen={Boolean(isOpen)}
          ref={menuPopperRef}
          zindex={zIndex}
          anchorPos={anchorPos}
          anchorElement={anchorElement}
        >
          <overridesMap.List
            isOpen={Boolean(isOpen)}
            ref={menuListRef}
            onKeyDown={listKeydownEvent}
          >
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
      </ClickOutside>
    );
  },
);

MenuContainer.displayName = 'MenuContainer';

export default MenuContainer as <T, Multiple extends boolean | undefined = undefined>(
  props: MenuProps<T, Multiple> & { ref?: React.Ref<MenuRef> },
) => JSX.Element;
