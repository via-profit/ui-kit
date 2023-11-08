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
      <ClickOutside onOutsideClick={() => setAnchorElement(null)}>
        <div>
          <Button onClick={event => setAnchorElement(anchorElement ? null : event.currentTarget)}>
            <FormattedMessage defaultMessage="Открыть/Закрыть Popper" />
          </Button>

          <Popper
            anchorPos="auto"
            disablePortal
            anchorElement={anchorElement}
            isOpen={Boolean(anchorElement)}
          >
            <Surface>
              <FormattedMessage defaultMessage="Какой-то контент" />
            </Surface>
          </Popper>
        </div>
      </ClickOutside>
    </StyledAnchorContainer>
  );
};

export default ExamplePopperOutsideClick;
