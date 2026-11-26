import React from 'react';
import styled from '@emotion/styled';

export type InfoNoteTitleProps = React.HTMLAttributes<HTMLDivElement>;

const StyledTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.15em;
`;

const InfoNoteTitle: React.ForwardRefRenderFunction<HTMLDivElement, InfoNoteTitleProps> = (
  props,
  ref,
) => <StyledTitle {...props} ref={ref} />;

export default React.forwardRef(InfoNoteTitle);
