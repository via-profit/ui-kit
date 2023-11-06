import React from 'react';
import styled from '@emotion/styled';

export type BadgeIconWrapperProps = React.HTMLAttributes<HTMLSpanElement>;

const Wrapper = styled.span`
  display: flex;
  padding: 0.3em 0 0.3em 0.3em;
  align-items: center;
  justify-content: center;
`;

const BadgeIconWrapper: React.ForwardRefRenderFunction<HTMLSpanElement, BadgeIconWrapperProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <Wrapper {...nativeProps} ref={ref}>
      {children}
    </Wrapper>
  );
};

export default React.forwardRef(BadgeIconWrapper);
