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

  /**
   * Avatar size variant\
   * \
   * **Default**: `2.5em`
   */
  readonly size?: string;
};

//TODO add documentation

const Avatar: React.ForwardRefRenderFunction<HTMLSpanElement, AvatarProps> = (props, ref) => (
  <AvatarStandard {...props} ref={ref} />
);

export default React.forwardRef(Avatar);
