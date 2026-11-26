import React from 'react';
import styled from '@emotion/styled';

export type PaginationIconProps = React.SVGAttributes<SVGSVGElement>;

const Path = styled.path`
  fill: currentColor;
`;

const createIcon = (path: string, displayName: string) => {
  const Icon: React.ForwardRefRenderFunction<SVGSVGElement, PaginationIconProps> = (props, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      aria-hidden
      {...props}
      ref={ref}
    >
      <Path d={path} />
    </svg>
  );
  Icon.displayName = displayName;

  return React.forwardRef(Icon);
};

export const IconPrevious = createIcon(
  'M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z',
  'IconPrevious',
);

export const IconNext = createIcon(
  'M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z',
  'IconNext',
);

export const IconFirst = createIcon(
  'M18.41,16.59L13.82,12L18.41,7.41L17,6L11,12L17,18L18.41,16.59M12.41,16.59L7.82,12L12.41,7.41L11,6L5,12L11,18L12.41,16.59Z',
  'IconFirst',
);

export const IconLast = createIcon(
  'M5.59,7.41L10.18,12L5.59,16.59L7,18L13,12L7,6L5.59,7.41M11.59,7.41L16.18,12L11.59,16.59L13,18L19,12L13,6L11.59,7.41Z',
  'IconLast',
);
