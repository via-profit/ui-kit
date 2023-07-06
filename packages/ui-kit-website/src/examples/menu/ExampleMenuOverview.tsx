import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import Menu, { MenuRef } from '@via-profit/ui-kit/src/Menu';

type Item = {
  readonly id: number;
  readonly name: string;
};

const ExampleMenuOverview: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);
  const [selectedItems, setSelectedItems] = React.useState<readonly Item[]>([]);
  const [isMultiple, setMultiple] = React.useState(false);
  const [itemsLength, setItemsLength] = React.useState(1200);
  const menuRef = React.useRef<MenuRef<(typeof selectedItems)[0]> | null>(null);

  const items = React.useMemo(() => {
    const list: Item[] = [...new Array(itemsLength).keys()].map(i => ({
      id: i,
      // name: `Item ${i}`,
      name: i % 3 === 0 ? `Item ${i} Eiusmod enim labore reprehenderit` : `Item ${i}`,
    }));

    return list;
  }, [itemsLength]);

  return (
    <>
      <Button
        variant="standard"
        onClick={event => {
          setAnchorElement(current => (current ? null : event.currentTarget));
          // setOpen(!isOpen);
        }}
      >
        {isMultiple ? 'Toggle multiple menu' : 'Toggle menu'}
      </Button>
      <Menu
        ref={menuRef}
        anchorElement={anchorElement}
        isOpen={Boolean(anchorElement)}
        value={selectedItems}
        multiple={isMultiple}
        items={items}
        renderItem={({ item }) => <>{item.name}</>}
        getOptionSelected={({ item, value }) => item.id === value.id}
        onSelectItem={item => {
          if (isMultiple && Array.isArray(item)) {
            setSelectedItems(item);
          }

          if (!isMultiple && !Array.isArray(item)) {
            setAnchorElement(null);
            anchorElement?.focus();
            setSelectedItems([item as Item]);
          }
        }}
        onRequestClose={() => {
          anchorElement?.focus();
          setAnchorElement(null);
        }}
      />
    </>
  );
};

export default ExampleMenuOverview;
