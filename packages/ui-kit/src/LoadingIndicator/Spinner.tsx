import * as React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = React.HTMLAttributes<HTMLDivElement>;

const spin = keyframes`
    to {
        transform: rotate(360deg);
    }
`;
const SpinLoader = styled.div`
  width: 2em;
  height: 2em;
  border: 0.187em solid ${({ theme }) => theme.color.surface.darken(30).toString()};
  border-top-color: ${({ theme }) => theme.color.accentPrimary.toString()};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export const LoadingIndicator: React.ForwardRefRenderFunction<HTMLDivElement, Props> = (
  props,
  ref,
) => (
  <Container {...props} ref={ref}>
    <SpinLoader />
  </Container>
);

const StaticLoadingIndicatorContainer = styled.span`
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export const StaticLoadingIndicator = React.forwardRef(
  (props: Props, ref: React.ForwardedRef<HTMLDivElement>) => (
    <StaticLoadingIndicatorContainer {...props} ref={ref}>
      <SpinLoader />
    </StaticLoadingIndicatorContainer>
  ),
);

StaticLoadingIndicator.displayName = 'StaticLoadingIndicator';

export default React.forwardRef(LoadingIndicator);
