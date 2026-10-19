import React from 'react';
import styled from '@emotion/styled';

export type EmptyStateContentProps = React.HTMLAttributes<HTMLDivElement>;

const StyledContent = styled.div`
  max-width: 22em;
  font-size: 0.9em;
  line-height: 1.45;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const EmptyStateContent: React.ForwardRefRenderFunction<HTMLDivElement, EmptyStateContentProps> = (
  props,
  ref,
) => <StyledContent {...props} ref={ref} />;

export default React.forwardRef(EmptyStateContent);
