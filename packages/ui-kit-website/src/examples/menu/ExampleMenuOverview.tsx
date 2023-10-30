import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import Menu, { MenuRef } from '@via-profit/ui-kit/src/Menu';
import MenuItem from '@via-profit/ui-kit/src/Menu/MenuItem';

type Item = {
  readonly id: number;
  readonly name: string;
};

const ExampleMenuOverview: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);
  const [selectedItems, setSelectedItems] = React.useState<readonly Item[]>([]);
  const [isMultiple] = React.useState(false);
  const [itemsLength] = React.useState(30);
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
        variant="outlined"
        onClick={() => {
          menuRef.current?.highlightIndex(27);
        }}
      >
        highlight to item 27
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          menuRef.current?.highlightIndex(8);
        }}
      >
        highlight to item 8
      </Button>
      <Button
        variant="standard"
        onClick={event => {
          setAnchorElement(current => (current ? null : event.currentTarget));
          // setOpen(!isOpen);
        }}
      >
        {selectedItems.length === 0 && <span>please select</span>}
        {selectedItems.map(item => (
          <span key={item.id}>{item.name}</span>
        ))}
      </Button>
      <Menu
        ref={menuRef}
        anchorElement={anchorElement}
        isOpen={Boolean(anchorElement)}
        value={selectedItems}
        multiple={isMultiple}
        items={items}
        renderItem={(item, itemProps) => <MenuItem {...itemProps}>{item.name}</MenuItem>}
        getOptionSelected={({ item, value }) => item.id === value.id}
        onSelectItem={item => {
          if (isMultiple && Array.isArray(item)) {
            setSelectedItems(item);
          }

          if (!isMultiple && !Array.isArray(item)) {
            setAnchorElement(null);
            anchorElement?.focus();
            setSelectedItems([item as unknown as Item]);
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
