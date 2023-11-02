import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import Menu from '@via-profit/ui-kit/src/Menu';
import MenuItem from '@via-profit/ui-kit/src/Menu/MenuItem';

type Item = {
  readonly id: number;
  readonly name: string;
};

const items: Item[] = [...new Array(30).keys()].map(i => ({
  id: i,
  name: i % 3 === 0 ? `Item ${i} Eiusmod enim labore reprehenderit` : `Item ${i}`,
}));

const ExampleMenuOverview: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);
  const [value, setValue] = React.useState<Item | null>(items[2]);

  return (
    <>
      <Button
        variant="standard"
        onClick={event => setAnchorElement(!anchorElement ? event.currentTarget : null)}
      >
        {!value && <span>please select</span>}
        {value && <span>{value.name}</span>}
      </Button>
      <Menu
        anchorElement={anchorElement}
        isOpen={Boolean(anchorElement)}
        value={value}
        items={items}
        getOptionSelected={({ item, value }) => item.id === value.id}
        onRequestClose={() => setAnchorElement(null)}
        onSelectItem={item => setValue(item)}
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

export default ExampleMenuOverview;
