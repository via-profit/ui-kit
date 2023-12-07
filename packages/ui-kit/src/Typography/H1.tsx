import React from 'react';
import styled from '@emotion/styled';

export type H1Props = React.HTMLAttributes<HTMLHeadingElement>;

const Styled = styled.h1`
  font-size: 2em;
  font-weight: 700;
  color: currentColor;
`;

const H1: React.ForwardRefRenderFunction<HTMLHeadingElement, H1Props> = (props, ref) => {
  const { children, ...nativeProps } = props;

  return (
    <Styled {...nativeProps} ref={ref}>
      {children}
    </Styled>
  );
};

export default React.forwardRef(H1);
