import React from 'react';

export type HighlightedContainerProps = React.HTMLAttributes<HTMLSpanElement>;

const HighlightedContainer: React.ForwardRefRenderFunction<
  HTMLSpanElement,
  HighlightedContainerProps
> = (props, ref) => {
  const { children, ...nativeProps } = props;

  return (
    <span {...nativeProps} ref={ref}>
      {children}
    </span>
  );
};

export default React.forwardRef(HighlightedContainer);
