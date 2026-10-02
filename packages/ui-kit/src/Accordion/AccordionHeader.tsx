import React from 'react';
import styled from '@emotion/styled';

import Chevron from './Chevron';
import { themeFocusRing } from '../ThemeProvider/tokens';

export type AccordionHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly isOpen: boolean;

  /**
   * Toggles the accordion
   */
  readonly onOpen: () => void;

  /**
   * The id of the header button (the content is labelled by it)
   */
  readonly headerID?: string;

  /**
   * The id of the content (the header button controls it)
   */
  readonly contentID?: string;
};

const StyledHeader = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
`;

/**
 * The whole header is the button: it is clickable, focusable and announced as expanded/collapsed
 */
const HeaderButton = styled.button`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin: 0;
  padding: 1rem;
  border: 0;
  border-radius: inherit;
  background: none;
  color: inherit;
  font: inherit;
  text-align: start;
  cursor: pointer;

  &:focus-visible {
    outline: 0.1em solid ${({ theme }) => theme.color.accentPrimary.toString()};
    outline-offset: -0.1em;
  }
  ${({ theme }) => themeFocusRing(theme)}
`;

const HeaderCell = styled.span`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

const StyledChevron = styled(Chevron, { shouldForwardProp: p => p[0] !== '$' })<{
  readonly $isOpen: boolean;
}>`
  flex-shrink: 0;
  color: ${({ theme }) => theme.color.accentSecondary.toString()};
  transform: ${({ $isOpen }) => (!$isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  transition: transform 0.3s ease-out;
`;

const AccordionHeader: React.ForwardRefRenderFunction<HTMLDivElement, AccordionHeaderProps> = (
  props,
  ref,
) => {
  const { children, isOpen, onOpen, headerID, contentID, ...nativeProps } = props;

  return (
    <StyledHeader {...nativeProps} ref={ref}>
      <HeaderButton
        type="button"
        id={headerID}
        aria-expanded={isOpen}
        aria-controls={contentID}
        onClick={() => onOpen()}
      >
        <HeaderCell>{children}</HeaderCell>
        <StyledChevron $isOpen={isOpen} />
      </HeaderButton>
    </StyledHeader>
  );
};

export default React.forwardRef(AccordionHeader);
