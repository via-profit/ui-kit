import * as React from 'react';

export type MeasuredItemProps = {
  readonly index: number;
  readonly top: number;
  readonly isFixed: boolean;
  readonly updateHeight: (index: number, height: number) => void;
  readonly children: React.ReactNode;
};

const MeasuredItem: React.FC<MeasuredItemProps> = props => {
  const { index, top, isFixed, updateHeight, children } = props;
  const ref = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (isFixed) return; // в фиксированном режиме измерять не нужно

    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const h = el.offsetHeight;
      updateHeight(index, h);
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);

    return () => ro.disconnect();
  }, [index, updateHeight, isFixed]);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top,
        width: '100%',
      }}
    >
      {children}
    </div>
  );
};

export default MeasuredItem;
