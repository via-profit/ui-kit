import React from 'react';
import styled from '@emotion/styled';

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
  box-shadow:
    ${({ theme }) =>
        theme.isDark
          ? theme.color.backgroundSecondary.lighten(80).alpha(0.2).toString()
          : theme.color.backgroundSecondary.lighten(50).alpha(0.2).toString()}
      0px 2px 1px -1px,
    ${({ theme }) =>
        theme.isDark
          ? theme.color.backgroundSecondary.lighten(80).alpha(0.14).toString()
          : theme.color.backgroundSecondary.lighten(50).alpha(0.14).toString()}
      0px 1px 1px 0px,
    ${({ theme }) =>
        theme.isDark
          ? theme.color.backgroundSecondary.lighten(80).alpha(0.12).toString()
          : theme.color.backgroundSecondary.lighten(50).alpha(0.12).toString()}
      0px 1px 3px 0px;
  ${({ theme }) => theme.elevation.surface && `box-shadow: ${theme.elevation.surface};`}

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
