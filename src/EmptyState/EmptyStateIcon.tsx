import React from 'react';
import styled from '@emotion/styled';

export type EmptyStateIconProps = React.HTMLAttributes<HTMLSpanElement>;

const StyledIcon = styled.span`
  display: inline-flex;
  margin-bottom: 0.75em;
  font-size: 6em;
  color: ${({ theme }) => theme.color.textPrimary.alpha(0.6).toString()};
`;

const Path = styled.path`
  fill: currentColor;
`;

/**
 * The open empty box. `children` replaces it
 */
const EmptyStateIcon: React.ForwardRefRenderFunction<HTMLSpanElement, EmptyStateIconProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <StyledIcon aria-hidden {...nativeProps} ref={ref}>
      {children ?? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 511.99 511.99"
        >
          <Path d="M446.822 213.631l-190.827-63.256-190.827 63.256L.01 317.129l59.984 19.884V447.02l196 64.97 196-64.97V337.013l59.984-19.884zm-57.5 12.545l-133.327 44.195-133.327-44.195 133.327-44.195zm-343.52 74.527l35.627-56.592 151.67 50.276-35.626 56.591zm44.193 46.255L210.34 386.85l30.655-48.693v137.256l-151-50.054zm181 128.454V338.156l30.655 48.693 120.345-39.892v78.401zm43.522-124.433l-35.626-56.591 151.67-50.276 35.627 56.592zM240.995 0h30v100.174h-30z" />
          <Path d="M122.952 31.63h30v100.174h-30z" transform="rotate(-30 137.947 81.722)" />
          <Path d="M323.951 66.717h100.174v30H323.951z" transform="rotate(-60 374.044 81.724)" />
        </svg>
      )}
    </StyledIcon>
  );
};

export default React.forwardRef(EmptyStateIcon);
