import * as React from 'react';

export type AutoHeightWrapperProps = {
  readonly children: (height: number) => React.ReactNode;
};

const AutoHeightWrapper = (props: AutoHeightWrapperProps) => {
  const { children } = props;
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = React.useState(0);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      setHeight(el.clientHeight);
    });

    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  return (
    <div
      data-virt-elem="AutoHeightWrapper"
      ref={ref}
      style={{ height: '100%', overflow: 'hidden' }}
    >
      {height > 0 && children(height)}
    </div>
  );
};

export default AutoHeightWrapper;
