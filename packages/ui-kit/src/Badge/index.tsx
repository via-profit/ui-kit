import React from 'react';

import BadgeStandard, { BadgeStandardProps } from './BadgeStandard';
import BadgeOutlined, { BadgeOutlinedProps } from './BadgeOutlined';

export type BadgeProps = (BadgeStandardProps | BadgeOutlinedProps) & {
  /**
   * Badge style variant\
   * Allowed variants: `standard` or `outlined`\
   * \
   * **Default**: `standard`
   */
  readonly variant?: 'standard' | 'outlined';
};

const Badge: React.ForwardRefRenderFunction<HTMLSpanElement, BadgeProps> = (props, ref) => {
  const { variant, ...badgeProps } = props;

  if (variant === 'outlined') {
    return <BadgeOutlined {...badgeProps} ref={ref} />;
  }

  return <BadgeStandard {...badgeProps} ref={ref} />;
};

export default React.forwardRef(Badge);
