import styled from '@emotion/styled';
import React from 'react';

import type { ParagraphProps } from '@via-profit/ui-kit/Typography/Paragraph';

type StyledProps = {
  readonly $noMargin?: boolean;
};

const StyledParagraph = styled.p<StyledProps>`
  font-size: 1rem;
  font-weight: 300;
  margin: ${({ $noMargin }) => ($noMargin ? 0 : '0 0 0.8em 0')};
  color: ${({ theme }) => theme.colors.textPrimary.toString()};
`;

const Paragraph: React.ForwardRefRenderFunction<HTMLParagraphElement, ParagraphProps> = (
  props,
  ref,
) => {
  const { noMargin, children, ...restProps } = props;

  return (
    <StyledParagraph {...restProps} ref={ref}>
      {children}
    </StyledParagraph>
  );
};

export default React.forwardRef(Paragraph);
