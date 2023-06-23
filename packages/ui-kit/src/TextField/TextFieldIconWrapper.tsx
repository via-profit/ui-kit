import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type TextFieldIconWrapperProps = React.InputHTMLAttributes<HTMLDivElement> & {
  /**
   * Icon position
   */
  readonly position: 'start' | 'end';

  readonly error?: boolean;
  readonly focused?: boolean;
};

type StyleProps = {
  readonly $position: TextFieldIconWrapperProps['position'];
  readonly $error?: boolean;
  readonly $focused?: boolean;
};

const IconWrapper = styled.div<StyleProps>`
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $position }) =>
    $position === 'start' &&
    css`
      border-top-left-radius: inherit;
      border-bottom-left-radius: inherit;
    `};
  ${({ $position }) =>
    $position === 'end' &&
    css`
      border-top-right-radius: inherit;
      border-bottom-right-radius: inherit;
    `};
  & > svg {
    margin: 0 1em;
    border-radius: inherit;
  }
  & > button {
    height: 100%;
    padding: 0 1em;
    border-radius: inherit;
    box-shadow: none;
  }
`;

const TextFieldIconWrapper: React.ForwardRefRenderFunction<
  HTMLDivElement,
  TextFieldIconWrapperProps
> = (props, ref) => {
  const { children, position, focused, error, ...nativeProps } = props;

  return (
    <IconWrapper {...nativeProps} $position={position} $error={error} $focused={focused} ref={ref}>
      {children}
    </IconWrapper>
  );
};

export default React.forwardRef(TextFieldIconWrapper);
