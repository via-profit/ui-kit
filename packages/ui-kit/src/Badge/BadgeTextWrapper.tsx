import React from 'react';
import styled from '@emotion/styled';

export type BadgeTextWrapperProps = React.HTMLAttributes<HTMLSpanElement>;

const TextWrapper = styled.span`
  font-size: 0.86em;
  padding: 0.3em 0.5em;
  display: flex;
  align-items: center;
  user-select: none;
`;

const BadgeTextWrapper: React.ForwardRefRenderFunction<HTMLSpanElement, BadgeTextWrapperProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <TextWrapper {...nativeProps} ref={ref}>
      {children}
    </TextWrapper>
  );
};

export default React.forwardRef(BadgeTextWrapper);
