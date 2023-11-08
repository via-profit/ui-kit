import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import Popper from '@via-profit/ui-kit/src/Popper';
import Surface from '@via-profit/ui-kit/src/Surface';
import ClickOutside from '@via-profit/ui-kit/src/ClickOutside';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

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
  const { zIndex } = useTheme();

  return (
    <StyledAnchorContainer>
      <ClickOutside onOutsideClick={() => setAnchorElement(null)}>
        <div>
          <Button onClick={event => setAnchorElement(anchorElement ? null : event.currentTarget)}>
            Toggle Popper
          </Button>
          <Popper
            anchorPos="auto"
            anchorElement={anchorElement}
            isOpen={Boolean(anchorElement)}
            zindex={zIndex.header - 1}
          >
            <Surface>Popper content</Surface>
          </Popper>
        </div>
      </ClickOutside>
    </StyledAnchorContainer>
  );
};

export default ExamplePopperOutsideClick;
