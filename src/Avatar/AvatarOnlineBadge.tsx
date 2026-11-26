import React from 'react';
import styled from '@emotion/styled';

export type AvatarOnlineBadgeProps = React.HTMLAttributes<HTMLSpanElement>;

const OnlineBadge = styled.span`
  display: block;
  position: absolute;
  border-radius: 50%;
  bottom: 14%;
  right: 7%;
  width: 0.6em;
  height: 0.6em;
  transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transform: scale(1) translate(50%, 50%);
  transform-origin: 100% 100%;
  background-color: ${({ theme }) => theme.color.success.toString()};
`;

const AvatarOnlineBadge: React.ForwardRefRenderFunction<HTMLSpanElement, AvatarOnlineBadgeProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return <OnlineBadge {...nativeProps} ref={ref} />;
};

export default React.forwardRef(AvatarOnlineBadge);
