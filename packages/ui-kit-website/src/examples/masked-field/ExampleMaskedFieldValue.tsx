import React from 'react';
import styled from '@emotion/styled';
import Button from '@via-profit/ui-kit/src/Button';
import MaskedField, { Mask } from '@via-profit/ui-kit/src/MaskedField';
import { FormattedMessage } from 'react-intl';

const phoneMask: Mask = [
  '+',
  '7',
  ' ',
  '(',
  /\d/,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
];

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin-top: 1em;
`;

const ExampleMaskedFieldValue: React.FC = () => {
  const [value, setValue] = React.useState('');

  return (
    <>
      <MaskedField
        label={<FormattedMessage defaultMessage="Телефон" />}
        mask={phoneMask}
        value={value}
        onChange={({ text }) => setValue(text)}
      />
      <Buttons>
        <Button onClick={() => setValue('79161234567')}>
          <FormattedMessage defaultMessage="Подставить номер" />
        </Button>
        <Button onClick={() => setValue('')}>
          <FormattedMessage defaultMessage="Очистить" />
        </Button>
      </Buttons>
    </>
  );
};

export default ExampleMaskedFieldValue;
