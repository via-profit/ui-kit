import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import Menu from '@via-profit/ui-kit/src/Menu';
import MenuItem from '@via-profit/ui-kit/src/Menu/MenuItem';
import Badge from '@via-profit/ui-kit/src/Badge';
import { FormattedMessage } from 'react-intl';

import countries from '../autocomplete/countries.json';

type Item = {
  readonly code: string;
  readonly name: string;
};

const ExampleMenuMultiple: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);
  const [value, setValue] = React.useState<readonly Item[]>(
    countries.filter(c => ['AF', 'AL'].includes(c.code)),
  );

  return (
    <>
      <div>
        {value.length === 0 && <FormattedMessage defaultMessage="Ничего не выбрано" />}
        {value.map(item => (
          <Badge
            color="primary"
            variant="outlined"
            key={item.code}
            onDelete={() => setValue(value.filter(v => v.code !== item.code))}
          >
            {item.name}
          </Badge>
        ))}
      </div>
      <Button
        variant="standard"
        onClick={event => setAnchorElement(!anchorElement ? event.currentTarget : null)}
      >
        <FormattedMessage defaultMessage="Выберите" />
      </Button>
      <Menu
        anchorElement={anchorElement}
        isOpen={Boolean(anchorElement)}
        value={value}
        multiple
        items={countries}
        closeOnSelect={false}
        getOptionSelected={({ item, value }) => item.code === value.code}
        onRequestClose={() => setAnchorElement(null)}
        onSelectItem={items => setValue(items)}
      >
        {({ item }, itemProps) => (
          <MenuItem {...itemProps} key={item.code}>
            {item.name}
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default ExampleMenuMultiple;
