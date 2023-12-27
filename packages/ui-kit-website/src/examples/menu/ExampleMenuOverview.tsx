import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import Menu from '@via-profit/ui-kit/src/Menu';
import MenuItem from '@via-profit/ui-kit/src/Menu/MenuItem';
import Strong from '@via-profit/ui-kit/src/Typography/Strong';
import { FormattedMessage } from 'react-intl';

import countries from '../autocomplete/countries.json';

type Item = {
  readonly code: string;
  readonly name: string;
};

const ExampleMenuOverview: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);
  const [value, setValue] = React.useState<Item | null>(
    countries.find(c => c.code === 'RU') || null,
  );

  return (
    <>
      <Button
        variant="standard"
        onClick={event => setAnchorElement(!anchorElement ? event.currentTarget : null)}
      >
        {!value && (
          <span>
            <FormattedMessage defaultMessage="Выберите" />
          </span>
        )}
        {value && (
          <span>
            <FormattedMessage
              defaultMessage="Выбрано: {selected}"
              values={{
                selected: <Strong>{value.name}</Strong>,
              }}
            />
          </span>
        )}
      </Button>
      <Menu
        anchorElement={anchorElement}
        isOpen={Boolean(anchorElement)}
        value={value}
        items={countries}
        getOptionSelected={({ item, value }) => item.code === value.code}
        onRequestClose={() => setAnchorElement(null)}
        onSelectItem={item => setValue(item)}
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

export default ExampleMenuOverview;
