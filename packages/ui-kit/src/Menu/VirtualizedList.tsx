import * as React from 'react';
import styled from '@emotion/styled';
import { MenuProps, MenuRef } from './MenuContainer';

export type VirtualizedListProps<T> = {
  readonly isOpen: boolean;
  readonly items: readonly T[];
  readonly maxHeight?: number;
  readonly overscan?: number;
  readonly baseItemHeight?: number;
  readonly children: (params: ChildrenProps<T>) => React.ReactNode;
};

export type ChildrenProps<T> = {
  readonly item: T;
  readonly index: number;
  readonly style: React.CSSProperties;
  readonly setItemHeight: (index: number, height: number) => void;
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
    const { items, children, baseItemHeight = 36, maxHeight = 36 * 8, overscan = 5 } = props;
    const [scrollTop, setScrollTop] = React.useState(0);
    const [heights, setHeights] = React.useState<Map<number, number>>(new Map());
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    const setItemHeight = React.useCallback((index: number, h: number) => {
      setHeights(prev => {
        if (prev.get(index) === h) {
          return prev;
        }

        const next = new Map(prev);
        next.set(index, h);

        return next;
      });
    }, []);

    const offsets = React.useMemo(() => {
      const arr: number[] = new Array(items.length);
      let sum = 0;

      for (let i = 0; i < items.length; i++) {
        arr[i] = sum;
        sum += heights.get(i) ?? baseItemHeight;
      }

      // offsetsRef.current = arr;

      return arr;
    }, [items.length, heights, baseItemHeight]);
    const offsetsRef = React.useRef<number[]>([]);

    React.useEffect(() => {
      offsetsRef.current = offsets;
    }, [offsets]);

    const totalHeight =
      offsets[items.length - 1] + (heights.get(items.length - 1) ?? baseItemHeight);

    const findStartIndex = (scrollTop: number) => {
      let low = 0;
      let high = offsets.length - 1;

      while (low <= high) {
        const mid = (low + high) >> 1;
        if (offsets[mid] <= scrollTop) low = mid + 1;
        else high = mid - 1;
      }

      return Math.max(0, low - 1);
    };

    const startIndex = findStartIndex(scrollTop);

    let endIndex = startIndex;
    let acc = offsets[startIndex];

    while (endIndex < items.length && acc < scrollTop + maxHeight) {
      acc += heights.get(endIndex) ?? baseItemHeight;
      endIndex++;
    }

    endIndex = Math.min(endIndex + overscan, items.length);
    const pendingScrollIndex = React.useRef<number | null>(null);

    const visibleItems = items.slice(startIndex, endIndex);
    const scrollToIndex = React.useCallback((index: number) => {
      pendingScrollIndex.current = index;
    }, []);

    React.useEffect(() => {
      if (pendingScrollIndex.current !== null && containerRef.current) {
        const index = pendingScrollIndex.current;
        const top = offsetsRef.current[index] ?? 0;
        containerRef.current.scrollTop = top;
        pendingScrollIndex.current = null;
      }
    }, [offsets]);

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
          <Inner>
            {visibleItems.map((item, i) => {
              const index = startIndex + i;

              return children({
                item,
                index,
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
