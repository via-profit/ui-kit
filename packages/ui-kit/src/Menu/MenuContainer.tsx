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
   * **Default**: `true`
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
   * **Default**: `'`absolute`'`
   * ```
   */
  readonly positionStrategy?: PositionStrategy;

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

    // const [actualPlacement, setActualPlacement] = React.useState(anchorPos);
    const [currentAnchorElement, setAnchorElement] = React.useState(anchorElement);

    const overridesMap = React.useMemo(
      () => ({
        List: overrides?.List || List,
        Popper: overrides?.Popper || Popper,
      }),
      [overrides?.List, overrides?.Popper],
    );

    const menuListRef = React.useRef<HTMLDivElement | null>(null);
    const menuPopperRef = React.useRef<HTMLDivElement | null>(null);
    const isOpenRef = React.useRef(isOpen);
    const focusTimeoutRef = React.useRef<NodeJS.Timeout>();

    const {
      dispatch,
      state: { selectedIndexes, markedIndex, hoveredIndex },
    } = useContext();

    const selectedIndexesRef = React.useRef(selectedIndexes);

    // Оптимизированная функция получения выбранных индексов
    const getSelectedIndexes = React.useCallback((): number[] => {
      if (value === null || (multiple && (value as T[]).length === 0)) {
        return [];
      }

      const indexes: number[] = [];
      const compareFunc = getOptionSelected
        ? (item: T, val: T) => getOptionSelected({ item, value: val })
        : (item: T, val: T) => isEqual(item, val);

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
    }, [items, value, multiple, getOptionSelected]);

    const scrollToIndex = React.useCallback((index: number) => {
      if (index === -1) {
        return;
      }

      const container = menuListRef.current;
      const option = container?.children[index] as HTMLElement;

      if (container && option) {
        const containerRect = container.getBoundingClientRect();
        const optionRect = option.getBoundingClientRect();

        const scrollOffset = optionRect.top - containerRect.top + container.scrollTop;

        container.scrollTo({
          top: scrollOffset,
          behavior: 'instant'
        });
      }
    }, []);

    const scrollToFirstSelected = React.useCallback(() => {
      if (selectedIndexes.length === 0) return;

      const firstSelectedIndex = Math.min(...selectedIndexes);
      dispatch(actionSetmenuState({ markedIndex: firstSelectedIndex }));
      scrollToIndex(firstSelectedIndex);
    }, [dispatch, selectedIndexes, scrollToIndex]);

    const selectItem = React.useCallback(
      (index: number) => {
        if (index < 0 || index >= items.length) return;

        const item = items[index];
        if (!item) return;

        if (typeof onSelectItem === 'function') {
          if (multiple) {
            // Для multiple режима
            const selectedSet = new Set<T>();
            if (value !== null) {
              (value as T[]).forEach(v => selectedSet.add(v));
            }

            if (selectedIndexes.includes(index)) {
              selectedSet.delete(item);
            } else {
              selectedSet.add(item);
            }

            onSelectItem(Array.from(selectedSet) as Multiple extends undefined ? T : readonly T[]);
          } else {
            // Для single режима
            onSelectItem(item as Multiple extends undefined ? T : readonly T[]);
          }

          if (closeOnSelect) {
            onRequestClose();
          }
        }
      },
      [onSelectItem, onRequestClose, selectedIndexes, closeOnSelect, items, value, multiple],
    );

    const highlightIndex = React.useCallback(
      (index: number) => {
        const validIndex = Math.max(-1, Math.min(index, items.length - 1));
        if (validIndex !== markedIndex) {
          dispatch(actionSetmenuState({ markedIndex: validIndex }));
          scrollToIndex(validIndex);
        }
      },
      [dispatch, items.length, markedIndex, scrollToIndex],
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

    // Обновление anchor элемента
    React.useEffect(() => {
      if (anchorElement !== currentAnchorElement) {
        setAnchorElement(anchorElement);
      }
    }, [anchorElement, currentAnchorElement]);

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
        onRequestClose();
        dispatch(actionSetmenuState({ markedIndex: -1, hoveredIndex: -1 }));

        return;
      }

      // При открытии
      scrollToFirstSelected();

      if (autofocus) {
        // Очищаем предыдущий таймаут
        if (focusTimeoutRef.current) {
          clearTimeout(focusTimeoutRef.current);
        }
        focusTimeoutRef.current = setTimeout(() => {
          menuListRef.current?.focus();
        }, 15);
      }
    }, [isOpen, autofocus, dispatch, onRequestClose, scrollToFirstSelected]);

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

    const itemClickHandler = React.useCallback(
      (index: number) => () => selectItem(index),
      [selectItem],
    );

    const itemMouseEnterHandler = React.useCallback(
      (index: number) => () => {
        if (index !== hoveredIndex) {
          dispatch(
            actionSetmenuState({
              hoveredIndex: index,
              markedIndex: -1,
            }),
          );
        }
      },
      [dispatch, hoveredIndex],
    );

    const itemMouseLeaveHandler = React.useCallback(
      (index: number) => () => {
        if (index === hoveredIndex) {
          dispatch(
            actionSetmenuState({
              hoveredIndex: -1,
              markedIndex: -1,
            }),
          );
        }
      },
      [dispatch, hoveredIndex],
    );

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
              onMouseLeave: itemMouseLeaveHandler(index),
              onClick: itemClickHandler(index),
              selected: selectedIndexes.includes(index),
              hovered: hoveredIndex === index || markedIndex === index,
            },
          ),
        ),
      [
        items,
        children,
        selectedIndexes,
        hoveredIndex,
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
