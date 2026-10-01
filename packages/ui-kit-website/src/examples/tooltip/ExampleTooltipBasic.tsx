import React from 'react';
import styled from '@emotion/styled';
import Button from '@via-profit/ui-kit/src/Button';
import Tooltip from '@via-profit/ui-kit/src/Tooltip';
import { useIntl } from 'react-intl';

import PlusIcon from '~/components/Icons/PlusOutline';
import CopyIcon from '~/components/Icons/CopyOutline';
import OpenIcon from '~/components/Icons/OpenOutline';

const Row = styled.div`
  display: flex;
  gap: 0.5em;
`;

const ExampleTooltipBasic: React.FC = () => {
  const intl = useIntl();

  return (
    <Row>
      <Tooltip title={intl.formatMessage({ defaultMessage: 'Создать' })}>
        <Button iconOnly variant="outlined">
          <PlusIcon />
        </Button>
      </Tooltip>
      <Tooltip title={intl.formatMessage({ defaultMessage: 'Копировать' })}>
        <Button iconOnly variant="outlined">
          <CopyIcon />
        </Button>
      </Tooltip>
      <Tooltip title={intl.formatMessage({ defaultMessage: 'Открыть в новой вкладке' })}>
        <Button iconOnly variant="outlined">
          <OpenIcon />
        </Button>
      </Tooltip>
    </Row>
  );
};

export default ExampleTooltipBasic;
