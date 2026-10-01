import React from 'react';
import Stack from '@via-profit/ui-kit/src/Stack';
import Button from '@via-profit/ui-kit/src/Button';
import Badge from '@via-profit/ui-kit/src/Badge';
import { FormattedMessage, useIntl } from 'react-intl';

const ExampleStackRow: React.FC = () => {
  const intl = useIntl();
  const tags = [
    intl.formatMessage({ defaultMessage: 'Договор' }),
    intl.formatMessage({ defaultMessage: 'Счёт' }),
    intl.formatMessage({ defaultMessage: 'Акт' }),
    intl.formatMessage({ defaultMessage: 'Накладная' }),
    intl.formatMessage({ defaultMessage: 'Доверенность' }),
    intl.formatMessage({ defaultMessage: 'Справка' }),
  ];

  return (
    <Stack gap="lg">
      {/* The toolbar: the title on the left, the actions on the right */}
      <Stack direction="row" justify="space-between" wrap>
        <strong>
          <FormattedMessage defaultMessage="Документы" />
        </strong>
        <Stack direction="row" gap="sm">
          <Button>
            <FormattedMessage defaultMessage="Импорт" />
          </Button>
          <Button color="primary">
            <FormattedMessage defaultMessage="Создать" />
          </Button>
        </Stack>
      </Stack>

      {/* The tags wrap to the next line when they do not fit */}
      <Stack direction="row" gap="sm" wrap>
        {tags.map(tag => (
          <Badge key={tag} variant="outlined">
            {tag}
          </Badge>
        ))}
      </Stack>
    </Stack>
  );
};

export default ExampleStackRow;
