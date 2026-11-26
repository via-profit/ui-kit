import React from 'react';
import styled from '@emotion/styled';

export type EmptyStateActionProps = React.HTMLAttributes<HTMLDivElement>;

const StyledAction = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5em;
  margin-top: 0.5em;
`;

const EmptyStateAction: React.ForwardRefRenderFunction<HTMLDivElement, EmptyStateActionProps> = (
  props,
  ref,
) => <StyledAction {...props} ref={ref} />;

export default React.forwardRef(EmptyStateAction);
