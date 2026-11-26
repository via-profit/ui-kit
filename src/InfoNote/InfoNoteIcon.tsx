import React from 'react';
import styled from '@emotion/styled';

import type { InfoNoteVariant } from './index';
import { variantColor } from './InfoNoteContainer';

export type InfoNoteIconProps = React.HTMLAttributes<HTMLSpanElement> & {
  readonly variant: InfoNoteVariant;
};

const StyledIcon = styled.span<{ readonly $variant: InfoNoteVariant }>`
  flex: none;
  display: inline-flex;
  font-size: 1.15em;
  color: ${({ theme, $variant }) => variantColor(theme, $variant).toString()};
`;

const Path = styled.path`
  fill: currentColor;
`;

/**
 * The paths of the default icons, 24×24: the circle with «i», the check, the triangle with «!»
 * and the circle with «!»
 */
const PATHS: Record<InfoNoteVariant, string> = {
  info: 'M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
  success:
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z',
  warning: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
  error:
    'M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z',
};

/**
 * The icon of the variant. `children` replaces the default icon
 */
const InfoNoteIcon: React.ForwardRefRenderFunction<HTMLSpanElement, InfoNoteIconProps> = (
  props,
  ref,
) => {
  const { variant, children, ...nativeProps } = props;

  return (
    <StyledIcon {...nativeProps} $variant={variant} aria-hidden ref={ref}>
      {children ?? (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <Path d={PATHS[variant]} />
        </svg>
      )}
    </StyledIcon>
  );
};

export default React.forwardRef(InfoNoteIcon);
