import React, { useCallback, useEffect, useMemo, useRef, useState, useLayoutEffect } from 'react';

import MeasuredItem from './MeasuredItem';

type ScrollAlign = 'start' | 'center' | 'end' | 'auto';

const BLOCK_SIZE = 50; // размер блока для двухуровневого индекса

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

export type VirtualizedRenderItem<T> = (item: T, index: number) => React.ReactNode;

export type VirtualizedListComponentProp<T> = {
  readonly items: readonly T[];
  readonly height: number;
  readonly renderItem: VirtualizedRenderItem<T>;

  // динамическая высота
  readonly estimatedItemHeight?: number;

  // фиксированная высота (если задана — включаем fast mode)
  readonly itemHeight?: number;

  readonly overscan?: number;

  // scrollToIndex API
  readonly scrollToIndex?: number | null;
  readonly scrollToAlign?: ScrollAlign;
  readonly onEndReached?: () => void;
  // threshold?: number;
};

const VirtualizedListComponent = React.forwardRef(
  <T,>(props: VirtualizedListComponentProp<T>, ref: React.ForwardedRef<HTMLDivElement>) => {
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

    // состояние только для scrollTop и "поколения" рендера
    const [scrollTop, setScrollTop] = useState(0);
    const [renderVersion, setRenderVersion] = useState(0);
    // const [height, setHeight] = useState(0);

    // кэш высот и offsets — живут в ref и переживают рендеры
    const heightsRef = useRef<number[]>([]);
    const offsetsRef = useRef<number[]>([]);
    const blockOffsetsRef = useRef<number[]>([]); // двухуровневый индекс

    const isFixed = typeof itemHeight === 'number';

    // инициализация кэша высот/offsets
    useLayoutEffect(() => {
      const len = items.length;

      if (isFixed) {
        // фиксированная высота — всё просто
        heightsRef.current = new Array(len).fill(itemHeight!);
        offsetsRef.current = new Array(len);
        for (let i = 0; i < len; i++) {
          offsetsRef.current[i] = i * itemHeight!;
        }
        // блоки
        const blockCount = Math.ceil(len / BLOCK_SIZE);
        blockOffsetsRef.current = new Array(blockCount);
        for (let b = 0; b < blockCount; b++) {
          blockOffsetsRef.current[b] = b * BLOCK_SIZE * itemHeight!;
        }
      } else {
        // динамическая высота — используем кэш, но инициализируем недостающие
        const heights = heightsRef.current;
        const offsets = offsetsRef.current;

        if (heights.length !== len) {
          const newHeights = new Array(len);
          const newOffsets = new Array(len);

          for (let i = 0; i < len; i++) {
            newHeights[i] = heights[i] ?? estimatedItemHeight;
          }

          let sum = 0;
          for (let i = 0; i < len; i++) {
            newOffsets[i] = sum;
            sum += newHeights[i];
          }

          heightsRef.current = newHeights;
          offsetsRef.current = newOffsets;

          // блоки
          const blockCount = Math.ceil(len / BLOCK_SIZE);
          const blockOffsets = new Array(blockCount);
          for (let b = 0; b < blockCount; b++) {
            const start = b * BLOCK_SIZE;
            blockOffsets[b] = newOffsets[start] ?? 0;
          }
          blockOffsetsRef.current = blockOffsets;
        }
      }

      // форсим ререндер, чтобы использовать новые offsets
      setRenderVersion(v => v + 1);
    }, [items.length, isFixed, itemHeight, estimatedItemHeight]);

    const onScroll = useCallback(() => {
      const top = containerRef.current?.scrollTop ?? 0;
      setScrollTop(top);
    }, []);

    // двухуровневый поиск: сначала по блокам, потом внутри блока
    const findStartIndex = useCallback(
      (scrollTopValue: number) => {
        const len = items.length;
        if (len === 0) return 0;

        const offsets = offsetsRef.current;
        const blockOffsets = blockOffsetsRef.current;

        if (isFixed) {
          // fast path
          const idx = Math.floor(scrollTopValue / (itemHeight || estimatedItemHeight));

          return Math.max(0, Math.min(len - 1, idx));
        }

        // 1) бинарный поиск по блокам
        let lowBlock = 0;
        let highBlock = blockOffsets.length - 1;
        while (lowBlock < highBlock) {
          const mid = (lowBlock + highBlock) >> 1;
          if (blockOffsets[mid] < scrollTopValue) lowBlock = mid + 1;
          else highBlock = mid;
        }
        const blockIndex = Math.max(0, lowBlock - 1);
        const start = blockIndex * BLOCK_SIZE;
        const end = Math.min(len - 1, start + BLOCK_SIZE * 2); // небольшой запас

        // 2) линейный поиск внутри блока
        let i = start;
        while (i < end && offsets[i] < scrollTopValue) i++;

        return Math.max(0, Math.min(len - 1, i));
      },
      [items.length, isFixed, itemHeight, estimatedItemHeight],
    );

    const startIndex = useMemo(() => {
      const idx = findStartIndex(scrollTop);

      return Math.max(0, idx - overscan);
    }, [scrollTop, findStartIndex, overscan]);

    const endIndex = useMemo(() => {
      const len = items.length;
      if (len === 0) {
        return -1;
      }

      const offsets = offsetsRef.current;
      if (offsets.length !== items.length) {
        // offsets ещё не инициализированы — пропускаем вычисление
        return -1; // или 0, или -1 — зависит от твоей логики
      }
      const totalVisibleBottom = scrollTop + height;

      let i = startIndex;
      while (i < len && offsets[i] < totalVisibleBottom) i++;

      return Math.min(len - 1, i + overscan);
    }, [scrollTop, height, startIndex, items.length, overscan]);

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

    // chunked rendering: рендерим не сразу весь диапазон, а порциями
    const [chunkEnd, setChunkEnd] = useState(0);

    useLayoutEffect(() => {
      if (endIndex < 0) {
        setChunkEnd(-1);
        return;
      }

      const targetEnd = endIndex;
      const CHUNK_SIZE = 20;

      if (chunkEnd >= targetEnd) return;

      let frameId: number;

      const step = () => {
        setChunkEnd(prev => {
          const next = Math.min(targetEnd, prev + CHUNK_SIZE);
          if (next < targetEnd) {
            frameId = window.requestAnimationFrame(step);
          }
          return next;
        });
      };

      frameId = window.requestAnimationFrame(step);

      return () => {
        window.cancelAnimationFrame(frameId);
      };
    }, [endIndex, chunkEnd]);

    const visibleStart = startIndex;
    const visibleEnd = chunkEnd < 0 ? endIndex : Math.min(endIndex, chunkEnd);

    const totalHeightRef = useRef(0);

    React.useLayoutEffect(() => {
      console.log('INIT EFFECT RUN');
      const len = items.length;
      if (len === 0) {
        totalHeightRef.current = 0;
        return;
      }

      if (isFixed) {
        totalHeightRef.current = len * (itemHeight || estimatedItemHeight);
        return;
      }

      const offsets = offsetsRef.current;
      const heights = heightsRef.current;

      const lastOffset = offsets[len - 1];
      const lastHeight = heights[len - 1];

      if (typeof lastOffset === 'undefined' || typeof lastHeight === 'undefined') {
        return;
      }

      totalHeightRef.current = lastOffset + lastHeight;
    }, [items.length, isFixed, itemHeight, estimatedItemHeight, renderVersion]);

    const totalHeight = totalHeightRef.current;
    const onEndReachedRef = useRef(false);
    const threshold = Math.max(300, height * 1.5);

    useLayoutEffect(() => {
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
    if (renderVersion === 0) {
      return null;
    }

    return (
      <div
        ref={containerRef}
        onScroll={onScroll}
        style={{
          overflowY: 'auto',
          height,
          position: 'relative',
        }}
      >
        <div style={{ height: totalHeight, position: 'relative' }} ref={ref}>
          {visibleEnd >= visibleStart &&
            Array.from({ length: visibleEnd - visibleStart + 1 }).map((_, i) => {
              const index = visibleStart + i;
              const item = items[index];
              const top = offsetsRef.current[index];

              return (
                <MeasuredItem
                  key={index}
                  index={index}
                  top={top}
                  isFixed={isFixed}
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
export default VirtualizedListComponent as <T>(
  props: VirtualizedListComponentProp<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement;
