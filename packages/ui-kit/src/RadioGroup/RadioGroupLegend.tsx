import React from 'react';
import styled from '@emotion/styled';

export type RadioGroupLegendProps = React.HTMLAttributes<HTMLLegendElement>;

const StyledLegend = styled.legend`
  float: left;
  width: 100%;
  padding: 0;
  margin-bottom: 0.25em;
  font-size: 0.86em;
  font-weight: 600;
  color: ${({ theme }) => theme.color.textPrimary.toString()};

  /* The floated legend does not break the flex layout of the fieldset */
  & + * {
    clear: both;
  }
`;

const RadioGroupLegend: React.ForwardRefRenderFunction<HTMLLegendElement, RadioGroupLegendProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <StyledLegend {...nativeProps} ref={ref}>
      {children}
    </StyledLegend>
  );
};

export default React.forwardRef(RadioGroupLegend);
