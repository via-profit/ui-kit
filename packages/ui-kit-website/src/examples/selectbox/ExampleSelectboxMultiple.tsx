import React from 'react';
import styled from '@emotion/styled';
import Selectbox, { SelectboxItem } from '@via-profit/ui-kit/src/Selectbox';
import Badge from '@via-profit/ui-kit/src/Badge';
import { FormattedMessage, useIntl } from 'react-intl';

import countries from './countries.json';

type Item = {
  readonly code: string;
  readonly name: string;
};

const Badges = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3em;
`;

const ExampleSelectboxMultiple: React.FC = () => {
  const intl = useIntl();
  const [value, setValue] = React.useState<readonly Item[]>(
    countries.filter(country => ['BR', 'RU', 'IN'].includes(country.code)),
  );
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Selectbox
      label={<FormattedMessage defaultMessage="Страны" />}
      notSetLabel={intl.formatMessage({ defaultMessage: 'Не выбрано' })}
      multiple
      fullWidth
      value={value}
      items={countries}
      isOpen={isOpen}
      onRequestOpen={() => setIsOpen(true)}
      onRequestClose={() => setIsOpen(false)}
      onChange={items => setValue(items)}
      getOptionSelected={({ item, value }) => item.code === value.code}
      selectedItemToString={items => items.map(item => item.name).join(', ')}
      renderValue={items => (
        <Badges>
          {items.map(item => (
            <Badge key={item.code} variant="outlined" color="primary">
              {item.name}
            </Badge>
          ))}
        </Badges>
      )}
    >
      {({ item }, itemProps) => (
        <SelectboxItem {...itemProps} key={item.code}>
          {item.name}
        </SelectboxItem>
      )}
    </Selectbox>
  );
};

export default ExampleSelectboxMultiple;
