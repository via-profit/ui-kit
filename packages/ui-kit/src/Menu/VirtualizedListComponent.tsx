import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import MeasuredItem from './MeasuredItem';

const BLOCK_SIZE = 50;

export type VirtualizedRenderItem<T> = (item: T, index: number) => React.ReactNode;

export type VirtualizedListComponentProp<T> = {
  readonly items: readonly T[];
  readonly height: number;
  readonly renderItem: VirtualizedRenderItem<T>;
  readonly estimatedItemHeight?: number;
  readonly itemHeight?: number;
  readonly overscan?: number;
  readonly scrollToIndex?: number | null;
  readonly scrollToAlign?: ScrollAlign;
  readonly onEndReached?: () => void;
};

export type ScrollAlign = 'start' | 'center' | 'end' | 'auto';

export type VirtualizedListRef = {
  scrollToIndex: (index: number, align?: ScrollAlign) => void;
  getTopVisibleIndex: () => number;
};

function updateHeightWithBlocks(
  index: number,
  newHeight: number,
  heightsRef: React.MutableRefObject<number[]>,
  offsetsRef: React.MutableRefObject<number[]>,
  blockOffsetsRef: React.MutableRefObject<number[]>,
  bumpVersion: React.Dispatch<React.SetStateAction<number>>,
) {
  const heights = heightsRef.current;
  const offsets = offsetsRef.current;
  const blocks = blockOffsetsRef.current;

  const oldHeight = heights[index];
  if (oldHeight == null || oldHeight === newHeight) return;

  const diff = newHeight - oldHeight;
  heights[index] = newHeight;

  // обновляем offsets начиная с index+1
  for (let i = index + 1; i < offsets.length; i++) {
    offsets[i] += diff;
  }

  // обновляем блоки, начиная с блока index
  const blockIndex = Math.floor(index / BLOCK_SIZE);
  for (let b = blockIndex + 1; b < blocks.length; b++) {
    blocks[b] += diff;
  }

  // форсим пересчёт totalHeight
  bumpVersion(v => v + 1);
}

