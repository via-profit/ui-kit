import React from 'react';
import styled from '@emotion/styled';

export type PositionStrategy = 'absolute' | 'fixed';

export interface PopperContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly zIndex?: number;
  readonly disablePortal?: boolean;
  readonly positionStrategy?: PositionStrategy;
}

type StyleProps = {
  readonly $zIndex?: number;
  readonly $disablePortal?: boolean;
  readonly $positionStrategy: PositionStrategy;
};

const StyledContainer = styled.div<StyleProps>`
  position: ${({ $positionStrategy }) => $positionStrategy};
  z-index: ${({ theme, $zIndex, $disablePortal }) =>
    typeof $zIndex !== 'undefined' ? $zIndex : $disablePortal ? undefined : theme.zIndex.modal};
`;

const PopperContainer: React.ForwardRefRenderFunction<HTMLDivElement, PopperContainerProps> = (
  props,
  ref,
) => {
  const { children, disablePortal, zIndex, positionStrategy = 'fixed', ...nativeProps } = props;

  return (
    <StyledContainer
      $disablePortal={disablePortal}
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
