import React from 'react';
import styled from '@emotion/styled';

export type H5Props = React.HTMLAttributes<HTMLHeadingElement>;

const Styled = styled.h5`
  font-size: 1.2em;
  font-weight: 300;
  color: currentColor;
`;

const H5: React.ForwardRefRenderFunction<HTMLHeadingElement, H5Props> = (props, ref) => {
  const { children, ...nativeProps } = props;

  return (
    <Styled {...nativeProps} ref={ref}>
      {children}
    </Styled>
  );
};

export default React.forwardRef(H5);