const VirtualizedListComponent = React.forwardRef(
  <T,>(props: VirtualizedListComponentProp<T>, ref: React.ForwardedRef<VirtualizedListRef>) => {
    const {
      items,
      height,
      renderItem,
      estimatedItemHeight = 40,
      itemHeight,
      overscan = 4,
      scrollToIndex = null,
      scrollToAlign = 'auto',
      onEndReached,
    } = props;

    const containerRef = useRef<HTMLDivElement>(null);

    const [scrollTop, setScrollTop] = useState(0);
    const [renderVersion, setRenderVersion] = useState(0);

    const heightsRef = useRef<number[]>([]);
    const offsetsRef = useRef<number[]>([]);
    const blockOffsetsRef = useRef<number[]>([]);

    const isFixed = typeof itemHeight === 'number';

    const onEndReachedRef = React.useRef(false);
    const threshold = Math.max(300, height * 1.5);

    const animateScrollTop = useCallback((to: number, duration = 300) => {
      const container = containerRef.current;
      if (!container) return;

      const start = container.scrollTop;
      const change = to - start;
      const startTime = performance.now();

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const eased = easeOutCubic(progress);

        container.scrollTop = start + change * eased;

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    }, []);

    const scrollTo = useCallback(
      (index: number, align: ScrollAlign = 'auto') => {
        const container = containerRef.current;
        if (!container) return;

        const len = items.length;
        if (index < 0 || index >= len) return;

        const offsets = offsetsRef.current;
        const heights = heightsRef.current;

        const itemTop = offsets[index];
        const itemHeightValue = heights[index] ?? estimatedItemHeight;

        const viewportHeight = height;
        const viewportTop = container.scrollTop;
        const viewportBottom = viewportTop + viewportHeight;

        let target = itemTop;

        switch (align) {
          case 'start':
            target = itemTop;
            break;

          case 'center':
            target = itemTop - viewportHeight / 2 + itemHeightValue / 2;
            break;

          case 'end':
            target = itemTop - viewportHeight + itemHeightValue;
            break;

          case 'auto':
          default:
            if (itemTop < viewportTop) {
              target = itemTop; // прокрутить вверх
            } else if (itemTop + itemHeightValue > viewportBottom) {
              target = itemTop - viewportHeight + itemHeightValue; // прокрутить вниз
            } else {
              return; // уже видно
            }
            break;
        }

        animateScrollTop(Math.max(0, target));
      },
      [items.length, estimatedItemHeight, height, animateScrollTop],
    );

    // scrollToIndex без rAF
    useLayoutEffect(() => {
      if (scrollToIndex == null) return;
      if (!containerRef.current) return;

      const idx = Math.max(0, Math.min(items.length - 1, scrollToIndex));
      const offsets = offsetsRef.current;
      const itemTop = offsets[idx];
      const itemBottom = itemTop + (heightsRef.current[idx] ?? itemHeight ?? estimatedItemHeight);

      const viewportTop = containerRef.current.scrollTop;
      const viewportBottom = viewportTop + height;

      let nextScrollTop = viewportTop;

      if (scrollToAlign === 'start') {
        nextScrollTop = itemTop;
      } else if (scrollToAlign === 'end') {
        nextScrollTop = itemBottom - height;
      } else if (scrollToAlign === 'center') {
        nextScrollTop = itemTop - height / 2 + (itemBottom - itemTop) / 2;
      } else {
        // auto
        if (itemTop < viewportTop) {
          nextScrollTop = itemTop;
        } else if (itemBottom > viewportBottom) {
          nextScrollTop = itemBottom - height;
        } else {
          return;
        }
      }

      containerRef.current.scrollTop = nextScrollTop;
    }, [scrollToIndex, scrollToAlign, items.length, height, itemHeight, estimatedItemHeight]);

    React.useLayoutEffect(() => {
      const totalHeight =
        offsetsRef.current[offsetsRef.current.length - 1] +
        heightsRef.current[heightsRef.current.length - 1];

      const viewportBottom = scrollTop + height;

      const isNearEnd = viewportBottom >= totalHeight - threshold;

      if (isNearEnd && !onEndReachedRef.current) {
        onEndReachedRef.current = true;
        onEndReached?.();
      }

      if (!isNearEnd) {
        onEndReachedRef.current = false;
      }
    }, [scrollTop, height, items.length, threshold, onEndReached]);

    // ⭐ ИДЕАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ offsets/heights
    // инициализация кэша высот/offsets
    // инициализация кэша высот/offsets
    useLayoutEffect(() => {
      const len = items.length;
      const oldLen = heightsRef.current.length;

      if (isFixed) {
        // фиксированная высота — всё просто
        heightsRef.current = new Array(len).fill(itemHeight!);
        offsetsRef.current = new Array(len);
        for (let i = 0; i < len; i++) {
          offsetsRef.current[i] = i * itemHeight!;
        }

        const blockCount = Math.ceil(len / BLOCK_SIZE);
        blockOffsetsRef.current = new Array(blockCount);
        for (let b = 0; b < blockCount; b++) {
          blockOffsetsRef.current[b] = b * BLOCK_SIZE * itemHeight!;
        }
      } else {
        // динамическая высота — добавляем только новые элементы
        const heights = heightsRef.current;
        const offsets = offsetsRef.current;

        // список вырос
        if (len > oldLen) {
          // добавляем новые элементы
          for (let i = oldLen; i < len; i++) {
            heights[i] = estimatedItemHeight;
            offsets[i] = i === 0 ? 0 : offsets[i - 1] + heights[i - 1];
          }

          // пересчитываем блоки только для новых блоков
          const blockCount = Math.ceil(len / BLOCK_SIZE);
          const oldBlockCount = blockOffsetsRef.current.length;

          for (let b = oldBlockCount; b < blockCount; b++) {
            const start = b * BLOCK_SIZE;
            blockOffsetsRef.current[b] = offsets[start] ?? 0;
          }
        }
      }

      // форсим ререндер, чтобы использовать новые offsets
      setRenderVersion(v => v + 1);
    }, [items.length, isFixed, itemHeight, estimatedItemHeight]);

    const onScroll = useCallback(() => {
      const top = containerRef.current?.scrollTop ?? 0;
      setScrollTop(top);
    }, []);

    // ⭐ Поиск startIndex
    const findStartIndex = useCallback(
      (scrollTopValue: number) => {
        const len = items.length;
        if (len === 0) return 0;

        const offsets = offsetsRef.current;
        const blocks = blockOffsetsRef.current;

        if (isFixed) {
          const idx = Math.floor(scrollTopValue / (itemHeight || estimatedItemHeight));
          return Math.max(0, Math.min(len - 1, idx));
        }

        // бинарный поиск по блокам
        let low = 0;
        let high = blocks.length - 1;
        while (low < high) {
          const mid = (low + high) >> 1;
          if (blocks[mid] < scrollTopValue) low = mid + 1;
          else high = mid;
        }
        const blockIndex = Math.max(0, low - 1);
        const start = blockIndex * BLOCK_SIZE;
        const end = Math.min(len - 1, start + BLOCK_SIZE * 2);

        let i = start;
        while (i < end && offsets[i] < scrollTopValue) i++;

        return Math.max(0, Math.min(len - 1, i));
      },
      [items.length, isFixed, itemHeight, estimatedItemHeight, renderVersion],
    );

    const startIndex = useMemo(() => {
      const idx = findStartIndex(scrollTop);
      const _ = renderVersion;

      return Math.max(0, idx - overscan);
    }, [scrollTop, findStartIndex, overscan, renderVersion]);

    // ⭐ Поиск endIndex
    const endIndex = useMemo(() => {
      const len = items.length;
      if (len === 0) return -1;

      const offsets = offsetsRef.current;
      if (offsets.length !== len) return -1;

      const totalVisibleBottom = scrollTop + height;

      let i = startIndex;
      while (i < len && offsets[i] < totalVisibleBottom) i++;

      const _ = renderVersion;

      // renderVersion;
      return Math.min(len - 1, i + overscan);
    }, [scrollTop, height, startIndex, items.length, overscan, renderVersion]);

    const getTopVisibleIndex = useCallback(() => startIndex, [startIndex]);

    React.useImperativeHandle(ref, () => ({
      scrollToIndex: (index: number, align: ScrollAlign = 'auto') => {
        scrollTo(index, align);
      },
      getTopVisibleIndex: () => getTopVisibleIndex(),
    }));

    if (renderVersion === 0) {
      return (
        <div
          ref={containerRef}
          style={{
            overflowY: 'auto',
            position: 'relative',
            height,
          }}
        />
      );
    }

    const visibleStart = startIndex;
    const visibleEnd = endIndex;

    let totalHeight = offsetsRef.current[items.length - 1] + heightsRef.current[items.length - 1];
    if (isNaN(totalHeight)) {
      totalHeight = 0;
    }

    return (
      <div
        ref={containerRef}
        onScroll={onScroll}
        style={{
          overflowY: 'auto',
          position: 'relative',
          height,
        }}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          {Array.from({ length: visibleEnd - visibleStart + 1 }, (_, i) => {
            const index = visibleStart + i;
            const item = items[index];
            const top = offsetsRef.current[index];

            return (
              <MeasuredItem
                key={index}
                index={index}
                isFixed={isFixed}
                top={top}
                updateHeight={(idx, h) =>
                  updateHeightWithBlocks(
                    idx,
                    h,
                    heightsRef,
                    offsetsRef,
                    blockOffsetsRef,
                    setRenderVersion,
                  )
                }
              >
                {renderItem(item, index)}
              </MeasuredItem>
            );
          })}
        </div>
      </div>
    );
  },
);

VirtualizedListComponent.displayName = 'VirtualizedListComponent';
export default VirtualizedListComponent;
