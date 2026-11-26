import React from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

export type SkeletonVariant = 'text' | 'rect' | 'circle' | 'pill';

export type SkeletonProps = React.HTMLAttributes<HTMLSpanElement> & {
  /**
   * `text` — the line of the text, `rect` — the block (an image, a card), `circle` — an avatar,
   * `pill` — a badge or a status\
   * **Default:** `text`
   */
  readonly variant?: SkeletonVariant;

  /**
   * The CSS width; a number is in `em`\
   * **Default:** `100%`
   */
  readonly width?: number | string;

  /**
   * The CSS height; a number is in `em`\
   * **Default:** by the variant
   */
  readonly height?: number | string;
};

const size = (value: number | string) => (typeof value === 'number' ? `${value}em` : value);

const DEFAULT_HEIGHT: Record<SkeletonVariant, string> = {
  text: '0.8em',
  rect: '3em',
  circle: '2.5em',
  pill: '1.6em',
};

/**
 * The solid shape fades in and out: calmer than the moving gradient and does not depend on the width
 */
const pulse = keyframes`
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
`;

const StyledSkeleton = styled.span<{
  readonly $variant: SkeletonVariant;
  readonly $width: string;
  readonly $height: string;
}>`
  display: block;
  flex-shrink: 0;
  width: ${({ $width }) => $width};
  max-width: 100%;
  height: ${({ $height }) => $height};
  border-radius: ${({ theme, $variant }) =>
    $variant === 'circle' || $variant === 'pill'
      ? '999em'
      : `${theme.shape.radiusFactor * ($variant === 'rect' ? 1.5 : 0.75)}em`};
  background-color: ${({ theme }) => theme.color.textPrimary.alpha(0.08).toString()};
  animation: ${pulse} 1.6s ease-in-out infinite;

  ${({ $variant, $height }) =>
    $variant === 'circle' &&
    css`
      aspect-ratio: 1;
      width: ${$height};
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/**
 * The placeholder of the content which is loaded: the gray shape which fades in and out.
 * Shows the structure of the content instead of the spinner
 */
const Skeleton: React.ForwardRefRenderFunction<HTMLSpanElement, SkeletonProps> = (props, ref) => {
  const { variant = 'text', width = '100%', height, ...nativeProps } = props;

  return (
    <StyledSkeleton
      aria-hidden
      {...nativeProps}
      ref={ref}
      $variant={variant}
      $width={size(width)}
      $height={height !== undefined ? size(height) : DEFAULT_HEIGHT[variant]}
    />
  );
};

export default React.forwardRef(Skeleton);
