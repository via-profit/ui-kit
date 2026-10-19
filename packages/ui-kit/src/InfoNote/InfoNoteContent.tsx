import React from 'react';
import styled from '@emotion/styled';

export type InfoNoteContentProps = React.HTMLAttributes<HTMLDivElement>;

const StyledContent = styled.div`
  flex: 1;
  min-width: 0;
`;

/**
 * The title and the text, to the right of the icon
 */
const InfoNoteContent: React.ForwardRefRenderFunction<HTMLDivElement, InfoNoteContentProps> = (
  props,
  ref,
) => <StyledContent {...props} ref={ref} />;

export default React.forwardRef(InfoNoteContent);
