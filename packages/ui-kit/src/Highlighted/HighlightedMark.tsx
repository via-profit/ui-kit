import React from 'react';
import styled from '@emotion/styled';

export type HighlightedMarkProps = React.HTMLAttributes<HTMLElement>;

const StyledMark = styled.mark`
  background: none;
  font-weight: 700;
  color: ${({ theme }) =>
    theme.isDark
      ? theme.color.accentPrimary.lighten(10).toString()
      : theme.color.accentPrimary.darken(30).toString()};
`;

const HighlightedMark: React.ForwardRefRenderFunction<HTMLElement, HighlightedMarkProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <StyledMark {...nativeProps} ref={ref}>
      {children}
    </StyledMark>
  );
};

export default React.forwardRef(HighlightedMark);
