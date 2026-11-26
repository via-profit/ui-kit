import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import type { AnchorPos } from '../Popper';

export type TooltipArrowProps = React.HTMLAttributes<HTMLSpanElement> & {
  /**
   * The actual placement of the tooltip: the arrow is drawn on the side facing the anchor
   */
  readonly placement: AnchorPos;
};

const SIZE = 0.45;

const StyledArrow = styled.span<{ $side: string; $align: 'start' | 'end' | 'center' }>`
  position: absolute;
  width: ${SIZE * 2}em;
  height: ${SIZE * 2}em;
  background-color: inherit;
  transform: rotate(45deg);
  pointer-events: none;
  ${({ $side, $align }) => {
    const vertical = $side === 'top' || $side === 'bottom';
    const across = vertical ? 'left' : 'top';
    const alongStart =
      $align === 'start' ? '0.9em' : $align === 'end' ? 'calc(100% - 0.9em)' : '50%';

    return css`
      ${$side === 'top' ? 'bottom' : $side === 'bottom' ? 'top' : $side === 'left' ? 'right' : 'left'}: -${SIZE}em;
      ${across}: ${alongStart};
      margin-${across}: -${SIZE}em;
    `;
  }}
`;

/**
 * Splits the placement like `top-start` into the side and the alignment
 */
const parsePlacement = (
  placement: AnchorPos,
): { side: string; align: 'start' | 'end' | 'center' } => {
  const [side, modifier] = placement.replace(/^auto-?/, '').split('-');
  switch (modifier) {
    case 'start':
    case 'left':
    case 'top':
      return { side: side || 'top', align: 'start' };
    case 'end':
    case 'right':
    case 'bottom':
      return { side: side || 'top', align: 'end' };
    default:
      return { side: side || 'top', align: 'center' };
  }
};

const TooltipArrow: React.ForwardRefRenderFunction<HTMLSpanElement, TooltipArrowProps> = (
  props,
  ref,
) => {
  const { placement, ...nativeProps } = props;
  const { side, align } = parsePlacement(placement);

  return <StyledArrow aria-hidden {...nativeProps} $side={side} $align={align} ref={ref} />;
};

export default React.forwardRef(TooltipArrow);
