import React from 'react';

import BadgeStyled from './BadgeStyled';
import type { BadgeStandardProps } from './BadgeStandard';
import type { BadgeOutlinedProps } from './BadgeOutlined';

export type BadgeProps = (BadgeStandardProps | BadgeOutlinedProps) & {
  /**
   * Badge style variant\
   * Allowed variants: `standard`, `outlined` or `soft` (the pale background of the color)\
   * \
   * **Default**: `standard`
   */
  readonly variant?: 'standard' | 'outlined' | 'soft';
};

// One component for both variants, so changing the variant does not remount the badge
const Badge: React.ForwardRefRenderFunction<HTMLSpanElement, BadgeProps> = (props, ref) => (
  <BadgeStyled {...props} ref={ref} />
);

export default React.forwardRef(Badge);
