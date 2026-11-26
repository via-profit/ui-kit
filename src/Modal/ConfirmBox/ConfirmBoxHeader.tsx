import React from 'react';
import styled from '@emotion/styled';
import { themePadding } from '../../ThemeProvider/tokens';

export type ConfirmBoxHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Dialog unique ID
   */
  readonly dialogID: string;
};

const StyedConfirmBoxHeader = styled.div`
  padding: ${({ theme }) => {
    const { y, x } = themePadding(theme, 'container');

    return `${y} ${x} 0 ${x}`;
  }};
`;

const ConfirmBoxTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
`;

const ConfirmBoxHeader: React.ForwardRefRenderFunction<HTMLDivElement, ConfirmBoxHeaderProps> = (
  props,
  ref,
) => {
  const { children, dialogID, ...nativeProps } = props;

  return (
    <StyedConfirmBoxHeader {...nativeProps} ref={ref}>
      <ConfirmBoxTitle id={`${dialogID}-title`}>{children}</ConfirmBoxTitle>
    </StyedConfirmBoxHeader>
  );
};

export default React.forwardRef(ConfirmBoxHeader);
