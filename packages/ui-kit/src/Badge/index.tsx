import React from 'react';

import BadgeStyled from './BadgeStyled';
import type { BadgeStandardProps } from './BadgeStandard';
import type { BadgeOutlinedProps } from './BadgeOutlined';
import useThemeProps from '../ThemeProvider/useThemeProps';

export type BadgeProps = (BadgeStandardProps | BadgeOutlinedProps) & {
  /**
   * Badge style variant\
   * Allowed variants: `standard` or `outlined`\
   * \
   * **Default**: `standard`
   */
  readonly variant?: 'standard' | 'outlined';
};

// One component for both variants, so changing the variant does not remount the badge
const Badge: React.ForwardRefRenderFunction<HTMLSpanElement, BadgeProps> = (props, ref) => (
  <BadgeStyled {...useThemeProps('Badge', props)} ref={ref} />
);

export default React.forwardRef(Badge);
