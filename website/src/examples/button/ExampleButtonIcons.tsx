import React from 'react';
import styled from '@emotion/styled';
import Button from '@via-profit/ui-kit/Button';
import { FormattedMessage, useIntl } from 'react-intl';

import { PlusIcon, CopyIcon, OpenIcon } from '~/components/Icons';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5em;
`;

const ExampleButtonIcons: React.FC = () => {
  const intl = useIntl();

  return (
    <Row>
      <Button color="primary" startIcon={<PlusIcon />}>
        <FormattedMessage defaultMessage="Создать" />
      </Button>
      <Button variant="outlined" endIcon={<OpenIcon />}>
        <FormattedMessage defaultMessage="Открыть" />
      </Button>
      <Button iconOnly aria-label={intl.formatMessage({ defaultMessage: 'Копировать' })}>
        <CopyIcon />
      </Button>
      <Button
        iconOnly
        variant="plain"
        aria-label={intl.formatMessage({ defaultMessage: 'Копировать' })}
      >
        <CopyIcon />
      </Button>
    </Row>
  );
};

export default ExampleButtonIcons;
