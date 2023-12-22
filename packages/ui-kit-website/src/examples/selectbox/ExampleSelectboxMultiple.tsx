import React from 'react';
import Selectbox, { SelectboxItem } from '@via-profit/ui-kit/src/Selectbox';
import Highlighted from '@via-profit/ui-kit/src/Highlighted';
import Badge from '@via-profit/ui-kit/src/Badge';
import styled from '@emotion/styled';

import countries from './countries.json';

type Item = {
  readonly code: string;
  readonly name: string;
};

const BadgeContainer = styled.div`
  & > span {
    margin: 0 0.4em 0.4em 0%;
  }

  & > span:last-of-type {
    margin-right: 0;
  }
`;

const ExampleSelectboxMultiple: React.FC = () => {
  const [value, setValue] = React.useState<readonly Item[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <BadgeContainer>
        {value.map(item => (
          <Badge
            variant="outlined"
            color="primary"
            onDelete={() => setValue(values => values.filter(v => v.code !== item.code))}
            key={item.code}
          >
            {item.name}
          </Badge>
        ))}
      </BadgeContainer>
      <Selectbox
      overrides={{}}
        multiple
        value={value}
        items={countries}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        onRequestOpen={() => setIsOpen(true)}
        onChange={items => setValue(items)}
        selectedItemToString={items => items.map(({ name }) => name).join(', ')}
      >
        {({ item }, itemProps) => (
          <SelectboxItem {...itemProps} key={item.code}>
            {item.name}
          </SelectboxItem>
        )}
      </Selectbox>
    </>
  );
};

export default ExampleSelectboxMultiple;
