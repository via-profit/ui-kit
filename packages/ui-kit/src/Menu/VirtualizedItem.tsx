import styled from '@emotion/styled';
import * as React from 'react';

export type VirtualizedItemProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  readonly key: string;
  readonly index: number;
  readonly style: React.CSSProperties;
  readonly setItemHeight: (index: number, height: number) => void;
  readonly isActiveOnScroll: boolean;
  readonly children: VirtualizedItemChildren;
};

export type VirtualizedItemChildren = (params: {
  readonly index: number;
  readonly isActiveOnScroll: boolean;
}) => React.ReactNode;

const StyledVirtualizedItem = styled.div`
  position: absolute;
  width: 100%;
`;

export const VirtualizedItem = React.forwardRef(
  (props: VirtualizedItemProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { children, style, index, setItemHeight, isActiveOnScroll, ...restProps } = props;
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      const observer = new ResizeObserver(entries => {
        for (const entry of entries) {
          const { height } = entry.contentRect;
          if (height) {
            setItemHeight(index, height);
          }
        }
      });

      observer.observe(el);

      return () => observer.disconnect();
    }, [index, setItemHeight]);

    return (
      <StyledVirtualizedItem style={style} {...restProps} ref={ref}>
        <div ref={containerRef}>{children({ index, isActiveOnScroll })}</div>
      </StyledVirtualizedItem>
    );
  },
);

VirtualizedItem.displayName = 'VirtualizedItem';

export default VirtualizedItem;
