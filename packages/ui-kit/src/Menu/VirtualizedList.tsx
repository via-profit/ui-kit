import * as React from 'react';
import styled from '@emotion/styled';

import { VirtualizedItemProps } from './VirtualizedItem';
import VirtualizedListRender from './VirtualizedListRender';

export * from './VirtualizedItem';

export type VirtualizedListRef = {
  readonly scrollToIndex: (index: number) => void;
  readonly scrollToNextIndex: () => void;
  readonly scrollToPreviousIndex: () => void;
  readonly getActiveScrollIndex: () => number;
};

export type VirtualizedListProps<T> = {
  readonly items: readonly T[];
  readonly overscan?: number;
  readonly estimatedItemSize?: number;
  readonly children: VirtualizedListChildren<T>;
  readonly initialIndex?: number;
  readonly onEndReached?: () => void;
  readonly onEndReachedIndexThreshold?: number;
  readonly maxHeight?: number;
  readonly scrollUpdates?: boolean;
  readonly itemKey?: (index: number, item: T) => string | number;
};

export type VirtualizedListChildren<T> = (
  data: DataProps<T>,
  virtualizedItemProps: Omit<VirtualizedItemProps, 'children'>,
) => React.ReactNode;

export type DataProps<T> = {
  readonly item: T;
  readonly index: number;
};

const VirtualizedListContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
`;

const VirtualizedListWrapper = styled.div`
  position: absolute;
`;

const VirtualizedListItemsList = styled.div`
  position: absolute;
  left: 0;
  right: 0;
