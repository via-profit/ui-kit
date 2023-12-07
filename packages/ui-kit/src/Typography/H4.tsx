import React from 'react';
import styled from '@emotion/styled';

export type H4Props = React.HTMLAttributes<HTMLHeadingElement>;

const Styled = styled.h4`
  font-size: 1.2em;
  font-weight: 500;
  color: currentColor;
`;

const H4: React.ForwardRefRenderFunction<HTMLHeadingElement, H4Props> = (props, ref) => {
  const { children, ...nativeProps } = props;

  return (
    <Styled {...nativeProps} ref={ref}>
      {children}
    </Styled>
  );
};

export default React.forwardRef(H4);
