import React from 'react';
import styled from '@emotion/styled';

export type EmProps = React.HTMLAttributes<HTMLElement>;

const Styled = styled.em`
  font-size: 1em;
  color: currentColor;
`;

const Em: React.ForwardRefRenderFunction<HTMLElement, EmProps> = (props, ref) => {
  const { children, ...nativeProps } = props;

  return (
    <Styled {...nativeProps} ref={ref}>
      {children}
    </Styled>
  );
};

export default React.forwardRef(Em);
