import React from 'react';
import styled from '@emotion/styled';

export interface PopperContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly zIndex?: number;
  readonly disablePortal?: boolean;
}

type StyleProps = {
  readonly $zIndex?: number;
  readonly $disablePortal?: boolean;
};

const StyledContainer = styled.div<StyleProps>`
  position: fixed;
  z-index: ${({ theme, $zIndex, $disablePortal }) =>
    typeof $zIndex !== 'undefined' ? $zIndex : $disablePortal ? undefined : theme.zIndex.modal};
`;

const PopperContainer: React.ForwardRefRenderFunction<HTMLDivElement, PopperContainerProps> = (
  props,
  ref,
) => {
  const { children, disablePortal, zIndex, ...nativeProps } = props;

  return (
    <StyledContainer $disablePortal={disablePortal} $zIndex={zIndex} {...nativeProps} ref={ref}>
      {children}
    </StyledContainer>
  );
};

export default React.forwardRef(PopperContainer);
