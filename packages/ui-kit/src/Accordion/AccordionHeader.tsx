import React from 'react';
import styled from '@emotion/styled';
import Button from '../Button';
import Chevron from './Chevron';

export type AccordionHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly isOpen: boolean;
  readonly onOpen: () => void;
};

const StyledHeader = styled.div`
  padding: 1rem 1rem 1rem 1rem;
  font-size: 1.3rem;
  font-weight: 600;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  display: flex;
  cursor: pointer;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`;

type StyledIconProps = {
  readonly $isOpen: boolean;
};

const StyledChevron = styled(Chevron, { shouldForwardProp: p => p[0] !== '$' })<StyledIconProps>`
  transform: ${({ $isOpen }) => (!$isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  transition: all 0.3s ease-out;
`;

const StyledButton = styled(Button)`
  width: 1rem;
  height: 1rem;
`;

const HeaderCell = styled.div`
  flex: 1;
`;

const Actions = styled.div``;

const AccordionHeader: React.ForwardRefRenderFunction<HTMLDivElement, AccordionHeaderProps> = (
  props,
  ref,
) => {
  const { children, isOpen, onOpen, ...nativeProps } = props;

  return (
    <StyledHeader {...nativeProps} ref={ref} onClick={() => onOpen()}>
      <HeaderCell>{children}</HeaderCell>
      <Actions>
        <StyledButton iconOnly onClick={() => onOpen()}>
          <StyledChevron $isOpen={isOpen} />
        </StyledButton>
      </Actions>
    </StyledHeader>
  );
};

export default React.forwardRef(AccordionHeader);
