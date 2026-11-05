import React from 'react';

import BadgeBase, { BadgeBaseProps } from './BadgeBase';

export type BadgeProps = BadgeBaseProps & {
  /**
   * Badge style variant\
   * Allowed variants: `standard`, `outlined` or `soft` (the pale background of the color)\
   * \
   * **Default**: `standard`
   */
  readonly variant?: 'standard' | 'outlined' | 'soft';
};

// One component for all variants, so changing the variant does not remount the badge
const Badge: React.ForwardRefRenderFunction<HTMLSpanElement, BadgeProps> = (
  { variant = 'standard', ...props },
  ref,
) => <BadgeBase {...props} variant={variant} ref={ref} />;

export default React.forwardRef(Badge);
