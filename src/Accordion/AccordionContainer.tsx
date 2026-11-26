import React from 'react';
import styled from '@emotion/styled';
import { elevation } from '../ThemeProvider/tokens';

export type AccordionContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly inline?: boolean;
};

type StyledProps = {
  readonly $inline?: boolean;
};

const StyledAccordionContainer = styled.div<StyledProps>`
  display: ${({ $inline }) => ($inline ? 'inline-flex' : 'flex')};
  box-sizing: border-box;
  flex-direction: column;
  background: ${({ theme }) => theme.color.surface.toString()};
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  border-radius: ${({ theme }) => theme.shape.radiusFactor}em;
  font-size: 1em;
  position: relative;
  margin-top: 1px;
  box-shadow: ${({ theme }) => elevation(theme, 'surface')};

  /*
   * Adjacent accordions form a group: the inner corners are square.
   * Data attributes, not class names: emotion labels are absent in the published package
   */
  &:has(+ [data-accordion]) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  [data-accordion] + & {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;

const AccordionContainer: React.ForwardRefRenderFunction<
  HTMLDivElement,
  AccordionContainerProps
> = (props, ref) => {
  const { inline, children, ...nativeProps } = props;

  return (
    <StyledAccordionContainer data-accordion="" $inline={inline} {...nativeProps} ref={ref}>
      {children}
    </StyledAccordionContainer>
  );
};

export default React.forwardRef(AccordionContainer);
