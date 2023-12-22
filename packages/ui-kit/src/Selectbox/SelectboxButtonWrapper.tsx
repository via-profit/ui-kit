import * as React from 'react';
import styled from '@emotion/styled';

export type SelectboxButtonWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly fullWidth?: boolean;
};

const Wrapper = styled.div<{
  $fullWidth?: boolean;
}>`
  min-width: 16em;
  text-align: left;
  max-width: ${({ $fullWidth }) => ($fullWidth ? '100%' : '16em')};
  display: flex;
  align-items: stretch;
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
`;

const SelectboxButtonWrapper: React.ForwardRefRenderFunction<
  HTMLDivElement,
  SelectboxButtonWrapperProps
> = (props, ref) => {
  const { fullWidth, children, ...nativeProps } = props;

  return (
    <Wrapper {...nativeProps} $fullWidth={Boolean(fullWidth)} ref={ref}>
      {children}
    </Wrapper>
  );
};

export default React.forwardRef(SelectboxButtonWrapper);
