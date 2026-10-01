import React from 'react';
import styled from '@emotion/styled';
import Button from '@via-profit/ui-kit/src/Button';
import Tooltip from '@via-profit/ui-kit/src/Tooltip';
import { FormattedMessage } from 'react-intl';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`;

const ExampleTooltipDescribe: React.FC = () => (
  <Row>
    <Tooltip
      describeChild
      title={
        <FormattedMessage defaultMessage="Клиент и его сделки будут удалены без возможности восстановления" />
      }
    >
      <Button color="#e0435f" variant="outlined">
        <FormattedMessage defaultMessage="Удалить клиента" />
      </Button>
    </Tooltip>
    <Tooltip
      describeChild
      title={<FormattedMessage defaultMessage="Сначала заполните реквизиты" />}
    >
      {/* The disabled button gets no pointer events: the tooltip is attached to the wrapper */}
      <span tabIndex={0}>
        <Button disabled>
          <FormattedMessage defaultMessage="Выставить счёт" />
        </Button>
      </span>
    </Tooltip>
  </Row>
);

export default ExampleTooltipDescribe;
