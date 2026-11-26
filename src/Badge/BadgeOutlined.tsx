import React from 'react';

import Badge from './index';
import type { BadgeBaseProps } from './BadgeBase';

export type BadgeOutlinedProps = BadgeBaseProps;

/**
 * The badge with the `outlined` variant. Prefer `<Badge variant="outlined">`
 */
const BadgeOutlined: React.ForwardRefRenderFunction<HTMLSpanElement, BadgeOutlinedProps> = (
  props,
  ref,
) => <Badge {...props} variant="outlined" ref={ref} />;

export default React.forwardRef(BadgeOutlined);
