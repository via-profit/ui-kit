import React from 'react';

import AvatarStandard, { AvatarStandardProps } from './AvatarStandard';
// import AvatarRounded, { AvatarRoundedProps } from './AvatarRounded';
// import AvatarSquare, { AvatarSquareProps } from './AvatarSquare';

export type AvatarProps = AvatarStandardProps & {
  /**
   * Avatar style variant\
   * Allowed variants: `circular`, 'rounded' or `square`\
   * \
   * **Default**: `circular`
   */
  readonly variant?: 'circular' | 'rounded' | 'square';
};

//TODO add online badge to avatar
//TODO add documentation
//TODO add size customization
//TODO add alt attribute

const Avatar: React.ForwardRefRenderFunction<HTMLSpanElement, AvatarProps> = (props, ref) => (
  <AvatarStandard {...props} ref={ref} />
);

export default React.forwardRef(Avatar);
