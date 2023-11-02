import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import Menu, { MenuRef } from '@via-profit/ui-kit/src/Menu';
import MenuItem from '@via-profit/ui-kit/src/Menu/MenuItem';
import IconRight from '~/components/Icons/ChevronRightOutline';
import IconLeft from '~/components/Icons/ChevronLeftOutline';

type Item = {
  readonly id: number;
  readonly name: string;
};

const items: Item[] = [...new Array(30).keys()].map(i => ({
  id: i,
  name: i % 3 === 0 ? `Item ${i} Eiusmod enim labore reprehenderit` : `Item ${i}`,
}));

const ExampleMenuAPI: React.FC = () => {
  const [value, setValue] = React.useState<Item | null>(null);
  const menuRef = React.useRef<MenuRef | null>(null);

  return (
    <>
      <Button variant="standard" iconOnly onClick={() => menuRef.current?.hightlightPrevItem()}>
        <IconLeft />
      </Button>
      <Button variant="standard" iconOnly onClick={() => menuRef.current?.hightlightNextItem()}>
        <IconRight />
      </Button>

      <Button variant="standard" onClick={() => menuRef.current?.selectHightlightedItem()}>
        Select highlighted item in list
      </Button>
      <div>{!value ? <>Value is null</> : <>Selected value is «{value.name}»</>}</div>

      <Menu
        ref={menuRef}
        isOpen
        anchorPos="static"
        disablePortal
        value={value}
        items={items}
        getOptionSelected={({ item, value }) => item.id === value.id}
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

export default ExampleMenuAPI;
