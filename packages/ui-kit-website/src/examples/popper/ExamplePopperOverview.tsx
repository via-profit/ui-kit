import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import Popper from '@via-profit/ui-kit/src/Popper';
import Surface from '@via-profit/ui-kit/src/Surface';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
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

const ExampleMenuAnchorPos: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);
  const { zIndex } = useTheme();

  return (
    <>
      <StyledAnchorContainer>
        <Button
          color="primary"
          onClick={event => setAnchorElement(anchorElement ? null : event.currentTarget)}
        >
          {anchorElement ? (
            <FormattedMessage defaultMessage="Скрыть" />
          ) : (
            <FormattedMessage defaultMessage="Показать" />
          )}
        </Button>
        <Popper
          anchorElement={anchorElement}
          anchorPos="bottom"
          isOpen={Boolean(anchorElement)}
          zIndex={zIndex.header - 1}
        >
          <Surface>
            <FormattedMessage defaultMessage="Какой-либо контент" />
          </Surface>
        </Popper>
      </StyledAnchorContainer>
    </>
  );
};

export default ExampleMenuAnchorPos;
