import React from 'react';
import styled from '@emotion/styled';

export type EmptyStateTitleProps = React.HTMLAttributes<HTMLDivElement>;

const StyledTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.color.textPrimary.toString()};
`;

const EmptyStateTitle: React.ForwardRefRenderFunction<HTMLDivElement, EmptyStateTitleProps> = (
  props,
  ref,
) => <StyledTitle {...props} ref={ref} />;

export default React.forwardRef(EmptyStateTitle);
