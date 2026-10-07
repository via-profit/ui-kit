import React from 'react';

import useContext, { actionSetmenuState } from './context';
import List, { MenuListProps } from './MenuList';
import Popper, { AnchorPos, PopperProps, PositionStrategy } from '../Popper';
import type { MenuItemProps } from './MenuItem';
import ClickOutside from '../ClickOutside';

export type AnchorElement<E extends HTMLElement = HTMLElement> = E;

export type Children<T> = (
  data: {
    item: T;
    index: number;
  },
  itemProps: MenuItemProps,
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
   * **Default**: `null`
   */
  readonly anchorElement: AnchorElement | null;

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
   * Close list if click outside the list and anchor element\
   * \
   * **Default**: `true`
   */
  readonly closeOutsideClick?: boolean;

  /**
   * Also close the list when the anchor element is clicked.\
   * Leave it `false` when the anchor toggles the list by itself,
   * otherwise the anchor click closes the list and the anchor opens it again\
   * \
   * **Default**: `false`
   */
  readonly closeOnAnchorClick?: boolean;

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
   * Default: `bottom`
   */
  readonly anchorPos?: AnchorPos;

  readonly alternativePlacements?: readonly AnchorPos[];

  readonly onAnchorPosChanged?: (anchorPos: AnchorPos) => void;

  /**
   * When enabled, the popper will automatically try to find the best placement
   * if the preferred placement doesn't fit in the viewport.
   * The component will iterate through possible placements until it finds one that fits.
   *
   * **Default**: `false`
   * ```
   */
  readonly autoFlip?: boolean;

  /**
   * Additional offset (in pixels) from the anchor element.
   * Positive values move the popper away from the anchor, negative values move it closer.
   *
   * @default `0`
   * ```
   */
  readonly offset?: number;

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

  /**
   * Minimum distance (in pixels) that the popper must maintain from the viewport edges.
   * Used to prevent the popper from being positioned too close to the screen boundaries.
   * The popper will try to flip to another placement if it cannot maintain this margin.
   *
   * **Default**: `30`
   * ```
   */
  readonly viewportMargin?: number;

  /**
   * Should menu will be closed when item selected\
   * \
   * **Default**: if **multiple** is true then `false` otherwise - `true`
   */
  readonly closeOnSelect?: boolean;

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

  /**
   * List menu maximum width (px, em, etc.)\
   * Using pixels:
   * ```tsx
   * <Menu
   *  maxWidth={250}
   * >
   * ```
   * Using em:
   * ```tsx
   * <Menu
   *  maxWidth="16em"
   * >
   * ```
   * Using pixels:
   * ```tsx
   * <Menu
   *  maxWidth="16px"
   * >
   * ```
   */
  readonly maxWidth?: number | string;
}

export interface MenuOverrides {
  /**
   * Element wrapper
   */
  readonly List?: React.ComponentType<MenuListProps & React.RefAttributes<HTMLDivElement>>;

  /**
   * Popper wrapper
   */
  readonly Popper?: React.ComponentType<PopperProps & React.RefAttributes<HTMLDivElement>>;
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
   * Highlight specified item by index
   */
  highlightIndex: (index: number) => void;

  /**
   * Highlight the previous item relative to the currently highlighted one
   */
  highlightPrevItem: () => void;

  /**
   * Highlight the next item relative to the currently highlighted one
   */
  highlightNextItem: () => void;

  /**
   * Highlight the first item in list
   */
  highlightFirstItem: () => void;

  /**
   * Highlight the last item in list
   */
  highlightLastItem: () => void;

  /**
   * Select highlighted item in list
   */
  selectHighlightedItem: () => void;

  /**
   * Returns the list HTML container
   */
  getListElement: () => HTMLDivElement | null;

  // setActualPlacement: (placement: AnchorPos) => void;
};

export type Value<T, Multiple> = Multiple extends undefined ? T | null : readonly T[];
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

