import * as React from 'react';
import styled from '@emotion/styled';

export interface TextFieldContainerProps extends React.InputHTMLAttributes<HTMLDivElement> {
  readonly fullWidth?: boolean;
  readonly focused?: boolean;
  readonly error?: boolean;
}

type StyleProps = {
  readonly $fullWidth?: boolean;
  readonly $focused?: boolean;
  readonly $error?: boolean;
};

const StyledTextFieldContainer = styled.div<StyleProps>`
  display: inline-flex;
  flex-flow: column;
  width: 100%;
  max-width: ${({ $fullWidth }) => ($fullWidth ? '100%' : '16em')};
  vertical-align: top;
`;

const TextFieldContainer: React.ForwardRefRenderFunction<
  HTMLDivElement,
  TextFieldContainerProps
> = (props, ref) => {
  const { children, fullWidth, focused, error, ...nativeProps } = props;

  return (
    <StyledTextFieldContainer
      {...nativeProps}
      $fullWidth={fullWidth}
      $focused={focused}
      $error={error}
      ref={ref}
    >
      {children}
    </StyledTextFieldContainer>
  );
};

export default React.forwardRef(TextFieldContainer);