`;

const VirtualizedList = React.forwardRef(
  <T,>(props: VirtualizedListProps<T>, ref: React.ForwardedRef<VirtualizedListRef>) => {
    const {
      items,
      children,
      estimatedItemSize = 0,
      overscan = 5,
      initialIndex,
      onEndReachedIndexThreshold = Math.min(20, props.items.length),
      onEndReached,
      maxHeight = 0,
      scrollUpdates = true,
    } = props;
    const [size, setSize] = React.useState({ width: 0, height: 0 });
    const [activeScrollIndex, setActiveScrollIndex] = React.useState<number>(-1);
    const activeScrollIndexRef = React.useRef(activeScrollIndex);
    const [estimatedItemHeight, setEstimatedItemHeight] = React.useState(estimatedItemSize);
    const [scrollTop, setScrollTop] = React.useState(0);
    const [heights, setHeights] = React.useState<number[]>(
      new Array(items.length).fill(estimatedItemHeight),
    );
    const offsetsRef = React.useRef<number[]>([]);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const itemRefs = React.useRef<(HTMLElement | null)[]>([]);
    const rafId = React.useRef<number | undefined>(undefined);

    // #region Calculations

    // Сбрасываем только при смене items
    React.useEffect(() => {
      setHeights(new Array(items.length).fill(estimatedItemHeight));
      offsetsRef.current = new Array(items.length).fill(0);
      itemRefs.current = new Array(items.length).fill(null);
    }, [items, estimatedItemHeight]);

    const setItemHeight = React.useCallback(
      (index: number, h: number) => {
        if (!h || h <= 0) {
          // игнорируем нулевые/отрицательные/NaN высоты
          return;
        }

        if (typeof estimatedItemHeight === 'undefined') {
          setEstimatedItemHeight(h);
        }

        setHeights(prev => {
          if (prev[index] === h) {
            return prev;
          }
          const next = [...prev];
          next[index] = h;

          return next;
        });
      },
      [estimatedItemHeight],
    );

    // Вычисляем offsets на основе heights
    const offsets = React.useMemo(() => {
      const arr = new Array(items.length);
      let sum = 0;

      for (let i = 0; i < items.length; i++) {
        arr[i] = sum;
        sum += heights[i] ?? estimatedItemHeight;
      }

      offsetsRef.current = arr;

      return arr;
    }, [items.length, heights, estimatedItemHeight]);

    // Общая высота списка
    const wrapperHeight = React.useMemo(() => {
      if (items.length === 0) return 0;

      const lastOffset = offsets[items.length - 1];
      const lastHeight = heights[items.length - 1] ?? estimatedItemHeight;

      return lastOffset + lastHeight;
    }, [items.length, offsets, heights, estimatedItemHeight]);

    // Поиск начального индекса бинарным поиском
    const findStartIndex = React.useCallback((scrollTop: number) => {
      const offsets = offsetsRef.current;
      let low = 0;
      let high = offsets.length - 1;

      while (low <= high) {
        const mid = (low + high) >> 1;
        const midValue = offsets[mid];

        if (midValue < scrollTop) {
          low = mid + 1;
        } else if (midValue > scrollTop) {
          high = mid - 1;
        } else {
          return mid;
        }
      }

      return Math.max(0, low - 1);
    }, []);

    // #region Start index
    const startIndex = React.useMemo(() => {
      if (items.length === 0) {
        return 0;
      }
      // const visibleBottom = scrollTop + viewportHeight;

      const rawStart = findStartIndex(scrollTop);

      // overscan не должен быть больше длины списка
      const safeOverscan = Math.min(overscan, items.length);

      // сдвигаем влево, но не выходим за границы
      const idx = rawStart - safeOverscan;

      // нормализуем индекс
      return Math.max(0, Math.min(idx, items.length - 1));
    }, [items.length, scrollTop, findStartIndex, overscan]);

    // #region End index
    const endIndex = React.useMemo(() => {
      if (items.length === 0 || !size.height) {
        return -1;
      }

      const visibleBottom = scrollTop + size.height;

      let end = startIndex;
      let currentBottom = offsets[startIndex] + (heights[startIndex] ?? estimatedItemHeight);

      // идём вправо, пока элемент полностью не вышел за пределы viewport
      while (end < items.length - 1 && currentBottom < visibleBottom) {
        end++;
        currentBottom = offsets[end] + (heights[end] ?? estimatedItemHeight);
      }

      // overscan вправо, но ограниченный длиной списка
      const safeOverscan = Math.min(overscan, items.length);

      return Math.min(end + safeOverscan, items.length - 1);
    }, [
      startIndex,
      offsets,
      scrollTop,
      size.height,
      heights,
      estimatedItemHeight,
      items.length,
      overscan,
    ]);

    const visibleItems = React.useMemo(() => {
      if (items.length === 0) return [];
      if (endIndex < startIndex) return [];

      return items.slice(startIndex, endIndex + 1);
    }, [items, startIndex, endIndex]);

    // #region Component API

    const scrollToIndex = React.useCallback(
      (index: number) => {
        if (index < 0 || index >= items.length) {
          return;
        }

        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
        }

        rafId.current = requestAnimationFrame(() => {
          const container = containerRef.current;
          if (!container) {
            return;
          }

          const targetOffset = offsetsRef.current[index];
          const height = heights[index] ?? estimatedItemHeight;

          const containerHeight = container.clientHeight;
          const currentScrollTop = container.scrollTop;

          const elementTop = targetOffset;
          const elementBottom = targetOffset + height;

          const viewportTop = currentScrollTop;
          const viewportBottom = currentScrollTop + containerHeight;

          // --- 1. Элемент больше viewport ---
          if (height > containerHeight) {
            // Показываем начало элемента
            container.scrollTo({
              top: elementTop,
              behavior: 'smooth',
            });
            rafId.current = undefined;
            if (scrollUpdates) {
              setActiveScrollIndex(index);
            }

            return;
          }

          // --- 2. Элемент полностью виден ---
          const fullyVisible = elementTop >= viewportTop && elementBottom <= viewportBottom;

          if (fullyVisible) {
            rafId.current = undefined;
            if (scrollUpdates) {
              setActiveScrollIndex(index);
            }

            return;
          }

          // --- 3. Элемент частично виден сверху ---
          if (elementTop < viewportTop) {
            container.scrollTo({
              top: elementTop,
              behavior: 'smooth',
            });
            rafId.current = undefined;
            if (scrollUpdates) {
              setActiveScrollIndex(index);
            }

            return;
          }

          // --- 4. Элемент частично виден снизу ---
          if (elementBottom > viewportBottom) {
            container.scrollTo({
              top: elementBottom - containerHeight,
              behavior: 'smooth',
            });
            rafId.current = undefined;
            if (scrollUpdates) {
              setActiveScrollIndex(index);
            }

            return;
          }

          rafId.current = undefined;
        });
      },
      [items.length, heights, estimatedItemHeight, scrollUpdates],
    );

    const scrollToPreviousIndex = React.useCallback(() => {
      scrollToIndex(activeScrollIndex === -1 ? items.length : activeScrollIndex - 1);
    }, [activeScrollIndex, scrollToIndex, items.length]);

    const scrollToNextIndex = React.useCallback(() => {
      const index = activeScrollIndex === -1 ? 0 : activeScrollIndex + 1;
      scrollToIndex(index);
    }, [activeScrollIndex, scrollToIndex]);

    React.useEffect(() => {
      if (typeof initialIndex === 'number' && initialIndex >= 0 && initialIndex < items.length) {
        // Используем setTimeout для гарантии, что DOM уже отрисован
        const timeoutId = setTimeout(() => {
          scrollToIndex(initialIndex);
        }, 0);

        return () => clearTimeout(timeoutId);
      }
    }, [initialIndex, items.length, scrollToIndex]);

    React.useImperativeHandle(
      ref,
      () => ({
        scrollToIndex,
        scrollToNextIndex,
        scrollToPreviousIndex,
        getActiveScrollIndex: () => activeScrollIndex,
      }),
      [scrollToIndex, scrollToNextIndex, scrollToPreviousIndex, activeScrollIndex],
    );

    // #region Render items
    const computeStyle = React.useCallback(
      (index: number) => {
        if (typeof offsets[index] === 'undefined') {
          return {} as React.CSSProperties;
        }

        const s: React.CSSProperties = {
          position: 'absolute',
          top: offsets[index],
          height: heights[index] ?? estimatedItemHeight,
          width: '100%',
          willChange: 'top',
        };

        return s;
      },
      [estimatedItemHeight, heights, offsets],
    );

    const renderedItems = React.useMemo(() => {
      return visibleItems.map((item, i) => {
        const index = startIndex + i;

        return children(
          { item, index },
          {
            key: `${index}`,
            index,
            isActiveOnScroll: activeScrollIndex === index,
            setItemHeight,
            style: computeStyle(index),
            // onMouseEnter: () => {
            //   activeScrollIndexRef.current = activeScrollIndex;
            //   // setActiveScrollIndex(index);
            // },
            // onMouseLeave: () => {
            //   if (activeScrollIndexRef.current) {
            //     // setActiveScrollIndex(activeScrollIndexRef.current);
            //   }
            // },
          },
        );
      });
    }, [visibleItems, startIndex, children, activeScrollIndex, setItemHeight, computeStyle]);

    // #region EndReached logic

    const lastTriggeredItemsCountRef = React.useRef<number | null>(null);
    const prevItemsLengthRef = React.useRef(items.length);

    const checkAndTriggerEndReached = React.useCallback(() => {
      if (!onEndReached || items.length === 0) {
        return;
      }

      // сколько элементов осталось до конца
      const itemsRemaining = items.length - 1 - endIndex;

      // если уже вызывали для этого количества элементов — выходим
      if (lastTriggeredItemsCountRef.current === items.length) {
        return;
      }

      // если осталось меньше или равно threshold элементов — вызываем
      if (itemsRemaining <= onEndReachedIndexThreshold) {
        lastTriggeredItemsCountRef.current = items.length;
        onEndReached();
      }
    }, [onEndReached, onEndReachedIndexThreshold, items.length, endIndex]);

    // Сбрасываем триггер при изменении items (успешной загрузке)
    React.useEffect(() => {
      if (prevItemsLengthRef.current !== items.length) {
        // Данные обновились - сбрасываем триггер для возможности новой загрузки
        prevItemsLengthRef.current = items.length;

        // Проверяем, не нужно ли вызвать onEndReached сразу после загрузки
        // (если список все еще не заполнил контейнер)
        if (containerRef.current) {
          // Даем время на ререндер и пересчет высот
          requestAnimationFrame(() => {
            checkAndTriggerEndReached();
          });
        }
      }
    }, [items.length, checkAndTriggerEndReached]);

    // Первоначальная проверка для случая, когда список не заполняет контейнер
    React.useEffect(() => {
      if (containerRef.current) {
        // Даем время на отрисовку
        const timeoutId = setTimeout(() => {
          checkAndTriggerEndReached();
        }, 100);

        return () => clearTimeout(timeoutId);
      }
    }, [checkAndTriggerEndReached, items.length]);

    // #region Scroll event
    const handleScroll = React.useCallback(
      (e: React.UIEvent<HTMLDivElement>) => {
        const scrollTop = e.currentTarget.scrollTop;

        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
        }

        rafId.current = requestAnimationFrame(() => {
          setScrollTop(scrollTop);

          // Проверяем, достигли ли конца списка
          checkAndTriggerEndReached();
          rafId.current = undefined;
        });
      },
      [checkAndTriggerEndReached],
    );

    // #region ComponentWillUnmount
    // Очистка при размонтировании
    React.useEffect(() => {
      return () => {
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
        }
      };
    }, []);

    // #region Resize
    React.useEffect(() => {
      const el = containerRef.current;
      if (!el) {
        return;
      }

      const observer = new ResizeObserver(entries => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;

          if (maxHeight) {
            setSize({ width, height: height > 0 ? Math.min(maxHeight, height) : maxHeight });

            return;
          }

          if (width && height) {
            setSize({ width, height });
          }
        }
      });

      observer.observe(el);
      return () => observer.disconnect();
    }, [maxHeight]);

    // #region Component Render

    const wrapperStyle: React.CSSProperties = React.useMemo(
      () => ({ width: size.width, height: wrapperHeight }),
      [size.width, wrapperHeight],
    );

    return (
      <VirtualizedListRender
        handleScroll={handleScroll}
        ref={containerRef}
        wrapperStyle={wrapperStyle}
      >
        {renderedItems}
      </VirtualizedListRender>
    );
    // return (
    //   <VirtualizedListContainer onScroll={handleScroll} ref={containerRef}>
    //     <VirtualizedListWrapper style={wrapperStyle}>
    //       <VirtualizedListItemsList>{renderedItems}</VirtualizedListItemsList>
    //     </VirtualizedListWrapper>
    //   </VirtualizedListContainer>
    // );
  },
);

VirtualizedList.displayName = 'VirtualizedList';

export default VirtualizedList as <T>(
  props: VirtualizedListProps<T> & { ref?: React.Ref<VirtualizedListRef> },
) => React.ReactElement;
