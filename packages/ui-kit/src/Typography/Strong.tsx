import React from 'react';
import styled from '@emotion/styled';

export type StrongProps = React.HTMLAttributes<HTMLElement>;

const Styled = styled.strong`
  font-size: 1em;
  color: currentColor;
`;

const Strong: React.ForwardRefRenderFunction<HTMLElement, StrongProps> = (props, ref) => {
  const { children, ...nativeProps } = props;

  return (
    <Styled {...nativeProps} ref={ref}>
      {children}
    </Styled>
  );
};

export default React.forwardRef(Strong);
