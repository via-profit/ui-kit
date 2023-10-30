import React from 'react';

import SelectBox from '@via-profit/ui-kit/src/SelectBox';
import MenuItem from '@via-profit/ui-kit/src/Menu/MenuItem';

type Item = {
  readonly id: number;
  readonly name: string;
};

const ExampleSelectBoxOverview: React.FC = () => {
  const [selectedItems, setSelectedItems] = React.useState<readonly Item[]>([]);
  const [multiple] = React.useState(false);
  const [itemsLength] = React.useState(1200);
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
      renderItem={(item, itemProps) => <MenuItem {...itemProps}>{item.name}</MenuItem>}
      multiple={multiple}
      getOptionSelected={({ item, value }) => item.id === value.id}
      onRequestOpen={() => setOpen(true)}
      onSelectItem={item => {
        if (multiple && Array.isArray(item)) {
          setSelectedItems(item);
        }

        if (!multiple && !Array.isArray(item)) {
          setOpen(false);
          setSelectedItems([item as unknown as Item]);
        }
      }}
      onRequestClose={() => {
        setOpen(false);
      }}
    />
  );
};

export default ExampleSelectBoxOverview;
