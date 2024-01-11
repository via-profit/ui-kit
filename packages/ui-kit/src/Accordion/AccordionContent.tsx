import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type AccordionContentProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly noPadding?: boolean;
  readonly isOpen: boolean;
};

type StyleProps = {
  readonly $noPadding?: boolean;
  readonly $isOpen: boolean;
};

const StyledAccordionContent = styled.div<StyleProps>`
  flex: 1;
  overflow: auto;
  transition: all 0.4s ease-out;
  max-height: ${({ $isOpen }) => (!$isOpen ? '0px' : '90vh')};
  box-sizing: border-box;
  padding: 0 1em;
  overflow: hidden;
`;

const AccordionContent: React.ForwardRefRenderFunction<HTMLDivElement, AccordionContentProps> = (
  props,
  ref,
) => {
  const { children, noPadding, isOpen, ...nativeProps } = props;

  return (
    <StyledAccordionContent $noPadding={noPadding} $isOpen={isOpen} {...nativeProps} ref={ref}>
      {children}
    </StyledAccordionContent>
  );
};

export default React.forwardRef(AccordionContent);
