import React from 'react';
import styled from '@emotion/styled';

export type RadioGroupOrientation = 'vertical' | 'horizontal';

export type RadioGroupItemsProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly orientation?: RadioGroupOrientation;
};

const StyledItems = styled.div<{ $orientation: RadioGroupOrientation }>`
  display: flex;
  flex-direction: ${({ $orientation }) => ($orientation === 'horizontal' ? 'row' : 'column')};
  flex-wrap: wrap;
  align-items: flex-start;
  gap: ${({ $orientation }) => ($orientation === 'horizontal' ? '0.5em 1.5em' : '0.75em')};
`;

const RadioGroupItems: React.ForwardRefRenderFunction<HTMLDivElement, RadioGroupItemsProps> = (
  props,
  ref,
) => {
  const { children, orientation = 'vertical', ...nativeProps } = props;

  return (
    <StyledItems {...nativeProps} $orientation={orientation} ref={ref}>
      {children}
    </StyledItems>
  );
};

export default React.forwardRef(RadioGroupItems);
