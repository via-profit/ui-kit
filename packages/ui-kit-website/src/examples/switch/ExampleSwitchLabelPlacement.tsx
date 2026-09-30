import React from 'react';
import styled from '@emotion/styled';
import Switch from '@via-profit/ui-kit/src/Switch';
import { FormattedMessage } from 'react-intl';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1em;
`;

const ExampleSwitchLabelPlacement: React.FC = () => (
  <Row>
    <Switch defaultChecked labelPosition="start">
      <FormattedMessage defaultMessage="Слева" />
    </Switch>
    <Switch defaultChecked labelPosition="end">
      <FormattedMessage defaultMessage="Справа" />
    </Switch>
    <Switch defaultChecked labelPosition="top">
      <FormattedMessage defaultMessage="Сверху" />
    </Switch>
    <Switch defaultChecked labelPosition="bottom">
      <FormattedMessage defaultMessage="Снизу" />
    </Switch>
  </Row>
);

export default ExampleSwitchLabelPlacement;
