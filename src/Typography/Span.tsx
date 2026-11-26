import React from 'react';
import styled from '@emotion/styled';

export type SpanProps = React.HTMLAttributes<HTMLSpanElement>;

const Styled = styled.span`
  font-size: 1em;
  color: currentColor;
`;

const Span: React.ForwardRefRenderFunction<HTMLSpanElement, SpanProps> = (props, ref) => {
  const { children, ...nativeProps } = props;

  return (
    <Styled {...nativeProps} ref={ref}>
      {children}
    </Styled>
  );
};

export default React.forwardRef(Span);
