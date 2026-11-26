import React from 'react';
import Button from '@via-profit/ui-kit/Button';
import Popper from '@via-profit/ui-kit/Popper';
import Surface from '@via-profit/ui-kit/Surface';
import { useTheme } from '@emotion/react';
import { FormattedMessage } from 'react-intl';

const ExamplePopperOverview: React.FC = () => {
  const theme = useTheme();
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);

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
        anchorPos="bottom-start"
        offset={8}
        zIndex={theme.zIndex.header - 1}
      >
        <Surface>
          <FormattedMessage defaultMessage="Содержимое Popper" />
        </Surface>
      </Popper>
    </>
  );
};

export default ExamplePopperOverview;
