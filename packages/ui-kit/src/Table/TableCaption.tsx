import React from 'react';
import styled from '@emotion/styled';

export type TableCaptionProps = React.HTMLAttributes<HTMLElement>;

const StyledTableCaption = styled.caption`
  display: table-caption;
  text-align: center;
  padding: 0.26em;
  font-size: 1.2em;
  font-weight: 700;
`;

const TableCaption: React.ForwardRefRenderFunction<HTMLElement, TableCaptionProps> = (
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
