import React from 'react';
import styled from '@emotion/styled';

export type DelProps = React.DelHTMLAttributes<HTMLModElement>;

const Styled = styled.del`
  font-size: 1em;
  color: currentColor;
`;

const Em: React.ForwardRefRenderFunction<HTMLModElement, DelProps> = (props, ref) => {
  const { children, ...nativeProps } = props;

  return (
    <Styled {...nativeProps} ref={ref}>
      {children}
    </Styled>
  );
};

export default React.forwardRef(Em);
