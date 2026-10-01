import React from 'react';
import styled from '@emotion/styled';

export type RadioGroupContainerProps = React.FieldsetHTMLAttributes<HTMLFieldSetElement>;

/**
 * `<fieldset>`: the legend names the group, `disabled` disables all the radio buttons inside
 */
const StyledContainer = styled.fieldset`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5em;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
`;

const RadioGroupContainer: React.ForwardRefRenderFunction<
  HTMLFieldSetElement,
  RadioGroupContainerProps
> = (props, ref) => {
  const { children, ...nativeProps } = props;

  return (
    <StyledContainer {...nativeProps} ref={ref}>
      {children}
    </StyledContainer>
  );
};

export default React.forwardRef(RadioGroupContainer);
