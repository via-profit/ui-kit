import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import Menu, { MenuRef } from '@via-profit/ui-kit/src/Menu';

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
  const [value, setValue] = React.useState<Item | null>(null);
  const menuRef = React.useRef<MenuRef | null>(null);

  return (
    <>
      <Button variant="standard" onClick={event => setAnchorElement(event.currentTarget)}>
        {!value && <span>please select</span>}
        {value && <span>{value.name}</span>}
      </Button>
      <Menu
        ref={menuRef}
        anchorElement={anchorElement}
        isOpen={Boolean(anchorElement)}
        value={value}
        items={items}
        itemToString={item => item.name}
        getOptionSelected={({ item, value }) => item.id === value.id}
        onRequestClose={() => setAnchorElement(null)}
        onSelectItem={item => {
          setValue(item);
          setAnchorElement(null);
        }}
      />
    </>
  );
};

export default ExampleMenuOverview;
