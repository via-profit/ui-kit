import React from 'react';
import styled from '@emotion/styled';

export type BadgeTextWrapperProps = React.HTMLAttributes<HTMLSpanElement>;

const TextWrapper = styled.span`
  font-size: 0.86em;
  /* the badge is about the height of the line of the text around it, not taller */
  line-height: 1.35;
  padding: 0.15em 0.5em;
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
