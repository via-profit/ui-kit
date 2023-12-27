import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type SelectboxButtonWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly fullWidth?: boolean;
  readonly error?: boolean;
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
  border: 1px solid transparent;

  border: 1px solid;
  outline: 1px solid transparent;

  border-color: ${({ theme }) =>
    theme.isDark
      ? theme.color.textPrimary.darken(100).toString()
      : theme.color.textPrimary.lighten(150).toString()};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  background-color: ${({ theme }) => theme.color.surface.toString()};
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  transition: all 180ms ease-out 0s;

  ${props =>
    props.$error &&
    css`
      border-color: ${props.theme.color.error.toString()};
      color: ${props.theme.color.error.toString()};
      &:focus {
        border-color: ${props.theme.color.error.lighten(0.6).toString()};
      }
    `}
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
