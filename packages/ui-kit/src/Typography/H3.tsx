import React from 'react';
import styled from '@emotion/styled';

export type H3Props = React.HTMLAttributes<HTMLHeadingElement>;

const Styled = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  color: currentColor;
`;

const H3: React.ForwardRefRenderFunction<HTMLHeadingElement, H3Props> = (props, ref) => {
  const { children, ...nativeProps } = props;

  return (
    <Styled {...nativeProps} ref={ref}>
      {children}
    </Styled>
  );
};

export default React.forwardRef(H3);
