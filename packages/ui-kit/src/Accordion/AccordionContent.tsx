import React from 'react';
import styled from '@emotion/styled';

export type AccordionContentProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly noPadding?: boolean;
  readonly isOpen: boolean;
};

type StyleProps = {
  readonly $isOpen: boolean;
};

/**
 * Animates the height with grid rows 0fr -> 1fr: no fixed max-height, so the tall content is not cut.
 * `visibility: hidden` of the collapsed content removes it from the tab order and the accessibility tree
 */
const StyledAccordionContent = styled.div<StyleProps>`
  display: grid;
  grid-template-rows: ${({ $isOpen }) => ($isOpen ? '1fr' : '0fr')};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition:
    grid-template-rows 0.3s ease-out,
    visibility 0s linear ${({ $isOpen }) => ($isOpen ? '0s' : '0.3s')};
`;

const Clip = styled.div`
  min-height: 0;
  overflow: hidden;
`;

const Wrapper = styled.div<{ $noPadding: boolean }>`
  padding: ${({ $noPadding }) => ($noPadding ? '0' : '1rem')};
`;

const AccordionContent: React.ForwardRefRenderFunction<HTMLDivElement, AccordionContentProps> = (
  props,
  ref,
) => {
  const { children, noPadding, isOpen, ...nativeProps } = props;

  return (
    <StyledAccordionContent role="region" {...nativeProps} $isOpen={isOpen} ref={ref}>
      <Clip>
        <Wrapper $noPadding={Boolean(noPadding)}>{children}</Wrapper>
      </Clip>
    </StyledAccordionContent>
  );
};

export default React.forwardRef(AccordionContent);
