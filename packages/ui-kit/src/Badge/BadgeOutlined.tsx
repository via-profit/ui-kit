import React from 'react';

import BadgeStyled from './BadgeStyled';
import type { BadgeBaseProps } from './BadgeBase';

export type BadgeOutlinedProps = BadgeBaseProps;

/**
 * The badge with the `outlined` variant. Prefer `<Badge variant="outlined">`
 */
const BadgeOutlined: React.ForwardRefRenderFunction<HTMLSpanElement, BadgeOutlinedProps> = (
  props,
  ref,
) => <BadgeStyled {...props} variant="outlined" ref={ref} />;

export default React.forwardRef(BadgeOutlined);
