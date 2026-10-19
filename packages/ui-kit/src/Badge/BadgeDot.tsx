import React from 'react';
import styled from '@emotion/styled';

export type BadgeDotProps = React.HTMLAttributes<HTMLSpanElement>;

/**
 * The color of the badge (`--badge-dot-color`), not the color of its text
 */
const StyledDot = styled.span`
  flex: none;
  width: 0.5em;
  height: 0.5em;
  margin-left: 0.55em;
  border-radius: 50%;
  background-color: var(--badge-dot-color, currentColor);
`;

const BadgeDot: React.ForwardRefRenderFunction<HTMLSpanElement, BadgeDotProps> = (props, ref) => (
  <StyledDot aria-hidden {...props} ref={ref} />
);

export default React.forwardRef(BadgeDot);
