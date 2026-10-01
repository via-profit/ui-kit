import React from 'react';
import styled from '@emotion/styled';
import RU from '@via-profit/ui-kit/src/CountryFlags/RU';
import KZ from '@via-profit/ui-kit/src/CountryFlags/KZ';
import BY from '@via-profit/ui-kit/src/CountryFlags/BY';
import { FormattedMessage } from 'react-intl';

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6em;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 0.6em;
`;

const ExampleCountryFlagsBasic: React.FC = () => (
  <List>
    <Item>
      <RU />
      <FormattedMessage defaultMessage="Россия" />
    </Item>
    <Item>
      <KZ />
      <FormattedMessage defaultMessage="Казахстан" />
    </Item>
    <Item>
      <BY />
      <FormattedMessage defaultMessage="Беларусь" />
    </Item>
  </List>
);

export default ExampleCountryFlagsBasic;
