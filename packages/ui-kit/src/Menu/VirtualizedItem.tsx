import styled from '@emotion/styled';
import * as React from 'react';

export type VirtualizedItemProps = {
  readonly index: number;
  readonly style: React.CSSProperties;
  readonly setItemHeight: (index: number, height: number) => void;
  readonly children: React.ReactNode;
};

const StyledItem = styled.div`
  position: absolute;
  width: 100%;
`;

const VirtualizedItem = React.forwardRef(
  (props: VirtualizedItemProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { children, style, index, setItemHeight } = props;
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const [heightCache, setHeightCache] = React.useState<number | null>(null);

    React.useEffect(() => {
      if (containerRef.current) {
        const h = containerRef.current.getBoundingClientRect().height;
        if (h !== heightCache) {
          setItemHeight(index, h);
          setHeightCache(h);
        }
      }
    }, [setItemHeight, index, heightCache]);

    return (
      <StyledItem ref={ref} style={style}>
        <div ref={containerRef}>{children}</div>
      </StyledItem>
    );
  },
);

VirtualizedItem.displayName = 'VirtualizedItem';

export default VirtualizedItem;
