import * as React from 'react';
import styled from '@emotion/styled';

import { CLASSNAME_PREFIX } from '../constants';

export interface TextFieldContainerProps extends React.InputHTMLAttributes<HTMLDivElement> {
  readonly fullWidth?: boolean;
  readonly focused: boolean;
}

const StyledTextFieldContainer = styled.div<{ $fullWidth?: boolean; $focused?: boolean }>`
  display: inline-flex;
  flex-flow: column;
  width: 100%;
  max-width: ${({ $fullWidth }) => ($fullWidth ? '100%' : '16em')};
`;

const TextFieldContainer: React.ForwardRefRenderFunction<
  HTMLDivElement,
  TextFieldContainerProps
> = (props, ref) => {
  const { children, fullWidth, focused, ...nativeProps } = props;

  return (
    <StyledTextFieldContainer
      {...nativeProps}
      className={`${CLASSNAME_PREFIX} text-field-container ${nativeProps.className || ''}`.trim()}
      $fullWidth={fullWidth}
      $focused={focused}
      ref={ref}
    >
      {children}
    </StyledTextFieldContainer>
  );
};

export default React.forwardRef(TextFieldContainer);
