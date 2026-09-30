import React from 'react';
import styled from '@emotion/styled';
import Checkbox from '@via-profit/ui-kit/src/Checkbox';
import { FormattedMessage } from 'react-intl';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75em;
`;

const ExampleCheckboxBasic: React.FC = () => (
  <Column>
    <Checkbox defaultChecked>
      <FormattedMessage defaultMessage="Запомнить меня" />
    </Checkbox>
    <Checkbox>
      <FormattedMessage defaultMessage="Подписаться на новости" />
    </Checkbox>
    <Checkbox defaultChecked disabled>
      <FormattedMessage defaultMessage="Основные cookie (обязательно)" />
    </Checkbox>
    <Checkbox disabled>
      <FormattedMessage defaultMessage="Недоступно" />
    </Checkbox>
  </Column>
);

export default ExampleCheckboxBasic;
