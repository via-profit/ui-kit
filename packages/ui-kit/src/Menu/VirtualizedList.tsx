import * as React from 'react';
import styled from '@emotion/styled';

export type VirtualizedListProps<T> = {
  readonly isOpen: boolean;
  readonly items: readonly T[];
  readonly itemHeight: number;
  readonly height: number;
  readonly children: (params: ChildrenProps<T>) => React.ReactNode;
};

export type ChildrenProps<T> = {
  readonly item: T;
  readonly index: number;
  readonly style: React.CSSProperties;
};

export type VirtualizedListRef = {
  /// ..
};

const VirtualizeListContainer = styled.div<{ $isOpen: boolean }>`
  min-width: 16em;
  padding: 0.4em;
  max-height: 18em;
  transition: opacity 120ms ease-out;
  opacity: ${props => (props.$isOpen ? 1 : 0)};
  background-color: ${({ theme }) => theme.color.surface.toString()};
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  box-shadow: 0 4px 24px ${({ theme }) => theme.color.surface.darken(50).alpha(0.6).toString()};
  &:focus {
    outline-style: solid;
    outline-width: 0.14em;
    outline-color: ${({ theme }) => theme.color.accentPrimary.toString()};
  }
`;
const VirtualizeListWrapper = styled.div``;

const VirtualizeListInner = styled.div``;

export const VirtualizedList = React.forwardRef(
  <T,>(props: VirtualizedListProps<T>, ref: React.ForwardedRef<VirtualizedListRef>) => {
    const { items, itemHeight, height, children, isOpen, ...restProps } = props;

    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const [scrollTop, setScrollTop] = React.useState(0);
    const overscan = 5;

    const totalHeight = items.length * itemHeight;
    const visibleCount = Math.ceil(height / itemHeight) + overscan;

    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 1);
    const endIndex = Math.min(items.length, startIndex + visibleCount);

    const visibleItems = items.slice(startIndex, endIndex);

    const onScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
      setScrollTop(e.currentTarget.scrollTop);
    }, []);

    return (
      <VirtualizeListContainer
        tabIndex={-1}
        {...restProps}
        $isOpen={isOpen}
        ref={containerRef}
        onScroll={onScroll}
        style={{
          height,
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        <VirtualizeListWrapper style={{ height: totalHeight, position: 'relative' }}>
          <VirtualizeListInner
            style={{
              position: 'absolute',
              top: startIndex * itemHeight,
              left: 0,
              right: 0,
            }}
          >
            {visibleItems.map((item, i) =>
              children({
                item,
                index: startIndex + i,
                style: {
                  height: itemHeight,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 8px',
                  boxSizing: 'border-box',
                },
              }),
            )}
          </VirtualizeListInner>
        </VirtualizeListWrapper>
      </VirtualizeListContainer>
    );
  },
);
VirtualizedList.displayName = 'VirtualizedList';

export default VirtualizedList as <T>(
  props: VirtualizedListProps<T> & { ref?: React.Ref<VirtualizedListRef> },
) => JSX.Element;
