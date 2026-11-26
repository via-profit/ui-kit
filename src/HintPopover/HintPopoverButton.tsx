import React from 'react';
import styled from '@emotion/styled';

export type HintPopoverButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * The color of the text around: the button stands in the text, in the label of a field,
 * in a colored header of the dialog
 */
const StyledButton = styled.button`
  box-sizing: content-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.15em;
  padding: 0.2em;
  border: none;
  border-radius: 50%;
  background: none;
  font: inherit;
  font-size: 1em;
  line-height: 1;
  color: inherit;
  opacity: 0.6;
  cursor: pointer;
  vertical-align: middle;
  transition:
    opacity 120ms ease-out,
    background-color 120ms ease-out;

  &:hover,
  &:focus-visible,
  &[aria-expanded='true'] {
    opacity: 1;
    background-color: color-mix(in srgb, currentColor 15%, transparent);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accentPrimary.toString()};
    outline-offset: 1px;
  }
`;

const Path = styled.path`
  fill: currentColor;
`;

/**
 * «?» in the circle. `children` replaces the icon
 */
const HintPopoverButton: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  HintPopoverButtonProps
> = (props, ref) => {
  const { children, ...nativeProps } = props;

  return (
    <StyledButton type="button" {...nativeProps} ref={ref}>
      {children ?? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <Path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
        </svg>
      )}
    </StyledButton>
  );
};

export default React.forwardRef(HintPopoverButton);
