import React from 'react';

import BadgeStyled from './BadgeStyled';
import type { BadgeBaseProps } from './BadgeBase';

export type BadgeStandardProps = BadgeBaseProps;

/**
 * The badge with the `standard` variant. Prefer `<Badge variant="standard">`
 */
const BadgeStandard: React.ForwardRefRenderFunction<HTMLSpanElement, BadgeStandardProps> = (
  props,
  ref,
) => <BadgeStyled {...props} variant="standard" ref={ref} />;

export default React.forwardRef(BadgeStandard);
