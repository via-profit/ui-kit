import React from 'react';
import styled from '@emotion/styled';
import Selectbox, { SelectboxItem, SelectboxOverrides } from '@via-profit/ui-kit/src/Selectbox';
import { FormattedMessage, useIntl } from 'react-intl';

import countries from './countries.json';

type Item = {
  readonly code: string;
  readonly name: string;
};

const Arrow = styled.span<{ $isOpen: boolean }>`
  display: inline-block;
  font-size: 0.8em;
  transition: transform 120ms ease-out;
  transform: rotate(${({ $isOpen }) => ($isOpen ? 180 : 0)}deg);
`;

// Defined once at module level: a component created during the render would be remounted
// on every render, and the button would lose the focus
const Icon: NonNullable<SelectboxOverrides['Icon']> = ({ isOpen }) => (
  <Arrow $isOpen={isOpen}>▼</Arrow>
);

const overrides = { Icon };

const ExampleSelectboxOverrides: React.FC = () => {
  const intl = useIntl();
  const [value, setValue] = React.useState<Item | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Selectbox
      label={<FormattedMessage defaultMessage="Страна" />}
      notSetLabel={intl.formatMessage({ defaultMessage: 'Не выбрано' })}
      overrides={overrides}
      value={value}
      items={countries}
      isOpen={isOpen}
      onRequestOpen={() => setIsOpen(true)}
      onRequestClose={() => setIsOpen(false)}
      onChange={item => setValue(item)}
      getOptionSelected={({ item, value }) => item.code === value.code}
      selectedItemToString={item => item.name}
    >
      {({ item }, itemProps) => (
        <SelectboxItem {...itemProps} key={item.code}>
          {item.name}
        </SelectboxItem>
      )}
    </Selectbox>
  );
};

export default ExampleSelectboxOverrides;
