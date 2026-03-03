import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type SelectboxButtonWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly fullWidth?: boolean;
  readonly error?: boolean;
  readonly isOpen: boolean;
};

const Wrapper = styled.div<{
  $fullWidth?: boolean;
  $error?: boolean;
}>`
  min-width: 16em;
  font-size: 0.9em;
  text-align: left;
  max-width: ${({ $fullWidth }) => ($fullWidth ? '100%' : '16em')};
  display: flex;
  align-items: stretch;
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  outline: 1px solid transparent;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  background-color: ${({ theme }) => theme.color.surface.toString()};
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  transition: all 180ms ease-out 0s;


`;

const SelectboxButtonWrapper: React.ForwardRefRenderFunction<
  HTMLDivElement,
  SelectboxButtonWrapperProps
> = (props, ref) => {
  const { fullWidth, children, error, ...nativeProps } = props;

  return (
    <Wrapper {...nativeProps} $fullWidth={Boolean(fullWidth)} $error={error} ref={ref}>
      {children}
    </Wrapper>
  );
};

export default React.forwardRef(SelectboxButtonWrapper);
