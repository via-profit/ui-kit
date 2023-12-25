import React from 'react';

export type SelectboxContainerProps = React.HTMLAttributes<HTMLDivElement>;

const SelectboxContainer: React.ForwardRefRenderFunction<
  HTMLDivElement,
  SelectboxContainerProps
> = (props, ref) => {
  const { children, ...nativeProps } = props;

  return (
    <div {...nativeProps} ref={ref}>
      {children}
    </div>
  );
};

export default React.forwardRef(SelectboxContainer);
