import React from 'react';
import styled from '@emotion/styled';

export type ConfirmBoxHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Dialog unique ID
   */
  readonly dialogID: string;
};

const StyedConfirmBoxHeader = styled.div`
  padding: 1em 1em 0 1em;
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
