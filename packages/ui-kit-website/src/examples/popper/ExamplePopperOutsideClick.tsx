import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import Popper from '@via-profit/ui-kit/src/Popper';
import Surface from '@via-profit/ui-kit/src/Surface';
import ClickOutside from '@via-profit/ui-kit/src/ClickOutside';
import styled from '@emotion/styled';
import { FormattedMessage } from 'react-intl';

const StyledAnchorContainer = styled.div`
  width: 22em;
  height: 22em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.backgroundPrimary.toString()};
  border-radius: ${({ theme }) => theme.shape.radiusFactor}em;
`;

const ExamplePopperOutsideClick: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);

  return (
    <StyledAnchorContainer>
      <Button onClick={event => setAnchorElement(anchorElement ? null : event.currentTarget)}>
        <FormattedMessage defaultMessage="Открыть Popper" />
      </Button>

      <ClickOutside mouseEvent="onMouseUp" onOutsideClick={() => setAnchorElement(null)}>
        <Popper anchorPos="auto" anchorElement={anchorElement} isOpen={Boolean(anchorElement)}>
          <Surface>
            <FormattedMessage defaultMessage="Какой-то контент" />
          </Surface>
        </Popper>
      </ClickOutside>
    </StyledAnchorContainer>
  );
};

export default ExamplePopperOutsideClick;
