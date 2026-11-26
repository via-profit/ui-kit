import React from 'react';
import styled from '@emotion/styled';
import { themePadding } from '../../ThemeProvider/tokens';

export type ConfirmBoxContentProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Dialog unique ID
   */
  readonly dialogID: string;
};

const StyledConfirmBoxContent = styled.div`
  flex: 1;
  padding: ${({ theme }) => {
    const { y, x } = themePadding(theme, 'container');

    return `${y} ${x}`;
  }};
`;

const ConfirmBoxContent: React.ForwardRefRenderFunction<HTMLDivElement, ConfirmBoxContentProps> = (
  props,
  ref,
) => {
  const { children, dialogID, ...nativeProps } = props;

  return (
    <StyledConfirmBoxContent id={`${dialogID}-description`} {...nativeProps} ref={ref}>
      {children}
    </StyledConfirmBoxContent>
  );
};

export default React.forwardRef(ConfirmBoxContent);
