import React from 'react';
import styled from '@emotion/styled';
import Checkbox from '@via-profit/ui-kit/src/Checkbox';
import { FormattedMessage } from 'react-intl';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5em;
`;

const ExampleCheckboxLabelPlacement: React.FC = () => (
  <Row>
    <Checkbox defaultChecked labelPosition="start">
      <FormattedMessage defaultMessage="Слева" />
    </Checkbox>
    <Checkbox defaultChecked labelPosition="end">
      <FormattedMessage defaultMessage="Справа" />
    </Checkbox>
    <Checkbox defaultChecked labelPosition="top">
      <FormattedMessage defaultMessage="Сверху" />
    </Checkbox>
    <Checkbox defaultChecked labelPosition="bottom">
      <FormattedMessage defaultMessage="Снизу" />
    </Checkbox>
  </Row>
);

export default ExampleCheckboxLabelPlacement;
