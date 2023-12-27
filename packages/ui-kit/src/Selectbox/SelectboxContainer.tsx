import React from 'react';
import styled from '@emotion/styled';

export type SelectboxContainerProps = React.HTMLAttributes<HTMLDivElement>;

const StyledSelectboxContainer = styled.div`
  display: inline-flex;
  flex-flow: column;
  vertical-align: top;
`;

const SelectboxContainer: React.ForwardRefRenderFunction<
  HTMLDivElement,
  SelectboxContainerProps
> = (props, ref) => {
  const { children, ...nativeProps } = props;

  return (
    <StyledSelectboxContainer {...nativeProps} ref={ref}>
      {children}
    </StyledSelectboxContainer>
  );
};

export default React.forwardRef(SelectboxContainer);
