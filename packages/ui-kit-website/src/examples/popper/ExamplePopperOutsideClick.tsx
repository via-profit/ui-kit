import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import Popper from '@via-profit/ui-kit/src/Popper';
import Surface from '@via-profit/ui-kit/src/Surface';
import ClickOutside from '@via-profit/ui-kit/src/ClickOutside';
import { useTheme } from '@emotion/react';
import { FormattedMessage } from 'react-intl';

const ExamplePopperOutsideClick: React.FC = () => {
  const theme = useTheme();
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);

  return (
    <>
      <Button onClick={event => setAnchorElement(anchorElement ? null : event.currentTarget)}>
        <FormattedMessage defaultMessage="Что это?" />
      </Button>

      <ClickOutside ignoreElements={[anchorElement]} onOutsideClick={() => setAnchorElement(null)}>
        <Popper
          anchorElement={anchorElement}
          isOpen={Boolean(anchorElement)}
          anchorPos="right"
          autoFlip
          offset={8}
          zIndex={theme.zIndex.header - 1}
        >
          <Surface>
            <FormattedMessage defaultMessage="Подсказка закроется по клику в любом месте страницы" />
          </Surface>
        </Popper>
      </ClickOutside>
    </>
  );
};

export default ExamplePopperOutsideClick;
