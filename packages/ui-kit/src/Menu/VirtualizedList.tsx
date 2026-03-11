import React from 'react';
import AutoHeightWrapper from './AutoHeightWrapper';
import VirtualizedListComponent, {
  VirtualizedListRef,
  VirtualizedRenderItem,
} from './VirtualizedListComponent';

export type ScrollAlign = 'start' | 'center' | 'end' | 'auto';
export * from './VirtualizedListComponent';

export type VirtualizedListProps<T> = {
  readonly items: readonly T[];
  readonly renderItem: VirtualizedRenderItem<T>;

  // динамическая высота
  readonly estimatedItemHeight?: number;

  // фиксированная высота (если задана — включаем fast mode)
  readonly itemHeight?: number;

  readonly overscan?: number;

  readonly scrollToIndex?: number | null;
  readonly scrollToAlign?: ScrollAlign;
  readonly onEndReached?: () => void;
};

const VirtualizedList = React.forwardRef(
  <T,>(props: VirtualizedListProps<T>, ref: React.ForwardedRef<VirtualizedListRef>) => {
    return (
      <AutoHeightWrapper>
        {height =>
          height > 0 && <VirtualizedListComponent {...(props as any)} height={height} ref={ref} />
        }
      </AutoHeightWrapper>
    );
  },
);

VirtualizedList.displayName = 'VirtualizedList';

export default VirtualizedList as <T>(
  props: VirtualizedListProps<T> & { ref?: React.Ref<VirtualizedListRef> },
) => React.ReactElement;
