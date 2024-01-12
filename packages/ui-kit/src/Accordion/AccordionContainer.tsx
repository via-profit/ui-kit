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
  margin-top: 1px;

  &:has(+ div[class*='StyledAccordionContainer']) {
    border-radius: ${({ theme }) => theme.shape.radiusFactor}em
      ${({ theme }) => theme.shape.radiusFactor}em 0 0;
  }

  & + div[class*='StyledAccordionContainer'] {
    border-radius: 0 0 0 0;
  }
  &:not(:has(+ div[class*='StyledAccordionContainer'])) {
    border-radius: 0 0 ${({ theme }) => theme.shape.radiusFactor}em
      ${({ theme }) => theme.shape.radiusFactor}em;
  }
`;

const AccordionContainer: React.ForwardRefRenderFunction<
  HTMLDivElement,
  AccordionContainerProps
> = (props, ref) => {
  const { inline, children, ...nativeProps } = props;

  return (
    <StyledAccordionContainer $inline={inline} {...nativeProps} ref={ref}>
      {children}
    </StyledAccordionContainer>
  );
};

export default React.forwardRef(AccordionContainer);
