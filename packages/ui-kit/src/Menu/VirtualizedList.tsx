import React from 'react';
import AutoHeightWrapper from './AutoHeightWrapper';
import VirtualizedListComponent, { VirtualizedRenderItem } from './VirtualizedListComponent';

type ScrollAlign = 'start' | 'center' | 'end' | 'auto';

type VirtualizedListProps<T> = {
  readonly items: readonly T[];
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

const VirtualizedList = React.forwardRef(
  <T,>(props: VirtualizedListProps<T>, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <AutoHeightWrapper>
        {height => height > 0 && <VirtualizedListComponent {...props} height={height} ref={ref} />}
      </AutoHeightWrapper>
    );
  },
);

VirtualizedList.displayName = 'VirtualizedList';

export default VirtualizedList as <T>(
  props: VirtualizedListProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement;
