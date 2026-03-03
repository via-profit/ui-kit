import * as React from 'react';
import styled from '@emotion/styled';

export type VirtualizedListProps<T> = {
  readonly items: readonly T[];
  readonly maxHeight?: number;
  readonly overscan?: number;
  readonly baseItemHeight?: number;
  readonly children: (params: ChildrenProps<T>) => React.ReactNode;
  readonly initialIndex?: number;
  readonly cacheSize?: number;
};

export type ChildrenProps<T> = {
  readonly item: T;
  readonly index: number;
  readonly style: React.CSSProperties;
  readonly setItemHeight: (index: number, height: number) => void;
  readonly itemRef: (el: HTMLElement | null) => void;
};

const Container = styled.div<{ $maxHeight: number }>`
  width: 100%;
  max-height: ${({ $maxHeight }) => $maxHeight}px;
  overflow-y: auto;
  position: relative;
`;

const Wrapper = styled.div`
  position: relative;
`;

const Inner = styled.div`
  position: absolute;
  left: 0;
  right: 0;
`;

export type VirtualizedListRef = {
  readonly scrollToIndex: (index: number) => void;
};

const VirtualizedList = React.forwardRef(
  <T,>(props: VirtualizedListProps<T>, ref: React.ForwardedRef<VirtualizedListRef>) => {
    const {
      items,
      children,
      baseItemHeight = 34.78,
      maxHeight = 36 * 8,
      overscan = 5,
      cacheSize = 60,
      initialIndex,
    } = props;
    const [scrollTop, setScrollTop] = React.useState(0);
    const [heights, setHeights] = React.useState<Map<number, number>>(new Map());
    const offsetsRef = React.useRef<number[]>([]);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const innerRef = React.useRef<HTMLDivElement | null>(null);
    const itemRefs = React.useRef<(HTMLElement | null)[]>([]);
    const visibleRangeRef = React.useRef({ start: 0, end: 0 });

    /**
     * Clear heightcache
     */
    React.useEffect(() => {
      setHeights(new Map());
    }, [items]);

    /**
     * Items height cache
     */
    const setItemHeight = React.useCallback(
      (index: number, h: number) => {
        setHeights(prev => {
          if (prev.get(index) === h) {
            return prev;
          }

          const next = new Map(prev);
          next.set(index, h);

          // over `cacheSize` item heights will be cleared
          const { start, end } = visibleRangeRef.current;

          for (const key of next.keys()) {
            if (typeof key === 'number' && (key < start - cacheSize || key > end + cacheSize)) {
              next.delete(key);
            }
          }

          return next;
        });
      },
      [cacheSize],
    );

    /**
     * Calculate offsets
     */
    const offsets = React.useMemo(() => {
      const arr: number[] = new Array(items.length);
      let sum = 0;

      for (let i = 0; i < items.length; i++) {
        arr[i] = sum;
        sum += heights.get(i) ?? baseItemHeight;
      }

      offsetsRef.current = arr;
      // offsetsRef.current = arr;

      return arr;
    }, [items.length, heights, baseItemHeight]);

    /**
     * Offsets cache
     */
    React.useEffect(() => {
      offsetsRef.current = offsets;
    }, [offsets]);

    /**
     * Calculate full list height
     */
    const totalHeight = React.useMemo(
      () => offsets[items.length - 1] + (heights.get(items.length - 1) ?? baseItemHeight),
      [baseItemHeight, heights, items.length, offsets],
    );

    const findStartIndex = React.useCallback(
      (scrollTop: number) => {
        let low = 0;
        let high = offsets.length - 1;

        while (low <= high) {
          const mid = (low + high) >> 1;
          if (offsets[mid] <= scrollTop) low = mid + 1;
          else high = mid - 1;
        }

        return Math.max(0, low - 1);
      },
      [offsets],
    );

    const startIndex = React.useMemo(() => findStartIndex(scrollTop), [findStartIndex, scrollTop]);
    const endIndex = React.useMemo(() => {
      let acc = offsets[startIndex];
      let end = startIndex;

      while (end < items.length && acc < scrollTop + maxHeight) {
        acc += heights.get(end) ?? baseItemHeight;
        end++;
      }

      return Math.min(end + overscan, items.length);
    }, [
      startIndex,
      offsets,
      scrollTop,
      maxHeight,
      heights,
      baseItemHeight,
      items.length,
      overscan,
    ]);

    const pendingScrollIndex = React.useRef<number | null>(null);

    const visibleItems = React.useMemo(() => {
      itemRefs.current = [];

      return items.slice(startIndex, endIndex);
    }, [endIndex, items, startIndex]);

    React.useEffect(() => {
      if (pendingScrollIndex.current !== null && containerRef.current) {
        const index = pendingScrollIndex.current;
        containerRef.current.scrollTop = offsetsRef.current[index] ?? 0;
        pendingScrollIndex.current = null;
      }
    }, [offsets]);

    React.useEffect(() => {
      const index = pendingScrollIndex.current;
      if (index == null) {
        return;
      }

      const el = itemRefs.current[index];
      if (el) {
        el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        pendingScrollIndex.current = null;
      }
    }, [visibleItems]);

    const setItemRef = React.useCallback(
      (index: number) => (el: HTMLElement | null) => {
        itemRefs.current[index] = el;
      },
      [],
    );

    const scrollToIndex = React.useCallback((index: number) => {
      const el = itemRefs.current[index];

      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        });

        return;
      }

      // scroll container by offsets
      if (containerRef.current) {
        containerRef.current.scrollTop = offsetsRef.current[index] ?? 0;
      }

      // Pending while element are shown
      pendingScrollIndex.current = index;
    }, []);

    /**
     * Scroll to initial index
     */
    React.useEffect(() => {
      if (typeof initialIndex === 'number' && initialIndex >= 0) {
        pendingScrollIndex.current = initialIndex;
      }
    }, [initialIndex]);

    /**
     * Save visible range
     */
    React.useEffect(() => {
      visibleRangeRef.current = { start: startIndex, end: endIndex };
    }, [startIndex, endIndex]);

    React.useImperativeHandle(
      ref,
      () => ({
        scrollToIndex,
      }),
      [scrollToIndex],
    );

    return (
      <Container
        $maxHeight={maxHeight}
        onScroll={e => setScrollTop(e.currentTarget.scrollTop)}
        ref={containerRef}
      >
        <Wrapper style={{ height: totalHeight }}>
          <Inner ref={innerRef}>
            {visibleItems.map((item, i) => {
              const index = startIndex + i;

              return children({
                item,
                index,
                itemRef: setItemRef(index),
                setItemHeight,
                style: {
                  position: 'absolute',
                  top: offsets[index],
                  height: heights.get(index) ?? baseItemHeight,
                  width: '100%',
                },
              });
            })}
          </Inner>
        </Wrapper>
      </Container>
    );
  },
);

VirtualizedList.displayName = 'VirtualizedList';

export default VirtualizedList as <T>(
  props: VirtualizedListProps<T> & { ref?: React.Ref<VirtualizedListRef> },
) => JSX.Element;
