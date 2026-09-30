import React from 'react';
import styled from '@emotion/styled';

export type H6Props = React.HTMLAttributes<HTMLHeadingElement>;

const Styled = styled.h6`
  font-size: 0.9em;
  font-weight: 500;
  color: currentColor;
`;

const H6: React.ForwardRefRenderFunction<HTMLHeadingElement, H6Props> = (props, ref) => {
  const { children, ...nativeProps } = props;

  return (
    <Styled {...nativeProps} ref={ref}>
      {children}
    </Styled>
  );
};

export default React.forwardRef(H6);
