import React from 'react';
import styled from '@emotion/styled';

import H2, { H2Props } from './H2';

export type SectionTitleProps = H2Props;

const Title = styled(H2)`
  justify-content: center;
  display: flex;
  text-align: center;
`;

const Inner = styled.span`
  position: relative;

  /* The accent line under the title */
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -0.5em;
    height: 0.12em;
    width: 2.5em;
    border-radius: 0.06em;
    transform: translate(-50%, 0);
    background-color: ${({ theme }) => theme.color.accentPrimary.toString()};
  }
`;

/**
 * The centered H2 with the accent line under the text
 */
const SectionTitle: React.ForwardRefRenderFunction<HTMLHeadingElement, SectionTitleProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <Title {...nativeProps} ref={ref}>
      <Inner>{children}</Inner>
    </Title>
  );
};

export default React.forwardRef(SectionTitle);
