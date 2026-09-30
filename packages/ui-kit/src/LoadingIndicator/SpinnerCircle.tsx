import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

// The size of the spinner before the `size` property (2em plus the ring), so nothing changes
export const DEFAULT_SIZE = '2.4em';

export const toCssSize = (size: number | string) => (typeof size === 'number' ? `${size}px` : size);

const spin = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

/**
 * The rotating circle shared by <Spinner> and <LoadingOverlay>.
 * A span, so the spinner can be placed inside phrasing content (e.g. a button)
 */
const SpinnerCircle = styled.span<{ readonly $size: string }>`
  display: block;
  box-sizing: border-box;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  /* The ring width follows the size, so the proportions stay the same */
  border: calc(${({ $size }) => $size} * 0.08) solid
    ${({ theme }) => theme.color.surface.darken(30).toString()};
  border-top-color: ${({ theme }) => theme.color.accentPrimary.toString()};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export default SpinnerCircle;
