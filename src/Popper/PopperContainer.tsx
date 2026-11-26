import React from 'react';
import styled from '@emotion/styled';

export type PositionStrategy = 'absolute' | 'fixed';

export interface PopperContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly zIndex?: number;
  readonly positionStrategy?: PositionStrategy;
}

type StyleProps = {
  readonly $zIndex?: number;
  readonly $positionStrategy: PositionStrategy;
};

const StyledContainer = styled.div<StyleProps>`
  position: ${({ $positionStrategy }) => $positionStrategy};
  z-index: ${({ theme, $zIndex, $positionStrategy }) => {
    if (typeof $zIndex !== 'undefined') {
      return $zIndex;
    }

    return $positionStrategy === 'fixed' ? theme.zIndex.modal : undefined;
  }};
`;

const PopperContainer: React.ForwardRefRenderFunction<HTMLDivElement, PopperContainerProps> = (
  props,
  ref,
) => {
  const { children, zIndex, positionStrategy = 'fixed', ...nativeProps } = props;

  return (
    <StyledContainer
      $zIndex={zIndex}
      $positionStrategy={positionStrategy}
      {...nativeProps}
      ref={ref}
    >
      {children}
    </StyledContainer>
  );
};

export default React.forwardRef(PopperContainer);
