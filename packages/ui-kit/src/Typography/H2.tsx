import React from 'react';
import styled from '@emotion/styled';

export type H2Props = React.HTMLAttributes<HTMLHeadingElement>;

const Styled = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color: currentColor;
`;

const H2: React.ForwardRefRenderFunction<HTMLHeadingElement, H2Props> = (props, ref) => {
  const { children, ...nativeProps } = props;

  return (
    <Styled {...nativeProps} ref={ref}>
      {children}
    </Styled>
  );
};

export default React.forwardRef(H2);