const isEqual = <T,>(a: T, b: T): boolean => {
  if (a === b) {
    return true;
  }
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  return keysA.every(
    key => Object.prototype.hasOwnProperty.call(b, key) && (a as any)[key] === (b as any)[key],
  );
};

const MenuContainer = React.forwardRef(
  <T, Multiple extends boolean | undefined = undefined>(
    props: MenuProps<T, Multiple>,
    ref: React.Ref<MenuRef>,
  ) => {
    const {
      items,
      value,
      anchorElement = null,
      overrides,
      children,
      closeOutsideClick = true,
      closeOnAnchorClick = false,
      isOpen = false,
      anchorPos = 'bottom',
      alternativePlacements = ['bottom', 'top'],
      positionStrategy,
      autoFlip,
      viewportMargin,
      offset,
      multiple = false,
      autofocus = true,
      closeOnSelect = !multiple,
      onRequestClose = onRequestCloseDefault,
      onAnchorPosChanged,
      zIndex,
      onSelectItem,
      getOptionSelected,
      maxWidth,
    } = props;

    const overridesMap = React.useMemo(
      () => ({
        List: overrides?.List || List,
        Popper: overrides?.Popper || Popper,
      }),
      [overrides?.List, overrides?.Popper],
    );

    const menuListRef = React.useRef<HTMLDivElement | null>(null);
    const menuPopperRef = React.useRef<HTMLDivElement | null>(null);
    // Starts as `false` so that a menu mounted in the open state is focused and scrolled too
    const isOpenRef = React.useRef(false);
    const focusTimeoutRef = React.useRef<NodeJS.Timeout>();
    // Whether the focus is inside the list: then it is returned to the anchor on close
    const hasFocusRef = React.useRef(false);
    // The parent often resets the anchor together with isOpen, so the last one is kept
    const lastAnchorRef = React.useRef<HTMLElement | null>(anchorElement);
    if (anchorElement) {
      lastAnchorRef.current = anchorElement;
    }
    // Keyboard navigation scrolls the list under a still pointer, and the browser fires
    // mouseenter on the item that appears under it. Such events must not move the highlight
    const isKeyboardNavigationRef = React.useRef(false);

    const {
      dispatch,
      state: { selectedIndexes, markedIndex, hoveredIndex },
    } = useContext();

    const selectedIndexesRef = React.useRef(selectedIndexes);

    const compareFunc = React.useCallback(
      (item: T, val: T) =>
        getOptionSelected ? getOptionSelected({ item, value: val }) : isEqual(item, val),
      [getOptionSelected],
    );

    // Оптимизированная функция получения выбранных индексов
    const getSelectedIndexes = React.useCallback((): number[] => {
      if (value === null || (multiple && (value as T[]).length === 0)) {
        return [];
      }

      const indexes: number[] = [];

      if (multiple) {
        const valueArray = value as T[];
        items.forEach((item, index) => {
          if (valueArray.some(val => compareFunc(item, val))) {
            indexes.push(index);
          }
        });
      } else {
        const singleValue = value as T;
        const index = items.findIndex(item => compareFunc(item, singleValue));
        if (index !== -1) {
          indexes.push(index);
        }
      }

      return indexes;
    }, [items, value, multiple, compareFunc]);

    const scrollToIndex = React.useCallback((index: number) => {
      if (index === -1) {
        return;
      }

      const container = menuListRef.current;
      const option = container?.children[index] as HTMLElement;

      if (container && option) {
        const containerRect = container.getBoundingClientRect();
        const optionRect = option.getBoundingClientRect();

        // Scroll only when the option is out of the visible area
        if (optionRect.top < containerRect.top) {
          container.scrollTop -= containerRect.top - optionRect.top;
        } else if (optionRect.bottom > containerRect.bottom) {
          container.scrollTop += optionRect.bottom - containerRect.bottom;
        }
      }
    }, []);

    const scrollToFirstSelected = React.useCallback(() => {
      // Computed from the props, the context state may not be updated yet
      const indexes = getSelectedIndexes();
      if (indexes.length === 0) return;

      const firstSelectedIndex = Math.min(...indexes);
      dispatch(actionSetmenuState({ markedIndex: firstSelectedIndex }));
      scrollToIndex(firstSelectedIndex);
    }, [dispatch, getSelectedIndexes, scrollToIndex]);

    const selectItem = React.useCallback(
      (index: number) => {
        if (index < 0 || index >= items.length) return;

        const item = items[index];
        // Falsy items such as 0 or an empty string are valid options
        if (item === undefined) return;

        if (typeof onSelectItem === 'function') {
          if (multiple) {
            // Для multiple режима
            // Value entries may be other instances than items, so compare them by compareFunc
            const currentValue = (value as readonly T[] | null) || [];
            const isSelected = currentValue.some(v => compareFunc(item, v));
            const newValue = isSelected
              ? currentValue.filter(v => !compareFunc(item, v))
              : [...currentValue, item];

            onSelectItem(newValue as Multiple extends undefined ? T : readonly T[]);
          } else {
            // Для single режима
            onSelectItem(item as Multiple extends undefined ? T : readonly T[]);
          }

          if (closeOnSelect) {
            onRequestClose();
          }
        }
      },
      [onSelectItem, onRequestClose, compareFunc, closeOnSelect, items, value, multiple],
    );

    const highlightIndex = React.useCallback(
      (index: number) => {
        const validIndex = Math.max(-1, Math.min(index, items.length - 1));
        isKeyboardNavigationRef.current = true;
        // Always dispatched: markedIndex of this closure can be outdated (e.g. the items effect
        // has just reset it), the reducer skips the update when nothing changes.
        // The mouse and the keyboard share one highlight
        dispatch(actionSetmenuState({ markedIndex: validIndex, hoveredIndex: -1 }));
        scrollToIndex(validIndex);
      },
      [dispatch, items.length, scrollToIndex],
    );

    const highlightPrevItem = React.useCallback(() => {
      const newIndex = markedIndex - 1;
      highlightIndex(newIndex >= 0 ? newIndex : 0);
    }, [markedIndex, highlightIndex]);

    const highlightNextItem = React.useCallback(() => {
      const newIndex = markedIndex + 1;
      highlightIndex(newIndex < items.length ? newIndex : items.length - 1);
    }, [markedIndex, items.length, highlightIndex]);

    const highlightFirstItem = React.useCallback(() => {
      highlightIndex(0);
    }, [highlightIndex]);

    const highlightLastItem = React.useCallback(() => {
      highlightIndex(items.length - 1);
    }, [highlightIndex, items.length]);

    const selectHighlightedItem = React.useCallback(() => {
      if (markedIndex > -1 && markedIndex < items.length) {
        selectItem(markedIndex);
      }
    }, [markedIndex, selectItem, items.length]);

    // API ref
    React.useImperativeHandle(
      ref,
      () => ({
        focus: () => menuListRef.current?.focus(),
        scrollToIndex: (idx: number) => scrollToIndex(idx),
        highlightIndex: (idx: number) => highlightIndex(idx),
        highlightPrevItem: () => highlightPrevItem(),
        highlightNextItem: () => highlightNextItem(),
        highlightFirstItem: () => highlightFirstItem(),
        highlightLastItem: () => highlightLastItem(),
        scrollToFirstSelected: () => scrollToFirstSelected(),
        selectHighlightedItem: () => selectHighlightedItem(),
        selectItem: (idx: number) => selectItem(idx),
        getListElement: () => menuListRef.current,
        // setActualPlacement: placement => setActualPlacement(placement),
      }),
      [
        scrollToIndex,
        highlightIndex,
        highlightPrevItem,
        highlightNextItem,
        highlightFirstItem,
        highlightLastItem,
        selectHighlightedItem,
        scrollToFirstSelected,
        selectItem,
      ],
    );

    // Обработчик клавиатуры
    const listKeydownEvent = React.useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        switch (event.code) {
          case 'Enter':
          case 'NumpadEnter':
            event.preventDefault();
            if (markedIndex > -1 && markedIndex < items.length) {
              selectItem(markedIndex);
            }
            break;

          case 'ArrowUp':
            event.preventDefault();
            highlightPrevItem();
            break;

          case 'ArrowDown':
            event.preventDefault();
            highlightNextItem();
            break;

          case 'Home':
            event.preventDefault();
            highlightFirstItem();
            break;

          case 'End':
            event.preventDefault();
            highlightLastItem();
            break;

          case 'Escape':
            event.preventDefault();
            onRequestClose(event);
            break;

          case 'Tab':
            // The list is rendered in a portal at the end of the page, so the next Tab stop
            // would be lost: close the menu instead, the focus returns to the anchor
            event.preventDefault();
            onRequestClose(event);
            break;

          default:
            break;
        }
      },
      [
        markedIndex,
        items.length,
        selectItem,
        highlightPrevItem,
        highlightNextItem,
        highlightFirstItem,
        highlightLastItem,
        onRequestClose,
      ],
    );

    // Управление открытием/закрытием меню
    React.useEffect(() => {
      if (isOpenRef.current === isOpen) return;

      isOpenRef.current = isOpen;

      if (!isOpen) {
        // The menu is already closed by the parent, so onRequestClose must not be called again
        dispatch(actionSetmenuState({ markedIndex: -1, hoveredIndex: -1 }));

        // Otherwise the focus is lost together with the unmounted list
        if (hasFocusRef.current) {
          hasFocusRef.current = false;
          lastAnchorRef.current?.focus();
        }

        return;
      }

      // При открытии
      scrollToFirstSelected();

      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
      }

      // A menu mounted in the open state gets its list only after the portal is mounted,
      // so the scroll is repeated when the list surely exists
      focusTimeoutRef.current = setTimeout(() => {
        scrollToFirstSelected();

        if (autofocus) {
          menuListRef.current?.focus();
        }
      }, 15);
    }, [isOpen, autofocus, dispatch, scrollToFirstSelected]);

    // Обновление выбранных индексов
    React.useEffect(() => {
      const indexes = getSelectedIndexes();

      // Сравниваем массивы эффективно
      const hasChanged =
        selectedIndexesRef.current.length !== indexes.length ||
        selectedIndexesRef.current.some((value, idx) => value !== indexes[idx]);

      if (hasChanged) {
        selectedIndexesRef.current = indexes;
        dispatch({
          type: 'setMenuState',
          payload: { selectedIndexes: indexes },
        });
      }
    }, [getSelectedIndexes, dispatch]);

    // The highlight is an index, so when the items change it follows the same item
    // or is removed. Otherwise a filtered list highlights a random item at the old index
    const prevItemsRef = React.useRef(items);
    const markedIndexRef = React.useRef(markedIndex);
    markedIndexRef.current = markedIndex;

    React.useEffect(() => {
      const prevItems = prevItemsRef.current;
      prevItemsRef.current = items;

      // A new array with the same items (e.g. `items={list.filter(...)}`) is not a change
      const isSameList =
        prevItems.length === items.length && prevItems.every((item, i) => item === items[i]);
      if (isSameList) {
        return;
      }

      const prevIndex = markedIndexRef.current;
      const markedItem = prevIndex === -1 ? undefined : prevItems[prevIndex];
      const newIndex =
        markedItem === undefined
          ? -1
          : items.findIndex(item => item === markedItem || compareFunc(item, markedItem));

      if (newIndex !== prevIndex) {
        dispatch(actionSetmenuState({ markedIndex: newIndex, hoveredIndex: -1 }));
      }

      // The old scroll position means nothing for the new list
      if (newIndex === -1) {
        if (menuListRef.current) {
          menuListRef.current.scrollTop = 0;
        }
      } else {
        scrollToIndex(newIndex);
      }
    }, [items, compareFunc, dispatch, scrollToIndex]);

    const itemClickHandler = React.useCallback(
      (index: number) => () => selectItem(index),
      [selectItem],
    );

    // The hovered item becomes the highlighted one, so the keyboard continues from it
    // and Enter selects it
    const itemMouseEnterHandler = React.useCallback(
      (index: number) => () => {
        if (isKeyboardNavigationRef.current) {
          return;
        }

        if (index !== markedIndex || index !== hoveredIndex) {
          dispatch(actionSetmenuState({ hoveredIndex: index, markedIndex: index }));
        }
      },
      [dispatch, hoveredIndex, markedIndex],
    );

    const itemMouseLeaveHandler = React.useCallback(
      (index: number) => () => {
        if (index === hoveredIndex) {
          dispatch(actionSetmenuState({ hoveredIndex: -1 }));
        }
      },
      [dispatch, hoveredIndex],
    );

    // A real pointer movement ends the keyboard navigation
    const listMouseMoveHandler = React.useCallback(() => {
      isKeyboardNavigationRef.current = false;
    }, []);

    const listFocusHandler = React.useCallback(() => {
      hasFocusRef.current = true;
    }, []);

    const listBlurHandler = React.useCallback((event: React.FocusEvent<HTMLDivElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
        hasFocusRef.current = false;
      }
    }, []);

    const onAnchorPosChangedMemo = React.useCallback(
      (newPlacement: AnchorPos) => {
        if (typeof onAnchorPosChanged === 'function') {
          onAnchorPosChanged(newPlacement);
        }
      },
      [onAnchorPosChanged],
    );

    const renderedChildren = React.useMemo(
      () =>
        items.map((item, index) =>
          children(
            { item, index },
            {
              key: index,
              onMouseEnter: itemMouseEnterHandler(index),
              // mouseenter is skipped during the keyboard navigation, so the item under a moving
              // pointer is highlighted by mousemove
              onMouseMove: itemMouseEnterHandler(index),
              onMouseLeave: itemMouseLeaveHandler(index),
              onClick: itemClickHandler(index),
              selected: selectedIndexes.includes(index),
              hovered: markedIndex === index,
            },
          ),
        ),
      [
        items,
        children,
        selectedIndexes,
        markedIndex,
        itemMouseEnterHandler,
        itemMouseLeaveHandler,
        itemClickHandler,
      ],
    );

    // Cleanup on unmount
    React.useEffect(
      () => () => {
        if (focusTimeoutRef.current) {
          clearTimeout(focusTimeoutRef.current);
        }
      },
      [],
    );

    // Мемоизация компонентов
    const PopperComponent = overridesMap.Popper;
    const ListComponent = overridesMap.List;

    return (
      <ClickOutside
        onOutsideClick={onRequestClose}
        mouseEvent={isOpen && closeOutsideClick ? 'onMouseDown' : false}
        ignoreElements={closeOnAnchorClick ? undefined : [anchorElement]}
      >
        <PopperComponent
          isOpen={Boolean(isOpen)}
          ref={menuPopperRef}
          zIndex={zIndex}
          anchorPos={anchorPos}
          alternativePlacements={alternativePlacements}
          anchorElement={anchorElement}
          onAnchorPosChanged={onAnchorPosChangedMemo}
          positionStrategy={positionStrategy}
          autoFlip={autoFlip}
          viewportMargin={viewportMargin}
          offset={offset}
        >
          <ListComponent
            anchorPos={anchorPos}
            isOpen={Boolean(isOpen)}
            ref={menuListRef}
            maxWidth={maxWidth}
            onKeyDown={listKeydownEvent}
            onMouseMoveCapture={listMouseMoveHandler}
            onFocus={listFocusHandler}
            onBlur={listBlurHandler}
            role="listbox"
            aria-multiselectable={multiple || undefined}
          >
            {renderedChildren}
          </ListComponent>
        </PopperComponent>
      </ClickOutside>
    );
  },
);

MenuContainer.displayName = 'MenuContainer';

export default MenuContainer as <T, Multiple extends boolean | undefined = undefined>(
  props: MenuProps<T, Multiple> & { ref?: React.Ref<MenuRef> },
) => JSX.Element;
