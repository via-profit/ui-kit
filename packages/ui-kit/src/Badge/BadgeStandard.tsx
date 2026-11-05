import React from 'react';

import Badge from './index';
import type { BadgeBaseProps } from './BadgeBase';

export type BadgeStandardProps = BadgeBaseProps;

/**
 * The badge with the `standard` variant. Prefer `<Badge variant="standard">`
 */
const BadgeStandard: React.ForwardRefRenderFunction<HTMLSpanElement, BadgeStandardProps> = (
  props,
  ref,
) => <Badge {...props} variant="standard" ref={ref} />;

export default React.forwardRef(BadgeStandard);
