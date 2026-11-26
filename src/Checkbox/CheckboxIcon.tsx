import React from 'react';
import styled from '@emotion/styled';

export type CheckboxIconProps = React.HTMLAttributes<HTMLSpanElement> & {
  readonly checked: boolean;
  readonly indeterminate: boolean;
};

type StyleProps = {
  readonly $visible: boolean;
};

const IconWrapper = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Check = styled.svg<StyleProps>`
  position: absolute;
  font-size: 0.7em;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: scale(${({ $visible }) => ($visible ? 1 : 0.5)});
  transition:
    opacity 150ms ease-out,
    transform 150ms ease-out;
`;

const Dash = styled.span<StyleProps>`
  position: absolute;
  width: 0.6em;
  height: 0.15em;
  border-radius: 0.1em;
  background-color: currentColor;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 150ms ease-out;
`;

/**
 * The check mark or the dash of the indeterminate state.
 * The color is inherited (currentColor)
 */
const CheckboxIcon: React.ForwardRefRenderFunction<HTMLSpanElement, CheckboxIconProps> = (
  props,
  ref,
) => {
  const { checked, indeterminate, ...nativeProps } = props;

  return (
    <IconWrapper aria-hidden {...nativeProps} ref={ref}>
      <Check
        $visible={checked && !indeterminate}
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M500.088 83.681c-15.841-15.862-41.564-15.852-57.426 0L184.205 342.148 69.332 227.276c-15.862-15.862-41.574-15.862-57.436 0-15.862 15.862-15.862 41.574 0 57.436l143.585 143.585c7.926 7.926 18.319 11.899 28.713 11.899 10.394 0 20.797-3.963 28.723-11.899l287.171-287.181c15.862-15.851 15.862-41.574 0-57.435z"
        />
      </Check>
      <Dash $visible={indeterminate} />
    </IconWrapper>
  );
};

export default React.forwardRef(CheckboxIcon);
