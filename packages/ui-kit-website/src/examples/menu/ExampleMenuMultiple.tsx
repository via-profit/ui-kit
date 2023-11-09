import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import Menu from '@via-profit/ui-kit/src/Menu';
import MenuItem from '@via-profit/ui-kit/src/Menu/MenuItem';
import Badge from '@via-profit/ui-kit/src/Badge';
import { FormattedMessage } from 'react-intl';

type Item = {
  readonly id: number;
  readonly name: string;
};

const items: Item[] = [...new Array(30).keys()].map(i => ({
  id: i,
  name: i % 3 === 0 ? `Item ${i} Eiusmod enim labore reprehenderit` : `Item ${i}`,
}));

const ExampleMenuMultiple: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);
  const [value, setValue] = React.useState<readonly Item[]>([]);

  return (
    <>
      <div>
        {value.length === 0 && <FormattedMessage defaultMessage="Ничего не выбрано" />}
        {value.map(item => (
          <Badge
            color="primary"
            variant="outlined"
            key={item.id}
            onDelete={() => setValue(value.filter(v => v.id !== item.id))}
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
        items={items}
        closeOnSelect={false}
        getOptionSelected={({ item, value }) => item.id === value.id}
        onRequestClose={() => setAnchorElement(null)}
        onSelectItem={items => setValue(items)}
      >
        {({ item }, itemProps) => (
          <MenuItem {...itemProps} key={item.id}>
            {item.name}
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default ExampleMenuMultiple;
