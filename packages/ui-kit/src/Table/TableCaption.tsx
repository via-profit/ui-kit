import React from 'react';
import styled from '@emotion/styled';

export type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>;

const StyledTableCaption = styled.caption`
  text-align: start;
  padding: 0.8em;
  font-size: 1.2em;
  font-weight: 700;
`;

const TableCaption: React.ForwardRefRenderFunction<HTMLTableCaptionElement, TableCaptionProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <StyledTableCaption {...nativeProps} ref={ref}>
      {children}
    </StyledTableCaption>
  );
};

export default React.forwardRef(TableCaption);
