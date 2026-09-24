import * as React from 'react';
import styled from '@emotion/styled';

const Wordmark = styled.span`
  display: inline-flex;
  align-items: baseline;
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: 1.05rem;
  letter-spacing: -0.01em;
  white-space: nowrap;
  color: ${({ theme }) => theme.color.textPrimary.toString()};
`;

const Bracket = styled.span`
  color: ${({ theme }) => theme.color.accentPrimary.toString()};
`;

const BracketClose = styled.span`
  color: ${({ theme }) => theme.color.accentSecondary.toString()};
`;

const Package = styled.span`
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.color.accentPrimary.toString()}, ${theme.color.accentSecondary.toString()})`};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

/**
 * Text logo in the style of a package name: <@via-profit/ui-kit>
 */
const Logo: React.ForwardRefRenderFunction<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>> = (
  props,
  ref,
) => (
  <Wordmark {...props} ref={ref}>
    <Bracket>&lt;</Bracket>
    @via-profit/
    <Package>ui-kit</Package>
    <BracketClose>&gt;</BracketClose>
  </Wordmark>
);

export default React.forwardRef(Logo);
