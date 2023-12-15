import * as React from 'react';
import styled from '@emotion/styled';

import TextFieldIconWrapper, { TextFieldIconWrapperProps } from '../TextField/TextFieldIconWrapper';

export type TextAreaIconWrapperProps = TextFieldIconWrapperProps;

const StyledTextFieldIconWrapper = styled(TextFieldIconWrapper)`
  align-items: flex-start;
  & > svg {
    margin: 1em;
  }
`;

const TextAreaIconWrapper: React.ForwardRefRenderFunction<
  HTMLDivElement,
  TextAreaIconWrapperProps
> = (props, ref) => {
  const { children, ...restProps } = props;

  return (
    <StyledTextFieldIconWrapper {...restProps} ref={ref}>
      {children}
    </StyledTextFieldIconWrapper>
  );
};

export default React.forwardRef(TextAreaIconWrapper);
