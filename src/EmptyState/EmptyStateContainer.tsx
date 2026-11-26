import React from 'react';
import styled from '@emotion/styled';

export type EmptyStateContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly fullHeight: boolean;
};

const StyledContainer = styled.div<{ readonly $fullHeight: boolean }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75em;
  padding: 2em 1em;
  text-align: center;
  height: ${({ $fullHeight }) => ($fullHeight ? '100%' : 'auto')};
`;

const EmptyStateContainer: React.ForwardRefRenderFunction<
  HTMLDivElement,
  EmptyStateContainerProps
> = (props, ref) => {
  const { fullHeight, ...nativeProps } = props;

  return <StyledContainer {...nativeProps} $fullHeight={fullHeight} ref={ref} />;
};

export default React.forwardRef(EmptyStateContainer);
