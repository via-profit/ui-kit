import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import Popper, { AnchorPos } from '@via-profit/ui-kit/src/Popper';
import Surface from '@via-profit/ui-kit/src/Surface';
import Strong from '@via-profit/ui-kit/src/Typography/Strong';
import { useTheme } from '@emotion/react';
import { FormattedMessage } from 'react-intl';

const ExamplePopperAutoFlip: React.FC = () => {
  const theme = useTheme();
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);
  const [placement, setPlacement] = React.useState<AnchorPos>('top');

  return (
    <>
      <Button
        color="primary"
        onClick={event => setAnchorElement(anchorElement ? null : event.currentTarget)}
      >
        {anchorElement ? (
          <FormattedMessage defaultMessage="Закрыть Popper" />
        ) : (
          <FormattedMessage defaultMessage="Открыть Popper" />
        )}
      </Button>

      <Popper
        anchorElement={anchorElement}
        isOpen={Boolean(anchorElement)}
        anchorPos="top"
        autoFlip
        offset={8}
        zIndex={theme.zIndex.header - 1}
        onAnchorPosChanged={setPlacement}
      >
        <Surface>
          <FormattedMessage
            defaultMessage="Текущая позиция: {placement}"
            values={{ placement: <Strong>{placement}</Strong> }}
          />
        </Surface>
      </Popper>
    </>
  );
};

export default ExamplePopperAutoFlip;
