import React from 'react';
import styled from '@emotion/styled';

export type AccordionContentProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly noPadding?: boolean;
  readonly isOpen: boolean;
};

type StyleProps = {
  readonly $isOpen: boolean;
};

const StyledAccordionContent = styled.div<StyleProps>`
  flex: 1;
  overflow: auto;
  transition: all 0.3s ease-out;
  max-height: ${({ $isOpen }) => (!$isOpen ? '0px' : '90vh')};
  box-sizing: content-box;
  overflow: hidden;
`;

const Wrapper = styled.div<{ $noPadding: boolean }>`
  padding: ${({ $noPadding }) => ($noPadding ? '0' : '1rem 1rem 0 1rem')};
`;

const AccordionContent: React.ForwardRefRenderFunction<HTMLDivElement, AccordionContentProps> = (
  props,
  ref,
) => {
  const { children, noPadding, isOpen, ...nativeProps } = props;

  return (
    <StyledAccordionContent $isOpen={isOpen} {...nativeProps} ref={ref}>
      <Wrapper $noPadding={Boolean(noPadding)}>{children}</Wrapper>
    </StyledAccordionContent>
  );
};

export default React.forwardRef(AccordionContent);
