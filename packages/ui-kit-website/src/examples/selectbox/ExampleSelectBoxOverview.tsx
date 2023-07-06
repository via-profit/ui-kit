import React from 'react';

import SelectBox from '@via-profit/ui-kit/src/SelectBox';

type Item = {
  readonly id: number;
  readonly name: string;
};

const ExampleSelectBoxOverview: React.FC = () => {
  const [selectedItems, setSelectedItems] = React.useState<readonly Item[]>([]);
  const [multiple, setMultiple] = React.useState(false);
  const [anchorElem, setAnchorElem] = React.useState<HTMLButtonElement | null>(null);
  // const anchorElem = React.useRef<HTMLButtonElement | null>(null);
  const [itemsLength, setItemsLength] = React.useState(1200);
  const [isOpen, setOpen] = React.useState(false);

  const items = React.useMemo(() => {
    const list: Item[] = [...new Array(itemsLength).keys()].map(i => ({
      id: i,
      // name: `Item ${i}`,
      name: i % 3 === 0 ? `Item ${i} Eiusmod enim labore reprehenderit` : `Item ${i}`,
    }));

    return list;
  }, [itemsLength]);

  return (
    <SelectBox
      items={items}
      isOpen={isOpen}
      value={selectedItems}
      itemToString={item => item?.name || 'no name'}
      multiple={multiple}
      renderItem={({ item }) => <>{item.name}</>}
      getOptionSelected={({ item, value }) => item.id === value.id}
      onRequestOpen={() => setOpen(true)}
      onSelectItem={item => {
        console.log('onSelectItem', { item });
        if (multiple && Array.isArray(item)) {
          setSelectedItems(item);
        }

        if (!multiple && !Array.isArray(item)) {
          setOpen(false);
          setSelectedItems([item as Item]);
        }
      }}
      onRequestClose={() => {
        setOpen(false);
      }}
    />
  );
};

export default ExampleSelectBoxOverview;
