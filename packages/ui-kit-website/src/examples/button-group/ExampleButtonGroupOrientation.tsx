import React from 'react';
import styled from '@emotion/styled';
import ButtonGroup from '@via-profit/ui-kit/src/ButtonGroup';
import Button from '@via-profit/ui-kit/src/Button';
import { FormattedMessage, useIntl } from 'react-intl';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 2em;
`;

const Sidebar = styled.div`
  width: 14em;
`;

const Wide = styled.div`
  flex: 1;
  min-width: 16em;
`;

const ExampleButtonGroupOrientation: React.FC = () => {
  const intl = useIntl();

  return (
    <Row>
      <Sidebar>
        <ButtonGroup
          orientation="vertical"
          fullWidth
          variant="plain"
          defaultValue="profile"
          aria-label={intl.formatMessage({ defaultMessage: 'Настройки' })}
        >
          <Button value="profile">
            <FormattedMessage defaultMessage="Профиль" />
          </Button>
          <Button value="security">
            <FormattedMessage defaultMessage="Безопасность" />
          </Button>
          <Button value="notifications">
            <FormattedMessage defaultMessage="Уведомления" />
          </Button>
        </ButtonGroup>
      </Sidebar>
      <Wide>
        <ButtonGroup fullWidth defaultValue="card" selectedColor="secondary">
          <Button value="card">
            <FormattedMessage defaultMessage="Картой" />
          </Button>
          <Button value="cash">
            <FormattedMessage defaultMessage="Наличными" />
          </Button>
          <Button value="invoice">
            <FormattedMessage defaultMessage="По счёту" />
          </Button>
        </ButtonGroup>
      </Wide>
    </Row>
  );
};

export default ExampleButtonGroupOrientation;
