import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type TextFieldWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly error?: boolean;
  readonly fullWidth?: boolean;
  readonly readOnly?: boolean;
  readonly focused?: boolean;
};

const Wrapper = styled.div<{
  $error?: boolean;
  $readOnly?: boolean;
  $fullWidth?: boolean;
  $focused?: boolean;
}>`
  display: flex;
  align-items: stretch;
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  border: 1px solid;
  outline: 1px solid transparent;
  border-color: ${({ theme }) =>
    theme.isDark
      ? theme.colors.textPrimary.darken(100).toString()
      : theme.colors.textPrimary.lighten(150).toString()};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  font-size: 0.9em;
  background-color: ${({ theme }) => theme.colors.surface.darken(20).toString()};
  color: ${({ theme }) => theme.colors.textPrimary.toString()};
  transition: all 180ms ease-out 0s;

  ${props =>
    props.$focused &&
    css`
      border-color: ${props.theme.colors.accentPrimary.lighten(10).toString()};
      outline-color: ${props.theme.colors.accentPrimary.lighten(10).toString()};
    `};
  ${props =>
    props.$error &&
    css`
      border-color: ${props.theme.colors.error.toString()};
      color: ${props.theme.colors.error.toString()};
      &:focus {
        border-color: ${props.theme.colors.error.lighten(0.6).toString()};
      }
    `}
`;

const TextFieldWrapper: React.ForwardRefRenderFunction<HTMLDivElement, TextFieldWrapperProps> = (
  props,
  ref,
) => {
  const { focused, error, readOnly, fullWidth, children, ...otherProps } = props;

  return (
    <Wrapper
      $error={error}
      $focused={focused}
      $readOnly={readOnly}
      $fullWidth={Boolean(fullWidth)}
      {...otherProps}
      ref={ref}
    >
      {children}
    </Wrapper>
  );
};

export default React.forwardRef(TextFieldWrapper);
