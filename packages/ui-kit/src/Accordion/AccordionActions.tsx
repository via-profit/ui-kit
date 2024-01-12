import React from 'react';
import styled from '@emotion/styled';

export type AccordionActionsProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly noPadding?: boolean;
};

type StyleProps = {
  readonly $noPadding?: boolean;
};

const StyledActions = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: ${({ $noPadding }) => ($noPadding ? '0' : '1rem 0')};
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
`;

const AccordionActions: React.ForwardRefRenderFunction<HTMLDivElement, AccordionActionsProps> = (
  props,
  ref,
) => {
  const { children, noPadding, ...nativeProps } = props;

  return (
    <StyledActions {...nativeProps} $noPadding={Boolean(noPadding)} ref={ref}>
      {children}
    </StyledActions>
  );
};

export default React.forwardRef(AccordionActions);
