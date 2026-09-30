import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import Menu from '@via-profit/ui-kit/src/Menu';
import MenuItem from '@via-profit/ui-kit/src/Menu/MenuItem';
import Paragraph from '@via-profit/ui-kit/src/Typography/Paragraph';
import PlusIcon from '~/components/Icons/PlusOutline';
import CopyIcon from '~/components/Icons/CopyOutline';
import OpenIcon from '~/components/Icons/OpenOutline';
import { FormattedMessage, useIntl } from 'react-intl';

type Action = {
  readonly id: 'create' | 'copy' | 'open';
  readonly label: string;
  readonly icon: React.ReactNode;
};

const ExampleMenuActions: React.FC = () => {
  const intl = useIntl();
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);
  const [lastAction, setLastAction] = React.useState<Action | null>(null);

  const actions: Action[] = React.useMemo(
    () => [
      {
        id: 'create',
        label: intl.formatMessage({ defaultMessage: 'Создать' }),
        icon: <PlusIcon />,
      },
      {
        id: 'copy',
        label: intl.formatMessage({ defaultMessage: 'Копировать' }),
        icon: <CopyIcon />,
      },
      { id: 'open', label: intl.formatMessage({ defaultMessage: 'Открыть' }), icon: <OpenIcon /> },
    ],
    [intl],
  );

  return (
    <>
      <Button onClick={event => setAnchorElement(anchorElement ? null : event.currentTarget)}>
        <FormattedMessage defaultMessage="Действия" />
      </Button>
      <Menu
        anchorElement={anchorElement}
        isOpen={Boolean(anchorElement)}
        anchorPos="bottom-start"
        offset={4}
        value={null}
        items={actions}
        onRequestClose={() => setAnchorElement(null)}
        onSelectItem={action => setLastAction(action)}
      >
        {({ item }, itemProps) => (
          <MenuItem {...itemProps} key={item.id} startIcon={item.icon}>
            {item.label}
          </MenuItem>
        )}
      </Menu>
      <Paragraph>
        {lastAction ? (
          <FormattedMessage
            defaultMessage="Выбрано действие: {label}"
            values={{ label: lastAction.label }}
          />
        ) : (
          <FormattedMessage defaultMessage="Действие не выбрано" />
        )}
      </Paragraph>
    </>
  );
};

export default ExampleMenuActions;
