import React from 'react';

export type HighlightedTextProps = React.HTMLAttributes<HTMLSpanElement>;

const HighlightedText: React.ForwardRefRenderFunction<HTMLSpanElement, HighlightedTextProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <span {...nativeProps} ref={ref}>
      {children}
    </span>
  );
};

export default React.forwardRef(HighlightedText);
