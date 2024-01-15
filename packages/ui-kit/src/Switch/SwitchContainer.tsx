import React from 'react';
import styled from '@emotion/styled';

export type SwitchContainerProps = React.HTMLAttributes<HTMLSpanElement> & {
  readonly onChange: () => void;
};

type StyledProps = {
  readonly disabled?: boolean;
};

const StyledSwitch = styled.span<StyledProps>`
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  font-size: 1em;
  padding-right: 1em;
  display: inline-flex;
  align-items: center;
`;

const SwitchContainer: React.ForwardRefRenderFunction<HTMLSpanElement, SwitchContainerProps> = (
  props,
  ref,
) => {
  const { children, onChange, ...nativeProps } = props;

  return (
    <StyledSwitch {...nativeProps} ref={ref} onClick={() => onChange()}>
      {children}
    </StyledSwitch>
  );
};

export default React.forwardRef(SwitchContainer);
