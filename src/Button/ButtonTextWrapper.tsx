import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import type { ButtonContainerProps } from './ButtonContainer';

export type ButtonTextWrapperProps = React.HTMLAttributes<HTMLSpanElement> & {
  /**
   * If true, then expect SVG icon as children. The button will be rendered as icon button
   * Example:
   * ```tsx
   * <Button iconOnly>
   *   <MyIconSVG />
   * </Button>
   * ```
   `
   */
  readonly iconOnly?: ButtonContainerProps['iconOnly'];
};

type StyleProps = {
  readonly iconOnly?: ButtonTextWrapperProps['iconOnly'];
};

const TextWrapper = styled.span<StyleProps>`
  font-size: 0.86em;
  display: flex;
  align-items: center;
  user-select: none;
  ${({ iconOnly }) =>
    iconOnly &&
    css`
      font-size: 1em;
      justify-content: center;
    `}
`;

const ButtonTextWrapper: React.ForwardRefRenderFunction<HTMLSpanElement, ButtonTextWrapperProps> = (
  props,
  ref,
) => {
  const { children, iconOnly, ...nativeProps } = props;

  return (
    <TextWrapper iconOnly={iconOnly} {...nativeProps} ref={ref}>
      {children}
    </TextWrapper>
  );
};

export default React.forwardRef(ButtonTextWrapper);
